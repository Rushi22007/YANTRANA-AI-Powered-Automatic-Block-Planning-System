/**
 * YENTRANA AI — Role-Based Access Control (RBAC) & Authority Engine
 * Strictly aligned with "YENTRANA AI — ONE-PAGE TEAM CHEAT SHEET" (SIH26027)
 * 
 * Defines 5 Operational Tiers:
 * 1. FIELD EXECUTION (Track Maintainer, Gangmate, Keyman, Patrolman, TRD Tech, S&T Maintainer)
 * 2. SUPERVISION (JE/SSE, PWI, Sectional Signal Inspector, TRD Supervisor)
 * 3. PLANNING (Engineering + TRD + S&T planners / Divisional Planning Officers)
 * 4. OPERATIONS (Controller, Station Master, Operating / Power Control)
 * 5. APPROVAL / MANAGEMENT (Authorized officials, Divisional management: Sr.DOM, Sr.DEN, DRM)
 */

import { Department, UserPersona, UserRole, UserTier } from "../types"

export interface TierInfo {
  tier: UserTier
  titleEn: string
  titleHi: string
  description: string
  rolesIncluded: string[]
  primaryAuthority: string
  color: string
  badgeBg: string
  badgeBorder: string
  badgeText: string
}

export const TIER_CONFIG: Record<UserTier, TierInfo> = {
  FIELD_EXECUTION: {
    tier: "FIELD_EXECUTION",
    titleEn: "Field Execution",
    titleHi: "क्षेत्रीय निष्पादन",
    description: "Frontline maintenance teams executing on-track works within authorized time windows.",
    rolesIncluded: [
      "Track Maintainer",
      "Gangmate",
      "Keyman",
      "Patrolman",
      "TRD Technician",
      "S&T Maintainer",
    ],
    primaryAuthority: "Log on-site gang arrival, report telemetry, flag +45 min delays, request burst extensions, mark track clearing.",
    color: "#E65100",
    badgeBg: "bg-orange-50 dark:bg-orange-950/40",
    badgeBorder: "border-orange-300 dark:border-orange-800",
    badgeText: "text-orange-800 dark:text-orange-300",
  },
  SUPERVISION: {
    tier: "SUPERVISION",
    titleEn: "Supervision",
    titleHi: "पर्यवेक्षण (पर्यवेक्षक)",
    description: "Sectional technical leadership responsible for asset inspections, defect logging, and packaging.",
    rolesIncluded: [
      "JE / SSE (P-Way)",
      "PWI (Permanent Way Inspector)",
      "Sectional Signal Inspector (S&T)",
      "TRD Supervisor (OHE)",
    ],
    primaryAuthority: "Log maintenance needs (Step 01), assemble Work Packages (Step 02), submit to Common View (Step 03), supervise site execution.",
    color: "#0B4182",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    badgeBorder: "border-blue-300 dark:border-blue-800",
    badgeText: "text-blue-800 dark:text-blue-300",
  },
  PLANNING: {
    tier: "PLANNING",
    titleEn: "Planning & AI Optimization",
    titleHi: "योजना और अनुकूलन सेल",
    description: "Corridor-level coordination cell using AI to formulate mathematically de-conflicted rolling blocks.",
    rolesIncluded: [
      "Divisional Rolling Block Planning Officer",
      "Engineering Planner",
      "TRD Planner",
      "S&T Planner",
      "Integrated Corridor Coordinator",
    ],
    primaryAuthority: "Configure constraints (Step 04), run compatibility bundling (Step 05), execute CP-SAT optimizer (Step 06), analyze Explainable AI (Step 07), prepare dynamic re-plans (Step 10).",
    color: "#4A2BC2",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeBorder: "border-purple-300 dark:border-purple-800",
    badgeText: "text-purple-800 dark:text-purple-300",
  },
  OPERATIONS: {
    tier: "OPERATIONS",
    titleEn: "Operations & Traffic Control",
    titleHi: "परिचालन एवं नियंत्रण",
    description: "Mainline traffic regulators responsible for train punctuality, line occupancy, and safety buffers.",
    rolesIncluded: [
      "Section Controller",
      "Chief Controller (Operating)",
      "Station Master",
      "Traction Power Controller (TPC)",
    ],
    primaryAuthority: "Monitor corridor traffic, review train delay trade-offs, coordinate line clearing, manage speed restrictions, verify OHE power isolation.",
    color: "#008800",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeBorder: "border-emerald-300 dark:border-emerald-800",
    badgeText: "text-emerald-800 dark:text-emerald-300",
  },
  APPROVAL_MANAGEMENT: {
    tier: "APPROVAL_MANAGEMENT",
    titleEn: "Approval & Divisional Management",
    titleHi: "अनुमोदन एवं मंडल प्रबंधन",
    description: "Authorized statutory railway officers exercising mandatory human-in-the-loop block authorization under G&SR.",
    rolesIncluded: [
      "Sr. DOM (Senior Divisional Operations Manager)",
      "Sr. DEN (Senior Divisional Engineer / Co-ord)",
      "DRM (Divisional Railway Manager)",
      "ADRM (Additional DRM)",
    ],
    primaryAuthority: "Mandatory human review, edit, approve/reject block plans (Step 08), sign statutory digital block permits, disaster management authority.",
    color: "#8B0000",
    badgeBg: "bg-red-50 dark:bg-red-950/40",
    badgeBorder: "border-red-300 dark:border-red-800",
    badgeText: "text-red-900 dark:text-red-300",
  },
}

export interface StepAuthorityInfo {
  stepNumber: number
  stepNameEn: string
  stepNameHi: string
  primaryAuthorizedTiers: UserTier[]
  viewOnlyTiers: UserTier[]
  governanceNote: string
}

export const WORKFLOW_STEP_AUTHORITIES: Record<number, StepAuthorityInfo> = {
  1: {
    stepNumber: 1,
    stepNameEn: "MAINTENANCE NEED",
    stepNameHi: "रखरखाव की आवश्यकता",
    primaryAuthorizedTiers: ["SUPERVISION", "PLANNING", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["FIELD_EXECUTION", "OPERATIONS"],
    governanceNote: "Inspections, USFD rail flaw reports, and scheduled OHE/signal maintenance logged by sectional supervisors.",
  },
  2: {
    stepNumber: 2,
    stepNameEn: "WORK PACKAGE",
    stepNameHi: "कार्य पैकेज",
    primaryAuthorizedTiers: ["SUPERVISION", "PLANNING", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["FIELD_EXECUTION", "OPERATIONS"],
    governanceNote: "Packaging of asset, section, duration, gangs, machines, and shadow block eligibility.",
  },
  3: {
    stepNumber: 3,
    stepNameEn: "COMMON VIEW",
    stepNameHi: "साझा कॉरिडोर दृश्य",
    primaryAuthorizedTiers: ["SUPERVISION", "PLANNING", "OPERATIONS", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["FIELD_EXECUTION"],
    governanceNote: "Unified corridor model combining Engineering, TRD, S&T requisitions against live train timetables.",
  },
  4: {
    stepNumber: 4,
    stepNameEn: "CONSTRAINTS",
    stepNameHi: "बाधाएं और नियम",
    primaryAuthorizedTiers: ["PLANNING", "OPERATIONS", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["SUPERVISION", "FIELD_EXECUTION"],
    governanceNote: "Safety interlocks, freight pathways, gradient buffers, and machine stabling constraints.",
  },
  5: {
    stepNumber: 5,
    stepNameEn: "COMPATIBILITY",
    stepNameHi: "अनुकूलता विश्लेषण",
    primaryAuthorizedTiers: ["PLANNING", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["SUPERVISION", "OPERATIONS", "FIELD_EXECUTION"],
    governanceNote: "Multi-department spatial, temporal, block-type, and safety compatibility matrix.",
  },
  6: {
    stepNumber: 6,
    stepNameEn: "OPTIMIZATION (CP-SAT)",
    stepNameHi: "एआई अनुकूलन",
    primaryAuthorizedTiers: ["PLANNING", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["SUPERVISION", "OPERATIONS", "FIELD_EXECUTION"],
    governanceNote: "CP-SAT solver ranks feasible plans: maximize asset availability, minimize train delay minutes.",
  },
  7: {
    stepNumber: 7,
    stepNameEn: "EXPLAINABLE AI",
    stepNameHi: "तर्कसंगत व्याख्या",
    primaryAuthorizedTiers: ["PLANNING", "OPERATIONS", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["SUPERVISION", "FIELD_EXECUTION"],
    governanceNote: "Audit-ready reasoning explaining why jobs were bundled, trains impacted, and binding constraints.",
  },
  8: {
    stepNumber: 8,
    stepNameEn: "HUMAN APPROVAL",
    stepNameHi: "मानव अनुमोदन",
    primaryAuthorizedTiers: ["APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["PLANNING", "OPERATIONS", "SUPERVISION", "FIELD_EXECUTION"],
    governanceNote: "MANDATORY STATUTORY APPROVAL by Sr. DOM / Divisional Management. AI cannot grant blocks autonomously.",
  },
  9: {
    stepNumber: 9,
    stepNameEn: "EXECUTION TRACKING",
    stepNameHi: "सक्रिय निष्पादन",
    primaryAuthorizedTiers: ["FIELD_EXECUTION", "SUPERVISION", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: ["PLANNING", "OPERATIONS"],
    governanceNote: "Real-time field gang tracking, site telemetry, burst delay warnings, and track safe restoration certificates.",
  },
  10: {
    stepNumber: 10,
    stepNameEn: "DISRUPTION / RE-PLAN",
    stepNameHi: "पुनर्योजना",
    primaryAuthorizedTiers: ["FIELD_EXECUTION", "SUPERVISION", "PLANNING", "OPERATIONS", "APPROVAL_MANAGEMENT"],
    viewOnlyTiers: [],
    governanceNote: "Field teams trigger delay alerts; Planning formulates alternative options; Management approves revision.",
  },
}

/**
 * Check if the user has primary action authority for a given workflow step
 */
export function hasStepAuthority(persona: UserPersona, stepNumber: number): boolean {
  const stepAuth = WORKFLOW_STEP_AUTHORITIES[stepNumber]
  if (!stepAuth) return true
  return stepAuth.primaryAuthorizedTiers.includes(persona.tier)
}

/**
 * Check if user has statutory block authorization authority (Step 08)
 */
export function canApproveBlocks(persona: UserPersona): boolean {
  return persona.tier === "APPROVAL_MANAGEMENT" || persona.canApproveBlocks === true
}

/**
 * Check if user can run CP-SAT AI optimizer (Step 06)
 */
export function canRunOptimizer(persona: UserPersona): boolean {
  return persona.tier === "PLANNING" || persona.tier === "APPROVAL_MANAGEMENT" || persona.canRunOptimizer === true
}

/**
 * Check if user can log/update real-time execution telemetry (Step 09)
 */
export function canUpdateTelemetry(persona: UserPersona): boolean {
  return (
    persona.tier === "FIELD_EXECUTION" ||
    persona.tier === "SUPERVISION" ||
    persona.tier === "APPROVAL_MANAGEMENT" ||
    persona.canUpdateFieldTelemetry === true
  )
}

/**
 * Check if user has supervisor authority over a specific railway department
 */
export function canEditDepartmentNeeds(persona: UserPersona, dept: Department): boolean {
  if (persona.tier === "APPROVAL_MANAGEMENT" || persona.tier === "PLANNING") return true
  if (persona.tier === "SUPERVISION") {
    if (dept === "ENGINEERING" && (persona.role === "ENGINEERING" || persona.department === "ENGINEERING")) return true
    if (dept === "TRD" && (persona.role === "TRD" || persona.department === "TRD")) return true
    if (dept === "SNT" && (persona.role === "SNT" || persona.department === "SNT")) return true
  }
  return false
}
