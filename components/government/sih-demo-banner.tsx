"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { useRailMitra, SIH_DEMO_STEPS } from "@/lib/yentrana/context/yentrana -context"
import { ChevronLeft, ChevronRight, Sparkles, ChevronDown, ChevronUp, Layers, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SihDemoBanner() {
  const pathname = usePathname()
  const { currentSihStep, jumpToSihStep, nextSihStep, prevSihStep } = useRailMitra()
  const [collapsed, setCollapsed] = useState(false)

  // Don't display on public landing page or login unless desired
  if (pathname === "/" || pathname === "/login") {
    return null
  }

  const currentStepData = SIH_DEMO_STEPS.find((s) => s.stepNumber === currentSihStep) || SIH_DEMO_STEPS[0]

  return (
    <div className="fixed bottom-3 right-3 left-3 md:left-auto md:right-6 md:bottom-5 z-40 max-w-xl transition-all">
      <div className="rounded-lg border-2 border-blue-600 bg-slate-900 text-white shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-blue-700 px-3 py-1.5 text-xs">
          <div className="flex items-center gap-2 font-bold tracking-wide">
            <span className="flex size-5 items-center justify-center rounded-full bg-amber-400 text-slate-900 font-extrabold text-[10px]">
              SIH
            </span>
            <span>SIH-2026 LIVE DEMO FLOW</span>
            <span className="rounded bg-blue-900/60 px-1.5 py-0.5 text-[10px] font-mono text-blue-200">
              Step {currentSihStep} / 15
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="h-6 w-6 p-0 text-white hover:bg-blue-800"
              title={collapsed ? "Expand Demo Controller" : "Collapse"}
            >
              {collapsed ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Expandable Body */}
        {!collapsed && (
          <div className="p-3 bg-[#0F172A]">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="inline-block rounded bg-blue-950 px-2 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-800 mb-1">
                  {currentStepData.badge} • {currentStepData.department}
                </span>
                <h4 className="text-xs font-bold text-white tracking-tight">
                  {currentStepData.title}
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {currentStepData.route}
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug mb-3">
              {currentStepData.description}
            </p>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between gap-2 border-t border-slate-800 pt-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSihStep}
                disabled={currentSihStep === 1}
                className="h-7 text-xs border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="size-3.5 mr-1" /> Prev
              </Button>

              {/* Step Quick Selector Dropdown */}
              <select
                value={currentSihStep}
                onChange={(e) => jumpToSihStep(Number(e.target.value))}
                aria-label="Select SIH Demo Step"
                className="h-7 rounded border border-slate-700 bg-slate-800 px-2 text-[11px] font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {SIH_DEMO_STEPS.map((s) => (
                  <option key={s.stepNumber} value={s.stepNumber}>
                    {s.stepNumber}. {s.title}
                  </option>
                ))}
              </select>

              <Button
                size="sm"
                onClick={nextSihStep}
                disabled={currentSihStep === 15}
                className="h-7 text-xs bg-blue-600 text-white hover:bg-blue-500 font-semibold disabled:opacity-40"
              >
                Next <ChevronRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
