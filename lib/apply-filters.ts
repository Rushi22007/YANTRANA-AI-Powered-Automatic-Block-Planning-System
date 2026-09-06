import type {
  Asset,
  BlockRequest,
  CorridorAvailability,
  EquipmentAvailability,
  MaintenanceJob,
  TrainMovement,
} from "@/lib/data/schema"
import { matches, type GlobalFilters } from "@/lib/filters"

export function filterJobs(jobs: MaintenanceJob[], f: GlobalFilters): MaintenanceJob[] {
  return jobs.filter(
    (j) =>
      matches(f.date, j.requested_date) &&
      matches(f.department, j.department) &&
      matches(f.section, j.section_id) &&
      matches(f.priority, j.priority) &&
      matches(f.maintenanceStatus, j.maintenance_status) &&
      matches(f.workType, j.work_type),
  )
}

export function filterAssets(assets: Asset[], f: GlobalFilters): Asset[] {
  return assets.filter((a) => matches(f.department, a.department) && matches(f.section, a.section_id))
}

export function filterCorridor(rows: CorridorAvailability[], f: GlobalFilters): CorridorAvailability[] {
  return rows.filter(
    (c) =>
      matches(f.date, c.date) &&
      matches(f.section, c.section_id) &&
      matches(f.trainDensity, c.train_density) &&
      matches(f.corridorAvailability, c.availability_status),
  )
}

export function filterEquipment(rows: EquipmentAvailability[], f: GlobalFilters): EquipmentAvailability[] {
  return rows.filter(
    (e) => matches(f.date, e.available_date) && matches(f.department, e.department) && matches(f.section, e.section_id),
  )
}

export function filterMovements(rows: TrainMovement[], f: GlobalFilters): TrainMovement[] {
  return rows.filter((m) => matches(f.date, m.travel_date) && matches(f.section, m.section_id))
}

export function filterBlockRequests(rows: BlockRequest[], f: GlobalFilters): BlockRequest[] {
  return rows.filter(
    (b) =>
      matches(f.date, b.requested_date) &&
      matches(f.department, b.department) &&
      matches(f.section, b.section_id) &&
      matches(f.priority, b.priority),
  )
}
