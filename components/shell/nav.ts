import {
  LayoutDashboard,
  Map,
  Wrench,
  Package,
  Layers,
  ShieldAlert,
  GitMerge,
  Cpu,
  CalendarRange,
  AlertTriangle,
  FileCheck2,
  PlayCircle,
  RefreshCw,
  CalendarDays,
  BarChart3,
  Database,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  labelEn: string
  labelHi: string
  href: string
  icon: LucideIcon
  badge?: string
  stepNumber?: number
}

export interface NavGroup {
  labelEn: string | null
  labelHi?: string | null
  items: NavItem[]
}

export const NAV_CONFIG: NavGroup[] = [
  {
    labelEn: "COMMAND & CORRIDOR",
    labelHi: "कमांड और कॉरिडोर",
    items: [
      { labelEn: "Dashboard", labelHi: "डैशबोर्ड", href: "/dashboard", icon: LayoutDashboard },
      { labelEn: "Corridor Map", labelHi: "कॉरिडोर मानचित्र", href: "/corridor-map", icon: Map },
    ],
  },
  {
    labelEn: "MAINTENANCE PIPELINE",
    labelHi: "रखरखाव पाइपलाइन",
    items: [
      { labelEn: "Maintenance Tasks", labelHi: "रखरखाव कार्य", href: "/maintenance", icon: Wrench, stepNumber: 1 },
      { labelEn: "Work Packages", labelHi: "कार्य पैकेज", href: "/work-packages", icon: Package, stepNumber: 2 },
      { labelEn: "Common View", labelHi: "साझा दृश्य", href: "/common-view", icon: Layers, stepNumber: 3, badge: "Crucial" },
    ],
  },
  {
    labelEn: "AI REASONING & PLANNING",
    labelHi: "एआई तर्क और योजना",
    items: [
      { labelEn: "Constraints", labelHi: "बाधाएं", href: "/constraints", icon: ShieldAlert, stepNumber: 4 },
      { labelEn: "Compatibility", labelHi: "अनुकूलता", href: "/compatibility", icon: GitMerge, stepNumber: 5 },
      { labelEn: "AI Block Planner", labelHi: "AI ब्लॉक योजनाकार", href: "/planner", icon: Cpu, stepNumber: 6 },
      { labelEn: "Conflict Management", labelHi: "टकराव प्रबंधन", href: "/conflicts", icon: AlertTriangle },
    ],
  },
  {
    labelEn: "GOVERNANCE & EXECUTION",
    labelHi: "शासन और निष्पादन",
    items: [
      { labelEn: "Approvals", labelHi: "अनुमोदन (मानव)", href: "/approvals", icon: FileCheck2, stepNumber: 8, badge: "Mandatory" },
      { labelEn: "Execution Tracking", labelHi: "निष्पादन", href: "/execution", icon: PlayCircle, stepNumber: 9 },
      { labelEn: "Disruption / Re-Plan", labelHi: "पुनर्योजना", href: "/replan", icon: RefreshCw, stepNumber: 10, badge: "Dynamic" },
      { labelEn: "Authority Matrix", labelHi: "अधिकार मैट्रिक्स", href: "/authority-matrix", icon: ShieldCheck, badge: "RBAC" },
    ],
  },
  {
    labelEn: "SCHEDULES & CALENDARS",
    labelHi: "शेड्यूल और कैलेंडर",
    items: [
      { labelEn: "Weekly Schedule (Gantt)", labelHi: "शेड्यूल (गैंट)", href: "/weekly-plan", icon: CalendarRange },
      { labelEn: "Monthly Plan", labelHi: "मासिक योजना", href: "/monthly-plan", icon: CalendarDays },
    ],
  },
  {
    labelEn: "INTELLIGENCE & AUDIT",
    labelHi: "एकीकरण और ऑडिट",
    items: [
      { labelEn: "Reports & Analytics", labelHi: "रिपोर्ट और विश्लेषण", href: "/analytics", icon: BarChart3 },
      { labelEn: "Data Integration", labelHi: "डेटा एकीकरण", href: "/integration", icon: Database, badge: "Adapters" },
      { labelEn: "Audit Trail Log", labelHi: "ऑडिट लॉग", href: "/audit", icon: ScrollText },
    ],
  },
]
