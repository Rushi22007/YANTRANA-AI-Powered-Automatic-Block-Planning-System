import React from "react"
import Link from "next/link"
import {
  IndianRailwaysEmblem,
  AshokaEmblem,
  DigitalIndiaLogo,
  MakeInIndiaLogo,
  Ux4gLogo,
  SihLogo,
  CrisLogo,
} from "@/components/government/emblems"
import { ArrowRight, ChevronDown, ArrowDown, Sparkles, Shield, Cpu, Layers } from "lucide-react"

export default function LandingPage() {
  const workflowSteps = [
    { num: "01", name: "MAINTENANCE NEED", hi: "रखरखाव की आवश्यकता", desc: "Inspection, USFD defects, scheduled OHE & signal maintenance requisitions" },
    { num: "02", name: "WORK PACKAGE", hi: "कार्य पैकेज", desc: "Asset, section, duration, crew, machinery, and block type packaging" },
    { num: "03", name: "COMMON VIEW", hi: "साझा कॉरिडोर दृश्य", desc: "Unified corridor-level model combining Eng + TRD + S&T + Train Timetable" },
    { num: "04", name: "CONSTRAINTS", hi: "बाधाएं और नियम", desc: "Train timetable, freight forecast, gradient buffers, and safety interlocks" },
    { num: "05", name: "COMPATIBILITY", hi: "अनुकूलता विश्लेषण", desc: "Multi-department spatial, temporal, block-type, and safety compatibility" },
    { num: "06", name: "OPTIMIZATION", hi: "एआई अनुकूलन", desc: "CP-SAT multi-objective optimization balancing asset availability and punctuality" },
    { num: "07", name: "EXPLANATION", hi: "तर्कसंगत व्याख्या", desc: "Transparent reasoning: why bundled, trains affected, binding constraints" },
    { num: "08", name: "HUMAN APPROVAL", hi: "मानव अनुमोदन", desc: "Mandatory authorization by authorized Divisional Planning Officers" },
    { num: "09", name: "EXECUTION", hi: "सक्रिय निष्पादन", desc: "Live progress telemetry across field gangs with real-time tracking" },
    { num: "10", name: "DISRUPTION / RE-PLAN", hi: "पुनर्योजना", desc: "Dynamic replanning upon field delays to preserve network stability" },
  ]

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-6rem)] py-8 px-4 sm:px-6">
      {/* ── Partner Government Projects Showcase Ribbon ── */}
      <div className="w-full max-w-4xl mb-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/90 px-4 py-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-xs">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-[#FF7700]" />
          <span>Government of India Initiatives</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <DigitalIndiaLogo className="h-7" />
          <MakeInIndiaLogo className="h-6" />
          <Ux4gLogo className="h-6" />
          <SihLogo className="h-6" />
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl border border-slate-300 shadow-md p-6 sm:p-10 relative overflow-hidden dark:bg-slate-900 dark:border-slate-700">
        {/* National Tricolor Accent Ribbon at Top of Card */}
        <div className="absolute top-0 left-0 right-0 ux4g-tricolor-strip" />

        {/* Top Government Portal Emblem Header */}
        <div className="flex flex-col items-center text-center pt-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-center gap-6 mb-3">
            <IndianRailwaysEmblem className="size-16 sm:size-20" />
            <AshokaEmblem className="h-16 sm:h-20 w-12 text-slate-900 dark:text-white" />
          </div>

          <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 tracking-wider">
            भारत सरकार | GOVERNMENT OF INDIA
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
            रेल मंत्रालय | MINISTRY OF RAILWAYS
          </p>
          <div className="my-2.5 h-0.5 w-28 bg-[#8B0000]" />

          <h2 className="text-xl sm:text-2xl font-black text-[#8B0000] dark:text-red-400 tracking-tight">
            भारतीय रेल • INDIAN RAILWAYS
          </h2>

          <img src="/yantrana-logo.png" alt="Yantrana Logo" className="mt-4 mb-2 h-20 w-auto object-contain" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            YANTRANA
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#0B4182] dark:text-blue-400">
            AI-POWERED AUTOMATIC BLOCK PLANNING SYSTEM
          </p>

          <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-[#4A2BC2]/10 px-3.5 py-1 border border-[#4A2BC2]/30 text-xs font-semibold text-[#4A2BC2] dark:text-[#C0B3FF]">
            <Sparkles className="size-3.5 text-[#FF7700]" />
            <span>Smart India Hackathon • SIH-2026 Problem Statement Demonstrator</span>
          </div>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
            “Coordinated maintenance planning for maximum asset availability and reliable train operations.”
          </p>
        </div>

        {/* Central CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 border-b border-slate-200 dark:border-slate-800">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B4182] px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#0C2340] transition-colors focus:ring-2 focus:ring-[#4A2BC2] focus:outline-none"
          >
            [ ENTER SYSTEM ]
            <ArrowRight className="size-4" />
          </Link>

          <a
            href="#workflow-section"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-6 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            [ VIEW WORKFLOW ]
            <ChevronDown className="size-4" />
          </a>

          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#4A2BC2]/40 bg-[#4A2BC2]/10 px-5 py-3.5 text-sm font-semibold text-[#4A2BC2] dark:text-[#C0B3FF] hover:bg-[#4A2BC2]/20 transition-colors"
          >
            [ DEMO ROLES ]
          </Link>
        </div>

        {/* Core Product Message */}
        <div className="my-6 rounded-lg bg-slate-50 p-4 border border-slate-200 text-center dark:bg-slate-800/60 dark:border-slate-700">
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            “RailMitra AI does not automate the railway worker. It automates the complexity around the worker.”
          </p>
          <p className="text-xs font-semibold text-[#0B4182] dark:text-blue-400 mt-1">
            AI recommends. Railway authority decides.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Decision-support prototype. Block authorization remains under divisional railway authority.
          </p>
        </div>

        {/* Simple Workflow Section below CTA */}
        <div id="workflow-section" className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
              10-Step Corridor Block Planning Workflow
            </h3>
            <span className="text-xs text-slate-500 font-medium">End-to-End Decision Support</span>
          </div>

          <div className="space-y-2.5">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.num}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 hover:border-[#4A2BC2] hover:bg-[#4A2BC2]/5 transition-colors dark:border-slate-800 dark:bg-slate-800/40"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded bg-slate-800 font-mono text-xs font-bold text-white dark:bg-slate-700">
                  {step.num}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">
                      {step.name}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      ({step.hi})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {step.desc}
                  </p>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <ArrowDown className="size-4 text-slate-300 self-center hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simulated Disclaimer Banner */}
        <div className="mt-8 rounded-lg bg-amber-50 p-3.5 border border-amber-200 text-center text-xs text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300">
          <p className="font-bold">
            DEMO ENVIRONMENT — SYNTHETIC DATA ONLY
          </p>
          <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-0.5">
            This demonstrator uses locally generated simulated railway records for the Karjat–Lonavala (Bhor Ghat) section.
            No connection to confidential Indian Railways production servers is claimed.
          </p>
        </div>
      </div>
    </div>
  )
}
