import React from "react"
import { RailMitraDashboard, YentranaDashboard } from "@/components/dashboard/railmitra-dashboard"

export const metadata = {
  title: "Dashboard • Yentrana AI • Indian Railways",
  description: "Executive Command Center for AI-Powered Automatic Block Planning System",
}

export default function DashboardPage() {
  return <YentranaDashboard />
}
