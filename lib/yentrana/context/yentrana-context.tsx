"use client"

import React, { createContext, useContext, useState, useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import type {
  MaintenanceNeed,
  WorkPackage,
  CorridorConstraint,
  CompatibilityCheck,
  OptimizedBlockPlan,
  ExecutionTracker,
  AuditLogEntry,
  UserPersona,
  UserRole,
  AIWeightObjectives,
  ReplanAlternative,
} from "../types"
import {
  MOCK_USER_PERSONAS,
  MOCK_MAINTENANCE_NEEDS,
  MOCK_WORK_PACKAGES,
  MOCK_CONSTRAINTS,
  MOCK_COMPATIBILITY_CHECKS,
  MOCK_OPTIMIZED_BLOCK,
  MOCK_EXECUTION_INITIAL,
  MOCK_AUDIT_LOGS,
  MOCK_REPLAN_SCENARIO,
} from "../data/mock-data"
import { TRANSLATIONS, SupportedLanguage } from "../i18n/translations"

export interface SIHStep {
  stepNumber: number
  title: string
  route: string
  department: string
  description: string
  badge: string
}

export const SIH_DEMO_STEPS: SIHStep[] = [
  {
    stepNumber: 1,
    title: "Engineering Need & Work Package",
    route: "/work-packages",
    department: "Engineering",
    description: "Engineering submits Track Tamping requirement (WP-ENG-1042) for Karjat–Lonavala (90 min).",
    badge: "01 NEED → PACKAGE",
  },
  {
    stepNumber: 2,
    title: "TRD Catenary Requisition",
    route: "/maintenance",
    department: "TRD",
    description: "TRD submits OHE inspection requirement (WP-TRD-3098) in same corridor section (60 min).",
    badge: "02 DECENTRALIZED",
  },
  {
    stepNumber: 3,
    title: "S&T Interlocking Maintenance",
    route: "/maintenance",
    department: "S&T",
    description: "S&T submits Signal & Axle counter maintenance need (WP-SNT-8821) in same corridor (45 min).",
    badge: "03 MULTI-DEPT",
  },
  {
    stepNumber: 4,
    title: "Control Office Goods Forecast",
    route: "/common-view",
    department: "Control Office",
    description: "Operating Control receives Container freight CONRAJ-0310 forecast at 03:10 on UP Ghat line.",
    badge: "04 FREIGHT FORECAST",
  },
  {
    stepNumber: 5,
    title: "Common Corridor View Overlap",
    route: "/common-view",
    department: "Operations",
    description: "Shared corridor timeline reveals decentralized requests colliding with each other and train path.",
    badge: "05 COMMON VIEW",
  },
  {
    stepNumber: 6,
    title: "Constraint Engine Detection",
    route: "/constraints",
    department: "AI Engine",
    description: "Constraint engine flags HARD constraint violation: 03:10 freight cannot overlap uncoordinated block.",
    badge: "06 CONSTRAINTS",
  },
  {
    stepNumber: 7,
    title: "Compatibility Engine Analysis",
    route: "/compatibility",
    department: "AI Engine",
    description: "Safety and resource rules evaluate Eng + TRD + S&T: All 3 compatible for single bundled block!",
    badge: "07 COMPATIBILITY",
  },
  {
    stepNumber: 8,
    title: "CP-SAT Optimizer Run",
    route: "/planner",
    department: "Optimizer",
    description: "AI optimizes block window: Combined Block 04:15–06:15 between freight departure and passenger rush.",
    badge: "08 OPTIMIZE",
  },
  {
    stepNumber: 9,
    title: "Explainable AI (Why This Plan?)",
    route: "/planner",
    department: "Explainable AI",
    description: "System details 6 transparent reasons: avoids train conflict, bundles 3 tasks, saves 105 min corridor downtime.",
    badge: "09 EXPLAIN",
  },
  {
    stepNumber: 10,
    title: "Mandatory Human Approval",
    route: "/approvals",
    department: "Planning Officer",
    description: "Divisional Rolling Block Planning Officer reviews justification and authorizes Plan B-104.",
    badge: "10 HUMAN IN LOOP",
  },
  {
    stepNumber: 11,
    title: "Live Execution Monitoring",
    route: "/execution",
    department: "Field Execution",
    description: "Block B-104 is ACTIVE. Real-time telemetry tracks Eng (68%), TRD (80%), and S&T (100%) progress.",
    badge: "11 EXECUTION",
  },
  {
    stepNumber: 12,
    title: "Disruption: Delay Reported (+45m)",
    route: "/execution",
    department: "Engineering",
    description: "Site supervisor reports hydraulic hose leak on tamping machine. Extra 45 min required for clearance.",
    badge: "12 DISRUPTION",
  },
  {
    stepNumber: 13,
    title: "Dynamic Re-Plan Engine",
    route: "/replan",
    department: "Re-Plan AI",
    description: "System flags RE-PLAN REQUIRED and generates feasible alternatives (Option A, B, and C).",
    badge: "13 RE-PLAN",
  },
  {
    stepNumber: 14,
    title: "Alternative Recommendation",
    route: "/replan",
    department: "AI Engine",
    description: "AI recommends Option B: Extend Eng/TRD by 30m and defer S&T to protect Train 12124 Deccan Queen.",
    badge: "14 ALTERNATIVES",
  },
  {
    stepNumber: 15,
    title: "Revised Plan Approval & Closure",
    route: "/approvals",
    department: "Authority",
    description: "Planning Officer approves revised Option B. Corridor stability preserved. Audit trail completed.",
    badge: "15 CLOSURE",
  },
]

interface RailMitraContextType {
  currentUser: UserPersona
  setUserRole: (role: UserRole) => void
  maintenanceNeeds: MaintenanceNeed[]
  workPackages: WorkPackage[]
  constraints: CorridorConstraint[]
  compatibilityChecks: CompatibilityCheck[]
  optimizedPlan: OptimizedBlockPlan
  executionTracker: ExecutionTracker
  auditLogs: AuditLogEntry[]
  replanScenario: typeof MOCK_REPLAN_SCENARIO
  selectedReplanOption: "OPTION_A" | "OPTION_B" | "OPTION_C"
  setSelectedReplanOption: (opt: "OPTION_A" | "OPTION_B" | "OPTION_C") => void
  currentSihStep: number
  jumpToSihStep: (stepNumber: number) => void
  nextSihStep: () => void
  prevSihStep: () => void
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  t: (key: string, fallback?: string) => string
  currentTime: Date
  formattedLiveTime: string
  formattedLiveDate: string
  objectiveWeights: AIWeightObjectives
  setObjectiveWeights: React.Dispatch<React.SetStateAction<AIWeightObjectives>>
  addWorkPackageToCommonView: (pkgId: string) => void
  approvePlan: (comments?: string) => void
  rejectPlan: (reason: string) => void
  requestRevision: (reason: string) => void
  reportExecutionDelay: (minutes: number, reason: string) => void
  acceptReplanOption: (optionId: "OPTION_A" | "OPTION_B" | "OPTION_C") => void
}

const RailMitraContext = createContext<RailMitraContextType | undefined>(undefined)

export function RailMitraProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [currentRole, setCurrentRole] = useState<UserRole>("ADMIN")
  const currentUser = MOCK_USER_PERSONAS[currentRole] || MOCK_USER_PERSONAS.ADMIN

  const [maintenanceNeeds, setMaintenanceNeeds] = useState<MaintenanceNeed[]>(MOCK_MAINTENANCE_NEEDS)
  const [workPackages, setWorkPackages] = useState<WorkPackage[]>(MOCK_WORK_PACKAGES)
  const [constraints, setConstraints] = useState<CorridorConstraint[]>(MOCK_CONSTRAINTS)
  const [compatibilityChecks, setCompatibilityChecks] = useState<CompatibilityCheck[]>(MOCK_COMPATIBILITY_CHECKS)
  const [optimizedPlan, setOptimizedPlan] = useState<OptimizedBlockPlan>(MOCK_OPTIMIZED_BLOCK)
  const [executionTracker, setExecutionTracker] = useState<ExecutionTracker>(MOCK_EXECUTION_INITIAL)
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS)
  const [selectedReplanOption, setSelectedReplanOption] = useState<"OPTION_A" | "OPTION_B" | "OPTION_C">("OPTION_B")
  const [currentSihStep, setCurrentSihStep] = useState<number>(1)

  const [objectiveWeights, setObjectiveWeights] = useState<AIWeightObjectives>({
    assetAvailability: 30,
    maintenanceCompletion: 20,
    blockUtilization: 20,
    trainImpact: 15,
    conflictReduction: 10,
    multiDeptBundling: 5,
  })

  const setUserRole = (role: UserRole) => {
    setCurrentRole(role)
    const persona = MOCK_USER_PERSONAS[role]
    logAudit(
      persona.name,
      persona.title,
      persona.department === "OPERATIONS" ? "CONTROL_OFFICE" : (persona.department as any),
      "SWITCH_ROLE",
      "USER_SESSION",
      currentRole,
      role,
      `User switched persona to ${persona.name} (${persona.title})`
    )
  }

  const logAudit = (
    userName: string,
    role: string,
    department: any,
    action: string,
    targetObject: string,
    oldValue: string,
    newValue: string,
    reason: string
  ) => {
    const entry: AuditLogEntry = {
      id: `AUDIT-${String(auditLogs.length + 1).padStart(3, "0")}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      userName,
      role,
      department,
      action,
      targetObject,
      oldValue,
      newValue,
      reason,
    }
    setAuditLogs((prev) => [entry, ...prev])
  }

  const addWorkPackageToCommonView = (pkgId: string) => {
    setWorkPackages((prev) =>
      prev.map((pkg) => (pkg.packageId === pkgId ? { ...pkg, status: "IN_COMMON_VIEW" } : pkg))
    )
    logAudit(
      currentUser.name,
      currentUser.title,
      currentUser.department as any,
      "ADD_TO_COMMON_VIEW",
      pkgId,
      "READY_FOR_COORDINATION",
      "IN_COMMON_VIEW",
      "Added to multi-department corridor model for combined planning"
    )
  }

  const approvePlan = (comments?: string) => {
    setOptimizedPlan((prev) => ({
      ...prev,
      status: "APPROVED",
      approvalLog: {
        approvedBy: `${currentUser.name} (${currentUser.title})`,
        approvedAt: "07 May 2026, 10:35 IST",
        comments: comments || "Authorized per Sectional Rolling Block SOP. Safety buffers verified.",
      },
    }))
    setExecutionTracker((prev) => ({ ...prev, status: "SCHEDULED" }))
    logAudit(
      currentUser.name,
      currentUser.title,
      currentUser.department as any,
      "HUMAN_APPROVAL_GRANTED",
      `Plan ${optimizedPlan.planId}`,
      "PENDING_APPROVAL",
      "APPROVED",
      comments || "Approved after reviewing train impact and multi-department compatibility."
    )
  }

  const rejectPlan = (reason: string) => {
    setOptimizedPlan((prev) => ({
      ...prev,
      status: "REJECTED",
      approvalLog: {
        approvedBy: `${currentUser.name} (${currentUser.title})`,
        approvedAt: "07 May 2026, 10:35 IST",
        revisionReason: reason,
      },
    }))
    logAudit(
      currentUser.name,
      currentUser.title,
      currentUser.department as any,
      "HUMAN_REJECTION",
      `Plan ${optimizedPlan.planId}`,
      "PENDING_APPROVAL",
      "REJECTED",
      reason
    )
  }

  const requestRevision = (reason: string) => {
    setOptimizedPlan((prev) => ({
      ...prev,
      status: "REVISION_REQUESTED",
      approvalLog: {
        approvedBy: `${currentUser.name} (${currentUser.title})`,
        approvedAt: "07 May 2026, 10:35 IST",
        revisionReason: reason,
      },
    }))
    logAudit(
      currentUser.name,
      currentUser.title,
      currentUser.department as any,
      "REVISION_REQUESTED",
      `Plan ${optimizedPlan.planId}`,
      "PENDING_APPROVAL",
      "REVISION_REQUESTED",
      reason
    )
  }

  const reportExecutionDelay = (minutes: number, reason: string) => {
    setExecutionTracker((prev) => ({
      ...prev,
      status: "DELAYED",
      currentDelayMin: minutes,
      reportedDelayComment: reason,
    }))
    logAudit(
      currentUser.name,
      currentUser.title,
      currentUser.department as any,
      "REPORT_DISRUPTION",
      `Block ${executionTracker.blockId}`,
      "ON_TIME",
      `+${minutes} MIN DELAY`,
      reason
    )
  }

  const acceptReplanOption = (optionId: "OPTION_A" | "OPTION_B" | "OPTION_C") => {
    setSelectedReplanOption(optionId)
    const opt = MOCK_REPLAN_SCENARIO.alternatives.find((a) => a.optionId === optionId)
    setOptimizedPlan((prev) => ({
      ...prev,
      proposedEnd: optionId === "OPTION_A" ? "07:00" : "06:45",
      status: "APPROVED",
      approvalLog: {
        approvedBy: `${currentUser.name} (${currentUser.title})`,
        approvedAt: "07 May 2026, 10:45 IST",
        comments: `Revised plan ${opt?.title} accepted: ${opt?.scheduleWindow}`,
      },
    }))
    setExecutionTracker((prev) => ({
      ...prev,
      status: "ACTIVE",
      currentDelayMin: 0,
      reportedDelayComment: `Re-plan ${optionId} applied: ${opt?.title}`,
    }))
    logAudit(
      currentUser.name,
      currentUser.title,
      currentUser.department as any,
      "ACCEPT_REPLAN",
      `Block ${optimizedPlan.planId}`,
      "DISRUPTED",
      optionId,
      `Accepted revised alternative: ${opt?.title}`
    )
  }

  const jumpToSihStep = (stepNumber: number) => {
    const clamped = Math.max(1, Math.min(15, stepNumber))
    setCurrentSihStep(clamped)
    const step = SIH_DEMO_STEPS.find((s) => s.stepNumber === clamped)
    if (step) {
      router.push(step.route)
    }
  }

  const nextSihStep = () => {
    jumpToSihStep(currentSihStep + 1)
  }

  const prevSihStep = () => {
    jumpToSihStep(currentSihStep - 1)
  }

  // Multi-Language state (English, Hindi, Marathi, Tamil)
  const [language, setLanguageState] = useState<SupportedLanguage>("English")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("yentrana_lang") as SupportedLanguage
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved)
      }
    }
  }, [])

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("yentrana_lang", lang)
    }
  }

  const t = (key: string, fallback?: string): string => {
    return TRANSLATIONS[language]?.[key] || fallback || TRANSLATIONS.English[key] || key
  }

  // Live operational time and date (Hydration-safe)
  const [mounted, setMounted] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date(2026, 8, 9, 23, 30, 0))

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedLiveTime = useMemo(() => {
    const pad = (n: number) => n.toString().padStart(2, "0")
    const hours = pad(currentTime.getHours())
    const mins = pad(currentTime.getMinutes())
    const secs = pad(currentTime.getSeconds())
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day = pad(currentTime.getDate())
    const month = months[currentTime.getMonth()]
    const year = currentTime.getFullYear()
    return `${day} ${month} ${year} | ${hours}:${mins}:${secs} IST`
  }, [currentTime])

  const formattedLiveDate = useMemo(() => {
    const pad = (n: number) => n.toString().padStart(2, "0")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day = pad(currentTime.getDate())
    const month = months[currentTime.getMonth()]
    const year = currentTime.getFullYear()
    return `${day} ${month} ${year}`
  }, [currentTime])

  return (
    <RailMitraContext.Provider
      value={{
        currentUser,
        setUserRole,
        maintenanceNeeds,
        workPackages,
        constraints,
        compatibilityChecks,
        optimizedPlan,
        executionTracker,
        auditLogs,
        replanScenario: MOCK_REPLAN_SCENARIO,
        selectedReplanOption,
        setSelectedReplanOption,
        currentSihStep,
        jumpToSihStep,
        nextSihStep,
        prevSihStep,
        language,
        setLanguage,
        t,
        currentTime,
        formattedLiveTime,
        formattedLiveDate,
        objectiveWeights,
        setObjectiveWeights,
        addWorkPackageToCommonView,
        approvePlan,
        rejectPlan,
        requestRevision,
        reportExecutionDelay,
        acceptReplanOption,
      }}
    >
      {children}
    </RailMitraContext.Provider>
  )
}

export function useRailMitra() {
  const context = useContext(RailMitraContext)
  if (!context) {
    throw new Error("useRailMitra must be used within a RailMitraProvider")
  }
  return context
}

// Aliases for Yentrana branding
export const useYentrana = useRailMitra
export const YentranaProvider = RailMitraProvider
export type YentranaContextType = RailMitraContextType

