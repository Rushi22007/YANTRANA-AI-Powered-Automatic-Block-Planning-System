"use client"

import React from "react"
import Link from "next/link"
import { Menu, PanelLeft, PanelLeftClose, ChevronDown, ShieldCheck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RailRajbhashaTicker } from "@/components/government/rail-rajbhasha-ticker"
import { useRailMitra } from "@/lib/yentrana/context/yentrana-context"
import { MOCK_USER_PERSONAS } from "@/lib/yentrana/data/mock-data"
import type { UserRole } from "@/lib/yentrana/types"

export function Header({
  collapsed = false,
  onToggleDesktop,
  onToggleMobile,
}: {
  collapsed?: boolean
  onToggleDesktop: () => void
  onToggleMobile: () => void
}) {
  const { currentUser, setUserRole, formattedLiveTime, t } = useRailMitra()

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-200 bg-white shadow-xs w-full">
      {/* ── Main Portal Header Bar with Equal Symmetrical Gaps Between All Sections ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 w-full min-h-[76px] gap-2 sm:gap-4 lg:gap-6">
        {/* Section 1: Sidebar Toggle & Official Indian Railways Crest */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-700 hover:bg-slate-100 md:hidden h-9 w-9 shrink-0"
            onClick={onToggleMobile}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>

          {/* Desktop Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-slate-700 hover:bg-slate-100 hover:text-slate-900 md:inline-flex h-9 w-9 shrink-0"
            onClick={onToggleDesktop}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeft className="size-5 text-blue-700" /> : <PanelLeftClose className="size-5" />}
          </Button>

          <div className="hidden md:block h-8 w-px bg-slate-200 shrink-0" />

          {/* Indian Railways Crest & Text (Clean, No Hover Menu or Tooltip) */}
          <div className="flex items-center gap-3 select-none">
            <div className="relative size-11 sm:size-12 shrink-0 flex items-center justify-center">
              <img
                src="/Indian Railways Red Emblem.png"
                alt="Indian Railways"
                className="size-full object-contain drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col justify-center leading-none text-left">
              <span className="text-sm sm:text-base md:text-[15px] font-black tracking-wider text-slate-900 whitespace-nowrap">
                {t("indianRailways", "INDIAN RAILWAYS")}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-1 tracking-normal whitespace-nowrap">
                {t("servingNation", "Serving the Nation")}
              </span>
            </div>
          </div>
        </div>

        {/* Divider 1: Between Section 1 and Section 2 */}
        <div className="hidden xl:block h-8 w-px bg-slate-200 shrink-0" />

        {/* Section 2: Yantrana Logo + System Title & Subtitle */}
        <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
          <img
            src="/yantrana-logo.png"
            alt="Yantrana Logo"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0 drop-shadow-xs"
          />
          <div className="flex flex-col justify-center text-left leading-none min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-[17px] font-black text-[#0B4182] leading-tight tracking-tight whitespace-nowrap">
              {t("systemTitle", "AI Powered Automatic Block Planning System")}
            </h1>
            <p className="hidden sm:block text-[10px] sm:text-[11px] md:text-[11.5px] font-semibold text-slate-600 leading-snug mt-1 whitespace-nowrap">
              {t("systemSubtitle", "Optimized Maintenance Block Planning for Maximum Asset Availability")}
            </p>
          </div>
        </div>

        {/* Divider 2: Between Section 2 and Section 3 */}
        <div className="hidden xl:block h-8 w-px bg-slate-200 shrink-0" />

        {/* Section 3: Ministry of Railways Official State Emblem & Title */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <img
            src="/ministry-of-railways-emblem.png"
            alt="Ministry of Railways"
            className="h-10 sm:h-11 w-auto object-contain shrink-0 drop-shadow-2xs"
          />
          <div className="flex flex-col justify-center leading-none text-left">
            <span className="text-xs sm:text-[13px] font-black tracking-wider text-slate-900 whitespace-nowrap">
              {t("minRailways", "MINISTRY OF RAILWAYS")}
            </span>
            <span className="text-[10px] font-medium text-slate-500 mt-1 whitespace-nowrap">
              {t("govIndia", "Government of India")}
            </span>
          </div>
        </div>

        {/* Divider 3: Between Section 3 and Section 4 */}
        <div className="hidden xl:block h-8 w-px bg-slate-200 shrink-0" />

        {/* Section 4: User Profile Pill & Interactive Persona Switcher (Stakeholder Section) */}
        <div className="flex items-center shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-lg p-1 hover:bg-slate-50 transition-colors text-left focus:outline-none cursor-pointer"
                title="Account Profile"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-[#EBF3FA] text-[#0B4182] border border-[#BFDBFE] shrink-0 shadow-2xs">
                  <User className="size-5 text-[#0B4182]" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-[13px] font-bold text-[#0B4182]">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="size-3.5 text-slate-400" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate max-w-[140px] sm:max-w-[180px] mt-0.5">
                    {currentUser.title}
                  </span>
                  {/* Live Date and Time below the Stakeholder Section */}
                  <div className="flex items-center gap-1.5 mt-1 text-[9px] sm:text-[9.5px] text-slate-500 font-medium whitespace-nowrap">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="text-slate-500">{t("liveTime", "Live Time:")}</span>
                    <span suppressHydrationWarning className="font-mono font-bold text-slate-700">{formattedLiveTime}</span>
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-1.5 shadow-lg border-slate-200">
              <div className="flex flex-col gap-1 bg-slate-50 p-2.5 rounded-md border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-blue-900">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                  </div>
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-blue-800">
                    {currentUser.clearanceLevel || "L5_STATUTORY"}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-700">{currentUser.title}</span>
                <span className="text-[10px] text-slate-500">{currentUser.division}, {currentUser.zone}</span>
                <div className="mt-1 flex items-center justify-between text-[9px] font-mono border-t border-slate-200/60 pt-1">
                  <span className="text-slate-400">EMP ID: {currentUser.employeeId || "IR-0000"}</span>
                  <span className="font-bold text-blue-700">{(currentUser as any).tierLabel || currentUser.tier}</span>
                </div>
                {/* Live clock banner inside stakeholder dropdown */}
                <div className="mt-1 px-2 py-1 bg-white rounded border border-slate-200 text-[10px] flex items-center justify-between font-mono text-slate-600">
                  <span className="flex items-center gap-1 font-sans text-slate-500 text-[9.5px]">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    {t("liveTime", "Live Clock:")}
                  </span>
                  <span suppressHydrationWarning className="font-bold text-slate-800">{formattedLiveTime}</span>
                </div>
              </div>

              <div className="mt-1.5 px-0.5">
                <Link
                  href="/authority-matrix"
                  className="flex items-center justify-center gap-1.5 rounded bg-blue-50 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors"
                >
                  <ShieldCheck className="size-3.5 text-blue-700" />
                  <span>{t("authorityMatrix", "Authority Matrix")}</span>
                </Link>
              </div>

              <DropdownMenuSeparator className="my-1.5" />
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
                {t("switchPersona", "Switch Indian Railways Persona")}
              </div>
              <div className="max-h-56 overflow-y-auto space-y-0.5">
                {Object.values(MOCK_USER_PERSONAS).map((persona) => (
                  <DropdownMenuItem
                    key={persona.role}
                    onClick={() => setUserRole(persona.role as UserRole)}
                    className="flex items-center justify-between cursor-pointer py-1.5 px-2 text-xs rounded hover:bg-slate-100"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-semibold text-slate-800 truncate">{persona.name}</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <span className="truncate">{persona.title}</span>
                        <span>•</span>
                        <span className="font-bold text-blue-700 shrink-0">{(persona as any).tierLabel || persona.tier}</span>
                      </div>
                    </div>
                    {currentUser.role === persona.role && (
                      <span className="size-2 rounded-full bg-blue-600 shrink-0 ml-1" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                onClick={() => (window.location.href = "/login")}
                className="text-xs text-rose-600 font-semibold cursor-pointer rounded hover:bg-rose-50"
              >
                {t("relogin", "Switch User / Re-login")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Official Indian Railways News & Circulars Announcement Bar */}
      <RailRajbhashaTicker />
    </header >
  )
}
