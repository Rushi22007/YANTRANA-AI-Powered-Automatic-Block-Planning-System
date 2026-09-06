/**
 * Business calculation layer. All KPI/aggregate math lives here (never inside
 * UI components) so it stays traceable to the dataset and swappable.
 * Values that cannot be derived from data return null; the UI renders those as
 * "Data unavailable".
 */
import type {
  Asset,
  CorridorAvailability,
  HistoricalBlock,
  MaintenanceJob,
} from "@/lib/data/schema"
import { TODAY } from "@/lib/data/synthetic"
import { daysBetween } from "@/lib/utils/time"

const todayISO = TODAY.toISOString().slice(0, 10)

export function isHighPriority(priority: string): boolean {
  const p = (priority || "").toUpperCase()
  return p === "CRITICAL" || p === "HIGH"
}

/** Asset availability = share of assets that are SERVICEABLE. */
export function calculateAssetAvailability(assets: Asset[]): number | null {
  if (!assets.length) return null
  const serviceable = assets.filter((a) => a.operational_status?.toUpperCase() === "SERVICEABLE").length
  return Math.round((serviceable / assets.length) * 1000) / 10
}

export interface AssetStatusBreakdown {
  SERVICEABLE: number
  MONITOR: number
  RESTRICTED: number
  CRITICAL: number
}

export function assetStatusBreakdown(assets: Asset[]): AssetStatusBreakdown {
  const out: AssetStatusBreakdown = { SERVICEABLE: 0, MONITOR: 0, RESTRICTED: 0, CRITICAL: 0 }
  for (const a of assets) {
    const s = a.operational_status?.toUpperCase() as keyof AssetStatusBreakdown
    if (s in out) out[s]++
  }
  return out
}

export interface AssetRisk {
  score: number
  level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
}

/**
 * Prototype Risk Score (0-100). Transparent weighted blend — NOT a trained model.
 * Higher = higher risk. Weights: condition 35%, criticality 30%, age 15%,
 * failure history 12%, operational status 8%.
 */
export function calculateAssetRisk(asset: Asset): AssetRisk {
  const conditionRisk = (100 - clamp(asset.condition_score, 0, 100)) // worse condition -> higher risk
  const criticalityRisk = clamp(asset.criticality_score, 0, 100)
  const ageRisk = clamp((asset.age_years / 40) * 100, 0, 100)
  const failureRisk = clamp((asset.failure_history_count / 10) * 100, 0, 100)
  const statusRisk =
    { CRITICAL: 100, RESTRICTED: 70, MONITOR: 40, SERVICEABLE: 10 }[
      asset.operational_status?.toUpperCase() ?? ""
    ] ?? 30
  const score =
    conditionRisk * 0.35 +
    criticalityRisk * 0.3 +
    ageRisk * 0.15 +
    failureRisk * 0.12 +
    statusRisk * 0.08
  const rounded = Math.round(score)
  let level: AssetRisk["level"]
  if (rounded >= 75) level = "CRITICAL"
  else if (rounded >= 60) level = "HIGH"
  else if (rounded >= 40) level = "MEDIUM"
  else level = "LOW"
  return { score: rounded, level }
}

export function isOverdue(asset: Asset): boolean {
  if (!asset.next_due_date) return false
  return daysBetween(todayISO, asset.next_due_date) < 0
}

/** Available maintenance windows: AVAILABLE and maintenance_allowed = TRUE. */
export function findAvailableWindows(corridor: CorridorAvailability[]): CorridorAvailability[] {
  return corridor.filter(
    (c) =>
      c.availability_status?.toUpperCase() === "AVAILABLE" &&
      c.maintenance_allowed?.toUpperCase() === "TRUE",
  )
}

export interface BlockPerformance {
  total: number
  completed: number
  partial: number
  cancelled: number
  avgPlanned: number | null
  avgActual: number | null
  avgUtilization: number | null
  avgEstimatedDelay: number | null
  avgActualDelay: number | null
}

export function calculateBlockPerformance(blocks: HistoricalBlock[]): BlockPerformance {
  if (!blocks.length) {
    return {
      total: 0,
      completed: 0,
      partial: 0,
      cancelled: 0,
      avgPlanned: null,
      avgActual: null,
      avgUtilization: null,
      avgEstimatedDelay: null,
      avgActualDelay: null,
    }
  }
  const avg = (fn: (b: HistoricalBlock) => number) =>
    Math.round(blocks.reduce((s, b) => s + fn(b), 0) / blocks.length)
  return {
    total: blocks.length,
    completed: blocks.filter((b) => b.completion_status?.toUpperCase() === "COMPLETED").length,
    partial: blocks.filter((b) => b.completion_status?.toUpperCase() === "PARTIAL").length,
    cancelled: blocks.filter((b) => b.completion_status?.toUpperCase() === "CANCELLED").length,
    avgPlanned: avg((b) => b.planned_duration_minutes),
    avgActual: avg((b) => b.actual_duration_minutes),
    avgUtilization: avg((b) => b.block_utilization_percent),
    avgEstimatedDelay: avg((b) => b.estimated_delay_minutes),
    avgActualDelay: avg((b) => b.actual_delay_minutes),
  }
}

export function countByField<T>(rows: T[], field: keyof T): Record<string, number> {
  const out: Record<string, number> = {}
  for (const r of rows) {
    const k = String(r[field] ?? "UNKNOWN")
    out[k] = (out[k] ?? 0) + 1
  }
  return out
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

export { todayISO }
