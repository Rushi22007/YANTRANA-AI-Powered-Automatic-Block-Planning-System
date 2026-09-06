import {
  LayoutDashboard,
  Map,
  Wrench,
  HeartPulse,
  Boxes,
  Cpu,
  CalendarClock,
  GitBranch,
  ClipboardList,
  CalendarRange,
  History,
  TrainFront,
  Route,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export interface NavGroup {
  label: string | null
  items: NavItem[]
}

export const NAV: NavGroup[] = [
  {
    label: null,
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Corridor Map", href: "/corridor-map", icon: Map },
    ],
  },
  {
    label: "Maintenance",
    items: [
      { label: "Maintenance Jobs", href: "/maintenance/jobs", icon: Wrench },
      { label: "Asset Health", href: "/maintenance/asset-health", icon: HeartPulse },
      { label: "Equipment Availability", href: "/maintenance/equipment", icon: Boxes },
    ],
  },
  {
    label: "AI Planning",
    items: [
      { label: "AI Priority Engine", href: "/planning/priority-engine", icon: Cpu },
      { label: "Block Planner", href: "/planning/block-planner", icon: CalendarClock },
      { label: "Conflict Management", href: "/planning/conflicts", icon: GitBranch },
    ],
  },
  {
    label: "Blocks",
    items: [
      { label: "Block Requests", href: "/blocks/requests", icon: ClipboardList },
      { label: "Block Schedule", href: "/blocks/schedule", icon: CalendarRange },
      { label: "Historical Blocks", href: "/blocks/historical", icon: History },
    ],
  },
  {
    label: "Train Operations",
    items: [
      { label: "Train Overview", href: "/trains/overview", icon: TrainFront },
      { label: "Train Movements", href: "/trains/movements", icon: Route },
    ],
  },
  {
    label: null,
    items: [
      { label: "Reports & Analytics", href: "/reports", icon: BarChart3 },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]
