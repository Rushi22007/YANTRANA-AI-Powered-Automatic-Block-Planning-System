"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/yentrana/context/yentrana -context"
import { canApproveBlocks } from "@/lib/yentrana/auth/authority"
import {
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertTriangle,
  Clock,
  Building2,
  Sparkles,
  UserCheck,
} from "lucide-react"

export default function ApprovalsPage() {
  const {
    currentUser,
    setUserRole,
    optimizedPlan,
    approvePlan,
    rejectPlan,
    requestRevision,
    jumpToSihStep,
  } = useRailMitra()

  const [modalType, setModalType] = useState<"REVISE" | "REJECT" | null>(null)
  const [reasonText, setReasonText] = useState<string>("")
  const [approvalNote, setApprovalNote] = useState<string>("")

  const handleApprove = () => {
    approvePlan(approvalNote || "Authorized per Sectional Rolling Block Protocol. Safety buffers verified.")
  }

  const handleModalSubmit = () => {
    if (!reasonText.trim()) {
      alert("A valid justification is mandatory under Indian Railways operating rules.")
      return
    }
    if (modalType === "REVISE") {
      requestRevision(reasonText)
    } else if (modalType === "REJECT") {
      rejectPlan(reasonText)
    }
    setModalType(null)
    setReasonText("")
  }

  const isApproved = optimizedPlan.status === "APPROVED"
  const isRejected = optimizedPlan.status === "REJECTED"
  const isRevision = optimizedPlan.status === "REVISION_REQUESTED"

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 08
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              MANDATORY GOVERNANCE GATEWAY
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            मानव अनुमोदन • Statutory Human Approval Console
          </h1>
          <p className="text-xs text-slate-600">
            Railway safety regulations prohibit autonomous AI execution. An authorized railway officer must review the multi-department proposal and grant formal sanction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/execution"
            onClick={() => jumpToSihStep(9)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 09. Execution</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Mandatory Governance Alert */}
      <div className="rounded-lg border border-amber-300 bg-amber-50/90 p-3 text-xs text-amber-950 flex items-start gap-2.5">
        <AlertTriangle className="size-4 shrink-0 text-amber-700 mt-0.5" />
        <div>
          <p className="font-extrabold text-amber-900">
            SAFETY & LEGAL COMPLIANCE: ZERO AUTONOMOUS BLOCK GRANTS
          </p>
          <p className="text-amber-800 mt-0.5 text-[11px] leading-snug">
            Yentrana AI acts solely as intelligent decision support. No block request is transmitted to the Control Office Application (COA) or physically granted on track without explicit approval by the Divisional Rolling Block Planning Officer.
          </p>
        </div>
      </div>

      {/* Block B-104 Authorization Dossier Card */}
      <div className="rounded-lg border-2 border-slate-300 bg-white shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="rounded bg-blue-700 px-2 py-1 font-mono text-xs font-black text-white">
              BLOCK {optimizedPlan.planId}
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Coordinated Multi-Department Block Dossier
              </h2>
              <p className="text-[10px] text-slate-500 font-mono">
                Corridor: {optimizedPlan.corridor} • Date: {optimizedPlan.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <span className={`rounded px-2.5 py-1 text-xs font-black uppercase tracking-wider ${isApproved
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : isRejected
                ? "bg-rose-100 text-rose-800 border border-rose-300"
                : isRevision
                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                  : "bg-blue-100 text-blue-800 border border-blue-300 animate-pulse"
              }`}>
              {optimizedPlan.status.replace(/_/g, " ")}
            </span>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="p-4 space-y-4">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Proposed Window</span>
              <span className="font-mono text-sm font-black text-blue-900 mt-0.5 block">
                {optimizedPlan.proposedStart} – {optimizedPlan.proposedEnd}
              </span>
              <span className="text-[10px] text-slate-500">{optimizedPlan.durationMinutes} minutes block</span>
            </div>

            <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">AI Recommendation</span>
              <span className="font-bold text-sm text-emerald-700 mt-0.5 block flex items-center gap-1">
                <Sparkles className="size-3.5" /> HIGH CONFIDENCE
              </span>
              <span className="text-[10px] text-slate-500">Score: {optimizedPlan.confidenceScore}%</span>
            </div>

            <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Train Impact</span>
              <span className="font-bold text-sm text-emerald-700 mt-0.5 block">
                {optimizedPlan.trainImpactScore} IMPACT
              </span>
              <span className="text-[10px] text-slate-500">Conflicts: {optimizedPlan.conflictsResolved} resolved</span>
            </div>

            <div className="rounded bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Bundled Tasks</span>
              <span className="font-bold text-sm text-purple-900 mt-0.5 block">
                {optimizedPlan.bundledTasks.length} Tasks Bundled
              </span>
              <span className="text-[10px] text-slate-500">Eng + TRD + S&T</span>
            </div>
          </div>

          {/* AI Justification Summary */}
          <div className="rounded-lg bg-blue-50/60 p-3.5 border border-blue-200 text-xs">
            <h4 className="font-bold text-blue-950 flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="size-4 text-blue-700" />
              Operational Justification Summary:
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Combined compatible activities into one single 120-minute block (04:15–06:15) while avoiding forecast container goods movement CONRAJ-0310 at 03:10.
              All safety restoration buffers (15 min) are preserved prior to morning passenger express service (Train 12124 Deccan Queen).
            </p>
          </div>

          {/* Approval Log Record (If already decided) */}
          {optimizedPlan.approvalLog?.approvedBy && (
            <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-300 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                <UserCheck className="size-4 text-emerald-700" />
                <span>Recorded Authorization Sign-off:</span>
              </div>
              <p className="text-emerald-950">
                <strong>Officer:</strong> {optimizedPlan.approvalLog.approvedBy}
              </p>
              <p className="text-emerald-900 text-[11px]">
                <strong>Timestamp:</strong> {optimizedPlan.approvalLog.approvedAt}
              </p>
              <p className="text-emerald-800 text-[11px] mt-0.5 italic">
                “{optimizedPlan.approvalLog.comments || optimizedPlan.approvalLog.revisionReason}”
              </p>
            </div>
          )}

          {/* Officer Approval Action Box */}
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs">
                <span className="font-bold text-slate-700">Acting Official: </span>
                <span className="font-bold text-blue-900">{currentUser.name} ({currentUser.title})</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Department: {currentUser.department}</span>
            </div>

            {/* Statutory Authority Guard */}
            {canApproveBlocks(currentUser) ? (
              <>
                <div className="rounded border border-emerald-300 bg-emerald-50/80 p-2.5 text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-700" />
                    <div>
                      <span className="font-bold">Statutory Authority Confirmed:</span>{" "}
                      <span>Authorized to grant mainline block under Indian Railways G&SR Rule 4.12.</span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-700 px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                    Clearance: Sr. DOM / Apex
                  </span>
                </div>

                {!isApproved && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">
                      Approval Endorsement Notes (Statutory Record):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Authorized per Sectional Rolling Block Protocol. Safety buffers verified."
                      value={approvalNote}
                      onChange={(e) => setApprovalNote(e.target.value)}
                      className="mt-1 w-full rounded border border-slate-300 bg-white p-2 text-xs font-medium focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setModalType("REVISE")}
                    className="rounded border border-amber-400 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
                  >
                    [ RETURN FOR REVISION ]
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalType("REJECT")}
                    className="rounded border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100 transition-colors"
                  >
                    [ REJECT PLAN ]
                  </button>

                  <button
                    type="button"
                    onClick={handleApprove}
                    className="inline-flex items-center gap-1.5 rounded bg-emerald-700 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
                  >
                    <CheckCircle2 className="size-4" />
                    <span>[ APPROVE BLOCK B-104 ]</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-amber-400 bg-amber-50/70 p-4 text-xs text-amber-950">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="size-5 shrink-0 text-amber-700 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <p className="font-extrabold text-amber-900 text-sm tracking-tight">
                      🔒 STATUTORY BLOCK AUTHORIZATION RESTRICTED
                    </p>
                    <p className="text-amber-800 text-xs leading-relaxed">
                      Under Indian Railways Operating Code and General & Subsidiary Rules (G&SR Rule 4.12), maintenance requesting departments (Engineering, TRD, S&T) and planning cells cannot self-approve blocks on running lines.
                    </p>
                    <p className="text-[11px] text-amber-900 font-semibold pt-1">
                      Statutory Authority: <strong>Senior Divisional Operations Manager (Sr. DOM)</strong> or <strong>Divisional Management (DRM/ADRM)</strong>.
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-700">
                      <span>Currently Authenticated:</span>
                      <span className="font-bold text-slate-900">{currentUser.name}</span>
                      <span className="rounded bg-slate-200 px-1.5 py-0.2 font-mono text-[10px]">
                        {currentUser.title} ({currentUser.tier || "SUPERVISION"})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span className="text-[11px] text-amber-800 italic">
                    SIH Demo Evaluator: Switch persona to Sr. DOM to test formal authorization.
                  </span>
                  <button
                    type="button"
                    onClick={() => setUserRole("SR_DOM")}
                    className="inline-flex items-center gap-1.5 rounded bg-[#0B4182] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#0C2340] transition-colors"
                  >
                    <span>Switch to Sr. DOM (Management)</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rejection / Revision Reason Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl border border-slate-300 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              {modalType === "REVISE" ? "Return Block for Revision" : "Reject Maintenance Block Plan"}
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Under Indian Railways rules, a statutory written justification is mandatory for auditing.
            </p>

            <textarea
              rows={4}
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="State operational grounds (e.g. VIP train passage, severe weather forecast, material gang shortage)..."
              className="w-full rounded border border-slate-300 p-2.5 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setModalType(null)}
                className="rounded px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="rounded bg-rose-700 px-4 py-1.5 text-xs font-bold text-white hover:bg-rose-800"
              >
                Submit Statutory Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation to Execution */}
      <div className="rounded-lg bg-blue-50 p-4 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
            Plan Approved • Ready for Field Execution Telemetry
          </h4>
          <p className="text-xs text-blue-800 mt-0.5">
            Proceed to the Live Execution Tracking console to follow gang progress, power cut-off, and track restoration.
          </p>
        </div>
        <Link
          href="/execution"
          onClick={() => jumpToSihStep(9)}
          className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors shrink-0"
        >
          <span>Open Live Execution Tracking</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}
