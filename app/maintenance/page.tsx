"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/yentrana/context/yentrana-context"
import { DEPARTMENTS } from "@/lib/yentrana/types"
import { Wrench, Zap, Radio, AlertTriangle, ArrowRight, CheckCircle2, PlusCircle, ShieldCheck } from "lucide-react"

export default function MaintenanceNeedPage() {
  const { maintenanceNeeds, jumpToSihStep } = useRailMitra()
  const [activeTab, setActiveTab] = useState<string>("ALL")
  const [selectedTask, setSelectedTask] = useState<string>("ENG-1042")

  const filtered = maintenanceNeeds.filter((m) => {
    if (activeTab === "ALL") return true
    return m.department === activeTab
  })

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 01
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              CORE WORKFLOW PIPELINE
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            रखरखाव की आवश्यकताएं • Maintenance Need Requisitions
          </h1>
          <p className="text-xs text-slate-600">
            Decentralized maintenance requirements received from Engineering (P-Way/Bridges), TRD (OHE/Traction), and S&T (Signaling/Telecom).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/work-packages"
            onClick={() => jumpToSihStep(2)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 02. Work Packages</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* 3 Department Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Engineering */}
        <div
          onClick={() => setActiveTab("ENGINEERING")}
          className={`cursor-pointer rounded border p-3 transition-all ${activeTab === "ENGINEERING"
            ? "border-sky-500 bg-sky-50/60 shadow-xs ring-1 ring-sky-400"
            : "border-slate-200 bg-white hover:border-slate-300"
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded bg-sky-100 text-sky-700">
                <Wrench className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-sky-950">इंजीनियरिंग • Engineering</p>
                <p className="text-[10px] text-slate-500">Track, USFD defects, Bridges, Machine tamping</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-sky-800">
              {maintenanceNeeds.filter((n) => n.department === "ENGINEERING").length}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-600 leading-snug">
            Requires <strong>Traffic Blocks</strong> with line protection. Dominant asset: Track rail tamping (CSM 09-3X).
          </p>
        </div>

        {/* TRD */}
        <div
          onClick={() => setActiveTab("TRD")}
          className={`cursor-pointer rounded border p-3 transition-all ${activeTab === "TRD"
            ? "border-orange-500 bg-orange-50/60 shadow-xs ring-1 ring-orange-400"
            : "border-slate-200 bg-white hover:border-slate-300"
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded bg-orange-100 text-orange-700">
                <Zap className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-orange-950">ट्रैक्शन (TRD) • Traction</p>
                <p className="text-[10px] text-slate-500">OHE catenary, droppers, isolators, power blocks</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-orange-800">
              {maintenanceNeeds.filter((n) => n.department === "TRD").length}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-600 leading-snug">
            Requires <strong>Power Blocks</strong> with 25kV power shut-down permit and earthing rods.
          </p>
        </div>

        {/* S&T */}
        <div
          onClick={() => setActiveTab("SNT")}
          className={`cursor-pointer rounded border p-3 transition-all ${activeTab === "SNT"
            ? "border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-400"
            : "border-slate-200 bg-white hover:border-slate-300"
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded bg-emerald-100 text-emerald-700">
                <Radio className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-950">सिग्नल & टेलीकॉम • S&T</p>
                <p className="text-[10px] text-slate-500">Point machines, axle counters, EI interlocking</p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-emerald-800">
              {maintenanceNeeds.filter((n) => n.department === "SNT").length}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-600 leading-snug">
            Requires <strong>Disconnection Memos (T/351)</strong>. Non-invasive sensor checks can shadow traffic blocks.
          </p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">Filter Department:</span>
            {["ALL", "ENGINEERING", "TRD", "SNT"].map((d) => (
              <button
                key={d}
                onClick={() => setActiveTab(d)}
                className={`rounded px-2.5 py-0.5 text-[11px] font-bold transition-colors ${activeTab === d
                  ? "bg-blue-700 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
              >
                {d === "ALL" ? "सभी / All (6)" : d}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500">
            Click a row to inspect full safety & crew requirement
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-100/80 font-bold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Task ID</th>
                <th className="py-2.5 px-2">Department</th>
                <th className="py-2.5 px-2">Asset Type</th>
                <th className="py-2.5 px-2">Location / Section</th>
                <th className="py-2.5 px-2">Maintenance Need</th>
                <th className="py-2.5 px-2">Criticality</th>
                <th className="py-2.5 px-2">Overdue</th>
                <th className="py-2.5 px-2">Duration</th>
                <th className="py-2.5 px-2">Block Type</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const isSelected = selectedTask === item.taskId
                const priorityBadge =
                  item.priority === "CRITICAL"
                    ? "bg-rose-100 text-rose-800 border-rose-300"
                    : item.priority === "HIGH"
                      ? "bg-orange-100 text-orange-800 border-orange-300"
                      : item.priority === "MEDIUM"
                        ? "bg-amber-100 text-amber-800 border-amber-300"
                        : "bg-emerald-100 text-emerald-800 border-emerald-300"

                return (
                  <tr
                    key={item.taskId}
                    onClick={() => setSelectedTask(item.taskId)}
                    className={`cursor-pointer transition-colors hover:bg-blue-50/50 ${isSelected ? "bg-blue-50/80 font-semibold" : ""
                      }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-900">{item.taskId}</td>
                    <td className="py-2.5 px-2">
                      <span className={`inline-block rounded px-1.5 py-0.2 text-[10px] font-bold border ${DEPARTMENTS[item.department].badgeBg}`}>
                        {DEPARTMENTS[item.department].nameEn}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-800">{item.assetType}</td>
                    <td className="py-2.5 px-2 text-slate-700 font-mono text-[11px]">{item.location}</td>
                    <td className="py-2.5 px-2 text-slate-800 max-w-xs truncate">{item.maintenanceNeed}</td>
                    <td className="py-2.5 px-2">
                      <span className={`inline-block rounded px-1.5 py-0.2 text-[10px] font-bold border ${priorityBadge}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-mono font-bold text-rose-700">
                      {item.overdueDays} days
                    </td>
                    <td className="py-2.5 px-2 font-mono">{item.durationMinutes} min</td>
                    <td className="py-2.5 px-2">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-700 border border-slate-300">
                        {item.blockRequired}
                      </span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <Link
                        href="/work-packages"
                        className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[11px] font-bold text-white hover:bg-slate-900 transition-colors"
                      >
                        Pack WP <ArrowRight className="size-3" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Task Deep Details Panel */}
        {(() => {
          const detail = maintenanceNeeds.find((n) => n.taskId === selectedTask)
          if (!detail) return null
          return (
            <div className="border-t border-slate-200 bg-slate-50/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-blue-900">{detail.taskId}</span>
                  <span className="font-bold text-slate-800">• {detail.maintenanceNeed}</span>
                </div>
                <span className="font-mono text-xs text-slate-500">Source: {detail.source} • Reported: {detail.reportedDate}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded bg-white p-2.5 border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Crew & Manpower:</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{detail.crewRequirement}</p>
                </div>
                <div className="rounded bg-white p-2.5 border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Machinery & Tools:</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{detail.machineRequirement || "Manual Tooling / Hand Tools"}</p>
                </div>
                <div className="rounded bg-white p-2.5 border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Safety & Site Protection:</p>
                  <p className="font-semibold text-rose-800 mt-0.5">{detail.safetyNotes}</p>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
