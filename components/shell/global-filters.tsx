"use client"

import { useMemo } from "react"
import { Funnel, RotateCcw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ALL, useFilters, type GlobalFilters } from "@/lib/filters"
import { useDataset } from "@/lib/data/use-dataset"
import { formatDate } from "@/lib/utils/time"
import { CORRIDOR_SECTIONS } from "@/lib/data/schema"

function uniqueSorted(values: (string | undefined)[]): string[] {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort()
}

interface FieldDef {
  key: keyof GlobalFilters
  label: string
  options: { value: string; label: string }[]
}

export function GlobalFilters({ fields }: { fields?: (keyof GlobalFilters)[] }) {
  const { dataset } = useDataset()
  const { filters, setFilter, reset, activeCount } = useFilters()

  const allFields: FieldDef[] = useMemo(() => {
    const dates = uniqueSorted([
      ...dataset.maintenance_jobs.map((j) => j.requested_date),
      ...dataset.corridor_availability.map((c) => c.date),
    ])
    const workTypes = uniqueSorted(dataset.maintenance_jobs.map((j) => j.work_type))
    return [
      { key: "date", label: "Date", options: dates.map((d) => ({ value: d, label: formatDate(d) })) },
      {
        key: "department",
        label: "Department",
        options: uniqueSorted(dataset.assets.map((a) => a.department)).map((d) => ({ value: d, label: d })),
      },
      { key: "section", label: "Section", options: CORRIDOR_SECTIONS.map((s) => ({ value: s, label: s })) },
      {
        key: "priority",
        label: "Priority",
        options: ["CRITICAL", "HIGH", "MEDIUM", "LOW"].map((p) => ({ value: p, label: p })),
      },
      {
        key: "maintenanceStatus",
        label: "Maint. Status",
        options: ["PLANNED", "REQUESTED", "IN_PROGRESS", "COMPLETED"].map((p) => ({ value: p, label: p.replace("_", " ") })),
      },
      { key: "workType", label: "Work Type", options: workTypes.map((w) => ({ value: w, label: w })) },
      {
        key: "trainDensity",
        label: "Train Density",
        options: ["LOW", "MEDIUM", "HIGH"].map((p) => ({ value: p, label: p })),
      },
      {
        key: "corridorAvailability",
        label: "Corridor",
        options: ["AVAILABLE", "RESTRICTED", "UNAVAILABLE"].map((p) => ({ value: p, label: p })),
      },
    ]
  }, [dataset])

  const visible = fields ? allFields.filter((f) => fields.includes(f.key)) : allFields

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2.5">
      <div className="flex items-center gap-1.5 pl-1 pr-1 text-xs font-medium text-muted-foreground">
        <Funnel className="size-3.5" />
        Filters
        {activeCount > 0 ? (
          <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
            {activeCount}
          </Badge>
        ) : null}
      </div>
      {visible.map((f) => (
        <Select key={f.key} value={filters[f.key]} onValueChange={(v) => setFilter(f.key, v ?? ALL)}>
          <SelectTrigger size="sm" className="h-8 w-[140px] text-xs">
            <span className="text-muted-foreground">{f.label}:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All</SelectItem>
            {f.options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={reset} disabled={activeCount === 0}>
        <RotateCcw className="size-3.5" />
        Reset
      </Button>
    </div>
  )
}
