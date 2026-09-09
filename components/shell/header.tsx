"use client"

import React from "react"
import Link from "next/link"
import { Menu, PanelLeft, PanelLeftClose, ChevronDown, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IndianRailwaysEmblem } from "@/components/government/emblems"
import { RailRajbhashaTicker } from "@/components/government/rail-rajbhasha-ticker"
import { useRailMitra } from "@/lib/railmitra/context/railmitra-context"
import { MOCK_USER_PERSONAS } from "@/lib/railmitra/data/mock-data"
import type { UserRole } from "@/lib/railmitra/types"

export function Header({
  collapsed = false,
  onToggleDesktop,
  onToggleMobile,
}: {
  collapsed?: boolean
  onToggleDesktop: () => void
  onToggleMobile: () => void
}) {
  const { currentUser, setUserRole } = useRailMitra()

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-200 bg-white shadow-xs">
      {/* Institutional Indian Railways & Yantrana Header */}
      <div className="flex h-16 items-center justify-between gap-3 px-3 md:px-5">
        {/* Left: Sidebar Toggle & Indian Railways Official Crest */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-700 hover:bg-slate-100 md:hidden h-9 w-9"
            onClick={onToggleMobile}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden text-slate-700 hover:bg-slate-100 hover:text-slate-900 md:inline-flex h-9 w-9"
            onClick={onToggleDesktop}
            title={collapsed ? "Expand sidebar (साइडबार खोलें)" : "Collapse sidebar (साइडबार छोटा करें)"}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeft className="size-5 text-blue-700" /> : <PanelLeftClose className="size-5" />}
          </Button>

          <div className="hidden md:block h-7 w-px bg-slate-200" />

          {/* Indian Railways Official Emblem & Bilingual Name */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            title="भारतीय रेल / Indian Railways Dashboard"
          >
            <IndianRailwaysEmblem className="size-11 shrink-0 drop-shadow-xs" />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[15px] font-bold text-[#8B0000] tracking-tight">भारतीय रेल</span>
              <span className="text-[11px] font-extrabold tracking-wider text-slate-900 mt-0.5">INDIAN RAILWAYS</span>
              <span className="text-[9px] text-slate-500 font-medium tracking-normal mt-0.5">राष्ट्र की जीवन रेखा • Lifeline to the Nation</span>
            </div>
          </Link>
        </div>

        {/* Center: Yantrana Department System Identity (Hindi + English Bilingual) */}
        <div className="flex items-center justify-center gap-3 px-2 min-w-0 flex-1">
          <div className="flex items-center gap-3 max-w-full">
            <img
              src="/yantrana-logo.png"
              alt="Yantrana Logo"
              className="h-10 w-auto object-contain shrink-0 drop-shadow-xs"
            />
            <div className="flex flex-col leading-tight min-w-0 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm md:text-[15px] font-bold text-slate-900 tracking-tight whitespace-nowrap">
                  यंत्रणा : स्वचालित ब्लॉक योजना प्रणाली
                </span>
                <span className="hidden lg:inline-flex items-center rounded bg-blue-100 px-1.5 py-0.2 font-mono text-[9px] font-bold text-blue-800 border border-blue-200">
                  IR-ABPS
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 tracking-normal truncate">
                YANTRANA : AI Powered Automatic Block Planning System
              </span>
            </div>
          </div>
        </div>

        {/* Right: Operational Division Badge & User Role Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Active Division Indicator */}
          <div className="hidden xl:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="flex flex-col leading-none text-left">
              <span className="text-[11px] font-bold text-slate-800">मध्य रेल / Central Railway</span>
              <span className="text-[9px] text-slate-500">पुणे मंडल • Pune Division</span>
            </div>
          </div>

          {/* User Profile Pill & Persona Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 gap-2 rounded-lg border-slate-200 bg-slate-50/80 px-2.5 py-1 text-slate-800 hover:bg-slate-100 hover:text-slate-900"
              >
                <div className="flex size-7 items-center justify-center rounded-full bg-[#0B4182] text-xs font-bold text-white shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden text-left leading-tight lg:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                    <span className="rounded bg-blue-100 px-1 py-0.2 font-mono text-[9px] font-bold text-blue-800">
                      {(currentUser as any).tierLabel || currentUser.tier}
                    </span>
                  </div>
                  <span className="block text-[10px] font-medium text-slate-500">{currentUser.title}</span>
                </div>
                <ChevronDown className="size-3.5 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-1">
              <div className="flex flex-col gap-0.5 bg-slate-50 p-2.5 rounded-xs border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-blue-900">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                  </div>
                  <span className="rounded bg-slate-200 px-1.5 py-0.2 font-mono text-[9px] font-bold text-slate-700">
                    {currentUser.clearanceLevel || "L5_STATUTORY"}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-700">{currentUser.title}</span>
                <span className="text-[10px] text-slate-500">{currentUser.division}, {currentUser.zone}</span>
                <div className="mt-1 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-slate-400">ID: {currentUser.employeeId || "IR-0000"}</span>
                  <span className="font-bold text-blue-700">{(currentUser as any).tierLabel || currentUser.tier}</span>
                </div>
              </div>

              <div className="mt-1 px-1">
                <Link
                  href="/authority-matrix"
                  className="flex items-center justify-center gap-1.5 rounded bg-blue-50 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors"
                >
                  <ShieldCheck className="size-3.5 text-blue-700" />
                  <span>Authority Matrix (अधिकार मैट्रिक्स)</span>
                </Link>
              </div>

              <DropdownMenuSeparator />
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
                Switch Indian Railways Persona
              </div>
              <div className="max-h-56 overflow-y-auto space-y-0.5">
                {Object.values(MOCK_USER_PERSONAS).map((persona) => (
                  <DropdownMenuItem
                    key={persona.role}
                    onClick={() => setUserRole(persona.role as UserRole)}
                    className="flex items-center justify-between cursor-pointer py-1.5 px-2 text-xs"
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
                      <span className="size-1.5 rounded-full bg-blue-600 shrink-0 ml-1" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => window.location.href = "/login"}
                className="text-xs text-rose-600 font-semibold cursor-pointer"
              >
                Switch User / Re-login
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Official Indian Railways Rail Rajbhasha News & Bulletins Marquee Bar */}
      <RailRajbhashaTicker />
    </header>
  )
}
