import type { AdapterMeta, IDataSourceAdapter } from "./data-adapter.interface"
import {
  MOCK_MAINTENANCE_NEEDS,
  MOCK_TRAIN_MOVEMENTS,
  MOCK_GOODS_FORECAST,
  MOCK_CONSTRAINTS,
  IS_DEMO_DATA,
} from "../data/mock-data"
import type { MaintenanceNeed, TrainMovementItem, GoodsForecastItem, CorridorConstraint } from "../types"

export class SyntheticDataAdapter implements IDataSourceAdapter<unknown> {
  private systemKey: AdapterMeta["systemKey"]
  private name: string
  private fullName: string
  private description: string

  constructor(
    systemKey: AdapterMeta["systemKey"],
    name: string,
    fullName: string,
    description: string
  ) {
    this.systemKey = systemKey
    this.name = name
    this.fullName = fullName
    this.description = description
  }

  getMetadata(): AdapterMeta {
    return {
      systemKey: this.systemKey,
      name: this.name,
      fullName: this.fullName,
      status: "SIMULATED",
      isSimulated: IS_DEMO_DATA,
      lastSyncTime: "07 May 2026, 10:30:00 IST",
      syncFrequency: "Every 15 min (Simulated Loop)",
      recordCount: this.getRecordCount(),
      description: this.description,
      disclaimer: "Simulated demonstrator adapter for SIH-2026. Does not interface with confidential CRIS/IR production servers.",
    }
  }

  private getRecordCount(): number {
    switch (this.systemKey) {
      case "TMS":
        return MOCK_MAINTENANCE_NEEDS.filter((n) => n.source === "TMS").length + 242
      case "TDMS":
        return MOCK_MAINTENANCE_NEEDS.filter((n) => n.source === "TDMS").length + 118
      case "SMMS":
        return MOCK_MAINTENANCE_NEEDS.filter((n) => n.source === "SMMS").length + 94
      case "COA":
        return 18
      case "TIMETABLE":
        return MOCK_TRAIN_MOVEMENTS.length + 38
      case "GOODS_FORECAST":
        return MOCK_GOODS_FORECAST.length + 12
      default:
        return 50
    }
  }

  async fetchData(): Promise<unknown[]> {
    return []
  }

  isLiveConnection(): boolean {
    return false
  }
}
