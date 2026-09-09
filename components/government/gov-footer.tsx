import React from "react"
import {
  DigitalIndiaLogo,
  MakeInIndiaLogo,
  Ux4gLogo,
  SihLogo,
  CrisLogo,
  NicLogo,
  AshokaEmblem,
  IndianRailwaysEmblem,
} from "./emblems"

/**
 * Official Government of India Institutional Footer
 * Conforming to UX4G Design System 3.0 & GIGW 3.0 (Guidelines for Indian Government Websites)
 * Features original project logos: Digital India, Make in India, UX4G, SIH-2026, CRIS, NIC
 */
export function GovFooter() {
  return (
    <footer className="mt-12 w-full border-t border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      {/* ── Partner Government Projects Showcase Ribbon ── */}
      <div className="border-b border-slate-200/80 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7700]" />
            <span>Government Initiatives & Design Standards</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <DigitalIndiaLogo />
            <span className="hidden h-6 w-px bg-slate-300 dark:bg-slate-700 sm:inline" />
            <MakeInIndiaLogo />
            <span className="hidden h-6 w-px bg-slate-300 dark:bg-slate-700 sm:inline" />
            <Ux4gLogo />
            <span className="hidden h-6 w-px bg-slate-300 dark:bg-slate-700 md:inline" />
            <SihLogo />
            <span className="hidden h-6 w-px bg-slate-300 dark:bg-slate-700 lg:inline" />
            <CrisLogo />
            <span className="hidden h-6 w-px bg-slate-300 dark:bg-slate-700 xl:inline" />
            <NicLogo />
          </div>
        </div>
      </div>

      {/* ── Main Government Legal & Compliance Bar ── */}
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 items-start">
          
          {/* Col 1: Ministry and Railroad Identification */}
          <div className="flex items-start gap-3">
            <IndianRailwaysEmblem className="size-12 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-[#8B0000] dark:text-red-400">भारतीय रेल • Indian Railways</p>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">रेल मंत्रालय | Ministry of Railways</p>
              <p className="text-[11px] text-slate-500">Government of India • भारत सरकार</p>
              <p className="text-[10px] text-slate-400 italic pt-1">
                AI Powered Automatic Block Planning System (Yantrana)
              </p>
            </div>
          </div>

          {/* Col 2: Mandatory Website Policies */}
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Website Policies
            </p>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">गोपनीयता नीति | Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">हाइपरलिंकिंग नीति | Hyperlinking Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">कॉपीराइट नीति | Copyright Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">सुरक्षा नीति | Security Policy</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Standards & Accessibility */}
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Standards & Compliance
            </p>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">सुगम्यता विवरण | Accessibility Statement</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">GIGW 3.0 & WCAG 2.1 AA Compliance</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">UX4G Design System 3.0 Standards</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-700 hover:underline">नियम एवं शर्तें | Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Prototype & Technical Disclaimer */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900/60 dark:bg-amber-950/20">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold text-xs">
              <span className="size-2 rounded-full bg-amber-600" />
              <span>SIH-2026 Innovation Prototype</span>
            </div>
            <p className="mt-1 text-[11px] text-amber-800 dark:text-amber-400 leading-relaxed">
              This decision-support prototype utilizes synthetic simulation datasets. All block grants remain under authorized Divisional Railway Authority.
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-amber-700 dark:text-amber-500 font-mono font-medium">
              <span>Env: Synthetic Simulation</span>
              <span>v3.0 UX4G</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── National Tricolor Accent Ribbon ── */}
      <div className="ux4g-tricolor-strip" />

      {/* ── Bottom Copyright and Hosting Strip ── */}
      <div className="bg-slate-900 px-4 py-3 text-[11px] text-slate-300 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <AshokaEmblem className="h-6 w-5 text-white shrink-0" />
            <span>
              © 2026 भारतीय रेल, रेल मंत्रालय, भारत सरकार | Indian Railways, Ministry of Railways, Govt. of India.
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>Designed & Developed with <strong className="text-white font-semibold">UX4G 3.0</strong></span>
            <span>•</span>
            <span>Technical Wing: <strong className="text-white font-semibold">CRIS</strong></span>
            <span>•</span>
            <span>Last Updated: 07 May 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
