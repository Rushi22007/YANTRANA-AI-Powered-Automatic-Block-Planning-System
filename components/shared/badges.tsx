import { cn } from "@/lib/utils"

const base =
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium tracking-wide whitespace-nowrap border"

const tones = {
  danger: "bg-danger/12 text-danger border-danger/25",
  warning: "bg-warning/15 text-warning-foreground/90 border-warning/30 dark:text-warning",
  success: "bg-success/12 text-success border-success/25",
  info: "bg-info/12 text-info border-info/25",
  neutral: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary/10 text-primary border-primary/25",
} as const

type Tone = keyof typeof tones

function Pill({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return <span className={cn(base, tones[tone], className)}>{children}</span>
}

const priorityTone: Record<string, Tone> = {
  CRITICAL: "danger",
  HIGH: "warning",
  MEDIUM: "info",
  LOW: "neutral",
}

export function PriorityBadge({ value }: { value: string }) {
  const key = (value || "").toUpperCase()
  return <Pill tone={priorityTone[key] ?? "neutral"}>{key || "—"}</Pill>
}

const maintenanceTone: Record<string, Tone> = {
  COMPLETED: "success",
  IN_PROGRESS: "info",
  PLANNED: "primary",
  REQUESTED: "warning",
}

export function MaintenanceStatusBadge({ value }: { value: string }) {
  const key = (value || "").toUpperCase()
  return <Pill tone={maintenanceTone[key] ?? "neutral"}>{key.replace("_", " ") || "—"}</Pill>
}

const requestTone: Record<string, Tone> = {
  APPROVED: "success",
  REVIEW: "info",
  SUBMITTED: "primary",
  REJECTED: "danger",
}

export function RequestStatusBadge({ value }: { value: string }) {
  const key = (value || "").toUpperCase()
  return <Pill tone={requestTone[key] ?? "neutral"}>{key || "—"}</Pill>
}

const availabilityTone: Record<string, Tone> = {
  AVAILABLE: "success",
  RESTRICTED: "warning",
  UNAVAILABLE: "danger",
  PARTIAL: "warning",
}

export function AvailabilityBadge({ value }: { value: string }) {
  const key = (value || "").toUpperCase()
  return <Pill tone={availabilityTone[key] ?? "neutral"}>{key || "—"}</Pill>
}

const operationalTone: Record<string, Tone> = {
  SERVICEABLE: "success",
  MONITOR: "info",
  RESTRICTED: "warning",
  CRITICAL: "danger",
}

export function OperationalStatusBadge({ value }: { value: string }) {
  const key = (value || "").toUpperCase()
  return <Pill tone={operationalTone[key] ?? "neutral"}>{key || "—"}</Pill>
}

const riskTone: Record<string, Tone> = {
  CRITICAL: "danger",
  HIGH: "warning",
  MEDIUM: "info",
  LOW: "success",
}

export function RiskBadge({ level }: { level: string }) {
  const key = (level || "").toUpperCase()
  return <Pill tone={riskTone[key] ?? "neutral"}>{key} RISK</Pill>
}

export function SeverityBadge({ value }: { value: string }) {
  const key = (value || "").toUpperCase()
  return <Pill tone={riskTone[key] ?? "neutral"}>{key}</Pill>
}

const densityTone: Record<string, Tone> = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "danger",
}

export function DensityBadge({ value }: { value: string }) {
  const key = (value || "").toUpperCase()
  return <Pill tone={densityTone[key] ?? "neutral"}>{key || "—"}</Pill>
}

export function BoolBadge({ value }: { value: string }) {
  const truthy = (value || "").toUpperCase() === "TRUE"
  return <Pill tone={truthy ? "success" : "neutral"}>{truthy ? "YES" : "NO"}</Pill>
}

export function SyntheticBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border border-warning/30 bg-warning/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning-foreground/90 dark:text-warning",
        className,
      )}
    >
      Synthetic Data
    </span>
  )
}
