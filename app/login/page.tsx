"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  DigitalIndiaLogo,
  Ux4gLogo,
  SihLogo,
} from "@/components/government/emblems"
import { useRailMitra } from "@/lib/yentrana/context/yentrana -context"
import { MOCK_USER_PERSONAS } from "@/lib/yentrana/data/mock-data"
import { TIER_CONFIG } from "@/lib/yentrana/auth/authority"
import type { UserRole, UserTier } from "@/lib/yentrana/types"
import {
  ShieldCheck,
  ArrowRight,
  UserCircle2,
  CheckCircle2,
  Lock,
  ExternalLink,
  Sparkles,
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { currentUser, setUserRole } = useRailMitra()
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role)
  const [activeTierFilter, setActiveTierFilter] = useState<UserTier | "ALL">("ALL")

  const selectedPersona = MOCK_USER_PERSONAS[selectedRole] || MOCK_USER_PERSONAS.ADMIN

  const handleLogin = () => {
    setUserRole(selectedRole)
    router.push("/dashboard")
  }

  // Filter unique personas (avoid duplicate ADMIN alias)
  const personasList = Object.values(MOCK_USER_PERSONAS).filter((p, index, self) =>
    index === self.findIndex((t) => t.name === p.name && t.role === p.role)
  )

  const filteredPersonas = activeTierFilter === "ALL"
    ? personasList
    : personasList.filter((p) => p.tier === activeTierFilter)

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-8 px-4 sm:px-6">
      {/* ── Partner Government Projects Showcase Ribbon ── */}
      <div className="w-full max-w-4xl mb-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/90 px-4 py-2.5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-xs">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF7700]" />
          <span>Govt of India Portals • SIH-2026</span>
        </div>
        <div className="flex items-center gap-4">
          <DigitalIndiaLogo className="h-6" />
          <Ux4gLogo className="h-5" />
          <SihLogo className="h-5" />
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl border border-slate-300 shadow-md p-6 sm:p-8 relative overflow-hidden dark:bg-slate-900 dark:border-slate-700">
        {/* National Tricolor Accent Ribbon */}
        <div className="absolute top-0 left-0 right-0 ux4g-tricolor-strip" />

        {/* Header with Same Logos as Portal Header */}
        <div className="flex flex-col items-center text-center pt-2 pb-5 border-b border-slate-200 dark:border-slate-800">
          {/* 3 Logos Row matching the Header */}
          <div className="flex items-center justify-center gap-4 sm:gap-7 mb-3 select-none flex-wrap">
            {/* 1. Indian Railways Emblem & Text */}
            <div className="flex items-center gap-2.5">
              <img
                src="/Indian Railways Red Emblem.png"
                alt="Indian Railways"
                className="size-11 sm:size-13 object-contain drop-shadow-xs shrink-0"
              />
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs sm:text-sm font-black tracking-wider text-slate-900 dark:text-white whitespace-nowrap">
                  INDIAN RAILWAYS
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-semibold text-slate-500 mt-1 whitespace-nowrap">
                  Serving the Nation
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-9 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

            {/* 2. Yantrana Center Logo */}
            <div className="flex items-center gap-2.5">
              <img
                src="/yantrana-logo.png"
                alt="Yantrana Logo"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-xs shrink-0"
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-9 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

            {/* 3. Ministry of Railways Official State Emblem & Text */}
            <div className="flex items-center gap-2.5">
              <img
                src="/ministry-of-railways-emblem.png"
                alt="Ministry of Railways"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-2xs shrink-0"
              />
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs sm:text-sm font-black tracking-wider text-slate-900 dark:text-white whitespace-nowrap">
                  MINISTRY OF RAILWAYS
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-500 mt-1 whitespace-nowrap">
                  Government of India
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-lg sm:text-2xl font-black text-[#0B4182] dark:text-blue-400 tracking-tight mt-1">
            AI Powered Automatic Block Planning System
          </h1>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
            Optimized Maintenance Block Planning for Maximum Asset Availability
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10.5px] font-bold">
            <ShieldCheck className="size-3.5 text-blue-700 dark:text-blue-400" />
            <span>YENTRANA AI • SECURE ACCESS GATEWAY</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Role-Based Access Control (RBAC) across 5 Operational Tiers (SIH26027 Specification)
          </p>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-center dark:bg-amber-950/30 dark:border-amber-900">
          <p className="text-xs font-bold text-amber-900 dark:text-amber-300 tracking-wide">
            ⚠️ DEMO ENVIRONMENT — SYNTHETIC DEPARTMENTAL ACCESS
          </p>
          <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-0.5">
            Select any operational persona below to test department-specific decision support workflows, statutory approval guards, and hard safety constraints.
          </p>
        </div>

        {/* Tier Filter Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Filter by Operational Tier:
            </label>
            <Link
              href="/authority-matrix"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B4182] hover:underline dark:text-blue-400"
            >
              <span>View Full Authority Matrix</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTierFilter("ALL")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${activeTierFilter === "ALL"
                ? "bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              All Tiers ({personasList.length})
            </button>
            {(["FIELD_EXECUTION", "SUPERVISION", "PLANNING", "OPERATIONS", "APPROVAL_MANAGEMENT"] as UserTier[]).map((t) => {
              const cfg = TIER_CONFIG[t]
              const isCurrent = activeTierFilter === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTierFilter(t)}
                  className={`px-2.5 py-1.5 rounded text-xs font-bold transition-all ${isCurrent
                    ? "bg-[#0B4182] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                >
                  {cfg.titleEn.split(" ")[0]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Persona Cards Grid */}
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredPersonas.map((persona) => {
              const isSelected = selectedRole === persona.role
              const tierCfg = TIER_CONFIG[persona.tier]

              return (
                <button
                  key={persona.role}
                  type="button"
                  onClick={() => setSelectedRole(persona.role as UserRole)}
                  className={`flex flex-col text-left p-3 rounded-lg border transition-all ${isSelected
                    ? "border-[#0B4182] bg-blue-50/80 shadow-xs ring-2 ring-[#0B4182] dark:bg-blue-950/40 dark:border-blue-400"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`rounded px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wider ${tierCfg.badgeBg} ${tierCfg.badgeText} border ${tierCfg.badgeBorder}`}>
                      {tierCfg.titleEn.split(" ")[0]}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="size-4 text-[#0B4182] dark:text-blue-400" />
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-900 dark:text-white mt-1.5 truncate">
                    {persona.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {persona.title}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {persona.division}
                  </span>

                  <div className="mt-2.5 flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[9px] font-mono">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {persona.department}
                    </span>
                    <span className="text-slate-500">
                      {persona.clearanceLevel || "L2_SECTIONAL"}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Persona Authority Breakdown Panel */}
        <div className="mt-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                Selected Persona Authority:
              </span>
              <span className="font-bold text-blue-900 dark:text-blue-300 text-xs">
                {selectedPersona.name} ({selectedPersona.title})
              </span>
            </div>
            <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${TIER_CONFIG[selectedPersona.tier].badgeBg} ${TIER_CONFIG[selectedPersona.tier].badgeText}`}>
              Tier: {TIER_CONFIG[selectedPersona.tier].titleEn}
            </span>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            {TIER_CONFIG[selectedPersona.tier].primaryAuthority}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1">
              {selectedPersona.canApproveBlocks ? (
                <CheckCircle2 className="size-3 text-emerald-600" />
              ) : (
                <Lock className="size-3 text-slate-400" />
              )}
              <span>Statutory Block Approval: <strong>{selectedPersona.canApproveBlocks ? "YES (Apex/DOM)" : "NO (Restricted)"}</strong></span>
            </span>

            <span className="flex items-center gap-1">
              {selectedPersona.canRunOptimizer ? (
                <CheckCircle2 className="size-3 text-emerald-600" />
              ) : (
                <Lock className="size-3 text-slate-400" />
              )}
              <span>CP-SAT Optimizer Runs: <strong>{selectedPersona.canRunOptimizer ? "YES" : "NO"}</strong></span>
            </span>

            <span className="flex items-center gap-1">
              {selectedPersona.canUpdateFieldTelemetry ? (
                <CheckCircle2 className="size-3 text-emerald-600" />
              ) : (
                <Lock className="size-3 text-slate-400" />
              )}
              <span>Live Site Telemetry: <strong>{selectedPersona.canUpdateFieldTelemetry ? "YES" : "NO"}</strong></span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>Role-Based Access Control (RBAC) G&SR Rule 4.12 Verified</span>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B4182] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#0C2340] focus:ring-2 focus:ring-[#4A2BC2] focus:outline-none transition-colors"
          >
            <span>Authenticate & Enter System</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
