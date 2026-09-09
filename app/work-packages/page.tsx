"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRailMitra } from "@/lib/railmitra/context/railmitra-context"
import { DEPARTMENTS } from "@/lib/railmitra/types"
import { Package, ArrowRight, CheckCircle2, ShieldCheck, Clock, Users, Wrench, Layers, AlertTriangle } from "lucide-react"

export default function WorkPackagesPage() {
  const { workPackages, addWorkPackageToCommonView, jumpToSihStep } = useRailMitra()
  const [successToast, setSuccessToast] = useState<string | null>(null)

  const handleAddToCommonView = (pkgId: string) => {
    addWorkPackageToCommonView(pkgId)
    setSuccessToast(`Work Package ${pkgId} successfully synchronized into Common Corridor View!`)
    setTimeout(() => setSuccessToast(null), 3000)
  }

  return (
    <div className="space-y-4">
      {/* Workflow Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-700 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
              STEP 02
            </span>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              CORE WORKFLOW PIPELINE
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
            कार्य पैकेज • Executable Work Packages
          </h1>
          <p className="text-xs text-slate-600">
            Conversion of raw maintenance requirements into fully packaged, resource-backed requisitions ready for corridor-level bundling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/common-view"
            onClick={() => jumpToSihStep(3)}
            className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors"
          >
            <span>Proceed to 03. Common View</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Success Banner */}
      {successToast && (
        <div className="flex items-center gap-2 rounded bg-emerald-50 p-2.5 border border-emerald-300 text-xs font-bold text-emerald-800 animate-fade-in">
          <CheckCircle2 className="size-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Work Package Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workPackages.map((wp) => {
          const dept = DEPARTMENTS[wp.department]
          const isAdded = wp.status === "IN_COMMON_VIEW"

          return (
            <div
              key={wp.packageId}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 transition-all"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-blue-900">{wp.packageId}</span>
                      <span className={`inline-block rounded px-1.5 py-0.2 text-[10px] font-bold border ${dept.badgeBg}`}>
                        {dept.nameEn}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 mt-1">{wp.assetName}</h3>
                  </div>

                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    wp.priority === "CRITICAL"
                      ? "bg-rose-100 text-rose-800"
                      : wp.priority === "HIGH"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {wp.priority}
                  </span>
                </div>

                {/* Section & Location Details */}
                <div className="my-3 space-y-1.5 text-xs">
                  <div className="flex justify-between py-0.5 border-b border-slate-50">
                    <span className="text-slate-500">Corridor Section:</span>
                    <span className="font-bold text-slate-800">{wp.section} ({wp.location})</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-50">
                    <span className="text-slate-500">Maintenance Type:</span>
                    <span className="font-medium text-slate-800">{wp.maintenanceType}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-50">
                    <span className="text-slate-500">Block Duration:</span>
                    <span className="font-mono font-bold text-blue-900">{wp.durationMinutes} min</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-50">
                    <span className="text-slate-500">Block Classification:</span>
                    <span className="rounded bg-slate-100 px-1 font-mono text-[10px] font-bold text-slate-700">
                      {wp.blockType}
                    </span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-50">
                    <span className="text-slate-500">Allocated Crew:</span>
                    <span className="text-slate-800 font-medium">{wp.crew}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-50">
                    <span className="text-slate-500">Machine / Resources:</span>
                    <span className="text-slate-800 font-medium">{wp.resources}</span>
                  </div>
                </div>

                {/* Safety & Dependencies */}
                <div className="rounded bg-slate-50 p-2 text-[11px] space-y-1 border border-slate-100 mb-3">
                  <p className="font-bold text-slate-700 flex items-center gap-1">
                    <ShieldCheck className="size-3 text-emerald-600" />
                    Safety Protocols:
                  </p>
                  <p className="text-slate-600 pl-4">{wp.safetyRequirements.join(", ")}</p>

                  <p className="font-bold text-slate-700 flex items-center gap-1 pt-1">
                    <AlertTriangle className="size-3 text-amber-600" />
                    Dependencies:
                  </p>
                  <p className="text-slate-600 pl-4">{wp.dependencies.join(", ")}</p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div className="text-[10px]">
                  <span className="text-slate-400">Status: </span>
                  <span className={`font-bold ${isAdded ? "text-emerald-700" : "text-amber-700"}`}>
                    {wp.status.replace(/_/g, " ")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCommonView(wp.packageId)}
                  disabled={isAdded}
                  className={`inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs font-bold transition-colors ${
                    isAdded
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                      : "bg-blue-700 text-white hover:bg-blue-800 shadow-xs"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="size-3.5" />
                      IN COMMON VIEW
                    </>
                  ) : (
                    <>
                      <Layers className="size-3.5" />
                      ADD TO COMMON VIEW
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Workflow Navigation Banner */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
            Ready for Corridor Coordination?
          </h4>
          <p className="text-xs text-blue-800 mt-0.5">
            All 3 department packages (Engineering, TRD, and S&T) are packaged. Head to the Common View to visualize mutual overlaps.
          </p>
        </div>
        <Link
          href="/common-view"
          onClick={() => jumpToSihStep(3)}
          className="inline-flex items-center gap-1.5 rounded bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition-colors shrink-0"
        >
          <span>Open Common Corridor View</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}
