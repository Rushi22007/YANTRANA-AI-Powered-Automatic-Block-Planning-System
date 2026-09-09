export type AdapterStatus = "SIMULATED" | "ACTIVE_CONNECTED" | "DEGRADED" | "DISCONNECTED"

export interface AdapterMeta {
  systemKey: "TMS" | "TDMS" | "SMMS" | "COA" | "TIMETABLE" | "GOODS_FORECAST"
  name: string
  fullName: string
  status: AdapterStatus
  isSimulated: boolean
  lastSyncTime: string
  syncFrequency: string
  recordCount: number
  description: string
  disclaimer: string
}

export interface IDataSourceAdapter<T> {
  getMetadata(): AdapterMeta
  fetchData(): Promise<T[]>
  isLiveConnection(): boolean
}
