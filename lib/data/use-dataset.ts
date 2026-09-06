"use client"

import { createContext, createElement, useContext } from "react"
import type { Dataset } from "./schema"
import { DATA_SOURCE_META } from "./meta"

const DatasetContext = createContext<Dataset | null>(null)

export function DatasetProvider({ dataset, children }: { dataset: Dataset; children: React.ReactNode }) {
  return createElement(DatasetContext.Provider, { value: dataset }, children)
}

/**
 * Client access point for the server-loaded dataset. Keeping the provider at
 * the page boundary prevents the filesystem-backed CSV adapter from entering
 * the browser bundle.
 */
export function useDataset(): { dataset: Dataset; meta: typeof DATA_SOURCE_META } {
  const dataset = useContext(DatasetContext)
  if (!dataset) throw new Error("useDataset must be used inside DatasetProvider")
  return { dataset, meta: DATA_SOURCE_META }
}
