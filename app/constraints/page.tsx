"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/railmitra/context/railmitra-context"
import {
  ShieldAlert,
  ArrowRight,
  Train,
  AlertTriangle,
  Clock,
  Wrench,
  Layers,
  CheckCircle2,
  Lock,
  Unlock,
} from "lucide-react"

export default function ConstraintsPage() {
  const { constraints, jumpToSihStep } = useRailMitra()
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
  const [filterHardOnly, setFilterHardOnly] = useState<boolean>(false)

  const filteredConstraints = constraints.filter((c) => {
    if (selectedCategory !== "ALL" && c.category !== selectedCategory) return false
    if (filterHardOnly && !c.isHard) return false
    return true
  })

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 04
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              CONSTRAINT ENGINE
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            संचालन बाधाएं और नियम • Operational & Safety Constraints
          </h1>
          <p className="text-xs text-slate-600">
            Transparent explanation of why railway maintenance blocks cannot be scheduled arbitrarily. Safety rules are treated as hard, inviolable mathematical constraints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/compatibility"
            onClick={() => jumpToSihStep(5)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 05. Compatibility</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Category Pills & Hard/Soft Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-700 mr-1">Constraint Categories:</span>
          {["ALL", "TRAIN", "CORRIDOR", "TIME", "RESOURCE", "SAFETY", "DEPARTMENT"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded px-2.5 py-1 font-bold transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filterHardOnly}
              onChange={(e) => setFilterHardOnly(e.target.checked)}
              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 size-3.5"
            />
            <span>Show Hard Constraints Only (Inviolable)</span>
          </label>
        </div>
      </div>

      {/* Constraints Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredConstraints.map((c) => {
          const isHard = c.isHard
          const severityBadge =
            c.severity === "HIGH"
              ? "bg-rose-100 text-rose-800 border-rose-300"
              : c.severity === "MEDIUM"
              ? "bg-amber-100 text-amber-800 border-amber-300"
              : "bg-slate-100 text-slate-800 border-slate-300"

          return (
            <div
              key={c.constraintId}
              className={`rounded-lg border p-4 shadow-xs transition-all ${
                isHard
                  ? "border-slate-300 bg-white hover:border-slate-400"
                  : "border-slate-200 bg-slate-50/60"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-slate-900">{c.constraintId}</span>
                    <span className="rounded bg-blue-50 px-1.5 py-0.2 font-mono text-[10px] font-bold text-blue-800 border border-blue-200">
                      {c.category} CONSTRAINT
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mt-1">{c.title}</h3>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-black border uppercase tracking-wider ${
                    isHard ? "bg-rose-700 text-white border-rose-800" : "bg-slate-200 text-slate-700 border-slate-300"
                  }`}>
                    {isHard ? "HARD CONSTRAINT" : "SOFT CONSTRAINT"}
                  </span>
                  <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold border ${severityBadge}`}>
                    {c.severity} SEVERITY
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="my-2.5 text-xs text-slate-700 leading-snug">
                {c.description}
              </p>

              {/* Corridor & Tasks Affected */}
              <div className="rounded bg-slate-50 p-2.5 text-[11px] space-y-1 border border-slate-200/80">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Affected Corridor:</span>
                  <span className="font-bold text-slate-800">{c.affectedCorridor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Affected Requirement:</span>
                  <span className="font-mono font-bold text-blue-900">{c.affectedTask}</span>
                </div>
                <div className="border-t border-slate-200/60 pt-1 mt-1">
                  <span className="text-slate-500 font-semibold block">Operational Consequence:</span>
                  <p className="font-semibold text-rose-800 mt-0.5">
                    {c.operationalConsequence}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Safety Philosophy Banner */}
      <div className="rounded-lg bg-slate-100 p-4 border border-slate-300 text-xs text-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900">
            Safety Constraints are Hard Rules: AI never overrides block safety protocols
          </p>
          <p className="text-slate-600 mt-0.5">
            Next, the Compatibility Engine tests if multiple maintenance packages can be executed within a single coordinated block.
          </p>
        </div>
        <Link
          href="/compatibility"
          onClick={() => jumpToSihStep(5)}
          className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors shrink-0"
        >
          <span>Run Compatibility Engine</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}
