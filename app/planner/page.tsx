"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/yentrana/context/yentrana -context"
import { canRunOptimizer } from "@/lib/yentrana/auth/authority"
import {
  Cpu,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  FileCheck2,
  Info,
  Lock,
} from "lucide-react"

export default function PlannerPage() {
  const {
    currentUser,
    setUserRole,
    objectiveWeights,
    setObjectiveWeights,
    optimizedPlan,
    jumpToSihStep,
  } = useRailMitra()

  const [division, setDivision] = useState("Pune Division")
  const [corridor, setCorridor] = useState("Karjat – Lonavala (Bhor Ghat)")
  const [date, setDate] = useState("2026-05-07")
  const [horizon, setHorizon] = useState<"Daily" | "Weekly" | "Monthly">("Daily")

  const [isOptimizing, setIsOptimizing] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [showResult, setShowResult] = useState(true)

  const optimizationSteps = [
    "Analyzing maintenance needs across 3 departments...",
    "Checking train movements & goods freight forecasts...",
    "Checking corridor availability on Bhor Ghat section...",
    "Applying hard safety & gradient constraints...",
    "Finding compatible tasks (Eng + TRD + S&T)...",
    "Optimizing block windows with CP-SAT...",
    "Generating feasible alternatives...",
    "Validating safety restoration buffers...",
  ]

  const handleRunOptimizer = () => {
    setIsOptimizing(true)
    setShowResult(false)
    setCurrentStepIndex(0)

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step < optimizationSteps.length) {
        setCurrentStepIndex(step)
      } else {
        clearInterval(interval)
        setIsOptimizing(false)
        setShowResult(true)
      }
    }, 450)
  }

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 06
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              OPTIMIZATION ENGINE
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            एआई ब्लॉक योजनाकार • AI Multi-Objective Block Optimizer
          </h1>
          <p className="text-xs text-slate-600">
            CP-SAT constraint programming solver calculating optimal multi-department block windows while balancing asset availability against train punctuality.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/planner/explain"
            onClick={() => jumpToSihStep(7)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 07. Explain Plan</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Control Panel: Parameters & Objective Weights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Planning Horizon & Corridor Form (5 cols) */}
        <div className="lg:col-span-5 rounded-lg border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
            Planning Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Division:</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 bg-slate-50 p-1.5 text-xs font-medium"
              >
                <option>Pune Division</option>
                <option>Mumbai Division</option>
                <option>Solapur Division</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Planning Horizon:</label>
              <div className="mt-1 flex rounded border border-slate-300 overflow-hidden">
                {(["Daily", "Weekly", "Monthly"] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHorizon(h)}
                    className={`flex-1 py-1 text-xs font-bold transition-colors ${horizon === h ? "bg-blue-700 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Target Corridor:</label>
            <input
              type="text"
              readOnly
              value={corridor}
              className="mt-1 w-full rounded border border-slate-300 bg-slate-100 p-1.5 font-bold text-slate-800 text-xs"
            />
          </div>

          <div className="text-xs">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Planning Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 bg-slate-50 p-1.5 font-mono text-xs font-medium"
            />
          </div>

          {canRunOptimizer(currentUser) ? (
            <button
              onClick={handleRunOptimizer}
              disabled={isOptimizing}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded bg-blue-700 py-2.5 px-4 text-xs font-bold text-white shadow-sm hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              <Cpu className="size-4" />
              <span>{isOptimizing ? "SOLVING CONSTRAINTS..." : "GENERATE OPTIMIZED PLAN"}</span>
            </button>
          ) : (
            <div className="mt-2 rounded border border-amber-300 bg-amber-50 p-2 text-center text-xs">
              <div className="flex items-center justify-center gap-1 font-bold text-amber-900 text-[11px]">
                <Lock className="size-3.5 text-amber-700" />
                <span>Planning Officer Clearance Required</span>
              </div>
              <p className="text-[10px] text-amber-800 mt-0.5">
                Current persona ({currentUser.title}) has view-only plan access.
              </p>
              <button
                type="button"
                onClick={() => setUserRole("PLANNING_OFFICER")}
                className="mt-1.5 rounded bg-[#0B4182] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs hover:bg-[#0C2340]"
              >
                Switch to Planning Officer
              </button>
            </div>
          )}
        </div>

        {/* Configurable Objective Weights (7 cols) */}
        <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <Sliders className="size-3.5 text-blue-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Configurable Optimization Objectives
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase ${canRunOptimizer(currentUser) ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
                {canRunOptimizer(currentUser) ? "Active Tuning" : "Read Only"}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Total: 100% Weight</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-700">Maximize Asset Availability:</span>
                <span className="font-mono font-bold text-blue-900">{objectiveWeights.assetAvailability}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={objectiveWeights.assetAvailability}
                onChange={(e) => setObjectiveWeights((w) => ({ ...w, assetAvailability: Number(e.target.value) }))}
                className="w-full accent-blue-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-700">Maximize Maintenance Completion:</span>
                <span className="font-mono font-bold text-blue-900">{objectiveWeights.maintenanceCompletion}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={objectiveWeights.maintenanceCompletion}
                onChange={(e) => setObjectiveWeights((w) => ({ ...w, maintenanceCompletion: Number(e.target.value) }))}
                className="w-full accent-blue-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-700">Maximize Block Utilization (Minimize Idle Time):</span>
                <span className="font-mono font-bold text-blue-900">{objectiveWeights.blockUtilization}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={objectiveWeights.blockUtilization}
                onChange={(e) => setObjectiveWeights((w) => ({ ...w, blockUtilization: Number(e.target.value) }))}
                className="w-full accent-blue-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-700">Minimize Train Disruption (Punctuality Penalty):</span>
                <span className="font-mono font-bold text-blue-900">{objectiveWeights.trainImpact}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={objectiveWeights.trainImpact}
                onChange={(e) => setObjectiveWeights((w) => ({ ...w, trainImpact: Number(e.target.value) }))}
                className="w-full accent-blue-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block">Conflict Reduction:</span>
                <span className="font-mono text-xs font-bold text-slate-800">{objectiveWeights.conflictReduction}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block">Multi-Dept Bundling:</span>
                <span className="font-mono text-xs font-bold text-slate-800">{objectiveWeights.multiDeptBundling}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solver In-Progress Animation Box */}
      {isOptimizing && (
        <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-4 shadow-sm animate-pulse">
          <div className="flex items-center gap-2 font-bold text-blue-900 text-xs mb-3">
            <Cpu className="size-4 animate-spin" />
            <span>SOLVER IN PROGRESS: CP-SAT Constraint Programming Solver</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {optimizationSteps.map((s, idx) => {
              const isPast = idx < currentStepIndex
              const isCurrent = idx === currentStepIndex
              return (
                <div
                  key={s}
                  className={`flex items-center gap-2 ${isPast
                    ? "text-emerald-800 font-medium"
                    : isCurrent
                      ? "text-blue-900 font-bold"
                      : "text-slate-400 opacity-60"
                    }`}
                >
                  <span className="size-2 rounded-full bg-current" />
                  <span>{s}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Optimization Result: Current Plan vs AI Plan ── */}
      {showResult && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
              OPTIMIZATION COMPARISON RESULT
            </h3>
            <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-300">
              SIMULATED OPTIMIZATION RESULT
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Left: Baseline Current Plan */}
            <div className="rounded-lg border border-rose-300 bg-rose-50/50 p-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-rose-200 pb-2 mb-3">
                <h4 className="text-xs font-black text-rose-950 uppercase tracking-wide">
                  CURRENT UNCOORDINATED PLAN
                </h4>
                <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 border border-rose-300">
                  Multiple Conflicts
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="rounded bg-white p-2 border border-rose-200">
                  <p className="font-bold text-sky-950">Engineering (Track Tamping):</p>
                  <p className="font-mono text-slate-700">02:00 – 03:30 (90 min)</p>
                </div>
                <div className="rounded bg-white p-2 border border-rose-200">
                  <p className="font-bold text-orange-950">TRD (OHE Inspection):</p>
                  <p className="font-mono text-slate-700">02:30 – 03:30 (60 min)</p>
                </div>
                <div className="rounded bg-white p-2 border border-rose-200">
                  <p className="font-bold text-emerald-950">S&T (Signal Sensor Calibration):</p>
                  <p className="font-mono text-slate-700">03:00 – 03:45 (45 min)</p>
                </div>
              </div>

              <div className="mt-3 rounded bg-rose-100 p-2.5 text-xs text-rose-950 border border-rose-300 space-y-1">
                <p className="font-bold flex items-center gap-1 text-rose-900">
                  <AlertTriangle className="size-3.5" />
                  Primary Operational Flaw:
                </p>
                <p className="text-[11px] leading-snug">
                  High-priority container freight <strong>CONRAJ-0310</strong> is forecasted at <strong>03:10</strong> directly colliding with all 3 unbundled requests.
                  Total cumulative corridor disruption: <strong>195 minutes</strong> across 3 separate block grant operations.
                </p>
              </div>
            </div>

            {/* Right: AI Optimized Combined Plan */}
            <div className="rounded-lg border-2 border-emerald-500 bg-emerald-50/40 p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="size-4 text-emerald-700" />
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                    AI OPTIMIZED PLAN (PLAN B-104)
                  </h4>
                </div>
                <span className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  Zero Conflicts • 94% Confidence
                </span>
              </div>

              <div className="rounded bg-white p-3 border border-emerald-200 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-600">Proposed Window:</span>
                  <span className="font-mono text-sm font-black text-emerald-800">04:15 – 06:15 IST (120 min)</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-bold text-slate-600">Participating Departments:</span>
                  <span className="font-bold text-slate-900">Engineering + TRD + S&T (All 3)</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-bold text-slate-600">Tasks Successfully Bundled:</span>
                  <span className="font-bold font-mono text-blue-900">3 Tasks (ENG-1042, TRD-3098, SNT-8821)</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-bold text-slate-600">Active Train Conflicts:</span>
                  <span className="font-bold font-mono text-emerald-700">0 Conflicts (Resolved)</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-bold text-slate-600">Train Headway Impact:</span>
                  <span className="font-bold text-emerald-700">LOW (Clears before Deccan Queen 07:15)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-600">Corridor Utilization Efficiency:</span>
                  <span className="font-bold font-mono text-blue-950">91% High Utilization</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <Link
                  href="/planner/explain"
                  onClick={() => jumpToSihStep(7)}
                  className="flex-1 text-center rounded bg-slate-800 py-2 px-3 text-xs font-bold text-white hover:bg-slate-900 transition-colors"
                >
                  WHY THIS PLAN? (EXPLAIN)
                </Link>

                <Link
                  href="/approvals"
                  onClick={() => jumpToSihStep(8)}
                  className="flex-1 text-center rounded bg-blue-700 py-2 px-3 text-xs font-bold text-white hover:bg-blue-800 transition-colors shadow-xs"
                >
                  SUBMIT FOR APPROVAL →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
