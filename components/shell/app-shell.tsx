"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { SidebarNav } from "./sidebar"
import { Header } from "./header"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-svh w-full bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-svh shrink-0 border-r border-sidebar-border transition-[width] duration-200 md:block",
          collapsed ? "w-[68px]" : "w-64",
        )}
      >
        <SidebarNav collapsed={collapsed} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 border-sidebar-border bg-sidebar p-0 [&>button]:text-sidebar-foreground">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarNav collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onToggleDesktop={() => setCollapsed((c) => !c)}
          onToggleMobile={() => setMobileOpen(true)}
        />
        <main className="flex-1 px-3 py-4 md:px-6 md:py-6">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
