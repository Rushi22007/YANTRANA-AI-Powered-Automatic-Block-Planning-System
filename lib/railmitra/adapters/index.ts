import { SyntheticDataAdapter } from "./synthetic-adapter"
import type { IDataSourceAdapter, AdapterMeta } from "./data-adapter.interface"
import { MOCK_MAINTENANCE_NEEDS } from "../data/mock-data"
import type { MaintenanceNeed } from "../types"

export class TMSAdapter implements IDataSourceAdapter<MaintenanceNeed> {
  private base = new SyntheticDataAdapter(
    "TMS",
    "TMS",
    "Track Management System",
    "Provides P-Way inspection logs, ultrasonic flaw detector (USFD) defect alerts, track geometry car recording data, and machine tamping requirements."
  )

  getMetadata(): AdapterMeta {
    return this.base.getMetadata()
  }

  async fetchData(): Promise<MaintenanceNeed[]> {
    return MOCK_MAINTENANCE_NEEDS.filter((n) => n.department === "ENGINEERING")
  }

  isLiveConnection(): boolean {
    return false
  }
}

export class TDMSAdapter implements IDataSourceAdapter<MaintenanceNeed> {
  private base = new SyntheticDataAdapter(
    "TDMS",
    "TDMS",
    "Traction Distribution Management System",
    "Provides overhead equipment (OHE) periodic overhaul schedules, mast cantilever inspections, neutral section isolator tests, and power block requisitions."
  )

  getMetadata(): AdapterMeta {
    return this.base.getMetadata()
  }

  async fetchData(): Promise<MaintenanceNeed[]> {
    return MOCK_MAINTENANCE_NEEDS.filter((n) => n.department === "TRD")
  }

  isLiveConnection(): boolean {
    return false
  }
}

export class SMMSAdapter implements IDataSourceAdapter<MaintenanceNeed> {
  private base = new SyntheticDataAdapter(
    "SMMS",
    "SMMS",
    "Signaling Maintenance Management System",
    "Provides point machine lubrication logs, axle counter health telemetry, electronic interlocking (EI) event logs, and disconnection block requests."
  )

  getMetadata(): AdapterMeta {
    return this.base.getMetadata()
  }

  async fetchData(): Promise<MaintenanceNeed[]> {
    return MOCK_MAINTENANCE_NEEDS.filter((n) => n.department === "SNT")
  }

  isLiveConnection(): boolean {
    return false
  }
}

export class COAAdapter implements IDataSourceAdapter<unknown> {
  private base = new SyntheticDataAdapter(
    "COA",
    "COA / FOIS",
    "Control Office Application & Freight Operations",
    "Interfaces with sectional train charts, live train running status, corridor headway availability, and official block sanction protocols."
  )

  getMetadata(): AdapterMeta {
    return this.base.getMetadata()
  }

  async fetchData(): Promise<unknown[]> {
    return []
  }

  isLiveConnection(): boolean {
    return false
  }
}

export class TimetableAdapter implements IDataSourceAdapter<unknown> {
  private base = new SyntheticDataAdapter(
    "TIMETABLE",
    "National Train Timetable",
    "Indian Railways Master Train Working Timetable (WTT)",
    "Provides scheduled arrival/departure, platform occupancy, operational headways, and punctuality sensitivity weighting for passenger express trains."
  )

  getMetadata(): AdapterMeta {
    return this.base.getMetadata()
  }

  async fetchData(): Promise<unknown[]> {
    return []
  }

  isLiveConnection(): boolean {
    return false
  }
}

export class GoodsForecastAdapter implements IDataSourceAdapter<unknown> {
  private base = new SyntheticDataAdapter(
    "GOODS_FORECAST",
    "Goods Train Forecast (FOIS/RTIS)",
    "Freight Operations Information System Rake Forecast",
    "Provides real-time freight rake ordering, JNPT container movements, coal/POL rake dispatch forecasts, and banking locomotive requirements on Bhor Ghat."
  )

  getMetadata(): AdapterMeta {
    return this.base.getMetadata()
  }

  async fetchData(): Promise<unknown[]> {
    return []
  }

  isLiveConnection(): boolean {
    return false
  }
}

export function getAllAdapters() {
  return [
    new TMSAdapter(),
    new SMMSAdapter(),
    new TDMSAdapter(),
    new COAAdapter(),
    new TimetableAdapter(),
    new GoodsForecastAdapter(),
  ]
}
