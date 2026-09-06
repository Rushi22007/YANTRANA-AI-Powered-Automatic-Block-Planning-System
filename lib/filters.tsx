"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export const ALL = "ALL"

export interface GlobalFilters {
  date: string
  department: string
  section: string
  priority: string
  maintenanceStatus: string
  workType: string
  trainDensity: string
  corridorAvailability: string
}

const DEFAULT_FILTERS: GlobalFilters = {
  date: ALL,
  department: ALL,
  section: ALL,
  priority: ALL,
  maintenanceStatus: ALL,
  workType: ALL,
  trainDensity: ALL,
  corridorAvailability: ALL,
}

interface FiltersContextValue {
  filters: GlobalFilters
  setFilter: (key: keyof GlobalFilters, value: string) => void
  reset: () => void
  activeCount: number
}

const FiltersContext = createContext<FiltersContextValue | null>(null)

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<GlobalFilters>(DEFAULT_FILTERS)

  const value = useMemo<FiltersContextValue>(() => {
    const setFilter = (key: keyof GlobalFilters, val: string) =>
      setFilters((prev) => ({ ...prev, [key]: val }))
    const reset = () => setFilters(DEFAULT_FILTERS)
    const activeCount = Object.values(filters).filter((v) => v !== ALL).length
    return { filters, setFilter, reset, activeCount }
  }, [filters])

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider")
  return ctx
}

/** Generic matcher: value passes when filter is ALL or equals the field value. */
export function matches(filterValue: string, fieldValue: string | undefined | null): boolean {
  if (filterValue === ALL) return true
  return String(fieldValue ?? "").toUpperCase() === filterValue.toUpperCase()
}
