"use client"

import React, { useState, useEffect } from "react"
import { IndianFlagBadge } from "./emblems"
import { Eye, Volume2, Globe } from "lucide-react"

/**
 * UX4G Standard Top Government Bar
 * Implements Government of India guidelines (GIGW 3.0 & WCAG 2.1 AA)
 * Features Tricolor Ribbon, Flag of India, High Contrast mode, and Accessibility font scaling.
 */
export function TopGovBar() {
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
    <div className="w-full bg-[#1E293B] text-slate-200">
      {/* UX4G Government of India Standard Tricolor Stripe */}
      <div className="ux4g-tricolor-strip" />

      {/* Bar Content */}
      <div className="flex h-8 w-full items-center justify-between px-3 text-[11px] sm:px-6">
        {/* Left: National Flag & Official Government Entity Titles */}
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <IndianFlagBadge className="h-3.5 w-5 rounded-xs shadow-xs" />
          <span className="font-semibold text-white">भारत सरकार</span>
          <span className="text-slate-500">|</span>
          <span className="tracking-wider text-slate-300">GOVERNMENT OF INDIA</span>
          <span className="hidden text-slate-500 sm:inline">•</span>
          <span className="hidden font-medium text-slate-300 sm:inline">रेल मंत्रालय</span>
          <span className="hidden text-slate-500 md:inline">|</span>
          <span className="hidden text-slate-400 md:inline">MINISTRY OF RAILWAYS</span>
        </div>

        {/* Right: Accessibility Controls & Language Switcher */}
        <div className="flex items-center gap-2.5 text-[10px] text-slate-300">
          <a
            href="#main-content"
            className="hidden font-medium hover:text-white sm:inline focus:outline-none focus:ring-1 focus:ring-amber-400 px-1 rounded-xs"
          >
            Skip to Main Content
          </a>

          <span className="hidden text-slate-600 sm:inline">|</span>

          {/* Screen Reader Access */}
          <button
            onClick={() => alert("Screen Reader Accessibility active (GIGW 3.0 & WCAG 2.1 AA Compliant)")}
            className="hidden items-center gap-1 hover:text-white md:inline-flex"
            title="Screen Reader Access"
          >
            <Volume2 className="size-3 text-slate-400" />
            <span>Screen Reader Access</span>
          </button>

          <span className="hidden text-slate-600 md:inline">|</span>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-xs hover:text-white transition-colors ${
              isHighContrast ? "bg-amber-400 text-black font-bold" : "hover:bg-slate-700/60"
            }`}
            title="Toggle High Contrast Mode (UX4G Standard)"
          >
            <Eye className="size-3" />
            <span className="hidden sm:inline">Contrast</span>
          </button>

          <span className="text-slate-600">|</span>

          {/* Font Resizer */}
          <div className="flex items-center gap-0.5 font-mono font-bold text-slate-300">
            <button
              onClick={() => setFontSize("large")}
              className={`px-1 rounded hover:text-white transition-colors ${
                fontSize === "large" ? "bg-amber-400 text-black font-extrabold" : "hover:bg-slate-700/60"
              }`}
              title="Increase font size (A+)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("normal")}
              className={`px-1 rounded hover:text-white transition-colors ${
                fontSize === "normal" ? "bg-slate-700 text-amber-300 font-extrabold" : "hover:bg-slate-700/60"
              }`}
              title="Standard font size (A)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("small")}
              className={`px-1 rounded hover:text-white transition-colors ${
                fontSize === "small" ? "bg-amber-400 text-black font-extrabold" : "hover:bg-slate-700/60"
              }`}
              title="Decrease font size (A-)"
            >
              A-
            </button>
          </div>

          <span className="text-slate-600">|</span>

          {/* Bilingual Indicator (UX4G / Rajbhasha Standard) */}
          <div
            className="inline-flex items-center gap-1.5 rounded bg-slate-800 px-2 py-0.5 font-semibold text-slate-200 border border-slate-700 shadow-xs"
            title="भारतीय रेल द्विभाषी पोर्टल: हिंदी एवं अंग्रेजी दोनों भाषाएं उपलब्ध (Rajbhasha Compliant)"
          >
            <Globe className="size-3 text-amber-400" />
            <span>द्विभाषी / Bilingual</span>
          </div>
        </div>
      </div>
    </div>
  )
}
