import React from "react"

/**
 * Official Government of India & Indian Railways Emblems and Project Logos
 * Compliant with UX4G Design System 3.0 (NeGD / MeitY / NICSI)
 */

export function IndianFlagBadge({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="National Flag of India"
      role="img"
    >
      <rect width="900" height="200" fill="#FF9933" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#138808" />
      <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="12" />
      <circle cx="450" cy="300" r="16" fill="#000080" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="450"
          y1="300"
          x2="450"
          y2="220"
          stroke="#000080"
          strokeWidth="4"
          transform={`rotate(${i * 15} 450 300)`}
        />
      ))}
    </svg>
  )
}

/**
 * State Emblem of India (Lion Capital of Ashoka)
 * Featuring 3 Asiatic lions, Ashoka Chakra, abacus, and "सत्यमेव जयते"
 */
export function AshokaEmblem({ className = "h-11 w-8" }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 122"
        className="size-full text-slate-800 dark:text-slate-100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="State Emblem of India"
        role="img"
      >
        {/* Asiatic Lion Capital */}
        {/* Center Lion Head & Mane */}
        <path d="M50 8c-7 0-13 5-13 12 0 4 2 8 5 10-4 3-6 7-6 12 0 8 6 15 14 15s14-7 14-15c0-5-2-9-6-12 3-2 5-6 5-10 0-7-6-12-13-12z" />
        <ellipse cx="50" cy="22" rx="6" ry="7" fill="currentColor" opacity="0.9" />
        <circle cx="46" cy="20" r="1.5" fill="#fff" />
        <circle cx="54" cy="20" r="1.5" fill="#fff" />
        {/* Left Lion Head */}
        <path d="M30 16c-5 0-9 4-9 9 0 3 2 6 4 8-3 2-5 5-5 9 0 6 5 11 11 11 3 0 5-1 7-3-2-3-3-6-3-10 0-4 2-8 5-10-3-2-5-5-5-9 0-2-1-4-5-5z" />
        <circle cx="27" cy="24" r="1.2" fill="#fff" />
        {/* Right Lion Head */}
        <path d="M70 16c5 0 9 4 9 9 0 3-2 6-4 8 3 2 5 5 5 9 0 6-5 11-11 11-3 0-5-1-7-3 2-3 3-6 3-10 0-4-2-8-5-10 3-2 5-5 5-9 0-2 1-4 5-5z" />
        <circle cx="73" cy="24" r="1.2" fill="#fff" />
        {/* Front Paws and Pedestal */}
        <rect x="36" y="52" width="6" height="18" rx="2" />
        <rect x="58" y="52" width="6" height="18" rx="2" />
        <path d="M42 55h16v14H42z" />
        {/* Abacus (Circular Base) */}
        <rect x="18" y="72" width="64" height="10" rx="3" fill="currentColor" />
        {/* Ashoka Chakra in Center of Abacus */}
        <circle cx="50" cy="77" r="4" fill="#fff" />
        <circle cx="50" cy="77" r="1.5" fill="currentColor" />
        {/* Horse on Left */}
        <ellipse cx="30" cy="77" rx="3.5" ry="2" fill="#fff" />
        {/* Bull on Right */}
        <ellipse cx="70" cy="77" rx="3.5" ry="2" fill="#fff" />
        {/* Inverted Lotus Bell */}
        <path d="M22 84c5 7 14 10 28 10s23-3 28-10v8H22v-8z" />
        <rect x="16" y="93" width="68" height="5" rx="2" />
        {/* Satyameva Jayate Inscription in Devanagari */}
        <text
          x="50"
          y="114"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fontFamily="'Noto Sans Devanagari', 'Noto Sans', sans-serif"
          fill="currentColor"
          letterSpacing="0.05em"
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  )
}

/**
 * Official Indian Railways Circular Crest
 * Featuring Steam Locomotive, Ashok Chakra, bilingual inscriptions, and stars
 */
export function IndianRailwaysEmblem({ className = "size-11" }: { className?: string }) {
  const rawId = React.useId()
  const topArcId = `ir-top-${rawId.replace(/:/g, "")}`
  const bottomArcId = `ir-bottom-${rawId.replace(/:/g, "")}`

  return (
    <div className={`relative flex items-center justify-center shrink-0 rounded-full bg-[#8B0000] p-1 shadow-sm border border-amber-400/40 ${className}`}>
      <svg viewBox="0 0 120 120" className="size-full text-white" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Indian Railways Official Crest">
        {/* Outer Golden/White Beaded Ring */}
        <circle cx="60" cy="60" r="56" stroke="#FDE047" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="53" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Deep Maroon Medallion */}
        <circle cx="60" cy="60" r="48" fill="#8B0000" stroke="#FDE047" strokeWidth="1.5" />
        {/* Inscribed Bilingual Ring */}
        <path id={topArcId} d="M 22 60 A 38 38 0 0 1 98 60" fill="none" />
        <path id={bottomArcId} d="M 98 60 A 38 38 0 0 1 22 60" fill="none" />
        <text fontSize="8" fontWeight="bold" fill="#FDE047" fontFamily="'Noto Sans Devanagari', sans-serif" letterSpacing="0.08em">
          <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
            भारतीय रेल
          </textPath>
        </text>
        <text fontSize="6.5" fontWeight="extrabold" fill="white" fontFamily="'Noto Sans', sans-serif" letterSpacing="0.12em">
          <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
            INDIAN RAILWAYS
          </textPath>
        </text>
        {/* Center Inner Medallion */}
        <circle cx="60" cy="60" r="28" fill="#B91C1C" stroke="#FDE047" strokeWidth="1.5" />
        {/* Ashoka Chakra in Center Top */}
        <circle cx="60" cy="44" r="7" stroke="#FDE047" strokeWidth="1.5" fill="#8B0000" />
        <circle cx="60" cy="44" r="2" fill="#FDE047" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="60"
            y1="44"
            x2="60"
            y2="37"
            stroke="#FDE047"
            strokeWidth="0.8"
            transform={`rotate(${i * 30} 60 44)`}
          />
        ))}
        {/* Classic Steam Locomotive Silhouette */}
        <path
          d="M44 68h32v6H44v-6zm3-14h26v9H47v-9zm5-7h16v5H52v-5zm-5 23a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zm22 0a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zm-11 0a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z"
          fill="white"
        />
        {/* Railroad Tracks */}
        <line x1="40" y1="76" x2="80" y2="76" stroke="#FDE047" strokeWidth="1.5" />
        <line x1="43" y1="78" x2="77" y2="78" stroke="white" strokeWidth="1" />
        {/* Stars */}
        <polygon points="28,60 29.5,63 33,63 30,65 31.5,68 28,66 24.5,68 26,65 23,63 26.5,63" fill="#FDE047" />
        <polygon points="92,60 93.5,63 97,63 94,65 95.5,68 92,66 88.5,68 90,65 87,63 90.5,63" fill="#FDE047" />
      </svg>
    </div>
  )
}

/**
 * Official Digital India Logo
 * Featuring the iconic multi-color spark / dynamic prism, bilingual branding and tagline
 */
export function DigitalIndiaLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      {/* Digital India Prismatic Spark Icon */}
      <svg viewBox="0 0 70 70" className="h-8 w-8 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital India Emblem">
        {/* Saffron faceted top-left leaves */}
        <polygon points="35,10 45,22 35,32 25,22" fill="#FF7700" />
        <polygon points="45,22 55,20 48,32 35,32" fill="#FF9933" />
        <polygon points="25,22 15,20 22,32 35,32" fill="#E65100" />
        {/* Blue / Cyan center & right facets */}
        <polygon points="48,32 62,35 48,42 35,35" fill="#0099FF" />
        <polygon points="50,42 60,50 45,48 35,42" fill="#0072C6" />
        <polygon points="35,32 48,35 35,46 28,38" fill="#4A2BC2" />
        {/* Green lower-left & bottom facets */}
        <polygon points="22,32 8,35 22,42 35,35" fill="#008800" />
        <polygon points="20,42 10,50 25,48 35,42" fill="#138808" />
        <polygon points="35,46 45,48 35,62 25,48" fill="#00A651" />
        {/* Center white core node */}
        <circle cx="35" cy="35" r="3.5" fill="#FFFFFF" stroke="#000080" strokeWidth="1" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className="text-xs font-black text-[#0B4182] dark:text-blue-400 tracking-tight font-sans">
            Digital India
          </span>
          <span className="text-[10px] font-bold text-[#FF7700] tracking-tight">
            | डिजिटल भारत
          </span>
        </div>
        <span className="text-[8px] font-extrabold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-0.5">
          Power To Empower
        </span>
      </div>
    </div>
  )
}

/**
 * Official Make in India Logo
 * The iconic industrial mechanical cog-and-gear lion silhouette
 */
export function MakeInIndiaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <svg viewBox="0 0 160 85" className="h-8 w-auto shrink-0 text-slate-900 dark:text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Make in India">
        {/* Make In India Industrial Gear Lion Silhouette */}
        {/* Mane Cogs / Gears */}
        <path d="M15 28l-4-4 3-5 5 2 3-4 6 2 2-5 6 1 1-5 6 1v5l6 1 2 5 5-2 3 4 5-2 3 5-4 4 3 6-5 2 1 6-5 2-1 6-6 1-1 5-6-1v-5l-6-1-2-5-5 2-3-4-5 2-3-5 4-4-3-6z" opacity="0.95" />
        <circle cx="32" cy="34" r="6" fill="#fff" />
        <circle cx="32" cy="34" r="3" fill="currentColor" />
        {/* Lion Torso with Mechanical Engine Lines & Cogs */}
        <path d="M48 30h40c6 0 12 4 16 8l14 4 12-2 10 4-4 8-12 2-8 8-14 2h-44l-10-8v-18z" />
        {/* Front Paw & Cog Joint */}
        <path d="M52 50l4 24h-10l-2-16-4-2 2-6h10z" />
        <circle cx="50" cy="54" r="3" fill="#fff" />
        {/* Hind Leg with Transmission Gear */}
        <path d="M102 50l8 24h-10l-4-14-6-2 2-8h10z" />
        <circle cx="104" cy="54" r="3" fill="#fff" />
        {/* Tail with Mechanical Link */}
        <path d="M128 42c8-4 16-8 22-8v4c-6 0-12 3-18 6l-4-2z" />
        <circle cx="150" cy="34" r="3" fill="currentColor" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[11px] font-black tracking-widest text-slate-900 dark:text-white uppercase font-sans">
          MAKE IN INDIA
        </span>
        <span className="text-[7.5px] font-bold text-[#FF7700] tracking-wider uppercase mt-0.5">
          Zero Defect • Zero Effect
        </span>
      </div>
    </div>
  )
}

/**
 * Official UX4G Design System 3.0 Logo
 * National Design System by NeGD / MeitY / NICSI
 */
export function Ux4gLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      {/* Official UX4G Hexagonal Nodes Icon */}
      <svg viewBox="0 0 60 60" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="UX4G Design System">
        <polygon points="30,4 54,18 54,42 30,56 6,42 6,18" stroke="#4A2BC2" strokeWidth="3.5" fill="#4A2BC2" fillOpacity="0.08" />
        {/* Connecting Triangles / Brand Colors */}
        <polygon points="30,4 54,18 30,30" fill="#FF7700" />
        <polygon points="54,18 54,42 30,30" fill="#4A2BC2" />
        <polygon points="54,42 30,56 30,30" fill="#008800" />
        <polygon points="30,56 6,42 30,30" fill="#0B4182" />
        <polygon points="6,42 6,18 30,30" fill="#6A4EFF" />
        <polygon points="6,18 30,4 30,30" fill="#FF9933" />
        {/* Center Node */}
        <circle cx="30" cy="30" r="5" fill="#FFFFFF" stroke="#4A2BC2" strokeWidth="2" />
      </svg>
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1">
          <span className="text-xs font-black text-[#4A2BC2] dark:text-[#8670FF] tracking-tight">
            UX4G
          </span>
          <span className="rounded bg-[#4A2BC2]/10 px-1 py-0.2 text-[9px] font-bold text-[#4A2BC2] dark:text-[#C0B3FF]">
            3.0
          </span>
        </div>
        <span className="text-[8px] font-semibold text-slate-500 dark:text-slate-400">
          NeGD • MeitY • NICSI
        </span>
      </div>
    </div>
  )
}

/**
 * Smart India Hackathon (SIH 2026) Logo
 * Ministry of Education & AICTE Innovation Cell
 */
export function SihLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <svg viewBox="0 0 80 80" className="h-8 w-8 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Smart India Hackathon 2026">
        {/* Outer Circular Gear */}
        <circle cx="40" cy="40" r="36" stroke="#0B4182" strokeWidth="3" strokeDasharray="6 4" />
        {/* Tricolor Flame / Torch Motif */}
        <path d="M40 14c-8 12-4 22 0 30 4-8 8-18 0-30z" fill="#FF7700" />
        <path d="M33 24c-6 8-2 16 2 22 3-6 5-13-2-22z" fill="#FFFFFF" stroke="#0B4182" strokeWidth="1" />
        <path d="M47 24c6 8 2 16-2 22-3-6-5-13 2-22z" fill="#008800" />
        {/* Hackathon Base Platform */}
        <rect x="22" y="48" width="36" height="8" rx="2" fill="#0B4182" />
        <text x="40" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="'Noto Sans', sans-serif">
          SIH
        </text>
        <rect x="26" y="58" width="28" height="5" rx="1" fill="#FF7700" />
        <text x="40" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="black" fontFamily="'Noto Sans', sans-serif">
          2026
        </text>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tight font-sans">
          SMART INDIA
        </span>
        <span className="text-[10px] font-bold text-[#FF7700] tracking-wider font-sans">
          HACKATHON 2026
        </span>
        <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          MoE • AICTE • MIC
        </span>
      </div>
    </div>
  )
}

/**
 * Centre for Railway Information Systems (CRIS) Logo
 * Ministry of Railways IT Wing
 */
export function CrisLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <div className="flex size-7 items-center justify-center rounded bg-[#0B4182] text-white shadow-xs">
        <svg viewBox="0 0 40 40" className="size-5" fill="currentColor">
          <circle cx="20" cy="20" r="17" stroke="white" strokeWidth="2" fill="none" strokeDasharray="3 2" />
          <path d="M12 28h16v-4H12v4zm2-10h12v4H14v-4zm2-6h8v4h-8v-4z" fill="#FDE047" />
          <line x1="8" y1="31" x2="32" y2="31" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1 font-sans">
          <span className="text-xs font-black tracking-wider text-[#0B4182] dark:text-blue-300">
            CRIS
          </span>
          <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400">
            | क्रिस
          </span>
        </div>
        <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400">
          Centre for Railway Information Systems
        </span>
      </div>
    </div>
  )
}

/**
 * National Informatics Centre (NIC / NICSI) Logo
 */
export function NicLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 shrink-0 ${className}`}>
      <svg viewBox="0 0 50 40" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 28C14 10 32 10 42 22" stroke="#0099FF" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 32C22 18 36 18 44 28" stroke="#00A651" strokeWidth="3" strokeLinecap="round" />
        <circle cx="42" cy="22" r="3" fill="#FF7700" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-black text-[#0B4182] dark:text-blue-300 tracking-wider">
          NIC
        </span>
        <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400">
          National Informatics Centre
        </span>
      </div>
    </div>
  )
}

/**
 * Freight Operations Information System (FOIS) Logo
 * Indian Railways core digital freight scheduling & tracking system
 */
export function FoisLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <div className="flex size-7 items-center justify-center rounded bg-[#C20E39] text-white shadow-xs">
        <svg viewBox="0 0 40 40" className="size-5" fill="none" stroke="currentColor">
          <rect x="6" y="14" width="28" height="16" rx="2" strokeWidth="2" fill="#800000" />
          <line x1="6" y1="22" x2="34" y2="22" stroke="#FDE047" strokeWidth="1.5" />
          <circle cx="13" cy="30" r="3" fill="#FFFFFF" stroke="#0B4182" strokeWidth="1" />
          <circle cx="27" cy="30" r="3" fill="#FFFFFF" stroke="#0B4182" strokeWidth="1" />
          <line x1="4" y1="34" x2="36" y2="34" stroke="#FDE047" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight font-sans">
        <div className="flex items-center gap-1">
          <span className="text-xs font-black tracking-wider text-[#C20E39] dark:text-red-400">
            FOIS
          </span>
          <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400">
            | फ़ॉइस
          </span>
        </div>
        <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400">
          Freight Operations Info System
        </span>
      </div>
    </div>
  )
}

/**
 * PM GatiShakti National Master Plan Logo
 * Multi-modal Infrastructure & Railway Corridor Coordination
 */
export function GatiShaktiLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <svg viewBox="0 0 50 50" className="size-7 shrink-0" fill="none">
        <circle cx="25" cy="25" r="23" stroke="#FF9933" strokeWidth="2" strokeDasharray="4 2" />
        <path d="M12 35L25 10L38 35H12Z" stroke="#0B4182" strokeWidth="2.5" fill="#0B4182" fillOpacity="0.1" />
        <path d="M25 18L32 32H18L25 18Z" fill="#138808" />
        <circle cx="25" cy="25" r="3" fill="#FF9933" />
      </svg>
      <div className="flex flex-col leading-tight font-sans">
        <span className="text-[11px] font-black tracking-tight text-[#0B4182] dark:text-blue-300">
          PM GATI SHAKTI
        </span>
        <span className="text-[7.5px] font-bold text-[#FF7700] uppercase tracking-wider">
          National Master Plan
        </span>
      </div>
    </div>
  )
}

/**
 * Amrit Bharat Station Scheme Logo
 * Indian Railways Modernization & Redevelopment
 */
export function AmritBharatLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-0.5 shadow-xs">
        <div className="flex size-full items-center justify-center rounded-full bg-white dark:bg-slate-900">
          <svg viewBox="0 0 30 30" className="size-4 text-[#0B4182]" fill="currentColor">
            <path d="M15 3L2 12h4v13h6v-8h6v8h6V12h4L15 3z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-tight font-sans">
        <span className="text-[11px] font-black text-[#0B4182] dark:text-blue-300 tracking-tight">
          अमृत भारत स्टेशन
        </span>
        <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400">
          Amrit Bharat Station Scheme
        </span>
      </div>
    </div>
  )
}

/**
 * Swachh Rail Swachh Bharat / Green Railways 2030 Logo
 */
export function SwachhRailLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-7" fill="none">
        <circle cx="20" cy="20" r="18" fill="#138808" fillOpacity="0.1" stroke="#138808" strokeWidth="2" />
        <path d="M12 24c4-8 12-10 16-8-2 8-8 12-16 8z" fill="#138808" />
        <circle cx="20" cy="20" r="2.5" fill="#FF9933" />
      </svg>
      <div className="flex flex-col leading-none font-sans">
        <span className="text-[10px] font-bold text-[#138808] tracking-tight">
          स्वच्छ रेल • स्वच्छ भारत
        </span>
        <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          Mission Net-Zero Carbon 2030
        </span>
      </div>
    </div>
  )
}

/**
 * Indian Railways Caution Order / TSR (Temporary Speed Restriction) Sign
 * Standard yellow triangle with crimson border and speed limit
 */
export function CautionOrderSymbol({ speed = "30", className = "size-7" }: { speed?: string; className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`} title={`Caution Order: ${speed} km/h TSR`}>
      <svg viewBox="0 0 100 90" className="size-full">
        <polygon points="50,6 94,84 6,84" fill="#FFD700" stroke="#C20E39" strokeWidth="8" strokeLinejoin="round" />
        <text x="50" y="68" textAnchor="middle" fontSize="34" fontWeight="900" fontFamily="'Roboto Slab', Arial, sans-serif" fill="#000000">
          {speed}
        </text>
      </svg>
    </div>
  )
}

/**
 * Indian Railways 25 kV AC Traction High Voltage Danger Symbol
 * Standard overhead electric warning: "सावधान 25000 वोल्ट / DANGER 25000 VOLTS"
 */
export function Danger25kVSymbol({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded border border-amber-400/80 bg-amber-50 px-2 py-0.5 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700/80 ${className}`}>
      <svg viewBox="0 0 60 55" className="h-6 w-auto shrink-0">
        <polygon points="30,4 56,50 4,50" fill="#FFE600" stroke="#D32F2F" strokeWidth="4" strokeLinejoin="round" />
        {/* Lightning Bolt */}
        <path d="M31 16L21 31h8l-4 13 14-17h-9l6-11h-5z" fill="#D32F2F" />
      </svg>
      <div className="flex flex-col leading-none font-sans">
        <span className="text-[10px] font-black text-red-700 dark:text-red-400 tracking-tight">
          सावधान 25,000 वोल्ट
        </span>
        <span className="text-[7.5px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wide mt-0.5">
          DANGER 25 kV OHE
        </span>
      </div>
    </div>
  )
}

/**
 * 4-Aspect Color Light Railway Signal
 * Displays authentic Indian Railways signaling aspects (Red, Yellow, Double Yellow, Green)
 */
export function RailwaySignalAspectSymbol({
  aspect = "GREEN",
  className = "h-9 w-4"
}: {
  aspect?: "RED" | "YELLOW" | "DOUBLE_YELLOW" | "GREEN"
  className?: string
}) {
  return (
    <div className={`inline-flex flex-col items-center justify-between rounded bg-slate-900 p-0.5 border border-slate-700 shadow-xs ${className}`} title={`Signal Aspect: ${aspect}`}>
      {/* Top Yellow (for Double Yellow) */}
      <div className={`size-2 rounded-full border border-slate-800 ${aspect === "DOUBLE_YELLOW" ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-slate-800 opacity-40"}`} />
      {/* Red (Danger / Stop) */}
      <div className={`size-2 rounded-full border border-slate-800 ${aspect === "RED" ? "bg-red-600 shadow-[0_0_8px_#dc2626]" : "bg-slate-800 opacity-40"}`} />
      {/* Yellow (Caution / Approach) */}
      <div className={`size-2 rounded-full border border-slate-800 ${aspect === "YELLOW" || aspect === "DOUBLE_YELLOW" ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-slate-800 opacity-40"}`} />
      {/* Green (Clear / Proceed) */}
      <div className={`size-2 rounded-full border border-slate-800 ${aspect === "GREEN" ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-slate-800 opacity-40"}`} />
    </div>
  )
}

/**
 * Track Circuit & Axle Counter Healthy Indicator
 */
export function AxleCounterSymbol({ isClear = true, className = "h-5 w-auto" }: { isClear?: boolean; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${isClear ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800" : "border-red-300 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800"} ${className}`}>
      <span className={`size-1.5 rounded-full ${isClear ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
      <span>{isClear ? "TC: CLEAR" : "TC: OCCUPIED"}</span>
    </div>
  )
}

/**
 * G&SR Rule 4.12 Statutory Compliance Seal
 */
export function GsrRuleSeal({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1 rounded bg-[#800000]/10 border border-[#800000]/30 px-2 py-0.5 text-[#800000] dark:bg-red-950/30 dark:border-red-800 dark:text-red-300 ${className}`}>
      <span className="text-[10px] font-bold">⚖️ G&SR 4.12</span>
      <span className="text-[8px] font-semibold text-slate-600 dark:text-slate-400">विहित प्राधिकार</span>
    </div>
  )
}

/**
 * Unified Government & Railway Project Logos Ribbon
 * Displayed in header, footer, and landing pages
 */
export function GovProjectLogosRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 py-2 px-3 ${className}`}>
      <DigitalIndiaLogo />
      <span className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
      <MakeInIndiaLogo />
      <span className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
      <FoisLogo />
      <span className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
      <GatiShaktiLogo />
      <span className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
      <AmritBharatLogo />
      <span className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
      <Ux4gLogo />
      <span className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
      <SihLogo />
      <span className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
      <CrisLogo />
    </div>
  )
}

