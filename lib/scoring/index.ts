/**
 * AI-assisted prototype scoring.
 *
 * This is a TRANSPARENT, rule-based weighted model — NOT a trained ML model and
 * NOT connected to any live railway system. Every factor is derived from the
 * provided datasets and exposed for inspection so scores are fully traceable.
 */
import type { BlockRequest, CorridorAvailability, Dataset, MaintenanceJob, Asset, TrainMovement } from "@/lib/data/schema"
import { calculateAssetRisk, isOverdue, calculateAssetAvailability, findAvailableWindows, calculateBlockPerformance, clamp, todayISO } from "@/lib/calculations"
import { checkFeasibility } from "@/lib/conflict"
import { fromMinutes, intervalsOverlap, toMinutes, daysBetween } from "@/lib/utils/time"

export interface ScoreFactor {
  label: string
  detail: string
  weight: number // 0-1
  normalized: number // 0-100 contribution before weighting
  points: number // weight * normalized
}

export interface PriorityScoreResult {
  score: number // 0-100
  level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  recommendation: string
  factors: ScoreFactor[]
  assetFound: boolean
}

const PRIORITY_POINTS: Record<string, number> = { CRITICAL: 100, HIGH: 78, MEDIUM: 50, LOW: 25 }

/**
 * calculateMaintenancePriority — AI-assisted prototype priority score for a job.
 */
export function calculateMaintenancePriority(dataset: Dataset, job: MaintenanceJob): PriorityScoreResult {
  const asset = dataset.assets.find((a) => a.asset_id === job.asset_id)
  const factors: ScoreFactor[] = []

  const add = (label: string, detail: string, weight: number, normalized: number) => {
    const n = clamp(normalized, 0, 100)
    factors.push({ label, detail, weight, normalized: Math.round(n), points: Math.round(weight * n * 10) / 10 })
  }

  // 1. Declared priority
  add("Declared priority", job.priority, 0.25, PRIORITY_POINTS[job.priority?.toUpperCase()] ?? 40)

  // 2. Asset criticality
  add("Asset criticality", asset ? `criticality_score ${asset.criticality_score}` : "Asset not found", 0.2, asset ? asset.criticality_score : 40)

  // 3. Asset condition (worse condition -> higher priority)
  add("Asset condition", asset ? `condition_score ${asset.condition_score}` : "Asset not found", 0.15, asset ? 100 - asset.condition_score : 40)

  // 4. Overdue status
  let overdueNorm = 30
  let overdueDetail = "Asset not found"
  if (asset) {
    const overdueDays = -daysBetween(todayISO, asset.next_due_date)
    if (overdueDays > 0) overdueNorm = clamp(50 + overdueDays * 2, 0, 100)
    else overdueNorm = clamp(40 + overdueDays, 0, 100) // future due lowers urgency
    overdueDetail = isOverdue(asset) ? `Overdue by ${overdueDays} day(s)` : `Due in ${-overdueDays} day(s)`
  }
  add("Overdue status", overdueDetail, 0.12, overdueNorm)

  // 5. Failure history
  add("Failure history", asset ? `${asset.failure_history_count} recorded failure(s)` : "Asset not found", 0.1, asset ? (asset.failure_history_count / 10) * 100 : 30)

  // 6. Train impact on section/date around preferred window
  const start = toMinutes(job.preferred_start_time)
  const end = start + job.estimated_duration_minutes
  const trainImpact = dataset.train_movements.filter(
    (m) => m.section_id === job.section_id && m.travel_date === job.requested_date && intervalsOverlap(start, end, toMinutes(m.entry_time), toMinutes(m.exit_time)),
  ).length
  add("Train impact", `${trainImpact} overlapping train movement(s)`, 0.08, clamp(trainImpact * 20, 0, 100))

  // 7. Equipment availability (higher availability -> higher readiness -> higher priority to act)
  const equip = dataset.equipment_availability.filter(
    (e) => e.section_id === job.section_id && e.available_date === job.requested_date && e.equipment_type === job.equipment_required && e.availability_status?.toUpperCase() === "AVAILABLE" && e.quantity > 0,
  )
  add("Equipment readiness", equip.length ? `${job.equipment_required} available` : `${job.equipment_required} not available on requested date`, 0.05, equip.length ? 90 : 25)

  // 8. Corridor availability
  const windows = findAvailableWindows(dataset.corridor_availability).filter((c) => c.section_id === job.section_id && c.date === job.requested_date)
  add("Corridor readiness", windows.length ? `${windows.length} available window(s)` : "No available window on requested date", 0.05, windows.length ? 85 : 20)

  const score = Math.round(factors.reduce((s, f) => s + f.points, 0))
  let level: PriorityScoreResult["level"]
  if (score >= 80) level = "CRITICAL"
  else if (score >= 65) level = "HIGH"
  else if (score >= 45) level = "MEDIUM"
  else level = "LOW"

  const recommendation = buildRecommendation(level, job, asset, windows.length)

  return { score, level, recommendation, factors, assetFound: !!asset }
}

function buildRecommendation(level: string, job: MaintenanceJob, asset: Asset | undefined, windowCount: number): string {
  const risk = asset ? calculateAssetRisk(asset) : null
  const parts: string[] = []
  if (level === "CRITICAL" || level === "HIGH") {
    parts.push("Schedule this job in the next suitable maintenance window.")
  } else if (level === "MEDIUM") {
    parts.push("Plan this job within the current weekly block cycle.")
  } else {
    parts.push("Defer to a routine maintenance slot; monitor asset condition.")
  }
  if (risk && (risk.level === "CRITICAL" || risk.level === "HIGH")) {
    parts.push(`Asset carries a ${risk.level} Prototype Risk Score (${risk.score}/100).`)
  }
  if (windowCount === 0) parts.push("No available corridor window on the requested date — evaluate alternate dates in the Block Planner.")
  return parts.join(" ")
}

/** The single highest-priority job in the dataset by prototype score. */
export function topRecommendedJob(dataset: Dataset): { job: MaintenanceJob; result: PriorityScoreResult } | null {
  const open = dataset.maintenance_jobs.filter((j) => j.maintenance_status?.toUpperCase() !== "COMPLETED")
  if (!open.length) return null
  let best: { job: MaintenanceJob; result: PriorityScoreResult } | null = null
  for (const job of open) {
    const result = calculateMaintenancePriority(dataset, job)
    if (!best || result.score > best.result.score) best = { job, result }
  }
  return best
}

export type RecommendationStatus = "RECOMMENDED" | "CONFLICT" | "NEEDS REVIEW"

export interface MaintenanceBlockRecommendation {
  status: RecommendationStatus
  job: MaintenanceJob
  request?: BlockRequest
  section_id: string
  date: string
  start_time: string
  end_time: string
  duration_minutes: number
  affected_trains: string[]
  conflicts: string[]
  checks: ReturnType<typeof checkFeasibility>["checks"]
}

function candidateDuration(job: MaintenanceJob, window: CorridorAvailability): number | null {
  const availableMinutes = toMinutes(window.end_time) - toMinutes(window.start_time)
  if (availableMinutes >= job.estimated_duration_minutes) return job.estimated_duration_minutes
  if (availableMinutes >= job.minimum_duration_minutes) return job.minimum_duration_minutes
  return null
}

function affectedTrains(movements: TrainMovement[], sectionId: string, date: string, start: string, end: string): string[] {
  const startMinutes = toMinutes(start)
  const endMinutes = toMinutes(end)
  return movements.reduce<string[]>((trainIds, movement) => {
    if (
      movement.section_id === sectionId &&
      movement.travel_date === date &&
      intervalsOverlap(startMinutes, endMinutes, toMinutes(movement.entry_time), toMinutes(movement.exit_time))
    ) trainIds.push(movement.train_id)
    return trainIds
  }, [])
}

/** Generate and evaluate a real-data maintenance block for a selected job/request. */
export function recommendMaintenanceBlock(
  dataset: Dataset,
  job: MaintenanceJob,
  request?: BlockRequest,
): MaintenanceBlockRecommendation {
  const requestedDate = request?.requested_date ?? job.requested_date
  const requestedStart = request?.requested_start ?? job.preferred_start_time
  const duration = request?.requested_duration_minutes ?? job.estimated_duration_minutes
  const equipment = request?.equipment_required ?? job.equipment_required
  const candidates = dataset.corridor_availability
    .filter((window) => window.availability_status?.toUpperCase() === "AVAILABLE" && window.maintenance_allowed?.toUpperCase() === "TRUE")
    .map((window) => {
      const selectedDuration = candidateDuration({ ...job, estimated_duration_minutes: duration }, window)
      if (selectedDuration == null) return null
      const end = fromMinutes(toMinutes(window.start_time) + selectedDuration)
      const feasibility = checkFeasibility(dataset, {
        section_id: job.section_id,
        date: window.date,
        start: window.start_time,
        end,
        equipment_required: equipment,
        priority: request?.priority ?? job.priority,
        reference: request?.request_id ?? job.job_id,
        excludeRequestId: request?.request_id,
      })
      const dateDistance = Math.abs(new Date(window.date).getTime() - new Date(requestedDate).getTime())
      const timeDistance = Math.abs(toMinutes(window.start_time) - toMinutes(requestedStart))
      return { window, end, selectedDuration, feasibility, rank: (feasibility.feasible ? 0 : 1) * 1e15 + dateDistance + timeDistance }
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null)
    .sort((a, b) => a.rank - b.rank)

  const selected = candidates[0]
  if (!selected) {
    return {
      status: "NEEDS REVIEW",
      job,
      request,
      section_id: job.section_id,
      date: requestedDate,
      start_time: requestedStart,
      end_time: fromMinutes(toMinutes(requestedStart) + duration),
      duration_minutes: duration,
      affected_trains: [],
      conflicts: ["No published AVAILABLE corridor window can contain the requested maintenance duration."],
      checks: [],
    }
  }

  const conflicts = selected.feasibility.conflicts.map((conflict) => `${conflict.conflict_type}: ${conflict.recommendation}`)
  return {
    status: selected.feasibility.feasible ? "RECOMMENDED" : "CONFLICT",
    job,
    request,
    section_id: job.section_id,
    date: selected.window.date,
    start_time: selected.window.start_time,
    end_time: selected.end,
    duration_minutes: selected.selectedDuration,
    affected_trains: affectedTrains(dataset.train_movements, job.section_id, selected.window.date, selected.window.start_time, selected.end),
    conflicts,
    checks: selected.feasibility.checks,
  }
}

export interface OptimizationScore {
  score: number | null
  components: { label: string; value: number; weight: number; detail: string }[]
}

/**
 * calculateAIOptimizationScore — transparent composite of system health.
 * Blends asset availability, schedulable-window coverage, conflict rate and
 * historical block completion/utilization.
 */
export function calculateAIOptimizationScore(dataset: Dataset): OptimizationScore {
  const availability = calculateAssetAvailability(dataset.assets)
  const perf = calculateBlockPerformance(dataset.historical_blocks)

  // schedulable coverage: share of active block requests with a feasible window
  const active = dataset.block_requests.filter((b) => b.request_status?.toUpperCase() !== "REJECTED")
  let feasible = 0
  for (const br of active) {
    const res = checkFeasibility(dataset, {
      section_id: br.section_id,
      date: br.requested_date,
      start: br.requested_start,
      end: br.requested_end,
      equipment_required: br.equipment_required,
      priority: br.priority,
      reference: br.request_id,
      excludeRequestId: br.request_id,
    })
    if (res.feasible) feasible++
  }
  const coverage = active.length ? (feasible / active.length) * 100 : null
  const completionRate = perf.total ? (perf.completed / perf.total) * 100 : null

  const components = [
    { label: "Asset availability", value: availability ?? 0, weight: 0.3, detail: availability != null ? `${availability}% serviceable` : "Data unavailable" },
    { label: "Schedulable coverage", value: coverage ?? 0, weight: 0.3, detail: coverage != null ? `${Math.round(coverage)}% of block requests feasible` : "Data unavailable" },
    { label: "Historical completion", value: completionRate ?? 0, weight: 0.25, detail: completionRate != null ? `${Math.round(completionRate)}% blocks completed` : "Data unavailable" },
    { label: "Block utilization", value: perf.avgUtilization ?? 0, weight: 0.15, detail: perf.avgUtilization != null ? `${perf.avgUtilization}% avg utilization` : "Data unavailable" },
  ]

  if (availability == null && coverage == null && completionRate == null) {
    return { score: null, components }
  }
  const score = Math.round(components.reduce((s, c) => s + c.value * c.weight, 0))
  return { score, components }
}
