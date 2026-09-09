"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/railmitra/context/railmitra-context"
import {
  GitMerge,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Layers,
  Sparkles,
  Check,
} from "lucide-react"

export default function CompatibilityPage() {
  const { compatibilityChecks, jumpToSihStep } = useRailMitra()
  const [createdBundle, setCreatedBundle] = useState<boolean>(false)

  const handleCreateCombinedPackage = () => {
    setCreatedBundle(true)
  }

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 05
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              COMPATIBILITY ENGINE
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            अनुकूलता विश्लेषण • Task Compatibility & Bundling Engine
          </h1>
          <p className="text-xs text-slate-600">
            Automated multi-department cross-check to identify tasks capable of safely sharing a single corridor maintenance block.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/planner"
            onClick={() => jumpToSihStep(6)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 06. Optimizer</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Recommended Combined Block Card */}
      <div className="rounded-lg border-2 border-purple-400 bg-purple-50/70 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-200 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-purple-700 text-white shadow-xs">
              <Sparkles className="size-5" />
            </span>
            <div>
              <span className="rounded bg-purple-200 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-purple-900">
                AI ENGINE RECOMMENDATION
              </span>
              <h3 className="text-sm font-black text-purple-950 mt-0.5">
                TRIPLE COMBINED CORRIDOR BLOCK (Engineering + TRD + S&T)
              </h3>
            </div>
          </div>

          <button
            onClick={handleCreateCombinedPackage}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-xs font-bold transition-all ${
              createdBundle
                ? "bg-emerald-700 text-white cursor-default"
                : "bg-purple-700 text-white hover:bg-purple-800 shadow-sm"
            }`}
          >
            {createdBundle ? (
              <>
                <CheckCircle2 className="size-4" />
                <span>COMBINED PACKAGE CREATED</span>
              </>
            ) : (
              <>
                <GitMerge className="size-4" />
                <span>CREATE COMBINED PACKAGE</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded bg-white p-2.5 border border-purple-200">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Corridor Section:</p>
            <p className="font-bold text-purple-950 mt-0.5">Karjat – Lonavala (KM 24 to 26)</p>
          </div>
          <div className="rounded bg-white p-2.5 border border-purple-200">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Combined Window:</p>
            <p className="font-bold text-purple-950 mt-0.5">120 Minutes (Coordinated)</p>
          </div>
          <div className="rounded bg-white p-2.5 border border-purple-200">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Corridor Savings:</p>
            <p className="font-bold text-emerald-700 mt-0.5">105 Min Line Downtime Saved</p>
          </div>
          <div className="rounded bg-white p-2.5 border border-purple-200">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Safety Compliance:</p>
            <p className="font-bold text-purple-950 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              100% Certified Safe
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-purple-900 leading-snug">
          <strong>Why this bundle works:</strong> Track tamping, catenary inspection, and axle counter testing occur on the same corridor span.
          The diesel tamping machine is immune to the OHE power shut-down, while S&T technicians calibrate axle counter sensors immediately after the tamping run without requiring an additional line disconnection.
        </p>
      </div>

      {/* Pairwise Compatibility Matrix */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Pairwise Department Compatibility Evaluation
          </h4>
          <span className="text-[10px] text-slate-500">Spatial, Temporal & Safety Checks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-100/70 font-bold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Department Pair</th>
                <th className="py-2.5 px-2">Task A</th>
                <th className="py-2.5 px-2">Task B</th>
                <th className="py-2.5 px-2 text-center">Compatibility</th>
                <th className="py-2.5 px-2">Safety Clearance</th>
                <th className="py-2.5 px-2">Power Isolation</th>
                <th className="py-2.5 px-3">Engine Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {compatibilityChecks.map((check) => (
                <tr key={check.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">{check.pair}</td>
                  <td className="py-3 px-2 text-slate-700 font-mono text-[11px]">{check.taskA}</td>
                  <td className="py-3 px-2 text-slate-700 font-mono text-[11px]">{check.taskB}</td>
                  <td className="py-3 px-2 text-center">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
                      <Check className="size-3" /> YES
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <ShieldCheck className="size-3.5" /> Approved
                    </span>
                  </td>
                  <td className="py-3 px-2 font-mono text-[11px] text-slate-600">
                    {check.powerIsolationNeeded ? "Required (OHE)" : "Not Required"}
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-[11px] max-w-sm">
                    {check.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Step Navigation */}
      <div className="rounded-lg bg-blue-50 p-4 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
            Tasks Validated • Ready for Multi-Objective Optimization
          </h4>
          <p className="text-xs text-blue-800 mt-0.5">
            Feed these compatible packages into the CP-SAT Optimizer to calculate the exact conflict-free scheduling window.
          </p>
        </div>
        <Link
          href="/planner"
          onClick={() => jumpToSihStep(6)}
          className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors shrink-0"
        >
          <span>Run AI Block Optimizer</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}
