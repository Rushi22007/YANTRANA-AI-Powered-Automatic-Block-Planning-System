"use client"

import React from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/railmitra/context/railmitra-context"
import {
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  HelpCircle,
} from "lucide-react"

export default function PlannerExplainPage() {
  const { optimizedPlan, jumpToSihStep } = useRailMitra()

  const reasons = [
    {
      num: "1",
      title: "Original Engineering request overlaps goods freight movement",
      desc: "Engineering originally requested 02:00–03:30. At 03:10, high-priority container freight CONRAJ-0310 is ordered on the UP Ghat line. Scheduling the block at 02:00 would cause absolute block holding and severe freight stalling on steep 1 in 37 gradient.",
    },
    {
      num: "2",
      title: "TRD maintenance can be performed simultaneously in the same corridor window",
      desc: "TRD catenary inspection and insulator cleaning (60 min) takes place on the exact same physical track segment (KM 25/3). The diesel track tamping machine does not require overhead electrification, enabling simultaneous execution.",
    },
    {
      num: "3",
      title: "S&T activity is compatible with the combined block",
      desc: "Electronic Interlocking cable and axle counter testing requires a line disconnection. Calibrating sensors immediately after track machine vibration eliminates the need for a separate signal block on another day.",
    },
    {
      num: "4",
      title: "All three tasks comfortably fit within the proposed 120-minute block",
      desc: "With coordinated sequential staging (TRD de-energizes at 04:15, Track tamping runs 04:25–05:55, S&T tests 04:30–05:15), aggregate demand of 195 min of separate blocks is compressed into just 120 min.",
    },
    {
      num: "5",
      title: "Proposed window (04:15–06:15) eliminates train disruption",
      desc: "04:15–06:15 sits precisely in the natural night traffic trough — safely behind freight CONRAJ-0310 clearance (03:55) and providing a 60-minute buffer before Train 12124 Deccan Queen departs Pune (07:15).",
    },
    {
      num: "6",
      title: "Human approval is mandatory before publishing to COA",
      desc: "The system provides explainable decision support. The block cannot be authorized, published to the Control Office Application (COA), or granted on site without explicit digital sign-off from the Divisional Planning Officer.",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 07
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              EXPLAINABLE AI ENGINE (XAI)
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            तर्कसंगत व्याख्या • Plan Explanation Console (Plan B-104)
          </h1>
          <p className="text-xs text-slate-600">
            Transparent, auditable rationale behind the AI recommendation. No black-box decisions — every constraint and trade-off is articulated for human scrutiny.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/approvals"
            onClick={() => jumpToSihStep(8)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 08. Human Approval</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Core Product Message Banner */}
      <div className="rounded-lg border-2 border-blue-600 bg-gradient-to-r from-blue-900 to-slate-900 p-5 text-white shadow-md">
        <p className="text-base sm:text-lg font-black tracking-tight leading-snug">
          “RailMitra AI does not automate the railway worker.
          <br className="hidden sm:inline" /> It automates the complexity around the worker.”
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded bg-amber-400 px-2 py-0.5 font-mono text-xs font-black text-slate-950">
            AI recommends. Railway authority decides.
          </span>
          <span className="text-xs text-blue-200 hidden sm:inline">
            Constitutional rule of human-in-the-loop railway safety.
          </span>
        </div>
      </div>

      {/* "WHY THIS PLAN?" 6 Points Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
          <Sparkles className="size-5 text-blue-700" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
            WHY THIS PLAN? (AI JUSTIFICATION BREAKDOWN)
          </h2>
        </div>

        <div className="space-y-3">
          {reasons.map((r) => (
            <div
              key={r.num}
              className="flex items-start gap-3.5 rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 hover:bg-blue-50/40 hover:border-blue-200 transition-all"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-700 font-mono text-xs font-bold text-white shadow-xs">
                {r.num}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Summary Specs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Recommended Window:</p>
          <p className="text-base font-black text-blue-900 font-mono mt-0.5">04:15 – 06:15 IST</p>
          <p className="text-[11px] text-slate-600 mt-0.5">120 min single traffic/power block</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Bundling Efficiency:</p>
          <p className="text-base font-black text-emerald-700 font-mono mt-0.5">3 Depts Coordinated</p>
          <p className="text-[11px] text-slate-600 mt-0.5">105 minutes line downtime saved</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Confidence & Verification:</p>
          <p className="text-base font-black text-purple-900 font-mono mt-0.5">94% Confidence Score</p>
          <p className="text-[11px] text-slate-600 mt-0.5">All 5 hard constraints satisfied</p>
        </div>
      </div>

      {/* Navigation to Approval */}
      <div className="rounded-lg bg-blue-50 p-4 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
            Ready for Railway Authority Authorization?
          </h4>
          <p className="text-xs text-blue-800 mt-0.5">
            Proceed to the Human Approval console to review the legal block dossier and record digital authorization.
          </p>
        </div>
        <Link
          href="/approvals"
          onClick={() => jumpToSihStep(8)}
          className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors shrink-0"
        >
          <span>Open Human Approval Console</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}
