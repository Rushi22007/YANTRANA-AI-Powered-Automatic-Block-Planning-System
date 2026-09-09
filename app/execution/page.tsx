"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/yentrana/context/yentrana-context"
import { canUpdateTelemetry } from "@/lib/yentrana/auth/authority"
import {
  PlayCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Wrench,
  Zap,
  Activity,
  RotateCcw,
  ShieldCheck,
  Lock,
} from "lucide-react"

export default function ExecutionPage() {
  const {
    currentUser,
    setUserRole,
    executionTracker,
    reportExecutionDelay,
    jumpToSihStep,
  } = useRailMitra()

  const [delayComment, setDelayComment] = useState<string>(
    "Hydraulic hose ruptured on CSM 09-3X Tamping Machine at KM 24/25. Gang supervisor reports +45 minutes needed for hose replacement and track consolidation."
  )
  const [delayTriggered, setDelayTriggered] = useState<boolean>(executionTracker.currentDelayMin > 0)

  const handleTriggerDelay = () => {
    reportExecutionDelay(45, delayComment)
    setDelayTriggered(true)
    jumpToSihStep(12)
  }

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 09
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              FIELD EXECUTION & TELEMETRY
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            सक्रिय निष्पादन • Live Block Execution Tracking (Block B-104)
          </h1>
          <p className="text-xs text-slate-600">
            Real-time monitoring of active field work packages across Engineering track gangs, TRD tower wagons, and S&T signal inspectors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/replan"
            onClick={() => jumpToSihStep(10)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 10. Re-Plan</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Disruption Alert Banner (If triggered) */}
      {delayTriggered && (
        <div className="rounded-lg border-2 border-rose-500 bg-rose-50 p-4 text-rose-950 shadow-xs animate-pulse">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="size-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-black text-rose-900 uppercase tracking-wide">
                  CRITICAL DISRUPTION: ENGINEERING REPORTS +45 MIN FIELD DELAY
                </h3>
                <p className="text-xs text-rose-800 mt-1 leading-snug">
                  {executionTracker.reportedDelayComment || delayComment}
                </p>
                <p className="text-[11px] text-rose-700 font-bold mt-1.5">
                  Action required: System has flagged RE-PLAN REQUIRED to safeguard Train 12124 Deccan Queen punctuality!
                </p>
              </div>
            </div>

            <Link
              href="/replan"
              onClick={() => jumpToSihStep(13)}
              className="inline-flex items-center gap-1.5 rounded bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-800 shadow-sm shrink-0"
            >
              <span>Launch Re-Plan Engine</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Block B-104 Status Header */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Block Status</span>
          <span className="mt-0.5 inline-flex items-center gap-1.5 rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            {executionTracker.status}
          </span>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Planned vs Actual Start</span>
          <span className="mt-0.5 font-mono text-xs font-bold text-slate-900 block">
            {executionTracker.plannedStart} <span className="text-slate-400">/</span> {executionTracker.actualStart} IST
          </span>
          <span className="text-[10px] text-slate-400">+3 min handover</span>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Planned Duration</span>
          <span className="mt-0.5 font-mono text-xs font-bold text-slate-900 block">
            {executionTracker.plannedDuration} minutes
          </span>
          <span className="text-[10px] text-slate-400">04:15 to 06:15</span>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Elapsed Time</span>
          <span className="mt-0.5 font-mono text-xs font-bold text-blue-900 block">
            {executionTracker.actualDuration} minutes
          </span>
          <span className="text-[10px] text-slate-400">Clock: 05:43 IST</span>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Tasks Progress</span>
          <span className="mt-0.5 font-mono text-xs font-bold text-slate-900 block">
            1 Completed / 2 Active
          </span>
          <span className="text-[10px] text-emerald-700 font-bold">S&T 100% Complete</span>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Current Delay</span>
          <span className={`mt-0.5 font-mono text-xs font-black block ${delayTriggered ? "text-rose-700" : "text-emerald-700"}`}>
            {delayTriggered ? `+${executionTracker.currentDelayMin} min Delay` : "0 min (On Schedule)"}
          </span>
          <span className="text-[10px] text-slate-400">Machine Maintenance</span>
        </div>
      </div>

      {/* Department Progress Meters */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-3">
          Department-Wise Physical Progress
        </h3>

        <div className="space-y-4 text-xs">
          {/* Engineering */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sky-950 flex items-center gap-1.5">
                <Wrench className="size-3.5 text-sky-700" />
                Engineering (P-Way Track Tamping • WP-ENG-1042):
              </span>
              <span className="font-mono font-bold text-sky-900">
                {executionTracker.departmentsProgress.engineering}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <div
                style={{ width: `${executionTracker.departmentsProgress.engineering}%` }}
                className={`h-full rounded-full ${delayTriggered ? "bg-amber-500" : "bg-sky-600"}`}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {delayTriggered
                ? "Hydraulic hose leak at KM 24/25. Track consolidated: 680m of 1000m target. Crew replacing hydraulic feed line."
                : "CSM 09-3X machine in operation at KM 24/25. Tamping rate: 18 sleepers/min."}
            </p>
          </div>

          {/* TRD */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-orange-950 flex items-center gap-1.5">
                <Zap className="size-3.5 text-orange-700" />
                TRD (OHE Catenary Overhaul • WP-TRD-3098):
              </span>
              <span className="font-mono font-bold text-orange-900">
                {executionTracker.departmentsProgress.trd}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <div
                style={{ width: `${executionTracker.departmentsProgress.trd}%` }}
                className="h-full rounded-full bg-orange-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Tower wagon RU-84 completing cantilever insulator cleaning. 8 of 10 catenary masts serviced.
            </p>
          </div>

          {/* S&T */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Radio className="size-3.5 text-emerald-700" />
                S&T (Signal Interlocking & Axle Counters • WP-SNT-8821):
              </span>
              <span className="font-mono font-bold text-emerald-700">
                {executionTracker.departmentsProgress.snt}% (COMPLETED)
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <div
                style={{ width: `${executionTracker.departmentsProgress.snt}%` }}
                className="h-full rounded-full bg-emerald-600"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Cable resistance verified at 150 Megaohms. Axle counter track circuit calibrated and reconnected.
            </p>
          </div>
        </div>
      </div>

      {/* Checkpoint Timeline */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-3">
          Chronological Execution Timeline Log
        </h3>

        <div className="space-y-2.5">
          {executionTracker.steps.map((step, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-2.5">
                <span className={`size-2 rounded-full ${step.completed ? "bg-emerald-600" : "bg-slate-300"}`} />
                <span className="font-mono font-bold text-slate-700">{step.time}</span>
                <span className={step.completed ? "text-slate-800" : "text-slate-400"}>{step.title}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500">{step.department}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive SIH Disruption Simulator Box */}
      <div className="rounded-lg border border-rose-300 bg-rose-50/60 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black text-rose-950 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="size-4 text-rose-700" />
                SIH-2026 DISRUPTION SIMULATION CONTROL
              </h4>
              <span className="rounded bg-rose-200/80 px-1.5 py-0.2 font-mono text-[9px] font-bold text-rose-900">
                {currentUser.tier === "FIELD_EXECUTION" ? "GANG TELEMETRY" : "SUPERVISORY OVERRIDE"}
              </span>
            </div>
            <p className="text-xs text-rose-800 mt-0.5">
              Simulate an unforeseen site breakdown (hydraulic hose failure on CSM 09-3X) to test the dynamic AI Re-Planning Engine.
            </p>
            <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-600 font-mono">
              <span>Telemetry Operator: <strong>{currentUser.name}</strong> ({currentUser.title})</span>
            </div>
          </div>

          <button
            onClick={handleTriggerDelay}
            disabled={delayTriggered}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-xs font-bold transition-all shrink-0 ${delayTriggered
              ? "bg-rose-200 text-rose-900 border border-rose-400 cursor-default"
              : "bg-rose-700 text-white hover:bg-rose-800 shadow-xs"
              }`}
          >
            <AlertTriangle className="size-3.5" />
            <span>{delayTriggered ? "+45 MIN DELAY REPORTED" : "SIMULATE +45 MIN DELAY"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
