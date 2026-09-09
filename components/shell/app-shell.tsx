"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { SidebarNav } from "./sidebar"
import { Header } from "./header"
import { TopGovBar } from "@/components/government/top-gov-bar"
import { GovFooter } from "@/components/government/gov-footer"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // For Landing page ('/') and Login ('/login'), use the minimal government portal shell
  const isMinimalGovPage = pathname === "/" || pathname === "/login"

  if (isMinimalGovPage) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
        <TopGovBar />
        <main className="flex-1">{children}</main>
        <GovFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9]">
      {/* Top Government Bar */}
      <TopGovBar />

      <div className="flex flex-1 w-full overflow-x-hidden">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "sticky top-8 hidden h-[calc(100vh-2rem)] shrink-0 border-r border-slate-800 transition-all duration-200 md:block z-20",
            collapsed ? "w-16" : "w-64"
          )}
        >
          <SidebarNav
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((c) => !c)}
          />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 border-slate-800 bg-[#0F172A] p-0 [&>button]:text-slate-200">
            <SheetTitle className="sr-only">Railway Navigation</SheetTitle>
            <SidebarNav collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            collapsed={collapsed}
            onToggleDesktop={() => setCollapsed((c) => !c)}
            onToggleMobile={() => setMobileOpen(true)}
          />

          <main id="main-content" className="flex-1 px-3 py-3 md:px-5 md:py-4">
            <div className="mx-auto w-full max-w-[1720px]">{children}</div>
          </main>

          <GovFooter />
        </div>
      </div>
    </div>
  )
}
