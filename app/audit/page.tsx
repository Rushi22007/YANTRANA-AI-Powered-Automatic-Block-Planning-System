"use client"

import React, { useState } from "react"
import { useRailMitra } from "@/lib/yentrana/context/yentrana -context"
import { ScrollText, ShieldCheck, Filter, Download, Calendar } from "lucide-react"

export default function AuditPage() {
  const { auditLogs } = useRailMitra()
  const [filterAction, setFilterAction] = useState<string>("ALL")

  const filteredLogs = auditLogs.filter((log) => {
    if (filterAction !== "ALL" && !log.action.includes(filterAction)) return false
    return true
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            ऑडिट लॉग • Immutable Railway Audit Trail
          </h1>
          <p className="text-xs text-slate-600">
            Comprehensive, tamper-evident statutory log of all human authorizations, AI optimization proposals, and field delay reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Audit log export downloaded in official Indian Railways CSV format")}
            className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <Download className="size-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Filter Event:</span>
            {["ALL", "APPROVAL", "WORK_PACKAGE", "OPTIMIZED", "DISRUPTION", "REPLAN"].map((act) => (
              <button
                key={act}
                onClick={() => setFilterAction(act)}
                className={`rounded px-2.5 py-0.5 text-[11px] font-bold transition-colors ${filterAction === act
                  ? "bg-blue-700 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
              >
                {act}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            {filteredLogs.length} Events Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-100/70 font-bold text-slate-700">
              <tr>
                <th className="py-2.5 px-3">Timestamp (IST)</th>
                <th className="py-2.5 px-2">Official / Agent</th>
                <th className="py-2.5 px-2">Role & Dept</th>
                <th className="py-2.5 px-2">Action</th>
                <th className="py-2.5 px-2">Object</th>
                <th className="py-2.5 px-2">Transition (Old → New)</th>
                <th className="py-2.5 px-3">Statutory Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 font-medium">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-2 font-bold text-slate-900 whitespace-nowrap">
                    {log.userName}
                  </td>
                  <td className="py-2.5 px-2 whitespace-nowrap">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700 border border-slate-200">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 font-mono font-bold text-blue-900 whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-2 font-mono text-slate-800 whitespace-nowrap">
                    {log.targetObject}
                  </td>
                  <td className="py-2.5 px-2 font-mono text-[11px] whitespace-nowrap">
                    <span className="text-slate-500">{log.oldValue}</span>
                    <span className="mx-1 text-slate-400">→</span>
                    <span className="font-bold text-emerald-700">{log.newValue}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 text-[11px] max-w-xs">
                    {log.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
