"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/railmitra/context/railmitra-context"
import {
  RefreshCw,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldAlert,
  Train,
  Sliders,
  Check,
} from "lucide-react"

export default function ReplanPage() {
  const {
    replanScenario,
    selectedReplanOption,
    setSelectedReplanOption,
    acceptReplanOption,
    jumpToSihStep,
  } = useRailMitra()

  const [acceptedToast, setAcceptedToast] = useState<string | null>(null)

  const handleAcceptReplan = () => {
    acceptReplanOption(selectedReplanOption)
    setAcceptedToast(`Revised Plan (${selectedReplanOption}) accepted and transmitted to Control Office!`)
    jumpToSihStep(15)
  }

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 10
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              DYNAMIC RE-PLANNING ENGINE
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            पुनर्योजना • Disruption Rescheduling Console
          </h1>
          <p className="text-xs text-slate-600">
            Real-time disruption management: when track machines breakdown or trains are delayed, AI dynamically calculates revised alternatives to protect network punctuality.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/audit"
            onClick={() => jumpToSihStep(15)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>View Final Audit Trail</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Success Toast */}
      {acceptedToast && (
        <div className="flex items-center gap-2 rounded bg-emerald-50 p-3 border border-emerald-300 text-xs font-bold text-emerald-900 animate-fade-in">
          <CheckCircle2 className="size-4 text-emerald-600" />
          <span>{acceptedToast}</span>
        </div>
      )}

      {/* Dynamic Disruption Status Bar */}
      <div className="rounded-lg border-2 border-rose-500 bg-rose-50 p-4 text-rose-950 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="size-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="rounded bg-rose-700 px-2 py-0.5 text-[10px] font-black uppercase text-white tracking-wide">
                RE-PLAN REQUIRED • DISRUPTION OCCURRED
              </span>
              <h2 className="text-sm font-black text-rose-950 mt-1">
                Engineering Machine Breakdown (+45 min Extension Requested)
              </h2>
              <p className="text-xs text-rose-800 mt-0.5 leading-snug">
                {replanScenario.triggerReason}
              </p>
            </div>
          </div>

          <div className="rounded bg-white p-2.5 border border-rose-200 text-center shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Reported Delay</span>
            <span className="font-mono text-base font-black text-rose-700">+{replanScenario.reportedDelayMin} MIN</span>
          </div>
        </div>
      </div>

      {/* Comparison: Current Commitment vs New Operational Constraint */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-300 bg-white p-4 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-2">
            Original Authorized Commitment
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Plan ID:</span>
              <span className="font-mono font-bold text-slate-800">Plan B-104</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Authorized Window:</span>
              <span className="font-mono font-bold text-blue-900">04:15 – 06:15 IST (120 min)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Corridor Clearance Deadline:</span>
              <span className="font-mono font-bold text-slate-800">06:15 IST (Sharp)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">First Commercial Service:</span>
              <span className="font-bold text-slate-800">Train 12124 Deccan Queen (07:15)</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-amber-300 bg-amber-50/60 p-4 shadow-xs">
          <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wide border-b border-amber-200 pb-2 mb-2">
            New Operational Constraint
          </h3>
          <div className="space-y-1.5 text-xs text-amber-900">
            <div className="flex justify-between">
              <span className="text-amber-700">Field Issue:</span>
              <span className="font-bold">CSM 09-3X Hydraulic Repair</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">Required Engineering End:</span>
              <span className="font-mono font-bold text-rose-700">07:00 IST (+45 min)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">Collision Risk:</span>
              <span className="font-bold text-rose-800">15 min buffer erosion with Deccan Queen</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">OHE Status:</span>
              <span className="font-bold text-emerald-800">TRD catenary ready at 06:15</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Generated Alternatives (Option A, B, C) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-purple-700" />
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
              AI Dynamic Alternatives (CP-SAT Recalculated)
            </h3>
          </div>
          <span className="text-xs text-slate-500">Select an alternative to endorse</span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {replanScenario.alternatives.map((alt) => {
            const isSelected = selectedReplanOption === alt.optionId
            const isRecommended = alt.recommended

            return (
              <div
                key={alt.optionId}
                onClick={() => setSelectedReplanOption(alt.optionId)}
                className={`cursor-pointer rounded-lg border p-4 shadow-xs transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500"
                    : isRecommended
                    ? "border-purple-300 bg-purple-50/30 hover:border-purple-400"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-slate-800">{alt.optionId}</span>
                      {isRecommended && (
                        <span className="rounded bg-purple-700 px-1.5 py-0.2 text-[9px] font-black text-white uppercase tracking-wider">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                      alt.trainImpact === "LOW"
                        ? "bg-emerald-100 text-emerald-800"
                        : alt.trainImpact === "MEDIUM"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}>
                      {alt.trainImpact} TRAIN IMPACT
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{alt.title}</h4>
                  <p className="font-mono text-xs font-bold text-blue-900 mt-1">{alt.scheduleWindow}</p>

                  <p className="mt-2 text-xs text-slate-600 leading-snug">
                    {alt.description}
                  </p>

                  <div className="mt-3 rounded bg-slate-50 p-2 text-[11px] border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Trade-off & Consequence:</span>
                    <p className="text-slate-700 mt-0.5">{alt.tradeoffReason}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <input
                      type="radio"
                      name="replan-option"
                      checked={isSelected}
                      onChange={() => setSelectedReplanOption(alt.optionId)}
                      className="size-3.5 text-blue-600"
                    />
                    <span>Select {alt.optionId}</span>
                  </div>

                  {isRecommended && (
                    <span className="text-[10px] font-bold text-purple-700">Best Pareto Score</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="rounded-lg bg-slate-100 p-4 border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-900">
            Selected Choice: <span className="font-mono text-blue-900">{selectedReplanOption}</span>
          </p>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Endorsing this option will issue revised block cancellation timings to Sectional Control (COA) and notify gang supervisors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAcceptReplan}
            className="inline-flex items-center gap-1.5 rounded bg-emerald-700 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
          >
            <CheckCircle2 className="size-4" />
            <span>[ ACCEPT RE-PLAN & TRANSMIT ]</span>
          </button>
        </div>
      </div>
    </div>
  )
}
