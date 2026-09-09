"use client"

import React from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/yentrana/context/yentrana-context"
import {
  TIER_CONFIG,
  WORKFLOW_STEP_AUTHORITIES,
  hasStepAuthority,
  canApproveBlocks,
  canRunOptimizer,
  canUpdateTelemetry,
} from "@/lib/yentrana/auth/authority"
import { MOCK_USER_PERSONAS } from "@/lib/yentrana/data/mock-data"
import { UserRole, UserTier } from "@/lib/yentrana/types"
import {
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  Wrench,
  FileCheck2,
  Cpu,
  RefreshCw,
  Eye,
} from "lucide-react"

export default function AuthorityMatrixPage() {
  const { currentUser, setUserRole } = useRailMitra()

  const tiers: UserTier[] = [
    "FIELD_EXECUTION",
    "SUPERVISION",
    "PLANNING",
    "OPERATIONS",
    "APPROVAL_MANAGEMENT",
  ]

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#0B4182] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              RBAC ENGINE
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              INDIAN RAILWAYS GOVERNANCE MODEL
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            अधिकार एवं अभिगम मैट्रिक्स • Role-Based Access Control & Authority Matrix
          </h1>
          <p className="text-xs text-slate-600 max-w-3xl mt-0.5">
            Strictly derived from <strong>“YENTRANA AI — ONE-PAGE TEAM CHEAT SHEET” (SIH26027)</strong>. Enforces department-specific authorities, mandatory human-in-the-loop approvals, and hard safety constraints across all 10 workflow steps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50"
          >
            <UserCheck className="size-3.5 text-blue-700" />
            <span>Switch Persona</span>
          </Link>
          <Link
            href="/approvals"
            className="inline-flex items-center gap-1.5 rounded bg-[#0B4182] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#0C2340]"
          >
            <span>Go to 08. Approvals</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Active Session Clearance Card ── */}
      <div className="rounded-xl border border-slate-300 bg-gradient-to-r from-slate-900 via-slate-800 to-[#0B2545] p-5 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-inner">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">{currentUser.name}</h2>
                <span className="rounded bg-amber-400 px-2 py-0.5 font-mono text-[10px] font-extrabold text-black uppercase">
                  {currentUser.clearanceLevel || "L5_STATUTORY"}
                </span>
                <span className="rounded bg-blue-500/30 border border-blue-400/40 px-2 py-0.5 text-[10px] font-bold text-blue-200 uppercase">
                  {currentUser.tier}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                {currentUser.title} {currentUser.designationHindi ? `(${currentUser.designationHindi})` : ""}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                <span>Dept: <strong className="text-slate-200">{currentUser.department}</strong></span>
                <span>•</span>
                <span>Emp ID: <strong className="text-slate-200">{currentUser.employeeId || "IR-2026"}</strong></span>
                <span>•</span>
                <span>Badge: <strong className="text-slate-200">{currentUser.badgeNumber || "OFFICER"}</strong></span>
                <span>•</span>
                <span>Division: <strong className="text-slate-200">{currentUser.division}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 bg-white/10 rounded-lg p-3 border border-white/15 text-right w-full md:w-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Statutory Authority Status
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold">
              {canApproveBlocks(currentUser) ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span className="text-emerald-300">AUTHORIZED TO GRANT BLOCKS (G&SR 4.12)</span>
                </>
              ) : (
                <>
                  <Lock className="size-4 text-rose-400" />
                  <span className="text-rose-300">VIEW / SUBMIT ONLY (NO APPROVAL GRANT)</span>
                </>
              )}
            </div>
            <p className="text-[10px] text-slate-300 max-w-xs text-left md:text-right">
              {canApproveBlocks(currentUser)
                ? "Authorized to grant formal mainline block sanction under Indian Railways rules."
                : "Cannot self-approve blocks. Block sanction is reserved for Divisional Operations (Sr. DOM)."}
            </p>
          </div>
        </div>

        {/* Live Step-by-Step Authority Bar */}
        <div className="mt-5 pt-4 border-t border-slate-700/80">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Active Permissions Across 10-Step Workflow:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5">
            {Array.from({ length: 10 }).map((_, i) => {
              const stepNum = i + 1
              const authorized = hasStepAuthority(currentUser, stepNum)
              const stepInfo = WORKFLOW_STEP_AUTHORITIES[stepNum]
              return (
                <div
                  key={stepNum}
                  className={`flex flex-col items-center justify-center p-2 rounded border text-center transition-all ${authorized
                    ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-200"
                    : "bg-slate-800/80 border-slate-700 text-slate-400 opacity-60"
                    }`}
                  title={`${stepInfo.stepNameEn}: ${authorized ? "Action Authority Permitted" : "View-Only / Restricted"}`}
                >
                  <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                    <span>{stepNum < 10 ? `0${stepNum}` : stepNum}</span>
                    {authorized ? (
                      <CheckCircle2 className="size-3 text-emerald-400" />
                    ) : (
                      <Lock className="size-3 text-slate-400" />
                    )}
                  </div>
                  <span className="text-[9px] font-semibold truncate max-w-full mt-0.5">
                    {stepInfo.stepNameEn.split(" ")[0]}
                  </span>
                  <span className="text-[8px] font-mono mt-0.5 uppercase tracking-tighter">
                    {authorized ? "ACTIVE" : "VIEW"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Section 1: "WHO USES / WHO BENEFITS" (From Cheat Sheet) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
              1. Who Uses / Who Benefits — 5 Operational Tiers
            </h2>
            <p className="text-xs text-slate-500">
              Departmental breakdown and primary authorities defined in the SIH26027 specification.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {tiers.map((t) => {
            const config = TIER_CONFIG[t]
            const isCurrentTier = currentUser.tier === t

            // Find an example persona for this tier to allow quick testing
            const examplePersona = Object.values(MOCK_USER_PERSONAS).find((p) => p.tier === t)

            return (
              <div
                key={t}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${isCurrentTier
                  ? "border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500 dark:bg-blue-950/30"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder}`}>
                      {config.titleEn}
                    </span>
                    {isCurrentTier && (
                      <span className="rounded-full bg-blue-600 px-1.5 py-0.2 text-[8px] font-bold text-white">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {config.titleHi}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                    {config.description}
                  </p>

                  {/* Included Roles List */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Roles Included:
                    </p>
                    <ul className="space-y-0.5">
                      {config.rolesIncluded.map((r) => (
                        <li key={r} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-slate-400" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Authority Scope */}
                  <div className="mt-3 rounded bg-slate-50 dark:bg-slate-800/60 p-2 border border-slate-200 dark:border-slate-700 text-[10px]">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Authority Scope:</span>
                    <span className="text-slate-600 dark:text-slate-400 leading-tight block mt-0.5">
                      {config.primaryAuthority}
                    </span>
                  </div>
                </div>

                {/* Quick Switch Button */}
                {examplePersona && (
                  <button
                    type="button"
                    onClick={() => setUserRole(examplePersona.role)}
                    className={`mt-4 w-full rounded py-1.5 text-xs font-bold transition-colors ${isCurrentTier
                      ? "bg-blue-600 text-white cursor-default"
                      : "border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                  >
                    {isCurrentTier ? "Currently Active" : `Switch to ${examplePersona.name.split(" ")[1] || examplePersona.name}`}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Section 2: End-to-End User Flow Authority Matrix (Table) ── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
              2. End-to-End User Flow & Authority Matrix (Steps 01 – 10)
            </h2>
            <p className="text-xs text-slate-500">
              Departmental action clearance across the entire corridor block planning lifecycle.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                <th className="py-2.5 px-3 font-bold w-12 text-center">Step</th>
                <th className="py-2.5 px-3 font-bold">Lifecycle Stage</th>
                <th className="py-2.5 px-3 font-bold">Purpose / Input (Cheat Sheet)</th>
                <th className="py-2.5 px-3 font-bold">Primary Authorized Tier</th>
                <th className="py-2.5 px-3 font-bold">View / Restricted Tiers</th>
                <th className="py-2.5 px-3 font-bold text-center">Your Active Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {Object.values(WORKFLOW_STEP_AUTHORITIES).map((auth) => {
                const isPermitted = auth.primaryAuthorizedTiers.includes(currentUser.tier)
                return (
                  <tr key={auth.stepNumber} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-center text-slate-700 dark:text-slate-300">
                      {auth.stepNumber < 10 ? `0${auth.stepNumber}` : auth.stepNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{auth.stepNameEn}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{auth.stepNameHi}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 text-[11px] max-w-xs leading-snug">
                      {auth.governanceNote}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {auth.primaryAuthorizedTiers.map((t) => (
                          <span
                            key={t}
                            className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${TIER_CONFIG[t].badgeBg} ${TIER_CONFIG[t].badgeText} border ${TIER_CONFIG[t].badgeBorder}`}
                          >
                            {TIER_CONFIG[t].titleEn.split(" ")[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {auth.viewOnlyTiers.length > 0 ? (
                          auth.viewOnlyTiers.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 text-[9px] text-slate-500 border border-slate-200 dark:border-slate-700"
                            >
                              {TIER_CONFIG[t].titleEn.split(" ")[0]} (View)
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">All Tiers Collaborative</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {isPermitted ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300">
                          <CheckCircle2 className="size-3 text-emerald-600" />
                          <span>AUTHORIZED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400">
                          <Lock className="size-3 text-slate-400" />
                          <span>VIEW ONLY</span>
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 3: Safety & Human-in-the-Loop Principles (Cheat Sheet Verbatim) ── */}
      <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="flex items-start gap-3">
          <ShieldAlert className="size-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-amber-950 dark:text-amber-300">
              Safety + Human-in-the-Loop Governance Charter (SIH26027 Specification)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs text-amber-900 dark:text-amber-400">
              <div className="rounded border border-amber-200 bg-white/70 p-3 dark:border-amber-900/40 dark:bg-slate-900/50">
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                  1. AI Recommends. Railway Authority Decides.
                </p>
                <p className="text-[11px] leading-relaxed">
                  Yentrana AI does not automate the railway worker; it automates the complexity around the worker. Block authorization remains strictly under authorized divisional officers.
                </p>
              </div>

              <div className="rounded border border-amber-200 bg-white/70 p-3 dark:border-amber-900/40 dark:bg-slate-900/50">
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                  2. Safety Rules Are Hard Constraints.
                </p>
                <p className="text-[11px] leading-relaxed">
                  Yentrana must not autonomously grant blocks, control signals or OHE power isolations, override rules, or dictate track maintenance procedures.
                </p>
              </div>

              <div className="rounded border border-amber-200 bg-white/70 p-3 dark:border-amber-900/40 dark:bg-slate-900/50">
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                  3. Constraint-Aware Bundling.
                </p>
                <p className="text-[11px] leading-relaxed">
                  Do not blindly merge nearby jobs. Combine Engineering + TRD + S&T only when location, timing, block type, crew resources, stabling, and track restoration permit it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
