import type { DataSourceMeta } from "./source"

export const DATA_SOURCE_META: DataSourceMeta = {
  kind: "json",
  label: "Pre-processed JSON Data",
  description: "Dataset loaded from pre-processed JSON files in public/data/ (converted from CSV).",
  generatedAt: new Date().toISOString(),
}
