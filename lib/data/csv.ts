import { readFileSync } from "node:fs"
import path from "node:path"
import type {
  Asset,
  BlockRequest,
  CorridorAvailability,
  Dataset,
  EquipmentAvailability,
  HistoricalBlock,
  MaintenanceJob,
  Train,
  TrainMovement,
} from "./schema"

type CsvRow = Record<string, string>

const dataDirectory = path.join(process.cwd(), "lib", "data")

function parseCsv(text: string): CsvRow[] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let quoted = false

  for (let index = 0; index < text.length; index++) {
    const character = text[index]
    const next = text[index + 1]
    if (character === '"') {
      if (quoted && next === '"') {
        field += '"'
        index++
      } else {
        quoted = !quoted
      }
    } else if (character === "," && !quoted) {
      row.push(field.trim())
      field = ""
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index++
      row.push(field.trim())
      if (row.some((value) => value !== "")) rows.push(row)
      row = []
      field = ""
    } else {
      field += character
    }
  }
  if (field || row.length) {
    row.push(field.trim())
    if (row.some((value) => value !== "")) rows.push(row)
  }

  const headers = rows.shift() ?? []
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])))
}

function readRows(filename: string): CsvRow[] {
  return parseCsv(readFileSync(path.join(dataDirectory, filename), "utf8"))
}

function numberValue(value: string, fallback = 0): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function scoreValue(value: string): number {
  const score = numberValue(value)
  return score >= 0 && score <= 1 ? Math.round(score * 100) : score
}

function dateValue(value: string): string {
  const trimmed = value.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed
  const match = trimmed.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  return match ? `${match[3]}-${match[2]}-${match[1]}` : trimmed
}

function timeValue(value: string): string {
  const trimmed = value.trim().replace(".", ":")
  const match = trimmed.match(/^(\d{1,2}):(\d{1,2})$/)
  if (!match) return trimmed
  return `${match[1].padStart(2, "0")}:${match[2].padStart(2, "0")}`
}

function sectionValue(value: string): string {
  return value.trim().replace(/^SEC_/, "")
}

function booleanValue(value: string): string {
  return /^(true|1|yes|y)$/i.test(value.trim()) ? "TRUE" : "FALSE"
}

function priorityValue(value: string): string {
  const normalized = value.trim().toUpperCase()
  return ({ "1": "CRITICAL", "2": "HIGH", "3": "MEDIUM", "4": "LOW" }[normalized] ?? normalized)
}

function statusValue(value: string, trueStatus = "SCHEDULED"): string {
  const normalized = value.trim().toUpperCase()
  return normalized === "TRUE" ? trueStatus : normalized
}

export function loadCsvDataset(): Dataset {
  const assets: Asset[] = readRows("assets.csv").map((row) => ({
    asset_id: row.asset_id,
    department: row.department,
    asset_type: row.asset_type,
    section_id: sectionValue(row.section_id),
    synthetic_km: numberValue(row.synthetic_km),
    condition_score: scoreValue(row.condition_score),
    criticality_score: scoreValue(row.criticality_score),
    age_years: numberValue(row.age_years),
    last_maintenance_date: dateValue(row.last_maintenance_date),
    next_due_date: dateValue(row.next_due_date),
    failure_history_count: numberValue(row.failure_history_count),
    operational_status: row.operational_status.toUpperCase(),
    synthetic_flag: booleanValue(row.synthetic_flag),
  }))

  const equipment_availability: EquipmentAvailability[] = readRows("equipment_availability.csv").map((row) => ({
    equipment_id: row.equipment_id,
    department: row.department,
    equipment_type: row.equipment_type,
    section_id: sectionValue(row.section_id),
    available_date: dateValue(row.available_date),
    available_start: timeValue(row.available_start),
    available_end: timeValue(row.available_end),
    quantity: numberValue(row.quantity),
    availability_status: row.availability_status.toUpperCase(),
    synthetic_flag: booleanValue(row.synthetic_flag),
  }))

  const trains: Train[] = readRows("trains.csv").map((row) => ({
    train_id: row.train_id,
    train_type: row.train_type,
    origin: row.origin,
    destination: row.destination,
    direction: row.direction.toUpperCase(),
    priority_class: row.priority_class.toUpperCase(),
    running_days: row.running_days.toUpperCase(),
    flag: booleanValue(row.flag),
  }))

  const train_movements: TrainMovement[] = readRows("train_movements.csv").map((row) => ({
    movement_id: row.movement_id,
    train_id: row.train_id,
    section_id: sectionValue(row.section_id),
    travel_date: dateValue(row.travel_date),
    entry_time: timeValue(row.entry_time),
    exit_time: timeValue(row.exit_time),
    direction: row.direction.toUpperCase(),
    track: row.track,
    occupancy_duration_minutes: numberValue(row.occupancy_duration_minutes),
    status: statusValue(row.Status),
  }))

  const maintenance_jobs: MaintenanceJob[] = readRows("maintenance_jobs (1).csv").map((row) => ({
    job_id: row.job_id,
    defect_id: row.defect_id,
    asset_id: row.asset_id,
    department: row.department,
    section_id: sectionValue(row.section_id),
    work_type: row.work_type,
    priority: priorityValue(row.priority),
    requested_date: dateValue(row.requested_date),
    preferred_start_time: timeValue(row.preferred_start_time),
    estimated_duration_minutes: numberValue(row.estimated_duration_minutes),
    minimum_duration_minutes: numberValue(row.minimum_duration_minutes),
    maximum_duration_minutes: numberValue(row.maximum_duration_minutes),
    crew_required: numberValue(row.crew_required),
    equipment_required: row.equipment_required,
    safety_buffer_before: numberValue(row.safety_buffer_before),
    safety_buffer_after: numberValue(row.safety_buffer_after),
    maintenance_status: row.maintenance_status.toUpperCase(),
    synthetic_flag: booleanValue(row.synthetic_flag),
  }))

  const block_requests: BlockRequest[] = readRows("block_requests.csv").map((row) => ({
    request_id: row.request_id,
    job_id: row.job_id,
    department: row.department,
    section_id: sectionValue(row.section_id),
    requested_date: dateValue(row.requested_date),
    requested_start: timeValue(row.requested_start),
    requested_end: timeValue(row.requested_end),
    requested_duration_minutes: numberValue(row.requested_duration_minutes),
    priority: priorityValue(row.priority),
    reason: row.reason,
    crew_required: numberValue(row.crew_required),
    equipment_required: row.equipment_required,
    dependency: row.dependency,
    request_status: row.request_status.toUpperCase(),
    synthetic_flag: booleanValue(row.synthetic_flag),
  }))

  const historical_blocks: HistoricalBlock[] = readRows("historical_blocks.csv").map((row) => ({
    block_id: row.block_id,
    block_date: dateValue(row.block_date),
    section_id: sectionValue(row.section_id),
    department: row.department,
    start_time: timeValue(row.start_time),
    end_time: timeValue(row.end_time),
    planned_duration_minutes: numberValue(row.planned_duration_minutes),
    actual_duration_minutes: numberValue(row.actual_duration_minutes),
    jobs_included: numberValue(row.jobs_included),
    trains_affected: numberValue(row.trains_affected),
    estimated_delay_minutes: numberValue(row.estimated_delay_minutes),
    actual_delay_minutes: numberValue(row.actual_delay_minutes),
    block_utilization_percent: numberValue(row.block_utilization_percent),
    completion_status: row.completion_status.toUpperCase(),
    synthetic_flag: booleanValue(row.synthetic_flag),
  }))

  const corridor_availability: CorridorAvailability[] = readRows("corridor_availability.csv").map((row) => ({
    availability_id: row.availability_id,
    section_id: sectionValue(row.section_id),
    date: dateValue(row.date),
    start_time: timeValue(row.start_time),
    end_time: timeValue(row.end_time),
    availability_status: row.availability_status.toUpperCase(),
    reason: row.reason,
    train_density: row.train_density.toUpperCase(),
    maintenance_allowed: booleanValue(row.maintenance_allowed),
    synthetic_flag: booleanValue(row.synthetic_flag),
  }))

  return {
    assets,
    equipment_availability,
    trains,
    train_movements,
    maintenance_jobs,
    block_requests,
    historical_blocks,
    corridor_availability,
  }
}