"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/railmitra/context/railmitra-context"
import {
  Layers,
  ArrowRight,
  AlertTriangle,
  Clock,
  Train,
  CheckCircle2,
  Calendar,
  Filter,
  Info,
} from "lucide-react"

export default function CommonViewPage() {
  const { jumpToSihStep } = useRailMitra()
  const [selectedDate, setSelectedDate] = useState<string>("2026-05-07")
  const [highlightOverlap, setHighlightOverlap] = useState<boolean>(true)

  // Timeline hours from 00:00 to 12:00 (12 hours)
  const hours = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"
  ]

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 03
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              CENTRAL CORRIDOR MODEL
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            साझा कॉरिडोर दृश्य • COMMON CORRIDOR VIEW
          </h1>
          <p className="text-xs text-slate-600">
            Single multi-department operational canvas synthesizing decentralized requests from Engineering, TRD, S&T against live train timetable and goods forecasts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/constraints"
            onClick={() => jumpToSihStep(4)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 04. Constraints</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Corridor Header & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="rounded bg-blue-100 p-1.5 text-blue-800">
            <Layers className="size-4" />
          </span>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              CORRIDOR: Karjat (KJT) → Khandala (KND) → Lonavala (LNL)
            </h3>
            <p className="text-[10px] text-slate-500">
              Central Railway • Pune Division • Bhor Ghat Incline (UP Ghat Line)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2 py-1">
            <Calendar className="size-3 text-slate-500" />
            <span className="text-[11px] font-bold text-slate-700">07 May 2026 (Wed)</span>
          </div>

          <button
            onClick={() => setHighlightOverlap(!highlightOverlap)}
            className={`rounded px-2.5 py-1 font-bold transition-colors ${
              highlightOverlap
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {highlightOverlap ? "Hide Conflict Highlight" : "Highlight Overlap & Conflict"}
          </button>
        </div>
      </div>

      {/* Critical Overlap Banner */}
      {highlightOverlap && (
        <div className="flex items-start gap-2.5 rounded-lg border-2 border-rose-400 bg-rose-50/90 p-3 text-xs text-rose-950 animate-fade-in">
          <AlertTriangle className="size-5 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <p className="font-extrabold text-rose-900">
              CRITICAL UNCOORDINATED OVERLAP & TRAIN COLLISION DETECTED
            </p>
            <p className="text-rose-800 mt-0.5 leading-snug">
              Notice the uncoordinated requests at <strong>02:00–03:45</strong>: Engineering (Track), TRD (OHE), and S&T (Signals) are all independently demanding the same UP Ghat track.
              Crucially, high-priority JNPT Container Freight <strong>CONRAJ-0310</strong> is forecasted at <strong>03:10</strong> directly through this window!
            </p>
          </div>
        </div>
      )}

      {/* ── Main Shared Corridor Timeline Canvas ── */}
      <div className="rounded-lg border border-slate-300 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Shared Multi-Track Operations Timeline (00:00 – 12:00 IST)
          </h4>
          <span className="text-[10px] text-slate-500 font-mono">
            Time Scale: 12 Hours • Resolution: 15 Min
          </span>
        </div>

        <div className="overflow-x-auto p-4">
          <div className="min-w-[850px] space-y-4">
            
            {/* Time Axis Bar */}
            <div className="relative h-6 w-full border-b border-slate-300">
              <div className="grid grid-cols-12 text-center font-mono text-[10px] font-bold text-slate-500">
                {hours.slice(0, 12).map((hr) => (
                  <div key={hr} className="border-l border-slate-200 text-left pl-1">
                    {hr}
                  </div>
                ))}
              </div>
            </div>

            {/* Row 1: Engineering Maintenance */}
            <div className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-xs font-bold text-sky-950">
                <span className="inline-block size-2 rounded-xs bg-[#0284c7] mr-1.5" />
                Engineering
              </div>
              <div className="relative h-9 flex-1 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                {/* WP-ENG-1042: 02:00 to 03:30 (16.6% to 29.1%) */}
                <div
                  style={{ left: "16.6%", width: "12.5%" }}
                  className="absolute top-1 bottom-1 rounded bg-[#0284c7] text-white flex items-center justify-between px-2 text-[10px] font-bold shadow-xs hover:brightness-110 cursor-pointer"
                  title="WP-ENG-1042: Track Tamping (02:00 - 03:30)"
                >
                  <span className="truncate">WP-ENG-1042 (Track)</span>
                  <span className="text-[9px] opacity-80">90m</span>
                </div>
              </div>
            </div>

            {/* Row 2: TRD Maintenance */}
            <div className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-xs font-bold text-orange-950">
                <span className="inline-block size-2 rounded-xs bg-[#ea580c] mr-1.5" />
                TRD (Traction)
              </div>
              <div className="relative h-9 flex-1 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                {/* WP-TRD-3098: 02:30 to 03:30 (20.8% to 29.1%) */}
                <div
                  style={{ left: "20.8%", width: "8.3%" }}
                  className="absolute top-1 bottom-1 rounded bg-[#ea580c] text-white flex items-center justify-between px-2 text-[10px] font-bold shadow-xs hover:brightness-110 cursor-pointer"
                  title="WP-TRD-3098: OHE Catenary Inspection (02:30 - 03:30)"
                >
                  <span className="truncate">WP-TRD-3098 (OHE)</span>
                  <span className="text-[9px] opacity-80">60m</span>
                </div>
              </div>
            </div>

            {/* Row 3: S&T Maintenance */}
            <div className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-xs font-bold text-emerald-950">
                <span className="inline-block size-2 rounded-xs bg-[#16a34a] mr-1.5" />
                S&T (Signals)
              </div>
              <div className="relative h-9 flex-1 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                {/* WP-SNT-8821: 03:00 to 03:45 (25.0% to 31.25%) */}
                <div
                  style={{ left: "25.0%", width: "6.25%" }}
                  className="absolute top-1 bottom-1 rounded bg-[#16a34a] text-white flex items-center justify-between px-2 text-[10px] font-bold shadow-xs hover:brightness-110 cursor-pointer"
                  title="WP-SNT-8821: Signal & Track Circuit (03:00 - 03:45)"
                >
                  <span className="truncate">WP-SNT-8821</span>
                  <span className="text-[9px] opacity-80">45m</span>
                </div>
              </div>
            </div>

            {/* Row 4: Passenger Express Trains */}
            <div className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-xs font-bold text-blue-900 flex items-center gap-1">
                <Train className="size-3.5 text-blue-700" />
                Passenger Trains
              </div>
              <div className="relative h-9 flex-1 rounded bg-blue-50/50 border border-blue-200 overflow-hidden">
                {/* Train 12124 Deccan Queen: 07:15 to 08:15 (60.4% to 68.7%) */}
                <div
                  style={{ left: "60.4%", width: "8.3%" }}
                  className="absolute top-1 bottom-1 rounded bg-blue-800 text-white flex items-center justify-between px-2 text-[10px] font-bold shadow-xs"
                  title="12124 Deccan Queen Express (07:15 - 08:15)"
                >
                  <span className="truncate">12124 Deccan Queen</span>
                  <span className="text-[8px] bg-amber-400 text-slate-950 px-1 rounded font-bold">P1</span>
                </div>

                {/* Suburban shuttle: 04:50 to 05:15 (40.2% to 43.7%) */}
                <div
                  style={{ left: "40.2%", width: "3.5%" }}
                  className="absolute top-1 bottom-1 rounded bg-slate-700 text-white flex items-center justify-center text-[9px] font-bold"
                  title="SUB-99701 Shuttle (04:50 - 05:15)"
                >
                  Local
                </div>
              </div>
            </div>

            {/* Row 5: Goods Freight Forecast */}
            <div className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-xs font-bold text-rose-900 flex items-center gap-1">
                <AlertTriangle className="size-3.5 text-rose-600" />
                Goods Forecast
              </div>
              <div className="relative h-9 flex-1 rounded bg-rose-50/50 border border-rose-200 overflow-hidden">
                {/* Freight CONRAJ-0310: 03:10 to 03:55 (26.3% to 32.6%) */}
                <div
                  style={{ left: "26.3%", width: "6.3%" }}
                  className="absolute top-1 bottom-1 rounded bg-rose-600 text-white flex items-center justify-between px-2 text-[10px] font-bold shadow-xs animate-pulse ring-2 ring-rose-400"
                  title="CONRAJ-0310: JNPT Container Freight (03:10 - 03:55) - HARD CONSTRAINT"
                >
                  <span className="truncate">CONRAJ-0310 (03:10)</span>
                  <span className="text-[8px] bg-white text-rose-700 px-1 rounded font-black">HARD</span>
                </div>

                {/* Freight BOXN-2241: 01:15 to 02:00 (10.4% to 16.6%) */}
                <div
                  style={{ left: "10.4%", width: "6.2%" }}
                  className="absolute top-1 bottom-1 rounded bg-slate-600 text-white flex items-center justify-center text-[9px] font-bold"
                  title="BOXN-2241 Coal Rake (01:15 - 02:00)"
                >
                  BOXN Rake
                </div>
              </div>
            </div>

            {/* Row 6: AI Proposed Available Block Window */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <div className="w-36 shrink-0 text-xs font-black text-purple-950 flex items-center gap-1">
                <span className="inline-block size-2 rounded-xs bg-[#9333ea] mr-1.5" />
                AI Window (B-104)
              </div>
              <div className="relative h-10 flex-1 rounded bg-purple-50 border-2 border-dashed border-purple-300 overflow-hidden">
                {/* AI Optimal Window: 04:15 to 06:15 (35.4% to 52.1%) */}
                <div
                  style={{ left: "35.4%", width: "16.7%" }}
                  className="absolute top-1 bottom-1 rounded bg-[#9333ea] text-white flex items-center justify-between px-3 text-[11px] font-bold shadow-md cursor-pointer hover:bg-purple-800"
                  title="AI Combined Block B-104: 04:15 - 06:15 (Eng + TRD + S&T)"
                >
                  <span className="truncate">AI COMBINED BLOCK (04:15–06:15)</span>
                  <span className="text-[10px] bg-white text-purple-900 px-1.5 py-0.2 rounded font-black">120m</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Legend Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="font-bold text-slate-700">Timeline Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-[#0284c7]" />
              <span>Engineering (90m)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-[#ea580c]" />
              <span>TRD Catenary (60m)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-[#16a34a]" />
              <span>S&T Sensor (45m)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-rose-600" />
              <span>Goods Train (CONRAJ-0310)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-[#9333ea]" />
              <span>Combined Block (B-104)</span>
            </div>
          </div>

          <Link
            href="/constraints"
            onClick={() => jumpToSihStep(4)}
            className="font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            Analyze Constraints & Conflicts →
          </Link>
        </div>
      </div>
    </div>
  )
}
