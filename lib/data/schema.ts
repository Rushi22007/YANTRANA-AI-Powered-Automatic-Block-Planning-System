/**
 * Canonical dataset schemas for the AI Powered Automatic Block Planning System.
 *
 * These interfaces mirror the EXACT column names of the source CSV files.
 * Do not rename fields. The data layer (see `source.ts`) is the single swap
 * point: replace the synthetic adapter with CSV parsing or a PostgreSQL/API
 * backend without touching any UI or calculation code, as long as the records
 * returned continue to satisfy these shapes.
 */

// assets.csv
export interface Asset {
  asset_id: string
  department: string
  asset_type: string
  section_id: string
  synthetic_km: number
  condition_score: number
  criticality_score: number
  age_years: number
  last_maintenance_date: string
  next_due_date: string
  failure_history_count: number
  operational_status: string
  synthetic_flag: string
}

// equipment_availability.csv
export interface EquipmentAvailability {
  equipment_id: string
  department: string
  equipment_type: string
  section_id: string
  available_date: string
  available_start: string
  available_end: string
  quantity: number
  availability_status: string
  synthetic_flag: string
}

// trains.csv
export interface Train {
  train_id: string
  train_type: string
  origin: string
  destination: string
  direction: string
  priority_class: string
  running_days: string
  flag: string
}

// train_movements.csv
export interface TrainMovement {
  movement_id: string
  train_id: string
  section_id: string
  travel_date: string
  entry_time: string
  exit_time: string
  direction: string
  track: string
  occupancy_duration_minutes: number
  status: string
}

// maintenance_jobs.csv
export interface MaintenanceJob {
  job_id: string
  defect_id: string
  asset_id: string
  department: string
  section_id: string
  work_type: string
  priority: string
  requested_date: string
  preferred_start_time: string
  estimated_duration_minutes: number
  minimum_duration_minutes: number
  maximum_duration_minutes: number
  crew_required: number
  equipment_required: string
  safety_buffer_before: number
  safety_buffer_after: number
  maintenance_status: string
  synthetic_flag: string
}

// block_requests.csv
export interface BlockRequest {
  request_id: string
  job_id: string
  department: string
  section_id: string
  requested_date: string
  requested_start: string
  requested_end: string
  requested_duration_minutes: number
  priority: string
  reason: string
  crew_required: number
  equipment_required: string
  dependency: string
  request_status: string
  synthetic_flag: string
}

// historical_blocks.csv
export interface HistoricalBlock {
  block_id: string
  block_date: string
  section_id: string
  department: string
  start_time: string
  end_time: string
  planned_duration_minutes: number
  actual_duration_minutes: number
  jobs_included: number
  trains_affected: number
  estimated_delay_minutes: number
  actual_delay_minutes: number
  block_utilization_percent: number
  completion_status: string
  synthetic_flag: string
}

// corridor_availability.csv
export interface CorridorAvailability {
  availability_id: string
  section_id: string
  date: string
  start_time: string
  end_time: string
  availability_status: string
  reason: string
  train_density: string
  maintenance_allowed: string
  synthetic_flag: string
}

export interface Dataset {
  assets: Asset[]
  equipment_availability: EquipmentAvailability[]
  trains: Train[]
  train_movements: TrainMovement[]
  maintenance_jobs: MaintenanceJob[]
  block_requests: BlockRequest[]
  historical_blocks: HistoricalBlock[]
  corridor_availability: CorridorAvailability[]
}

/**
 * Ordered corridor sections (Mumbai -> Lonavala schematic).
 * The datasets do not carry geographic coordinates, so this ordering is only
 * used for the schematic corridor map, never presented as a real GIS map.
 */
export const CORRIDOR_SECTIONS = [
  "MUM_DAD",
  "DAD_THA",
  "THA_KAL",
  "KAL_KAR",
  "KAR_KHA",
  "KHA_LON",
] as const

export const SECTION_ENDPOINTS: Record<string, [string, string]> = {
  MUM_DAD: ["Mumbai", "Dadar"],
  DAD_THA: ["Dadar", "Thane"],
  THA_KAL: ["Thane", "Kalyan"],
  KAL_KAR: ["Kalyan", "Karjat"],
  KAR_KHA: ["Karjat", "Khandala"],
  KHA_LON: ["Khandala", "Lonavala"],
}

export const DEPARTMENTS = ["Engineering", "TRD", "S&T", "Joint"] as const
export const PRIORITIES = ["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const
export const MAINTENANCE_STATUSES = ["PLANNED", "REQUESTED", "IN_PROGRESS", "COMPLETED"] as const
export const REQUEST_STATUSES = ["SUBMITTED", "REVIEW", "APPROVED", "REJECTED"] as const
