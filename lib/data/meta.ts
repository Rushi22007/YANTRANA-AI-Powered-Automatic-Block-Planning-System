import type { DataSourceMeta } from "./source"

export const DATA_SOURCE_META: DataSourceMeta = {
  kind: "csv",
  label: "Local CSV Data",
  description: "Dataset loaded from the eight local CSV files in lib/data/.",
  generatedAt: new Date().toISOString(),
}
