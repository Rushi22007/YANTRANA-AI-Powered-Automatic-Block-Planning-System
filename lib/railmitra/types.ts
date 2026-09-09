export type Department = "ENGINEERING" | "TRD" | "SNT" | "CONTROL_OFFICE" | "PLANNING_OPERATIONS"

export type Priority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"

export type BlockType = "TRAFFIC_BLOCK" | "POWER_BLOCK" | "DISCONNECTION" | "COMBINED_BLOCK"

export type MaintenanceStatus = "REQUESTED" | "WORK_PACKAGED" | "COORDINATING" | "OPTIMIZED" | "APPROVED" | "IN_PROGRESS" | "COMPLETED" | "RESCHEDULED"

export type SystemSource = "TMS" | "TDMS" | "SMMS" | "COA" | "MANUAL"

export interface DepartmentMeta {
  code: Department
  nameEn: string
  nameHi: string
  shortName: string
  color: string
  badgeBg: string
}

export const DEPARTMENTS: Record<Department, DepartmentMeta> = {
  ENGINEERING: {
    code: "ENGINEERING",
    nameEn: "Engineering",
    nameHi: "इंजीनियरिंग",
    shortName: "Civil / Track",
    color: "#0284c7",
    badgeBg: "bg-sky-500/10 text-sky-700 border-sky-300",
  },
  TRD: {
    code: "TRD",
    nameEn: "Traction (TRD)",
    nameHi: "ट्रैक्शन (TRD)",
    shortName: "TRD / Electrical",
    color: "#ea580c",
    badgeBg: "bg-orange-500/10 text-orange-700 border-orange-300",
  },
  SNT: {
    code: "SNT",
    nameEn: "Signal & Telecom (S&T)",
    nameHi: "सिग्नल & टेलीकॉम",
    shortName: "S&T / Signaling",
    color: "#16a34a",
    badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
  },
  CONTROL_OFFICE: {
    code: "CONTROL_OFFICE",
    nameEn: "Control Office",
    nameHi: "नियंत्रण कार्यालय",
    shortName: "Operations",
    color: "#6366f1",
    badgeBg: "bg-indigo-500/10 text-indigo-700 border-indigo-300",
  },
  PLANNING_OPERATIONS: {
    code: "PLANNING_OPERATIONS",
    nameEn: "Planning & Operations",
    nameHi: "योजना और संचालन",
    shortName: "Divisional Cell",
    color: "#9333ea",
    badgeBg: "bg-purple-500/10 text-purple-700 border-purple-300",
  },
}

export interface MaintenanceNeed {
  taskId: string
  department: Department
  assetId: string
  assetType: string
  location: string
  sectionId: string
  maintenanceNeed: string
  priority: Priority
  overdueDays: number
  durationMinutes: number
  blockRequired: BlockType
  status: MaintenanceStatus
  source: SystemSource
  reportedDate: string
  targetDate: string
  preferredStartTime: string
  crewRequirement: string
  machineRequirement?: string
  safetyNotes: string
}

export interface WorkPackage {
  packageId: string
  taskId: string
  department: Department
  assetName: string
  section: string
  location: string
  maintenanceType: string
  durationMinutes: number
  crew: string
  resources: string
  blockType: BlockType
  safetyRequirements: string[]
  dependencies: string[]
  preferredTime: string
  preferredDate: string
  priority: Priority
  status: "DRAFT" | "READY_FOR_COORDINATION" | "IN_COMMON_VIEW" | "OPTIMIZED" | "APPROVED"
  createdAt: string
}

export interface TrainMovementItem {
  trainNumber: string
  trainName: string
  trainType: "PASSENGER_MAIL_EXPRESS" | "SUBURBAN_LOCAL" | "FREIGHT_GOODS" | "PARCEL_SPECIAL"
  section: string
  scheduledEntry: string
  scheduledExit: string
  priorityRank: number
  punctualityImpactMin: number
}

export interface GoodsForecastItem {
  consignmentId: string
  rakeType: "CONTAINER" | "BOXN_COAL" | "BCN_CEMENT" | "BTPN_POL"
  origin: string
  destination: string
  corridor: string
  forecastTime: string
  durationMinutes: number
  isCriticalFreight: boolean
  hardConstraint: boolean
}

export interface CorridorConstraint {
  constraintId: string
  category: "TRAIN" | "CORRIDOR" | "TIME" | "RESOURCE" | "SAFETY" | "DEPENDENCY" | "DEPARTMENT"
  title: string
  description: string
  severity: "HIGH" | "MEDIUM" | "LOW"
  affectedCorridor: string
  affectedTask: string
  isHard: boolean
  operationalConsequence: string
}

export interface CompatibilityCheck {
  id: string
  pair: string
  deptA: Department
  deptB: Department
  taskA: string
  taskB: string
  isCompatible: boolean
  reason: string
  safetyClearance: boolean
  powerIsolationNeeded: boolean
  trafficInterruptionLevel: "FULL" | "PARTIAL" | "NONE"
}

export interface AIWeightObjectives {
  assetAvailability: number // 30% default
  maintenanceCompletion: number // 20%
  blockUtilization: number // 20%
  trainImpact: number // 15%
  conflictReduction: number // 10%
  multiDeptBundling: number // 5%
}

export interface OptimizedBlockPlan {
  planId: string
  corridor: string
  date: string
  proposedStart: string
  proposedEnd: string
  durationMinutes: number
  departments: Department[]
  bundledTasks: string[]
  trainImpactScore: "LOW" | "MEDIUM" | "HIGH"
  conflictsResolved: number
  confidenceScore: number
  utilizationRate: number
  aiJustification: string[]
  status: "PENDING_APPROVAL" | "REVISION_REQUESTED" | "APPROVED" | "REJECTED"
  approvalLog?: {
    approvedBy?: string
    approvedAt?: string
    comments?: string
    revisionReason?: string
  }
}

export interface ExecutionTracker {
  blockId: string
  status: "SCHEDULED" | "ACTIVE" | "COMPLETED" | "DELAYED"
  plannedStart: string
  actualStart: string
  plannedDuration: number
  actualDuration: number
  currentDelayMin: number
  departmentsProgress: {
    engineering: number // 0-100
    trd: number // 0-100
    snt: number // 0-100
  }
  activeStepIndex: number
  steps: {
    time: string
    title: string
    department: Department
    completed: boolean
  }[]
  reportedDelayComment?: string
}

export interface ReplanAlternative {
  optionId: "OPTION_A" | "OPTION_B" | "OPTION_C"
  title: string
  description: string
  scheduleWindow: string
  trainImpact: "LOW" | "MEDIUM" | "HIGH"
  recommended: boolean
  splitSummary?: string
  tradeoffReason: string
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  userName: string
  role: string
  department: Department | "SYSTEM"
  action: string
  targetObject: string
  oldValue: string
  newValue: string
  reason: string
}

export type UserTier =
  | "FIELD_EXECUTION"       // Track Maintainer, Gangmate, Keyman, Patrolman, TRD Tech, S&T Maintainer
  | "SUPERVISION"             // JE/SSE, PWI, Sectional Signal Inspector, TRD Supervisor
  | "PLANNING"                // Engineering + TRD + S&T planners / Divisional Planning Officers
  | "OPERATIONS"              // Section Controller, Station Master, Operating / Power Control
  | "APPROVAL_MANAGEMENT"     // Authorized officials, Divisional Management (Sr. DOM, Sr. DEN, DRM)

export type UserRole =
  | "ADMIN"
  | "SR_DOM"                  // Approval / Management: Senior Divisional Operations Manager (Operating Authority)
  | "SR_DEN"                  // Approval / Management: Senior Divisional Engineer (Engineering Authority)
  | "DRM"                     // Approval / Management: Divisional Railway Manager
  | "CONTROL_OFFICE"          // Operations: Chief Section Controller
  | "STATION_MASTER"          // Operations: Station Master (Khandala / Bhor Ghat)
  | "POWER_CONTROLLER"        // Operations: Traction Power Controller (TPC)
  | "PLANNING_OFFICER"        // Planning: Divisional Rolling Block Planning Officer
  | "CORRIDOR_PLANNER"        // Planning: Multi-Department Corridor Planner
  | "ENGINEERING"             // Supervision: Senior Section Engineer (P-Way)
  | "TRD"                     // Supervision: Senior Section Engineer (TRD / OHE)
  | "SNT"                     // Supervision: Sectional Signal Inspector (S&T)
  | "SUPERVISOR"              // Supervision: Site Maintenance Supervisor
  | "FIELD_ENG"               // Field Execution: Senior Gangmate / Track Maintainer
  | "FIELD_TRD"               // Field Execution: OHE Linesman / TRD Technician
  | "FIELD_SNT"               // Field Execution: S&T Key Maintainer

export interface UserPersona {
  role: UserRole
  tier: UserTier
  tierLabel?: string
  name: string
  title: string
  designationHindi?: string
  department: Department | "OPERATIONS" | "PLANNING" | "MANAGEMENT"
  division: string
  zone: string
  employeeId?: string
  badgeNumber?: string
  clearanceLevel?: string
  authorizedWorkflowSteps?: number[]
  canApproveBlocks?: boolean
  canRunOptimizer?: boolean
  canEditSafetyConstraints?: boolean
  canUpdateFieldTelemetry?: boolean
  canLogMaintenanceNeeds?: boolean
}
