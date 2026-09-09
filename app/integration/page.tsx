"use client"

import React from "react"
import { getAllAdapters } from "@/lib/yentrana/adapters"
import { Database, ShieldAlert, CheckCircle2, RefreshCw, Cpu, Server, ExternalLink } from "lucide-react"

export default function IntegrationPage() {
  const adapters = getAllAdapters()

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            डेटा एकीकरण • Data Source Adapter Architecture
          </h1>
          <p className="text-xs text-slate-600">
            Plug-and-play adapter layer designed for future seamless integration with Indian Railways enterprise IT systems (TMS, SMMS, TDMS, COA).
          </p>
        </div>

        <span className="rounded bg-amber-100 px-3 py-1 font-mono text-xs font-black text-amber-900 border border-amber-300">
          ALL FEEDS SIMULATED • SIH-2026 PROTOTYPE
        </span>
      </div>

      {/* Compliance & Security Disclaimer */}
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="size-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-extrabold text-amber-900 uppercase tracking-wide">
              SYSTEM COMPLIANCE NOTICE
            </h3>
            <p className="text-amber-800 mt-0.5 leading-snug">
              This demonstrator uses a local <strong>SyntheticDataAdapter</strong> architecture.
              The application strictly simulates data feeds from Indian Railways digital systems to model operational logic without claiming or accessing confidential production databases.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Diagram / Conceptual Flow */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-3">
          Adapter Layer Integration Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs">
          <div className="rounded bg-slate-50 p-3 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Layer 1: External Railway Systems</span>
            <div className="mt-2 space-y-1 font-mono text-xs font-bold text-slate-800">
              <div className="bg-white p-1 rounded border border-slate-200">TMS (Civil / Track)</div>
              <div className="bg-white p-1 rounded border border-slate-200">TDMS (Traction OHE)</div>
              <div className="bg-white p-1 rounded border border-slate-200">SMMS (Signaling / S&T)</div>
              <div className="bg-white p-1 rounded border border-slate-200">COA & FOIS (Train Ops)</div>
            </div>
          </div>

          <div className="rounded bg-blue-50/70 p-3 border border-blue-200 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-blue-900 uppercase block">Layer 2: Yentrana Adapter Interface</span>
            <div className="my-3 font-mono text-xs font-bold text-blue-800 bg-white p-2 rounded border border-blue-300 shadow-xs">
              IDataSourceAdapter&lt;T&gt;
            </div>
            <p className="text-[11px] text-blue-700 leading-tight">
              Standardized ingestion contract. Current implementation: <strong>SyntheticDataAdapter</strong>. Future production: Direct HTTPS/REST API adapters.
            </p>
          </div>

          <div className="rounded bg-purple-50/70 p-3 border border-purple-200 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-purple-900 uppercase block">Layer 3: Yentrana Intelligence Engine</span>
            <div className="my-3 font-mono text-xs font-bold text-purple-800 bg-white p-2 rounded border border-purple-300 shadow-xs">
              CP-SAT Optimizer & Common View
            </div>
            <p className="text-[11px] text-purple-700 leading-tight">
              Corridor synchronization, conflict detection, explainable AI, and human approval gateway.
            </p>
          </div>
        </div>
      </div>

      {/* 6 System Adapters Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {adapters.map((adapter) => {
          const meta = adapter.getMetadata()
          return (
            <div
              key={meta.systemKey}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="font-mono text-xs font-black text-blue-900">{meta.name}</span>
                  <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-900 border border-amber-300">
                    {meta.status}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900">{meta.fullName}</h3>
                <p className="mt-1 text-xs text-slate-600 leading-snug">
                  {meta.description}
                </p>

                <div className="mt-3 rounded bg-slate-50 p-2.5 text-[11px] space-y-1 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Simulated Records:</span>
                    <span className="font-mono font-bold text-slate-800">{meta.recordCount} records</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Simulated Frequency:</span>
                    <span className="text-slate-700 font-medium">{meta.syncFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Last Ingested:</span>
                    <span className="font-mono text-slate-600 text-[10px]">{meta.lastSyncTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 italic">
                {meta.disclaimer}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
