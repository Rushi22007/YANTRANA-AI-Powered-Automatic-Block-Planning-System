"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV_CONFIG } from "./nav"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle2, PanelLeftClose } from "lucide-react"

import { useRailMitra } from "@/lib/yentrana/context/yentrana -context"

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

const NAV_TRANSLATION_MAP: Record<string, string> = {
  "/dashboard": "dashboard",
  "/corridor-map": "corridorMap",
  "/maintenance": "maintenanceTasks",
  "/work-packages": "workPackages",
  "/common-view": "commonView",
  "/constraints": "constraints",
  "/compatibility": "compatibility",
  "/planner": "aiPlanner",
  "/conflicts": "conflicts",
  "/approvals": "approvals",
  "/execution": "execution",
  "/replan": "replan",
  "/authority-matrix": "authorityMatrix",
  "/weekly-plan": "weeklyPlan",
  "/monthly-plan": "monthlyPlan",
  "/analytics": "analytics",
  "/integration": "commonView",
  "/audit": "audit",
}

export function SidebarNav({
  collapsed,
  onNavigate,
  onToggleCollapse,
}: {
  collapsed: boolean
  onNavigate?: () => void
  onToggleCollapse?: () => void
}) {
  const pathname = usePathname()
  const { t, language } = useRailMitra()

  return (
    <div className="flex h-full flex-col bg-[#0F172A] text-slate-200 border-r border-slate-800">
      {/* Brand / Logo Header */}
      <div className={cn("flex h-16 items-center border-b border-slate-800 bg-[#0B132B]", collapsed ? "justify-center px-1" : "justify-between px-3")}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2.5 min-w-0">
              <img src="/yantrana-logo.png" alt="Yantrana Logo" className="h-8 w-auto object-contain shrink-0" />
              <div className="leading-tight truncate">
                <p className="text-xs font-extrabold tracking-wider text-white">YANTRANA</p>
                <p className="text-[10px] text-blue-400 font-semibold tracking-tight">Block Planning System</p>
              </div>
            </div>
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                id="sidebar-inner-collapse-btn"
                className="flex items-center justify-center size-7 rounded text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                title="Collapse sidebar to icons"
                aria-label="Collapse sidebar to icons"
              >
                <PanelLeftClose className="size-4" />
              </button>
            )}
          </>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onToggleCollapse}
                id="sidebar-inner-expand-btn"
                className="flex size-10 items-center justify-center rounded-lg hover:bg-slate-800/80 transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <img src="/yantrana-logo.png" alt="Yantrana Logo" className="h-7 w-auto object-contain" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700 font-bold text-xs">
              Expand Sidebar
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        {NAV_CONFIG.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.labelEn && !collapsed && (
              <p className="px-2.5 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                {language === "English" ? group.labelEn : `${group.labelHi} • ${group.labelEn}`}
              </p>
            )}
            {group.labelEn && collapsed && <div className="mx-1 my-1.5 border-t border-slate-800/80" />}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActive(pathname, item.href)
                const translationKey = NAV_TRANSLATION_MAP[item.href]
                const translatedLabel = translationKey ? t(translationKey, item.labelEn) : item.labelEn
                const isEnglish = language === "English"

                const link = (
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center rounded-md text-xs font-medium transition-colors",
                      collapsed
                        ? "justify-center size-10 mx-auto"
                        : "justify-between px-2.5 py-1.5",
                      active
                        ? "bg-blue-600 text-white shadow-xs font-semibold"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    )}
                  >
                    <div className={cn("flex items-center min-w-0", collapsed ? "justify-center" : "gap-2.5")}>
                      <item.icon className={cn("size-4 shrink-0", active ? "text-white" : "text-slate-400 group-hover:text-white")} />
                      {!collapsed && (
                        <div className="truncate text-left leading-tight">
                          <span className="block text-[11px] font-bold tracking-tight">
                            {isEnglish ? item.labelEn : translatedLabel}
                          </span>
                          {!isEnglish && (
                            <span className="block text-[10px] font-normal opacity-75">{item.labelEn}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span className={cn(
                        "ml-1.5 rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider shrink-0",
                        active ? "bg-white/20 text-white" : "bg-blue-950 text-blue-300 border border-blue-800/50"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
                return (
                  <li key={item.href}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>{link}</TooltipTrigger>
                        <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700 px-2.5 py-1 text-xs">
                          <p className="font-bold text-white">{translatedLabel}</p>
                          <p className="text-[10px] text-slate-400">{item.labelEn}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      link
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Refined Bottom Status Strip */}
      {!collapsed ? (
        <div className="border-t border-slate-800 bg-[#0B132B] px-3.5 py-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              डेटा सिंक / Data Sync
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-emerald-950/80 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-800/50">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              सक्रिय / Active
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>TMS • SMMS • TDMS • COA</span>
            <span className="text-emerald-400 font-semibold">Live IR</span>
          </div>
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-11 items-center justify-center border-t border-slate-800 bg-[#0B132B] cursor-pointer">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700 px-2.5 py-1 text-xs">
            <p className="font-bold text-emerald-400">डेटा सिंक सक्रिय (Active)</p>
            <p className="text-[10px] text-slate-400">TMS • SMMS • TDMS • COA Live</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

