"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Bell, ChevronRight } from "lucide-react"

/**
 * Official Indian Railways News & Circulars Bulletin Bar (Rail Rajbhasha Ticker)
 * Replicating the iconic marquee banner from indianrailways.gov.in
 */
export function RailRajbhashaTicker() {
  const [isPaused, setIsPaused] = useState(false)

  const bulletins = [
    {
      tag: "G&SR RULE 4.12",
      tagColor: "bg-red-700 text-white",
      text: "सांविधिक प्राधिकार निर्देश: ट्रैक पजेशन केवल अधिकृत वरिष्ठ मंडल परिचालन प्रबंधक (Sr. DOM / DRM) द्वारा ही स्वीकृत किया जाएगा।",
      textEn: "Statutory Authority Directive: Track possessions grantable strictly by authorized Sr. DOM / DRM.",
      href: "/approvals",
    },
    {
      tag: "ROLLING BLOCK",
      tagColor: "bg-blue-800 text-white",
      text: "रोलिंग ब्लॉक योजना (RBS): इंजीनियरिंग, टीआरडी एवं सिग्नल-दूरसंचार विभागों के कार्यों का साझा गलियारा समेकन।",
      textEn: "Rolling Block Scheme (RBS): Multi-department corridor bundling for Engineering, TRD & S&T.",
      href: "/compatibility",
    },
    {
      tag: "AI PLANNER",
      tagColor: "bg-emerald-800 text-white",
      text: "Google OR-Tools CP-SAT अनुकूलक: ब्लॉक अवधि उपयोग 89% एवं ट्रेन व्यवधान 98 मिनट तक सीमित।",
      textEn: "CP-SAT Multi-Objective Optimizer active: 89% corridor utilization achieved.",
      href: "/planner",
    },
    {
      tag: "SAFETY FIRST",
      tagColor: "bg-amber-600 text-white",
      text: "संरक्षा सर्वोपरि: ओएचई 25 kV विद्युत अलगाव एवं ब्लॉक सेक्शन एक्सल काउंटर पूर्ण सुरक्षा अनिवार्य।",
      textEn: "Safety First: Mandatory 25 kV OHE isolation & axle counter interlocking buffers.",
      href: "/constraints",
    },
    {
      tag: "MISSION 2030",
      tagColor: "bg-green-800 text-white",
      text: "भारतीय रेल शून्य कार्बन उत्सर्जन मिशन 2030: ऊर्जा-कुशल ट्रेन संचालन एवं एकीकृत अनुरक्षण।",
      textEn: "Mission Net-Zero Carbon 2030: Energy-efficient scheduling & green track maintenance.",
      href: "/analytics",
    },
  ]

  return (
    <div className="w-full border-b border-[#C7D6E2] bg-gradient-to-r from-[#146696] via-[#135287] to-[#0B4182] text-white shadow-xs">
      <div className="mx-auto flex h-8 max-w-[1720px] items-center overflow-hidden px-2 sm:px-4 text-[11px]">
        {/* Left Badge: Official Announcement Flag */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-l bg-[#800000] px-2.5 py-1 font-bold text-white shadow-xs border-r border-amber-400/40">
          <span className="size-2 rounded-full bg-amber-400 animate-ping" />
          <Bell className="size-3 text-amber-300" />
          <span className="tracking-wide">LATEST UPDATES</span>
        </div>

        {/* Ticker Content */}
        <div
          className="relative flex-1 overflow-hidden whitespace-nowrap pl-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`inline-flex items-center gap-8 ${
              isPaused ? "" : "animate-[marquee_35s_linear_infinite]"
            }`}
          >
            {bulletins.concat(bulletins).map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="inline-flex items-center gap-2 hover:underline transition-opacity hover:opacity-90"
              >
                <span
                  className={`rounded px-1.5 py-0.2 text-[9px] font-mono font-black tracking-wider uppercase ${item.tagColor}`}
                >
                  {item.tag}
                </span>
                <span className="font-semibold text-amber-200">{item.textEn}</span>
                <span className="text-amber-400 font-bold">•</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Action: All Circulars Link */}
        <div className="hidden md:flex shrink-0 items-center pl-3 pr-1">
          <Link
            href="/authority-matrix"
            className="inline-flex items-center gap-1 rounded bg-white/10 hover:bg-white/20 px-2 py-0.5 text-[10px] font-bold text-amber-200 transition-colors"
          >
            <span>Directives / RBAC</span>
            <ChevronRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
