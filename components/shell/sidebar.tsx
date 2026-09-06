"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrainFront } from "lucide-react"
import { NAV } from "./nav"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

export function SidebarNav({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className={cn("flex items-center gap-2.5 border-b border-sidebar-border px-4 h-16", collapsed && "justify-center px-2")}>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <TrainFront className="size-5" />
        </span>
        {!collapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">Block Planning</p>
            <p className="truncate text-[11px] text-sidebar-foreground/70">Indian Railways · Prototype</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV.map((group, gi) => (
          <div key={gi} className="mb-3 last:mb-0">
            {group.label && !collapsed ? (
              <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                {group.label}
              </p>
            ) : null}
            {group.label && collapsed ? <div className="mx-2 my-2 border-t border-sidebar-border/60" /> : null}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActive(pathname, item.href)
                const link = (
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      collapsed && "justify-center px-2",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className={cn("size-4 shrink-0", active && "text-sidebar-primary")} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                )
                return (
                  <li key={item.href}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>{link}</TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                      </Tooltip>
                    ) : (
                      link
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="border-t border-sidebar-border px-4 py-3">
          <p className="text-[10px] leading-snug text-sidebar-foreground/60">
            Decision-support prototype. AI-assisted recommendations only — not an operational railway control system.
          </p>
        </div>
      )}
    </div>
  )
}
