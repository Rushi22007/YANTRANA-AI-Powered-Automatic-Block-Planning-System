import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  label: string
  hindi?: string
  value: string | number | null | undefined
  suffix?: string
  icon: LucideIcon
  hint?: string
  tone?: "primary" | "success" | "warning" | "danger" | "info"
}

const toneRing: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning-foreground/90 dark:text-warning bg-warning/12",
  danger: "text-danger bg-danger/10",
  info: "text-info bg-info/10",
}

export function KpiCard({ label, hindi, value, suffix = "", icon: Icon, hint, tone = "primary" }: KpiCardProps) {
  const missing = value === null || value === undefined || (typeof value === "number" && Number.isNaN(value))
  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground leading-tight">{label}</p>
          {hindi ? <p className="text-[11px] text-muted-foreground/70 leading-tight">{hindi}</p> : null}
        </div>
        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-md", toneRing[tone])}>
          <Icon className="size-4" />
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        {missing ? (
          <span className="text-sm italic text-muted-foreground/70">Data unavailable</span>
        ) : (
          <>
            <span className="font-mono text-2xl font-semibold tabular-nums tracking-tight">{value}</span>
            {suffix ? <span className="text-sm font-medium text-muted-foreground">{suffix}</span> : null}
          </>
        )}
      </div>
      {hint ? <p className="text-[11px] text-muted-foreground leading-snug">{hint}</p> : null}
    </Card>
  )
}
