"use client"

import React, { useState } from "react"
import Link from "next/link"
import { CalendarRange, ArrowRight, Layers, Filter } from "lucide-react"

export default function WeeklyPlanPage() {
  const [corridor, setCorridor] = useState("Mumbai – Pune (Karjat–Lonavala)")
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            साप्ताहिक ब्लॉक शेड्यूल • Weekly Block Schedule (Gantt Horizon)
          </h1>
          <p className="text-xs text-slate-600">
            Coordinated 7-day corridor maintenance rolling block schedule with multi-department bundling and train constraints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/monthly-plan"
            className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <span>View Monthly Plan</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Corridor:</span>
          <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {corridor}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
          Horizon: 07 May 2026 to 13 May 2026
        </div>
      </div>

      {/* Gantt Timeline */}
      <div className="rounded-lg border border-slate-300 bg-white shadow-sm overflow-hidden p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[850px] space-y-4">
            
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-300 pb-2 text-center text-xs font-bold text-slate-700">
              {days.map((day, idx) => (
                <div key={day} className="border-r border-slate-200 last:border-r-0">
                  <span className="block text-slate-900">{day}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{idx + 7} May 2026</span>
                </div>
              ))}
            </div>

            {/* Row 1: Engineering */}
            <div className="flex items-center gap-3">
              <div className="w-32 shrink-0 text-xs font-bold text-sky-900">
                Engineering
              </div>
              <div className="relative h-8 flex-1 rounded bg-slate-100 border border-slate-200">
                <div style={{ left: "5%", width: "10%" }} className="absolute top-1 bottom-1 rounded bg-[#0284c7] text-white flex items-center justify-center text-[9px] font-bold">
                  Track Tamping
                </div>
                <div style={{ left: "75%", width: "12%" }} className="absolute top-1 bottom-1 rounded bg-[#0284c7] text-white flex items-center justify-center text-[9px] font-bold">
                  Rail Renewal
                </div>
              </div>
            </div>

            {/* Row 2: TRD */}
            <div className="flex items-center gap-3">
              <div className="w-32 shrink-0 text-xs font-bold text-orange-900">
                TRD (Traction)
              </div>
              <div className="relative h-8 flex-1 rounded bg-slate-100 border border-slate-200">
                <div style={{ left: "18%", width: "12%" }} className="absolute top-1 bottom-1 rounded bg-[#ea580c] text-white flex items-center justify-center text-[9px] font-bold">
                  OHE Inspection
                </div>
                <div style={{ left: "60%", width: "10%" }} className="absolute top-1 bottom-1 rounded bg-[#ea580c] text-white flex items-center justify-center text-[9px] font-bold">
                  Isolator Check
                </div>
              </div>
            </div>

            {/* Row 3: S&T */}
            <div className="flex items-center gap-3">
              <div className="w-32 shrink-0 text-xs font-bold text-emerald-900">
                S&T (Signals)
              </div>
              <div className="relative h-8 flex-1 rounded bg-slate-100 border border-slate-200">
                <div style={{ left: "32%", width: "9%" }} className="absolute top-1 bottom-1 rounded bg-[#16a34a] text-white flex items-center justify-center text-[9px] font-bold">
                  Point Machine
                </div>
                <div style={{ left: "88%", width: "8%" }} className="absolute top-1 bottom-1 rounded bg-[#16a34a] text-white flex items-center justify-center text-[9px] font-bold">
                  Axle Counter
                </div>
              </div>
            </div>

            {/* Row 4: Combined Blocks */}
            <div className="flex items-center gap-3">
              <div className="w-32 shrink-0 text-xs font-bold text-purple-900">
                Combined Blocks
              </div>
              <div className="relative h-9 flex-1 rounded bg-purple-50 border border-purple-200">
                {/* Block B-104 on Day 1 */}
                <div style={{ left: "3%", width: "13%" }} className="absolute top-1 bottom-1 rounded bg-[#9333ea] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  Plan B-104 (Eng+TRD+S&T)
                </div>
                <div style={{ left: "44%", width: "14%" }} className="absolute top-1 bottom-1 rounded bg-[#9333ea] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  Weekend Mega Block
                </div>
              </div>
            </div>

            {/* Row 5: Available Blocks */}
            <div className="flex items-center gap-3">
              <div className="w-32 shrink-0 text-xs font-bold text-slate-700">
                Available Blocks
              </div>
              <div className="relative h-8 flex-1 rounded bg-slate-100 border border-slate-200">
                <div style={{ left: "20%", width: "8%" }} className="absolute top-1 bottom-1 rounded bg-[#38bdf8] text-slate-900 flex items-center justify-center text-[9px] font-bold">
                  Available (120m)
                </div>
                <div style={{ left: "62%", width: "9%" }} className="absolute top-1 bottom-1 rounded bg-[#38bdf8] text-slate-900 flex items-center justify-center text-[9px] font-bold">
                  Available (90m)
                </div>
              </div>
            </div>

            {/* Row 6: Train Constraints */}
            <div className="flex items-center gap-3">
              <div className="w-32 shrink-0 text-xs font-bold text-rose-900">
                Train Constraints
              </div>
              <div className="relative h-8 flex-1 rounded bg-rose-50/60 border border-rose-200">
                <div style={{ left: "2%", width: "5%" }} className="absolute top-1 bottom-1 rounded bg-rose-600 text-white flex items-center justify-center text-[8px] font-bold">
                  Freight CONRAJ
                </div>
                <div style={{ left: "25%", width: "6%" }} className="absolute top-1 bottom-1 rounded bg-rose-600 text-white flex items-center justify-center text-[8px] font-bold">
                  Deccan Queen
                </div>
                <div style={{ left: "40%", width: "5%" }} className="absolute top-1 bottom-1 rounded bg-rose-600 text-white flex items-center justify-center text-[8px] font-bold">
                  Pragati Exp
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Legend */}
        <div className="border-t border-slate-200 mt-4 pt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
          <span className="font-bold text-slate-800">Legend:</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-xs bg-[#0284c7]" /> Engineering</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-xs bg-[#ea580c]" /> TRD</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-xs bg-[#16a34a]" /> S&T</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-xs bg-[#9333ea]" /> Combined Block</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-xs bg-[#38bdf8]" /> Available Block</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-xs bg-rose-600" /> Train Movement</span>
        </div>
      </div>
    </div>
  )
}
