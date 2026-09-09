"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/yentrana/context/yentrana -context"
import {
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Train,
  Wrench,
  Zap,
  Radio,
} from "lucide-react"

export default function ConflictsPage() {
  const { constraints } = useRailMitra()

  const conflictsList = [
    {
      id: "CONF-01",
      type: "HEADWAY_TRAIN_COLLISION",
      title: "Goods Freight CONRAJ-0310 vs Uncoordinated Engineering Request",
      section: "Karjat – Lonavala (UP Ghat)",
      time: "03:10 IST",
      severity: "CRITICAL",
      hardConstraint: true,
      status: "RESOLVED_BY_AI",
      resolution: "Resolved in Plan B-104: Moved maintenance window to 04:15–06:15 post freight clearance.",
    },
    {
      id: "CONF-02",
      type: "MULTI_DEPT_OVERLAP",
      title: "OHE Power Isolation Overlaps Signal Disconnection Memo",
      section: "KM 25/3 Palasdhari Yard",
      time: "02:30 – 03:30 IST",
      severity: "HIGH",
      hardConstraint: true,
      status: "RESOLVED_BY_AI",
      resolution: "Bundled into unified permit-to-work under combined Block B-104.",
    },
    {
      id: "CONF-03",
      type: "GRADIENT_SAFETY_BUFFER",
      title: "15-Min Track Restoration Buffer Prior to Train 12124 Deccan Queen",
      section: "Bhor Ghat Incline",
      time: "06:15 – 07:15 IST",
      severity: "MEDIUM",
      hardConstraint: true,
      status: "MONITORED",
      resolution: "Enforced 60-min safety buffer between block cancellation (06:15) and passenger departure (07:15).",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            टकराव प्रबंधन • Conflict Detection & Resolution Board
          </h1>
          <p className="text-xs text-slate-600">
            Real-time identification of train path clashes, equipment interferences, and gradient safety violations.
          </p>
        </div>

        <Link
          href="/planner"
          className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
        >
          <span>Run AI Optimizer</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Conflicts</span>
          <span className="font-mono text-xl font-black text-amber-600">3 Identified</span>
          <span className="text-[10px] text-slate-500 block">Across 2 active corridors</span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">AI Resolution Rate</span>
          <span className="font-mono text-xl font-black text-emerald-700">100% Feasible</span>
          <span className="text-[10px] text-slate-500 block">All 3 resolved in Plan B-104</span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Binding Hard Constraints</span>
          <span className="font-mono text-xl font-black text-rose-700">2 Inviolable</span>
          <span className="text-[10px] text-slate-500 block">Freight passage & Catch-siding</span>
        </div>
      </div>

      {/* Conflict Cards */}
      <div className="space-y-3">
        {conflictsList.map((c) => (
          <div key={c.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-slate-900">{c.id}</span>
                <span className="rounded bg-rose-100 px-1.5 py-0.2 font-mono text-[10px] font-bold text-rose-800">
                  {c.type}
                </span>
                <span className="text-xs font-bold text-slate-800">• {c.section}</span>
              </div>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-300">
                {c.status}
              </span>
            </div>

            <h3 className="text-xs font-bold text-slate-900 mb-1">{c.title}</h3>
            <p className="text-xs text-slate-500 mb-3">Time slot: {c.time}</p>

            <div className="rounded bg-emerald-50/70 p-2.5 text-xs border border-emerald-200 text-emerald-950 flex items-start gap-2">
              <CheckCircle2 className="size-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">AI Resolution: </span>
                <span>{c.resolution}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
