"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Wrench,
  AlertOctagon,
  Calendar,
  Activity,
  AlertTriangle,
  Cpu,
  TrendingUp,
  TrendingDown,
  Layers,
  ZoomIn,
  ZoomOut,
  Sparkles,
  ArrowRight,
  CheckSquare,
  Clock,
  ExternalLink,
} from "lucide-react"
import { useRailMitra } from "@/lib/yentrana/context/yentrana-context"
import { MOCK_MAINTENANCE_NEEDS } from "@/lib/yentrana/data/mock-data"
import type { Priority } from "@/lib/yentrana/types"

export function RailMitraDashboard() {
  const { optimizedPlan, formattedLiveTime, t } = useRailMitra()

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>("ALL")
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>("ALL")
  const [activeTaskKey, setActiveTaskKey] = useState<string>("ENG-1042")
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false)
  const [generationStep, setGenerationStep] = useState<string>("")

  // Filter tasks for the summary table
  const filteredTasks = MOCK_MAINTENANCE_NEEDS.filter((t) => {
    if (selectedDeptFilter !== "ALL" && t.department !== selectedDeptFilter) return false
    if (selectedPriorityFilter !== "ALL" && t.priority !== selectedPriorityFilter) return false
    return true
  })

  const handleGenerateAIPlan = () => {
    setIsGeneratingPlan(true)
    const steps = [
      "Analyzing maintenance needs across 3 departments...",
      "Checking train movements & goods rake forecasts...",
      "Applying Bhor Ghat corridor safety constraints...",
      "Finding compatible tasks (Eng + TRD + S&T)...",
      "Optimizing block windows with CP-SAT...",
      "Plan B-104 optimized! Ready for Human Approval.",
    ]
    let idx = 0
    setGenerationStep(steps[0])
    const interval = setInterval(() => {
      idx++
      if (idx < steps.length) {
        setGenerationStep(steps[idx])
      } else {
        clearInterval(interval)
        setIsGeneratingPlan(false)
      }
    }, 600)
  }

  return (
    <div className="flex flex-col gap-3 text-slate-800">

      {/* Simulation Banner Notice */}
      <div className="flex items-center justify-between rounded bg-amber-50 px-3 py-1.5 border border-amber-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-bold text-amber-900">{t("simNotice", "SIMULATED / DEMO DATA ONLY")}</span>
          <span className="text-amber-700 hidden sm:inline">• {t("simCorridor", "Central Railway • Pune Division • Karjat–Lonavala Corridor")}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span suppressHydrationWarning className="text-slate-700 font-mono font-bold flex items-center gap-1.5 bg-white/90 px-2 py-0.5 rounded border border-amber-300">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span suppressHydrationWarning>{formattedLiveTime}</span>
          </span>
          <Link href="/planner" className="font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
            {t("goToPlanner", "Go to Planner")} <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* ── Top 6 KPI Cards matching Reference 1 ── */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">

        {/* Card 1: Total Maintenance Tasks */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-700">{t("totalTasks", "Total Maintenance Tasks")}</p>
              <p className="text-[10px] text-slate-500 font-medium">Total Maintenance Tasks</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <Wrench className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 tracking-tight">248</p>
            <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
              <TrendingUp className="size-3" />
              <span>12 {t("thisWeek", "this week")}</span>
            </p>
          </div>
        </div>

        {/* Card 2: Critical Tasks */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-rose-700">{t("criticalTasks", "Critical Tasks")}</p>
              <p className="text-[10px] text-slate-500 font-medium">Critical Tasks</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <AlertOctagon className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-rose-700 tracking-tight">12</p>
            <p className="flex items-center gap-1 text-[10px] font-bold text-rose-600">
              <TrendingUp className="size-3" />
              <span>3 {t("urgent", "urgent")}</span>
            </p>
          </div>
        </div>

        {/* Card 3: Available Blocks */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-emerald-700">{t("availableBlocks", "Available Blocks")}</p>
              <p className="text-[10px] text-slate-500 font-medium">Available Blocks</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Calendar className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 tracking-tight">18</p>
            <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
              <TrendingUp className="size-3" />
              <span>4 {t("thisWeek", "this week")}</span>
            </p>
          </div>
        </div>

        {/* Card 4: Asset Availability */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-purple-700">{t("assetAvailability", "Asset Availability")}</p>
              <p className="text-[10px] text-slate-500 font-medium">Asset Availability</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-purple-50 text-purple-700">
              <Activity className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 tracking-tight">94.6%</p>
            <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
              <TrendingUp className="size-3" />
              <span>↑ 2.1%</span>
              <span className="font-normal text-slate-400">{t("vsBenchmark", "vs benchmark")}</span>
            </p>
          </div>
        </div>

        {/* Card 5: Conflicts Detected */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-amber-700">{t("conflictsDetected", "Conflicts Detected")}</p>
              <p className="text-[10px] text-slate-500 font-medium">Conflicts Detected</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <AlertTriangle className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-amber-600 tracking-tight">7</p>
            <p className="text-[10px] font-bold text-amber-700">
              {t("needsAttention", "Needs Attention")}
            </p>
          </div>
        </div>

        {/* Card 6: AI Optimization Score */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-teal-700">{t("aiScore", "AI Optimization Score")}</p>
              <p className="text-[10px] text-slate-500 font-medium">AI Optimization Score</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Cpu className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-teal-700 tracking-tight">92<span className="text-sm font-normal text-slate-500">/100</span></p>
            <p className="text-[10px] font-bold text-teal-700">
              {t("excellent", "Excellent")}
            </p>
          </div>
        </div>
      </div>

      {/* ── Mid-Top: Corridor Overview Map + Maintenance Tasks Summary ── */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">

        {/* Left: Corridor Overview Map (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-3 py-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900">{t("corridorMapTitle", "Corridor Overview Map")}</h3>
              <p className="text-[10px] text-slate-500">Mumbai – Pune Corridor</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-slate-400">Corridor:</span>
              <span className="font-bold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                Mumbai - Pune
              </span>
            </div>
          </div>

          {/* Interactive Route Canvas/SVG visualization */}
          <div className="relative h-64 sm:h-72 w-full bg-[#1E293B] overflow-hidden p-3 flex flex-col justify-between">
            {/* Background Terrain Simulation */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Top map controls */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="rounded bg-slate-900/90 px-2 py-1 text-[10px] font-mono text-slate-300 border border-slate-700">
                Central Railway • Pune Division (UP Line)
              </div>
              <div className="flex items-center gap-1">
                <button className="flex size-6 items-center justify-center rounded bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold">
                  +
                </button>
                <button className="flex size-6 items-center justify-center rounded bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold">
                  -
                </button>
              </div>
            </div>

            {/* Railway Route Line from Mumbai CST to Pune Jn */}
            <div className="relative z-10 my-auto">
              <svg viewBox="0 0 500 120" className="w-full h-auto">
                {/* Track Line */}
                <path
                  d="M 30 25 Q 120 40 210 65 T 330 85 T 470 95"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 30 25 Q 120 40 210 65 T 330 85 T 470 95"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />

                {/* Highlighted Ghat Section (Karjat to Lonavala) */}
                <path
                  d="M 210 65 Q 270 78 330 85"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="7"
                  strokeLinecap="round"
                />

                {/* Station Nodes */}
                {[
                  { x: 30, y: 25, name: "Mumbai CST", code: "CSMT", marker: "circle" },
                  { x: 95, y: 35, name: "Thane", code: "TNA", marker: "circle" },
                  { x: 150, y: 48, name: "Kalyan", code: "KYN", marker: "circle" },
                  { x: 210, y: 65, name: "Karjat", code: "KJT", marker: "critical" },
                  { x: 270, y: 78, name: "Khandala", code: "KND", marker: "high" },
                  { x: 330, y: 85, name: "Lonavala", code: "LNL", marker: "med" },
                  { x: 470, y: 95, name: "Pune Jn.", code: "PUNE", marker: "circle" },
                ].map((st, i) => (
                  <g key={i}>
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={st.marker === "critical" ? 7 : 5}
                      fill={
                        st.marker === "critical"
                          ? "#EF4444"
                          : st.marker === "high"
                            ? "#F97316"
                            : st.marker === "med"
                              ? "#EAB308"
                              : "#FFFFFF"
                      }
                      stroke="#0F172A"
                      strokeWidth="2"
                    />
                    {st.marker === "critical" && (
                      <circle
                        cx={st.x}
                        cy={st.y}
                        r="12"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        className="animate-ping"
                      />
                    )}
                    <text
                      x={st.x}
                      y={st.y - 10}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {st.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Map Legend */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5 rounded bg-slate-900/90 p-2 text-[9px] text-slate-300 border border-slate-700">
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-rose-500" />
                <span>Critical Maint (KM 24)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-orange-500" />
                <span>High (OHE KM 25)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-400" />
                <span>Medium (Signal)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span>Available Block</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Maintenance Tasks Summary Table (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/70 px-3 py-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900">{t("maintSummaryTitle", "Maintenance Tasks Summary")}</h3>
              <p className="text-[10px] text-slate-500">Cross-Department Real-Time Requisitions</p>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-1 text-[11px]">
              {["ALL", "ENGINEERING", "TRD", "SNT"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDeptFilter(dept)}
                  className={`rounded px-2 py-0.5 font-bold transition-colors ${selectedDeptFilter === dept
                    ? "bg-blue-700 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                >
                  {dept === "ALL" ? "सभी / All" : dept}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="border-b border-slate-200 bg-slate-100/70 text-slate-600 font-bold">
                <tr>
                  <th className="py-2 px-2.5">कार्य ID / Task</th>
                  <th className="py-2 px-2">विभाग / Dept</th>
                  <th className="py-2 px-2">स्थान / Location</th>
                  <th className="py-2 px-2">संपत्ति / Asset</th>
                  <th className="py-2 px-2">प्राथमिकता / Priority</th>
                  <th className="py-2 px-2">अवधि पार / Overdue</th>
                  <th className="py-2 px-2">अवधि / Duration</th>
                  <th className="py-2 px-2 text-center">स्रोत / Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredTasks.map((task) => {
                  const isSelected = activeTaskKey === task.taskId
                  const priorityColor =
                    task.priority === "CRITICAL"
                      ? "bg-rose-100 text-rose-800 border-rose-300"
                      : task.priority === "HIGH"
                        ? "bg-orange-100 text-orange-800 border-orange-300"
                        : task.priority === "MEDIUM"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-emerald-100 text-emerald-800 border-emerald-300"

                  return (
                    <tr
                      key={task.taskId}
                      onClick={() => setActiveTaskKey(task.taskId)}
                      className={`cursor-pointer transition-colors hover:bg-blue-50/50 ${isSelected ? "bg-blue-50 font-bold" : ""
                        }`}
                    >
                      <td className="py-2 px-2.5 font-mono font-bold text-blue-900">{task.taskId}</td>
                      <td className="py-2 px-2">
                        {task.department === "ENGINEERING" && "इंजीनियरिंग / Engineering"}
                        {task.department === "TRD" && "ट्रैक्शन (TRD)"}
                        {task.department === "SNT" && "सिग्नल & टेलीकॉम (S&T)"}
                      </td>
                      <td className="py-2 px-2 text-slate-700">{task.location}</td>
                      <td className="py-2 px-2 text-slate-600">{task.assetType}</td>
                      <td className="py-2 px-2">
                        <span className={`inline-block rounded px-1.5 py-0.2 text-[10px] font-bold border ${priorityColor}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-2 px-2 font-mono text-rose-700 font-bold">
                        {task.overdueDays} दिन <span className="font-normal text-slate-400">/ {task.overdueDays}d</span>
                      </td>
                      <td className="py-2 px-2 text-slate-700">{task.durationMinutes} मिनट</td>
                      <td className="py-2 px-2 text-center">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-700 border border-slate-300">
                          {task.source}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] text-slate-500 flex justify-between items-center">
            <span>Showing {filteredTasks.length} simulated maintenance requirements</span>
            <Link href="/maintenance" className="font-bold text-blue-700 hover:underline">
              View Complete Pipeline →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mid-Bottom: 4 Quad Cards matching Reference 1 ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

        {/* Quad 1: AI Priority Engine */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900">AI प्राथमिकता इंजन</h4>
                <p className="text-[10px] text-slate-500">AI Priority Engine</p>
              </div>
              <span className="font-mono text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                {activeTaskKey}
              </span>
            </div>

            {/* Circular Score Gauge */}
            <div className="my-3 flex items-center gap-3">
              <div className="relative flex size-18 shrink-0 items-center justify-center rounded-full border-4 border-rose-500 bg-rose-50/50">
                <span className="text-xl font-black text-rose-700">92</span>
                <span className="text-[9px] text-slate-500 font-bold">/100</span>
              </div>
              <div>
                <p className="text-xs font-black text-rose-700">बहुत उच्च प्राथमिकता</p>
                <p className="text-[10px] font-bold text-slate-600">Very High Priority</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Critical Track Structural Risk</p>
              </div>
            </div>

            {/* Factor breakdown table */}
            <div className="space-y-1 text-[10px] border-t border-slate-100 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-600">गंभीरता (Criticality):</span>
                <span className="font-bold font-mono text-slate-800">35 / 35</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">अवधि पार (Overdue Period):</span>
                <span className="font-bold font-mono text-slate-800">22 / 25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">संपत्ति प्रभाव (Asset Impact):</span>
                <span className="font-bold font-mono text-slate-800">18 / 20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">ट्रैफिक प्रभाव (Traffic Impact):</span>
                <span className="font-bold font-mono text-slate-800">9 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">विभाग समन्वय (Dept Coordination):</span>
                <span className="font-bold font-mono text-slate-800">8 / 10</span>
              </div>
            </div>
          </div>

          {/* AI Recommendation Box */}
          <div className="mt-3 rounded bg-blue-50/80 p-2 border border-blue-200 text-[10px]">
            <p className="font-bold text-blue-900 flex items-center gap-1">
              <Sparkles className="size-3 text-blue-700" />
              AI अनुशंसा / Recommendation:
            </p>
            <p className="text-slate-700 mt-0.5 leading-snug">
              Schedule in next available block. High impact on safety & operations. Combine with OHE inspection.
            </p>
          </div>
        </div>

        {/* Quad 2: AI Block Planner (Weekly) */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t("aiPlanner", "AI Block Planner")} (Weekly)</h4>
                <p className="text-[10px] text-slate-500">CP-SAT Multi-Objective Optimizer</p>
              </div>
              <span className="rounded bg-purple-50 px-1.5 py-0.5 text-[9px] font-bold text-purple-700 border border-purple-200">
                CP-SAT
              </span>
            </div>

            <div className="mt-2 space-y-2 text-[11px]">
              <div>
                <label className="text-[10px] text-slate-500 font-semibold">योजना अवधि / Period:</label>
                <div className="mt-0.5 rounded border border-slate-300 bg-slate-50 px-2 py-1 font-bold text-slate-800">
                  साप्ताहिक / Weekly (07 May – 13 May 2026)
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-semibold">कॉरिडोर / Corridor:</label>
                <div className="mt-0.5 rounded border border-slate-300 bg-slate-50 px-2 py-1 font-bold text-slate-800">
                  Mumbai – Pune (Bhor Ghat)
                </div>
              </div>

              {/* Goals checkboxes */}
              <div className="pt-1 space-y-1 text-[10px]">
                <p className="font-bold text-slate-700">अनुशंसा/Goals:</p>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckSquare className="size-3 text-blue-600" />
                  <span>Maximize Asset Availability</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckSquare className="size-3 text-blue-600" />
                  <span>Reduce Train Disruption</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckSquare className="size-3 text-blue-600" />
                  <span>Combine Department Tasks</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckSquare className="size-3 text-blue-600" />
                  <span>Prioritize Critical Defects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-3">
            {isGeneratingPlan ? (
              <div className="rounded bg-blue-50 p-2 text-center text-[10px] font-bold text-blue-800 border border-blue-300 animate-pulse">
                {generationStep}
              </div>
            ) : (
              <button
                onClick={handleGenerateAIPlan}
                className="w-full flex items-center justify-center gap-1.5 rounded bg-blue-700 py-2 px-3 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
              >
                <span>+ AI योजना बनाएं</span>
                <span className="font-normal opacity-80">/ Generate AI Plan</span>
              </button>
            )}
          </div>
        </div>

        {/* Quad 3: Plan Comparison (AI Impact) */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Plan Comparison (AI Impact)</h4>
                <p className="text-[10px] text-slate-500">Benchmark vs Optimized</p>
              </div>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                Score: 92/100
              </span>
            </div>

            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-1">मापदंड / Parameter</th>
                    <th className="py-1 text-center">AI से पहले</th>
                    <th className="py-1 text-center font-bold text-blue-900">AI के बाद</th>
                    <th className="py-1 text-right">परिवर्तन</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-1.5 text-slate-700">Block Utilization</td>
                    <td className="py-1.5 text-center text-slate-500">62%</td>
                    <td className="py-1.5 text-center font-bold text-emerald-700">89%</td>
                    <td className="py-1.5 text-right font-bold text-emerald-700">↑ 27%</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-700">Dept Coordination</td>
                    <td className="py-1.5 text-center text-slate-500">48%</td>
                    <td className="py-1.5 text-center font-bold text-emerald-700">91%</td>
                    <td className="py-1.5 text-right font-bold text-emerald-700">↑ 43%</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-700">Asset Availability</td>
                    <td className="py-1.5 text-center text-slate-500">87%</td>
                    <td className="py-1.5 text-center font-bold text-emerald-700">95%</td>
                    <td className="py-1.5 text-right font-bold text-emerald-700">↑ 8%</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-700">Train Disruption (min)</td>
                    <td className="py-1.5 text-center text-slate-500">230</td>
                    <td className="py-1.5 text-center font-bold text-blue-800">98</td>
                    <td className="py-1.5 text-right font-bold text-blue-700">↓ 132</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-700">Conflicts</td>
                    <td className="py-1.5 text-center text-rose-500">14</td>
                    <td className="py-1.5 text-center font-bold text-emerald-700">3</td>
                    <td className="py-1.5 text-right font-bold text-emerald-700">↓ 11</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 rounded bg-slate-50 p-2 border border-slate-200 flex items-center justify-between text-[10px]">
            <span className="font-bold text-slate-700">कुल अनुकूलन स्कोर:</span>
            <span className="font-mono font-bold text-emerald-700 text-xs">92/100 (उत्कृष्ट / Excellent)</span>
          </div>
        </div>

        {/* Quad 4: Upcoming Available Blocks */}
        <div className="flex flex-col justify-between rounded border border-slate-200 bg-white p-3 shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t("upcomingBlocksTitle", "Upcoming Available Blocks")}</h4>
                <p className="text-[10px] text-slate-500">Corridor Window Allocations</p>
              </div>
              <Clock className="size-3.5 text-slate-400" />
            </div>

            <div className="mt-2 space-y-2 text-[11px]">
              <div className="rounded border border-slate-200 bg-slate-50/70 p-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-900">07 May 2026</span>
                  <span className="font-mono text-[10px] text-slate-500 font-bold">120 मिनट</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">मुंबई - लोनावला (Mumbai - Lonavala)</p>
                <p className="text-[10px] text-emerald-700 font-bold">Window: 04:15 – 06:15 (Combined Block B-104)</p>
              </div>

              <div className="rounded border border-slate-200 bg-slate-50/70 p-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">07 May 2026</span>
                  <span className="font-mono text-[10px] text-slate-500 font-bold">120 मिनट</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">03:30 – 05:30 • UP Line</p>
                <p className="text-[10px] text-slate-500">Corridor reservation open</p>
              </div>

              <div className="rounded border border-slate-200 bg-slate-50/70 p-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">08 May 2026</span>
                  <span className="font-mono text-[10px] text-slate-500 font-bold">120 मिनट</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">कर्जत - कल्याण (Karjat - Kalyan)</p>
                <p className="text-[10px] text-slate-500">Suburban off-peak maintenance window</p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-right">
            <Link
              href="/weekly-plan"
              className="text-[11px] font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              सभी ब्लॉक देखें / View All Blocks <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom: Block Schedule (Gantt View) matching Reference 1 ── */}
      <div className="rounded border border-slate-200 bg-white p-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900">ब्लॉक शेड्यूल (गैंट दृश्य)</h3>
            <p className="text-[10px] text-slate-500">Block Schedule (Gantt View) • 7-Day Horizon</p>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="text-slate-400">कॉरिडोर:</span>
              <span className="font-bold text-slate-800">मुंबई - पुणे</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">विभाग:</span>
              <span className="font-bold text-slate-800">सभी / All</span>
            </div>
          </div>
        </div>

        {/* Gantt Timeline Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Days header */}
            <div className="grid grid-cols-7 border-b border-slate-300 text-center text-[10px] font-bold text-slate-700 pb-1">
              <div>07 May 2026 (Wed)</div>
              <div>08 May 2026 (Thu)</div>
              <div>09 May 2026 (Fri)</div>
              <div>10 May 2026 (Sat)</div>
              <div>11 May 2026 (Sun)</div>
              <div>12 May 2026 (Mon)</div>
              <div>13 May 2026 (Tue)</div>
            </div>

            {/* Sub-hours 00:00 / 12:00 markers */}
            <div className="grid grid-cols-14 border-b border-slate-200 text-center text-[8px] text-slate-400 py-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <React.Fragment key={i}>
                  <div>00:00</div>
                  <div>12:00</div>
                </React.Fragment>
              ))}
            </div>

            {/* Gantt Bars matching Reference 1 layout */}
            <div className="space-y-1.5 py-3 text-[9px] font-bold text-white">
              {/* Row 1: Engineering & Combined */}
              <div className="relative h-6 w-full rounded bg-slate-100 border border-slate-200 flex items-center">
                <div className="absolute left-[3%] w-[10%] h-4.5 rounded bg-[#0284c7] flex items-center justify-center shadow-xs">
                  इंजीनियरिंग
                </div>
                <div className="absolute left-[45%] w-[18%] h-4.5 rounded bg-[#9333ea] flex items-center justify-center shadow-xs">
                  सभी विभाग संयुक्त / All Dept Combined
                </div>
                <div className="absolute left-[80%] w-[8%] h-4.5 rounded bg-[#0284c7] flex items-center justify-center shadow-xs">
                  Engineering
                </div>
              </div>

              {/* Row 2: TRD Maintenance */}
              <div className="relative h-6 w-full rounded bg-slate-100 border border-slate-200 flex items-center">
                <div className="absolute left-[15%] w-[12%] h-4.5 rounded bg-[#ea580c] flex items-center justify-center shadow-xs">
                  TRD रखरखाव
                </div>
                <div className="absolute left-[72%] w-[10%] h-4.5 rounded bg-[#ea580c] flex items-center justify-center shadow-xs">
                  TRD रखरखाव
                </div>
              </div>

              {/* Row 3: ENG + TRD and S&T */}
              <div className="relative h-6 w-full rounded bg-slate-100 border border-slate-200 flex items-center">
                <div className="absolute left-[34%] w-[10%] h-4.5 rounded bg-[#6366f1] flex items-center justify-center shadow-xs">
                  ENG + TRD
                </div>
                <div className="absolute left-[54%] w-[11%] h-4.5 rounded bg-[#16a34a] flex items-center justify-center shadow-xs">
                  सिग्नल & टेलीकॉम
                </div>
                <div className="absolute left-[89%] w-[9%] h-4.5 rounded bg-[#16a34a] flex items-center justify-center shadow-xs">
                  सिग्नल & टेलीकॉम
                </div>
              </div>

              {/* Row 4: Maintenance Window reservation */}
              <div className="relative h-6 w-full rounded bg-slate-100 border border-slate-200 flex items-center">
                <div className="absolute left-[62%] w-[10%] h-4 rounded bg-[#38bdf8] text-slate-900 flex items-center justify-center shadow-xs text-[8px]">
                  रखरखाव विंडो
                </div>
                <div className="absolute left-[79%] w-[8%] h-4 rounded bg-[#38bdf8] text-slate-900 flex items-center justify-center shadow-xs text-[8px]">
                  Available Block
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const YentranaDashboard = RailMitraDashboard
