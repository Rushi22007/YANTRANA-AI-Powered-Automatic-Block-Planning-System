"use client"

import { useMemo } from "react"
import { LayoutDashboard, Wrench, TriangleAlert, CalendarClock, HeartPulse, GitBranch, Cpu } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { DataSourceNote } from "@/components/shared/data-source-note"
import { GlobalFilters } from "@/components/shell/global-filters"
import { KpiCard } from "@/components/shared/kpi-card"
import { SectionCard } from "@/components/shared/section-card"
import { CategoryBar, SimpleDonut } from "@/components/charts/charts"
import { AiRecommendation } from "./ai-recommendation"
import { OptimizationCard } from "./optimization-card"
import { UpcomingWindows } from "./upcoming-windows"
import { useDataset } from "@/lib/data/use-dataset"
import { useFilters } from "@/lib/filters"
import { filterJobs, filterAssets, filterCorridor } from "@/lib/apply-filters"
import { calculateAssetAvailability, findAvailableWindows, isHighPriority, countByField, assetStatusBreakdown } from "@/lib/calculations"
import { calculateAIOptimizationScore } from "@/lib/scoring"
import { detectAllConflicts, summarizeConflicts } from "@/lib/conflict"
import { PRIORITY_COLORS, MAINTENANCE_STATUS_COLORS, OPERATIONAL_COLORS } from "@/components/shared/colors"

export function DashboardView() {
  const { dataset } = useDataset()
  const { filters } = useFilters()

  const model = useMemo(() => {
    const jobs = filterJobs(dataset.maintenance_jobs, filters)
    const assets = filterAssets(dataset.assets, filters)
    const corridor = filterCorridor(dataset.corridor_availability, filters)

    const conflicts = detectAllConflicts(dataset)
    const conflictSummary = summarizeConflicts(conflicts)
    const optimization = calculateAIOptimizationScore(dataset)

    const byStatus = countByField(jobs, "maintenance_status")
    const byDept = countByField(jobs, "department")
    const byPriority = countByField(jobs, "priority")
    const assetStatus = assetStatusBreakdown(assets)

    return {
      jobs,
      assets,
      corridor,
      conflicts,
      conflictSummary,
      optimization,
      kpis: {
        totalJobs: jobs.length,
        criticalJobs: jobs.filter((j) => isHighPriority(j.priority)).length,
        availableWindows: findAvailableWindows(corridor).length,
        assetAvailability: calculateAssetAvailability(assets),
        conflicts: conflictSummary.pending + conflictSummary.resolved,
        optimizationScore: optimization.score,
      },
      charts: {
        status: ["PLANNED", "REQUESTED", "IN_PROGRESS", "COMPLETED"].map((s) => ({ name: s.replace("_", " "), value: byStatus[s] ?? 0 })),
        statusRaw: byStatus,
        dept: Object.entries(byDept).map(([name, value]) => ({ name, value })),
        priority: ["CRITICAL", "HIGH", "MEDIUM", "LOW"].map((p) => ({ name: p, value: byPriority[p] ?? 0 })),
        assetStatus: (Object.entries(assetStatus) as [string, number][]).map(([name, value]) => ({ name, value })),
      },
    }
  }, [dataset, filters])

  const statusColorByLabel: Record<string, string> = {
    "PLANNED": MAINTENANCE_STATUS_COLORS.PLANNED,
    "REQUESTED": MAINTENANCE_STATUS_COLORS.REQUESTED,
    "IN PROGRESS": MAINTENANCE_STATUS_COLORS.IN_PROGRESS,
    "COMPLETED": MAINTENANCE_STATUS_COLORS.COMPLETED,
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        icon={LayoutDashboard}
        title="Executive Dashboard"
        hindi="कार्यकारी डैशबोर्ड"
        description="Dataset-derived overview of maintenance demand, asset availability, corridor windows and AI-assisted planning signals."
      />
      <DataSourceNote />
      <GlobalFilters />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Total Maintenance Jobs" hindi="कुल कार्य" value={model.kpis.totalJobs} icon={Wrench} tone="primary" hint="COUNT(maintenance_jobs)" />
        <KpiCard label="Critical / High Priority" hindi="महत्वपूर्ण कार्य" value={model.kpis.criticalJobs} icon={TriangleAlert} tone="danger" hint="priority in (CRITICAL, HIGH)" />
        <KpiCard label="Available Windows" hindi="उपलब्ध विंडो" value={model.kpis.availableWindows} icon={CalendarClock} tone="success" hint="AVAILABLE + maintenance_allowed" />
        <KpiCard label="Asset Availability" hindi="परिसंपत्ति उपलब्धता" value={model.kpis.assetAvailability} suffix="%" icon={HeartPulse} tone="info" hint="serviceable / total assets" />
        <KpiCard label="Conflicts Detected" hindi="टकराव" value={model.kpis.conflicts} icon={GitBranch} tone="warning" hint="across active block requests" />
        <KpiCard label="AI Optimization Score" hindi="अनुकूलन स्कोर" value={model.kpis.optimizationScore} suffix="/100" icon={Cpu} tone="primary" hint="composite prototype score" />
      </div>

      {/* AI recommendation + optimization */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AiRecommendation dataset={dataset} />
        </div>
        <OptimizationCard optimization={model.optimization} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Jobs by Status" description="filtered maintenance_jobs">
          <CategoryBar data={model.charts.status} colorMap={statusColorByLabel} height={240} />
        </SectionCard>
        <SectionCard title="Jobs by Priority" description="filtered maintenance_jobs">
          <CategoryBar data={model.charts.priority} colorMap={PRIORITY_COLORS} height={240} />
        </SectionCard>
        <SectionCard title="Asset Operational Status" description="filtered assets">
          <SimpleDonut data={model.charts.assetStatus} colorMap={OPERATIONAL_COLORS} height={240} />
        </SectionCard>
      </div>

      {/* Upcoming windows + department mix */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingWindows corridor={model.corridor} />
        </div>
        <SectionCard title="Jobs by Department" description="filtered maintenance_jobs">
          <SimpleDonut data={model.charts.dept} height={240} />
        </SectionCard>
      </div>
    </div>
  )
}
