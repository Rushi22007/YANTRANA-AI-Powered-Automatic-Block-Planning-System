/**
 * DATA LAYER — single source of truth adapter.
 *
 * The entire application reads its data ONLY through this module. Today it is
 * backed by the local CSV adapter. The synthetic adapter remains available as
 * a fallback for environments where the CSV files are not installed.
 *
 * To move to production, replace the body of `loadDataset()` with one of:
 *   - CSV parsing (read /data/*.csv, map rows to the schema.ts interfaces)
 *   - a PostgreSQL query layer
 *   - a REST/GraphQL API client
 * As long as the returned object satisfies the `Dataset` shape from schema.ts,
 * no UI or calculation code needs to change.
 */
import type { Dataset } from "./schema"
import { DATA_SOURCE_META } from "./meta"
import { loadJsonDataset } from "./json"

export type DataSourceKind = "synthetic" | "csv" | "json" | "postgres" | "api"

export interface DataSourceMeta {
  kind: DataSourceKind
  label: string
  description: string
  generatedAt: string
}

let datasetCache: Dataset | null = null

/**
 * Loads the full dataset. Kept synchronous because the current backing store is
 * in-memory; when swapping to CSV/DB/API, change the return type to
 * Promise<Dataset> and update the `useDataset` hook accordingly.
 */
export function loadDataset(): Dataset {
  if (!datasetCache) {
    datasetCache = loadJsonDataset()
  }
  return datasetCache
}
