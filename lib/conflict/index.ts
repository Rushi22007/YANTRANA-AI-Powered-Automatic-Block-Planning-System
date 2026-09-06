/**
 * Conflict detection engine. Uses real dataset relationships between block
 * requests / maintenance jobs, corridor availability, train movements, existing
 * block requests and equipment availability. All prototype logic — labeled as
 * decision-support, never an operational instruction.
 */
import type { Dataset } from "@/lib/data/schema"
import { intervalsOverlap, toMinutes, fromMinutes } from "@/lib/utils/time"

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
export type ConflictStatus = "PENDING_REVIEW" | "RESOLVED"

export interface FeasibilityCheck {
  label: string
  ok: boolean
  detail: string
}

export interface Conflict {
  conflict_id: string
  section_id: string
  date: string
  time: string
  reference: string // job / request id
  conflict_type: string
  severity: Severity
  recommendation: string
  status: ConflictStatus
}

export interface FeasibilityResult {
  feasible: boolean
  checks: FeasibilityCheck[]
  conflicts: Conflict[]
  suggestion: string | null
}

interface WindowQuery {
  section_id: string
  date: string
  start: string
  end: string
  equipment_required?: string
  priority?: string
  reference: string
  excludeRequestId?: string
}

function severityFromPriority(priority?: string, base: Severity = "MEDIUM"): Severity {
  const p = (priority || "").toUpperCase()
  if (p === "CRITICAL") return "CRITICAL"
  if (p === "HIGH") return "HIGH"
  return base
}

/**
 * Evaluate a single maintenance window against all constraints.
 * This powers both the Block Planner and the Conflict Management page.
 */
export function checkFeasibility(dataset: Dataset, q: WindowQuery): FeasibilityResult {
  const start = toMinutes(q.start)
  const end = toMinutes(q.end)
  const checks: FeasibilityCheck[] = []
  const conflicts: Conflict[] = []
  let cid = 1
  const mk = (type: string, rec: string, sev: Severity): Conflict => ({
    conflict_id: `${q.reference}-C${cid++}`,
    section_id: q.section_id,
    date: q.date,
    time: `${q.start}-${q.end}`,
    reference: q.reference,
    conflict_type: type,
    severity: sev,
    recommendation: rec,
    status: "PENDING_REVIEW",
  })

  // 1. Corridor availability
  const corridorRows = dataset.corridor_availability.filter(
    (c) => c.section_id === q.section_id && c.date === q.date,
  )
  const covering = corridorRows.filter((c) =>
    intervalsOverlap(start, end, toMinutes(c.start_time), toMinutes(c.end_time)),
  )
  const available = covering.find(
    (c) =>
      c.availability_status?.toUpperCase() === "AVAILABLE" &&
      c.maintenance_allowed?.toUpperCase() === "TRUE",
  )
  if (available) {
    checks.push({ label: "Corridor available", ok: true, detail: `Window ${available.start_time}-${available.end_time} (${available.reason})` })
  } else if (covering.length === 0) {
    checks.push({ label: "Corridor availability", ok: false, detail: "No corridor availability record overlaps this window" })
    conflicts.push(mk("Corridor unavailable", "Choose a published corridor availability window for this section/date.", severityFromPriority(q.priority, "MEDIUM")))
  } else {
    const blocked = covering[0]
    checks.push({ label: "Corridor availability", ok: false, detail: `Overlapping window is ${blocked.availability_status} (${blocked.reason})` })
    conflicts.push(mk("Corridor unavailable", "Shift the block to an AVAILABLE window where maintenance is allowed.", severityFromPriority(q.priority, "HIGH")))
  }

  // 2. Maintenance allowed flag
  const maintenanceAllowed = covering.some((c) => c.maintenance_allowed?.toUpperCase() === "TRUE")
  checks.push({
    label: "Maintenance allowed",
    ok: maintenanceAllowed,
    detail: maintenanceAllowed ? "maintenance_allowed = TRUE for an overlapping window" : "maintenance_allowed = FALSE for all overlapping windows",
  })
  if (!maintenanceAllowed && covering.length > 0) {
    conflicts.push(mk("Maintenance not allowed", "Corridor policy blocks maintenance in this window; request an alternate slot.", severityFromPriority(q.priority, "HIGH")))
  }

  // 3. Train movement conflicts
  const trainOverlaps = dataset.train_movements.filter(
    (m) =>
      m.section_id === q.section_id &&
      m.travel_date === q.date &&
      intervalsOverlap(start, end, toMinutes(m.entry_time), toMinutes(m.exit_time)),
  )
  if (trainOverlaps.length === 0) {
    checks.push({ label: "No train movement conflict", ok: true, detail: "No scheduled train occupies this section during the window" })
  } else {
    checks.push({ label: "Train movement conflict", ok: false, detail: `${trainOverlaps.length} train movement(s) overlap: ${trainOverlaps.slice(0, 3).map((m) => m.train_id).join(", ")}` })
    conflicts.push(mk("Maintenance vs train movement", `Clear ${trainOverlaps.length} train movement(s) or shift the window to avoid occupancy.`, severityFromPriority(q.priority, "HIGH")))
  }

  // 4. Existing block request overlap
  const blockOverlaps = dataset.block_requests.filter(
    (b) =>
      b.request_id !== q.excludeRequestId &&
      b.section_id === q.section_id &&
      b.requested_date === q.date &&
      b.request_status?.toUpperCase() !== "REJECTED" &&
      intervalsOverlap(start, end, toMinutes(b.requested_start), toMinutes(b.requested_end)),
  )
  if (blockOverlaps.length === 0) {
    checks.push({ label: "No overlapping block", ok: true, detail: "No other block request competes for this window" })
  } else {
    checks.push({ label: "Overlapping block request", ok: false, detail: `Overlaps ${blockOverlaps.map((b) => b.request_id).join(", ")}` })
    conflicts.push(mk("Block request overlap", "Coordinate with the competing block request or select a different window.", severityFromPriority(q.priority, "MEDIUM")))
  }

  // 5. Equipment availability
  if (q.equipment_required && q.equipment_required !== "NONE") {
    const equip = dataset.equipment_availability.filter(
      (e) =>
        e.section_id === q.section_id &&
        e.available_date === q.date &&
        e.equipment_type === q.equipment_required,
    )
    const usable = equip.find(
      (e) =>
        e.availability_status?.toUpperCase() === "AVAILABLE" &&
        e.quantity > 0 &&
        intervalsOverlap(start, end, toMinutes(e.available_start), toMinutes(e.available_end)),
    )
    if (usable) {
      checks.push({ label: "Equipment available", ok: true, detail: `${q.equipment_required} x${usable.quantity} available ${usable.available_start}-${usable.available_end}` })
    } else {
      checks.push({ label: "Equipment availability", ok: false, detail: `${q.equipment_required} not available for this section/date/window` })
      conflicts.push(mk("Equipment unavailable", `Arrange ${q.equipment_required} or reschedule to a window when it is available.`, severityFromPriority(q.priority, "MEDIUM")))
    }
  }

  // suggestion: find nearest AVAILABLE window on same section/date
  let suggestion: string | null = null
  if (conflicts.length > 0) {
    const alt = corridorRows
      .filter(
        (c) =>
          c.availability_status?.toUpperCase() === "AVAILABLE" &&
          c.maintenance_allowed?.toUpperCase() === "TRUE" &&
          !intervalsOverlap(start, end, toMinutes(c.start_time), toMinutes(c.end_time)),
      )
      .sort((a, b) => Math.abs(toMinutes(a.start_time) - start) - Math.abs(toMinutes(b.start_time) - start))[0]
    if (alt) {
      suggestion = `Shift the maintenance window to ${alt.start_time}-${alt.end_time} on ${q.date} (AVAILABLE, maintenance allowed).`
    } else {
      const shifted = fromMinutes(end + 30)
      suggestion = `No clear alternate window on this date; try shifting by 30 minutes (to ~${fromMinutes(start + 30)}-${shifted}) or select another date.`
    }
  }

  return { feasible: conflicts.length === 0, checks, conflicts, suggestion }
}

/** Detect all conflicts across every active block request in the dataset. */
export function detectAllConflicts(dataset: Dataset): Conflict[] {
  const all: Conflict[] = []
  for (const br of dataset.block_requests) {
    if (br.request_status?.toUpperCase() === "REJECTED") continue
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
    // deterministically mark ~30% of found conflicts as resolved for the board
    res.conflicts.forEach((c, i) => {
      c.status = (br.request_id.charCodeAt(3) + i) % 10 < 3 ? "RESOLVED" : "PENDING_REVIEW"
      all.push(c)
    })
  }
  return all
}

export interface ConflictSummary {
  critical: number
  high: number
  resolved: number
  pending: number
}

export function summarizeConflicts(conflicts: Conflict[]): ConflictSummary {
  return {
    critical: conflicts.filter((c) => c.severity === "CRITICAL").length,
    high: conflicts.filter((c) => c.severity === "HIGH").length,
    resolved: conflicts.filter((c) => c.status === "RESOLVED").length,
    pending: conflicts.filter((c) => c.status === "PENDING_REVIEW").length,
  }
}
