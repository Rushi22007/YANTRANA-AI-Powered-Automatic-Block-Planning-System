"use client"

import React, { useState } from "react"
import Link from "next/link"
import { CalendarDays, ArrowRight, Clock, AlertTriangle, Layers, Calendar } from "lucide-react"

export default function MonthlyPlanPage() {
  const [selectedDay, setSelectedDay] = useState<number>(7)

  // 31 days of May 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            मासिक योजना • Monthly Rolling Block Calendar (May 2026)
          </h1>
          <p className="text-xs text-slate-600">
            Divisional overview of scheduled traffic blocks, overdue tasks, and corridor capacity windows.
          </p>
        </div>

        <Link
          href="/weekly-plan"
          className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <span>View Weekly Gantt</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Calendar Grid & Day Inspector */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Calendar (8 cols) */}
        <div className="lg:col-span-8 rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              May 2026 • Pune Division Corridor Roster
            </h3>
            <span className="text-[10px] text-slate-500">Click any day to open daily plan</span>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 text-center font-bold text-[10px] text-slate-500 pb-2 border-b border-slate-200">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-2">
            {/* 5 empty cells for Friday 1st May */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-18 rounded bg-slate-50 opacity-40" />
            ))}

            {daysInMonth.map((d) => {
              const isSelected = selectedDay === d
              const isToday = d === 7
              const hasCritical = d === 7 || d === 8 || d === 15
              const hasBlock = d >= 5 && d <= 12

              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`h-18 rounded p-1.5 text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-500 shadow-xs"
                      : isToday
                      ? "border-blue-300 bg-white shadow-xs font-bold"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs font-bold ${isToday ? "text-blue-700" : "text-slate-800"}`}>
                      {d}
                    </span>
                    {isToday && (
                      <span className="size-1.5 rounded-full bg-blue-600" />
                    )}
                  </div>

                  <div className="space-y-0.5 w-full">
                    {hasBlock && (
                      <span className="block truncate rounded bg-purple-100 px-1 text-[8px] font-bold text-purple-900">
                        {d === 7 ? "B-104 (Combined)" : "Block Planned"}
                      </span>
                    )}
                    {hasCritical && (
                      <span className="block truncate rounded bg-rose-100 px-1 text-[8px] font-bold text-rose-800">
                        {d === 7 ? "ENG-1042 Crit" : "Critical Task"}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Day Inspector (4 cols) */}
        <div className="lg:col-span-4 rounded-lg border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-2 mb-3">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-900">
                DAILY PLAN DOSSIER
              </span>
              <h3 className="text-sm font-black text-slate-900 mt-1">
                {selectedDay} May 2026 (Wednesday)
              </h3>
              <p className="text-[11px] text-slate-500">Corridor: Mumbai – Pune (Bhor Ghat)</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="rounded bg-purple-50 p-2.5 border border-purple-200">
                <span className="text-[10px] font-bold text-purple-900 uppercase block">Scheduled Block:</span>
                <p className="font-bold text-slate-900 mt-0.5">Combined Block B-104</p>
                <p className="font-mono text-[11px] text-purple-900">04:15 – 06:15 IST (120 min)</p>
                <p className="text-[10px] text-slate-600 mt-1">Depts: Engineering, TRD, S&T</p>
              </div>

              <div className="rounded bg-rose-50 p-2.5 border border-rose-200">
                <span className="text-[10px] font-bold text-rose-900 uppercase block">Critical Defect:</span>
                <p className="font-bold text-slate-900 mt-0.5">ENG-1042 (Track Tamping)</p>
                <p className="text-[10px] text-rose-700">12 Days Overdue • KM 24/25</p>
              </div>

              <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">Available Windows:</span>
                <p className="text-[11px] font-medium text-slate-700 mt-0.5">
                  • 03:30 – 05:30 (Karjat Yard)<br />
                  • 11:30 – 13:00 (Lonavala Platform 2)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded bg-blue-700 py-2 px-3 text-xs font-bold text-white hover:bg-blue-800"
            >
              <span>Open in Command Center</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
