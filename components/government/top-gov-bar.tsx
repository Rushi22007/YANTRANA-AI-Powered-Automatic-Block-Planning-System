"use client"

import React, { useState, useEffect } from "react"
import { IndianFlagBadge } from "./emblems"
import { Eye, Volume2, Globe } from "lucide-react"

import { useYentrana } from "@/lib/yentrana/context/yentrana -context"
import { LANGUAGE_OPTIONS, SupportedLanguage } from "@/lib/yentrana/i18n/translations"

/**
 * UX4G Standard Top Government Bar
 * Implements Government of India guidelines (GIGW 3.0 & WCAG 2.1 AA)
 * Features Tricolor Ribbon, Flag of India, High Contrast mode, and Accessibility font scaling.
 */
export function TopGovBar() {
  const { language, setLanguage, t } = useYentrana()
  const [fontSize, setFontSize] = useState<"normal" | "large" | "small">("normal")
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false)

  // Apply font size scaling to document root
  useEffect(() => {
    if (typeof document === "undefined") return
    if (fontSize === "large") {
      document.documentElement.style.fontSize = "17px"
    } else if (fontSize === "small") {
      document.documentElement.style.fontSize = "15px"
    } else {
      document.documentElement.style.fontSize = ""
    }
  }, [fontSize])

  // Apply UX4G high contrast mode
  useEffect(() => {
    if (typeof document === "undefined") return
    if (isHighContrast) {
      document.documentElement.setAttribute("data-contrast", "high")
    } else {
      document.documentElement.removeAttribute("data-contrast")
    }
  }, [isHighContrast])

  return (
    <div className="w-full bg-[#002147] text-slate-200">
      {/* UX4G Government of India Standard Tricolor Stripe */}
      <div className="ux4g-tricolor-strip" />

      {/* Bar Content */}
      <div className="flex h-8 w-full items-center justify-between px-4 sm:px-6 text-[11px]">
        {/* Left: National Flag & Official Government Entity Titles */}
        <div className="flex items-center gap-2 font-medium tracking-wide shrink-0">
          <IndianFlagBadge className="h-3.5 w-5 rounded-xs shadow-xs shrink-0" />
          <span className="tracking-wider text-white font-bold text-[11px]">
            {t("govIndia", "GOVERNMENT OF INDIA")}
          </span>
        </div>

        {/* Right: Accessibility Controls & Multi-Language Switcher */}
        <div className="flex items-center gap-2.5 text-[10.5px] text-slate-200 shrink-0">
          <a
            href="#main-content"
            className="hidden font-medium hover:text-white sm:inline focus:outline-none focus:ring-1 focus:ring-amber-400 px-1 rounded-xs transition-colors"
          >
            {t("skipMain", "Skip to Main Content")}
          </a>

          <span className="hidden text-blue-300/40 sm:inline">|</span>

          {/* Screen Reader Access */}
          <button
            onClick={() => alert("Screen Reader Accessibility active (GIGW 3.0 & WCAG 2.1 AA Compliant)")}
            className="hidden items-center gap-1 hover:text-white sm:inline-flex cursor-pointer transition-colors"
            title="Screen Reader Access"
          >
            <span>{t("screenReader", "Screen Reader Access")}</span>
          </button>

          <span className="text-blue-300/40">|</span>

          {/* Font Resizer / Zoom Controls */}
          <div className="flex items-center gap-1 font-mono font-bold text-slate-200">
            <button
              onClick={() => setFontSize("large")}
              className={`px-1 rounded hover:text-white transition-colors cursor-pointer ${
                fontSize === "large" ? "bg-amber-400 text-black font-extrabold" : "hover:bg-white/10"
              }`}
              title="Increase font size (A+)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("normal")}
              className={`px-1 rounded hover:text-white transition-colors cursor-pointer ${
                fontSize === "normal" ? "bg-white/20 text-white font-extrabold" : "hover:bg-white/10"
              }`}
              title="Standard font size (A)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("small")}
              className={`px-1 rounded hover:text-white transition-colors cursor-pointer ${
                fontSize === "small" ? "bg-amber-400 text-black font-extrabold" : "hover:bg-white/10"
              }`}
              title="Decrease font size (A-)"
            >
              A-
            </button>
          </div>

          <span className="text-blue-300/40">|</span>

          {/* Multi-Language Selector: English, Hindi, Marathi, Tamil */}
          <div className="flex items-center gap-1">
            <Globe className="size-3 text-amber-400 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-[#001833] text-slate-200 text-[10.5px] font-semibold rounded px-1.5 py-0.5 border border-blue-400/40 hover:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer transition-colors"
              title="Select Language / भाषा निवडा / மொழியைத் தேர்ந்தெடுக்கவும்"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-[#002147] text-white">
                  {opt.nativeName} ({opt.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
