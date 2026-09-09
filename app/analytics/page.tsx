"use client"

import React from "react"
import Link from "next/link"
import { BarChart3, TrendingUp, TrendingDown, ArrowRight, Activity, Calendar, Wrench, Clock, ShieldCheck } from "lucide-react"

export default function AnalyticsPage() {
  const kpiMetrics = [
    { label: "Asset Availability", value: "94.6%", change: "+2.1%", positive: true, hint: "Fraction of track & OHE serviceable" },
    { label: "Block Utilization", value: "89.2%", change: "+27.2%", positive: true, hint: "Actual maintenance time vs block grant duration" },
    { label: "Maintenance Completion", value: "96.4%", change: "+14.0%", positive: true, hint: "Jobs concluded within allocated window" },
    { label: "Conflict Rate", value: "1.2%", change: "-11.8%", positive: true, hint: "Train path clashes per 100 block hours" },
    { label: "Train Delay Impact", value: "98 min/day", change: "-132 min", positive: true, hint: "Aggregate passenger train delay attributable to blocks" },
    { label: "Combined Block Ratio", value: "43.5%", change: "+31.5%", positive: true, hint: "Blocks bundling 2 or more departments" },
    { label: "Planned vs Actual Duration", value: "103.4%", change: "-12.0%", positive: true, hint: "Execution adherence variance" },
    { label: "Overdue Critical Tasks", value: "12 Tasks", change: "-8 Tasks", positive: true, hint: "Reduced via AI priority ranking" },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            रिपोर्ट और विश्लेषण • Operational Analytics & Performance Metrics
          </h1>
          <p className="text-xs text-slate-600">
            High-level performance indicators tracking asset health, line capacity utilization, and punctuality stability.
          </p>
        </div>

        <span className="rounded bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-900 border border-blue-200">
          Monthly Review • Pune Division
        </span>
      </div>

      {/* 8 Core KPIs Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpiMetrics.map((kpi, idx) => (
          <div key={idx} className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                {kpi.label}
              </span>
              <p className="text-xl font-black text-slate-900 tracking-tight mt-1 font-mono">
                {kpi.value}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className={`font-bold flex items-center gap-0.5 ${kpi.positive ? "text-emerald-700" : "text-rose-700"}`}>
                {kpi.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {kpi.change}
              </span>
              <span className="text-slate-400 truncate max-w-[110px]" title={kpi.hint}>
                {kpi.hint}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Breakdown Panels */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Department Bundling Analysis */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-3">
            Multi-Department Block Bundling Efficiency
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span className="text-slate-700">Triple Bundled (Engineering + TRD + S&T):</span>
                <span className="font-mono font-bold text-purple-900">38% (High Efficiency)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div style={{ width: "38%" }} className="h-full bg-purple-600 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span className="text-slate-700">Dual Bundled (Engineering + TRD or S&T):</span>
                <span className="font-mono font-bold text-blue-900">42% (Standard Coordinated)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div style={{ width: "42%" }} className="h-full bg-blue-600 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span className="text-slate-700">Single Department (Isolated Block):</span>
                <span className="font-mono font-bold text-amber-900">20% (Target: &lt;15%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div style={{ width: "20%" }} className="h-full bg-amber-500 rounded-full" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-slate-500 leading-snug">
            Bundling 2 or more departments into a single block window eliminates duplicate safety clearance procedures and saves an average of <strong>42 minutes</strong> of line occupancy per block.
          </p>
        </div>

        {/* Train Disruption Minimization Impact */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-3">
            Train Disruption Reduction (Before vs After AI)
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-700 font-medium">Passenger Express Punctuality Impact:</span>
              <span className="font-bold text-emerald-700 font-mono">Reduced by 68%</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-700 font-medium">Freight Average Stalling Duration:</span>
              <span className="font-bold text-emerald-700 font-mono">Reduced from 54m to 14m</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-700 font-medium">Bhor Ghat Banking Locomotive Efficiency:</span>
              <span className="font-bold text-blue-900 font-mono">+34% Turnaround</span>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-slate-500 leading-snug">
            By avoiding freight convoy bottlenecks at 03:10 and scheduling combined blocks in the 04:15–06:15 night slot, operational conflicts with morning commuter trains are reduced to zero.
          </p>
        </div>
      </div>
    </div>
  )
}
