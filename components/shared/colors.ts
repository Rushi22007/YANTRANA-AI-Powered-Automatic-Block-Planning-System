/** Shared status -> CSS token color maps so charts match the badges. */

export const OPERATIONAL_COLORS: Record<string, string> = {
  SERVICEABLE: "var(--success)",
  MONITOR: "var(--info)",
  RESTRICTED: "var(--warning)",
  CRITICAL: "var(--danger)",
}

export const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: "var(--danger)",
  HIGH: "var(--warning)",
  MEDIUM: "var(--info)",
  LOW: "var(--chart-5)",
}

export const MAINTENANCE_STATUS_COLORS: Record<string, string> = {
  PLANNED: "var(--primary)",
  REQUESTED: "var(--warning)",
  IN_PROGRESS: "var(--info)",
  COMPLETED: "var(--success)",
}

export const AVAILABILITY_COLORS: Record<string, string> = {
  AVAILABLE: "var(--success)",
  RESTRICTED: "var(--warning)",
  UNAVAILABLE: "var(--danger)",
  PARTIAL: "var(--warning)",
}

export const COMPLETION_COLORS: Record<string, string> = {
  COMPLETED: "var(--success)",
  PARTIAL: "var(--warning)",
  CANCELLED: "var(--danger)",
}
