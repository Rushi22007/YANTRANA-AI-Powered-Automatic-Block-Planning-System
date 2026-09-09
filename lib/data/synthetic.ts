/**
 * Synthetic dataset generator.
 *
 * IMPORTANT: This is clearly-labeled SYNTHETIC data used only because the real
 * CSV files were not available in this environment. Every record carries
 * synthetic_flag = "TRUE". The generator is deterministic (seeded) so KPIs and
 * scores stay stable across renders. It follows the EXACT CSV schemas defined
 * in `schema.ts`. To use real data, swap the adapter in `source.ts` — nothing
 * here leaks into the UI directly.
 */
import {
  type Dataset,
  type Asset,
  type EquipmentAvailability,
  type Train,
  type TrainMovement,
  type MaintenanceJob,
  type BlockRequest,
  type HistoricalBlock,
  type CorridorAvailability,
  CORRIDOR_SECTIONS,
  SECTION_ENDPOINTS,
} from "./schema"

// --- deterministic PRNG (mulberry32) ---
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20260906)
const pick = <T>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)]
const int = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min
const chance = (p: number) => rand() < p
const pad = (n: number) => String(n).padStart(2, "0")
const toTime = (mins: number) => `${pad(Math.floor(mins / 60) % 24)}:${pad(mins % 60)}`
const addDays = (base: Date, d: number) => {
  const dt = new Date(base)
  dt.setDate(dt.getDate() + d)
  return dt
}
const iso = (dt: Date) => dt.toISOString().slice(0, 10)

// Reference "today" for the prototype window.
const TODAY = new Date("2026-09-06T00:00:00Z")

const ASSET_TYPES: Record<string, string[]> = {
  Engineering: ["Rail", "Sleeper", "Ballast", "Points & Crossing", "Bridge", "Level Crossing"],
  TRD: ["OHE Mast", "Contact Wire", "Feeder", "Insulator", "Traction Substation"],
  "S&T": ["Signal", "Track Circuit", "Axle Counter", "Point Machine", "Relay"],
  Joint: ["Platform", "FOB", "Drainage"],
}
const EQUIPMENT_TYPES: Record<string, string[]> = {
  Engineering: ["Tamping Machine", "Rail Grinder", "BCM", "Utility Vehicle"],
  TRD: ["Tower Wagon", "OHE Recording Car", "Ladder Unit"],
  "S&T": ["Signal Test Van", "Cable Locator", "Relay Test Kit"],
  Joint: ["Road-Rail Vehicle", "Crane"],
}
const WORK_TYPES: Record<string, string[]> = {
  Engineering: ["Rail Replacement", "Tamping", "Ballast Cleaning", "Weld Repair", "Track Inspection"],
  TRD: ["OHE Wire Renewal", "Insulator Replacement", "Mast Alignment", "Feeder Repair"],
  "S&T": ["Signal Repair", "Track Circuit Maintenance", "Point Machine Overhaul", "Cable Testing"],
  Joint: ["Platform Repair", "Drainage Clearing", "FOB Maintenance"],
}
const DEPARTMENTS = ["Engineering", "TRD", "S&T", "Joint"] as const
const OP_STATUS = ["SERVICEABLE", "MONITOR", "RESTRICTED", "CRITICAL"] as const

function buildAssets(): Asset[] {
  const assets: Asset[] = []
  let n = 1
  for (const section of CORRIDOR_SECTIONS) {
    const count = int(8, 12)
    for (let i = 0; i < count; i++) {
      const department = pick(DEPARTMENTS)
      const asset_type = pick(ASSET_TYPES[department])
      const condition = int(35, 98)
      const criticality = int(30, 99)
      const age = int(1, 40)
      const failures = int(0, 9)
      // operational status correlated with condition
      let operational_status: string
      if (condition < 45 || (criticality > 85 && condition < 60)) operational_status = "CRITICAL"
      else if (condition < 60) operational_status = "RESTRICTED"
      else if (condition < 72) operational_status = "MONITOR"
      else operational_status = "SERVICEABLE"
      const lastM = addDays(TODAY, -int(20, 400))
      const dueOffset = int(-30, 90)
      assets.push({
        asset_id: `AST-${pad(n)}`,
        department,
        asset_type,
        section_id: section,
        synthetic_km: Number((int(0, 12000) / 100).toFixed(2)),
        condition_score: condition,
        criticality_score: criticality,
        age_years: age,
        last_maintenance_date: iso(lastM),
        next_due_date: iso(addDays(TODAY, dueOffset)),
        failure_history_count: failures,
        operational_status,
      })
      n++
    }
  }
  return assets
}

function buildEquipment(): EquipmentAvailability[] {
  const rows: EquipmentAvailability[] = []
  let n = 1
  for (let d = 0; d < 10; d++) {
    const date = iso(addDays(TODAY, d))
    for (const section of CORRIDOR_SECTIONS) {
      if (chance(0.55)) continue
      const department = pick(DEPARTMENTS)
      const equipment_type = pick(EQUIPMENT_TYPES[department])
      const startMin = int(0, 4) * 60 + 60 // 01:00 - 05:00
      const endMin = startMin + int(3, 6) * 60
      const status = chance(0.68) ? "AVAILABLE" : chance(0.5) ? "PARTIAL" : "UNAVAILABLE"
      rows.push({
        equipment_id: `EQP-${pad(n)}`,
        department,
        equipment_type,
        section_id: section,
        available_date: date,
        available_start: toTime(startMin),
        available_end: toTime(endMin),
        quantity: status === "UNAVAILABLE" ? 0 : int(1, 4),
        availability_status: status,
      })
      n++
    }
  }
  return rows
}

function buildTrains(): Train[] {
  const rows: Train[] = []
  const types = ["Passenger", "Express", "Freight Simulation", "Maintenance Test"]
  const priorityByType: Record<string, string> = {
    Express: "P1",
    Passenger: "P2",
    "Freight Simulation": "P3",
    "Maintenance Test": "P4",
  }
  for (let i = 1; i <= 24; i++) {
    const train_type = pick(types)
    const up = chance(0.5)
    rows.push({
      train_id: `TRN-${pad(i)}`,
      train_type,
      origin: up ? "Mumbai" : "Lonavala",
      destination: up ? "Lonavala" : "Mumbai",
      direction: up ? "UP" : "DOWN",
      priority_class: priorityByType[train_type],
      running_days: chance(0.6) ? "Daily" : "Mon-Sat",
    })
  }
  return rows
}

function buildMovements(trains: Train[]): TrainMovement[] {
  const rows: TrainMovement[] = []
  let n = 1
  for (let d = 0; d < 10; d++) {
    const date = iso(addDays(TODAY, d))
    for (const section of CORRIDOR_SECTIONS) {
      const movements = int(3, 7)
      for (let i = 0; i < movements; i++) {
        const train = pick(trains)
        const entry = int(0, 23) * 60 + pick([0, 10, 15, 20, 30, 45])
        const dur = int(6, 22)
        rows.push({
          movement_id: `MOV-${pad(n)}`,
          train_id: train.train_id,
          section_id: section,
          travel_date: date,
          entry_time: toTime(entry),
          exit_time: toTime(entry + dur),
          direction: train.direction,
          track: pick(["UP", "DOWN", "MAIN", "LOOP"]),
          occupancy_duration_minutes: dur,
          status: chance(0.9) ? "SCHEDULED" : "DELAYED",
        })
        n++
      }
    }
  }
  return rows
}

function buildMaintenanceJobs(assets: Asset[]): MaintenanceJob[] {
  const rows: MaintenanceJob[] = []
  const statuses = ["PLANNED", "REQUESTED", "IN_PROGRESS", "COMPLETED"]
  let n = 1
  const count = 48
  for (let i = 0; i < count; i++) {
    const asset = pick(assets)
    const department = asset.department
    const work_type = pick(WORK_TYPES[department])
    // priority correlated with asset criticality / condition
    let priority: string
    if (asset.criticality_score > 85 && asset.condition_score < 55) priority = "CRITICAL"
    else if (asset.criticality_score > 70 || asset.condition_score < 55) priority = "HIGH"
    else if (asset.condition_score < 72) priority = "MEDIUM"
    else priority = chance(0.4) ? "MEDIUM" : "LOW"
    const est = int(4, 16) * 15 // 60 - 240 min
    const min = Math.max(30, est - int(1, 3) * 15)
    const max = est + int(1, 4) * 15
    const start = int(0, 4) * 60 + 60
    rows.push({
      job_id: `JOB-${pad(n)}`,
      defect_id: `DEF-${pad(int(1, 300))}`,
      asset_id: asset.asset_id,
      department,
      section_id: asset.section_id,
      work_type,
      priority,
      requested_date: iso(addDays(TODAY, int(0, 9))),
      preferred_start_time: toTime(start),
      estimated_duration_minutes: est,
      minimum_duration_minutes: min,
      maximum_duration_minutes: max,
      crew_required: int(2, 12),
      equipment_required: pick(EQUIPMENT_TYPES[department]),
      safety_buffer_before: pick([10, 15, 20, 30]),
      safety_buffer_after: pick([10, 15, 20, 30]),
      maintenance_status: pick(statuses),
    })
    n++
  }
  return rows
}

function buildBlockRequests(jobs: MaintenanceJob[]): BlockRequest[] {
  const rows: BlockRequest[] = []
  const statuses = ["SUBMITTED", "REVIEW", "APPROVED", "REJECTED"]
  const reasons = [
    "Scheduled preventive maintenance",
    "Corrective repair of reported defect",
    "Condition-based intervention",
    "Overdue maintenance clearance",
    "Safety-critical rectification",
  ]
  let n = 1
  // ~60% of jobs generate a block request
  for (const job of jobs) {
    if (chance(0.4)) continue
    const startMin = Number(job.preferred_start_time.slice(0, 2)) * 60 + Number(job.preferred_start_time.slice(3))
    const dur = job.estimated_duration_minutes
    rows.push({
      request_id: `BR-${pad(n)}`,
      job_id: job.job_id,
      department: job.department,
      section_id: job.section_id,
      requested_date: job.requested_date,
      requested_start: toTime(startMin),
      requested_end: toTime(startMin + dur),
      requested_duration_minutes: dur,
      priority: job.priority,
      reason: pick(reasons),
      crew_required: job.crew_required,
      equipment_required: job.equipment_required,
      dependency: chance(0.2) ? `JOB-${pad(int(1, jobs.length))}` : "NONE",
      request_status: pick(statuses),
    })
    n++
  }
  return rows
}

function buildHistoricalBlocks(): HistoricalBlock[] {
  const rows: HistoricalBlock[] = []
  const outcomes = ["COMPLETED", "PARTIAL", "CANCELLED"]
  let n = 1
  for (let d = 30; d >= 1; d--) {
    if (chance(0.4)) continue
    const date = iso(addDays(TODAY, -d))
    const section = pick(CORRIDOR_SECTIONS)
    const department = pick(DEPARTMENTS)
    const startMin = int(0, 3) * 60 + 60
    const planned = int(4, 12) * 15
    const completion = pick(outcomes)
    const actual =
      completion === "CANCELLED" ? 0 : completion === "PARTIAL" ? Math.round(planned * (0.4 + rand() * 0.4)) : Math.round(planned * (0.9 + rand() * 0.25))
    const estDelay = int(0, 25)
    const actDelay = completion === "CANCELLED" ? 0 : Math.max(0, estDelay + int(-8, 20))
    const util = completion === "CANCELLED" ? 0 : Math.min(100, Math.round((actual / planned) * 100))
    rows.push({
      block_id: `HB-${pad(n)}`,
      block_date: date,
      section_id: section,
      department,
      start_time: toTime(startMin),
      end_time: toTime(startMin + planned),
      planned_duration_minutes: planned,
      actual_duration_minutes: actual,
      jobs_included: int(1, 5),
      trains_affected: int(0, 8),
      estimated_delay_minutes: estDelay,
      actual_delay_minutes: actDelay,
      block_utilization_percent: util,
      completion_status: completion,
    })
    n++
  }
  return rows
}

function buildCorridorAvailability(): CorridorAvailability[] {
  const rows: CorridorAvailability[] = []
  const reasons: Record<string, string[]> = {
    AVAILABLE: ["Low traffic maintenance window", "Scheduled traffic block", "Night corridor slot"],
    RESTRICTED: ["High train density", "Partial line availability", "Adjacent works"],
    UNAVAILABLE: ["Peak traffic period", "Special train movement", "No block sanctioned"],
  }
  let n = 1
  for (let d = 0; d < 10; d++) {
    const date = iso(addDays(TODAY, d))
    for (const section of CORRIDOR_SECTIONS) {
      // two windows per section per day
      for (let w = 0; w < 2; w++) {
        const startMin = w === 0 ? int(0, 3) * 60 + 60 : int(13, 16) * 60
        const endMin = startMin + int(2, 5) * 60
        const roll = rand()
        const status = roll < 0.55 ? "AVAILABLE" : roll < 0.8 ? "RESTRICTED" : "UNAVAILABLE"
        const density = status === "AVAILABLE" ? pick(["LOW", "MEDIUM"]) : status === "RESTRICTED" ? "MEDIUM" : "HIGH"
        const maintenance_allowed = status === "AVAILABLE" ? "TRUE" : status === "RESTRICTED" ? (chance(0.4) ? "TRUE" : "FALSE") : "FALSE"
        rows.push({
          availability_id: `CA-${pad(n)}`,
          section_id: section,
          date,
          start_time: toTime(startMin),
          end_time: toTime(endMin),
          availability_status: status,
          reason: pick(reasons[status]),
          train_density: density,
          maintenance_allowed,
        })
        n++
      }
    }
  }
  return rows
}

let cached: Dataset | null = null

export function generateSyntheticDataset(): Dataset {
  if (cached) return cached
  const assets = buildAssets()
  const equipment_availability = buildEquipment()
  const trains = buildTrains()
  const train_movements = buildMovements(trains)
  const maintenance_jobs = buildMaintenanceJobs(assets)
  const block_requests = buildBlockRequests(maintenance_jobs)
  const historical_blocks = buildHistoricalBlocks()
  const corridor_availability = buildCorridorAvailability()
  cached = {
    assets,
    equipment_availability,
    trains,
    train_movements,
    maintenance_jobs,
    block_requests,
    historical_blocks,
    corridor_availability,
  }
  return cached
}

export { TODAY, SECTION_ENDPOINTS }
