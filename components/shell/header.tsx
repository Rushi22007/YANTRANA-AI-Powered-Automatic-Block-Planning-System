"use client"

import { Menu, PanelLeftClose, Bell, CircleUser, Accessibility, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function Header({
  onToggleDesktop,
  onToggleMobile,
}: {
  onToggleDesktop: () => void
  onToggleMobile: () => void
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:px-5">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleMobile} aria-label="Open navigation">
        <Menu className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={onToggleDesktop} aria-label="Toggle sidebar">
        <PanelLeftClose className="size-5" />
      </Button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-sm font-semibold leading-tight md:text-base">
            AI Powered Automatic Block Planning System
          </h1>
        </div>
        <p className="truncate text-[11px] text-muted-foreground md:text-xs">
          Optimized Maintenance Block Planning for Maximum Asset Availability
        </p>
      </div>

      <div className="hidden items-center gap-2 border-l border-border pl-4 sm:flex">
        <span className="flex size-9 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary">
          <Landmark className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-foreground">MINISTRY OF RAILWAYS</p>
          <p className="text-[11px] text-muted-foreground">Government of India</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Accessibility options">
              <Accessibility className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Accessibility options</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="text-sm font-medium">Conflicts detected in active block requests</span>
              <span className="text-xs text-muted-foreground">Review the Conflict Management board</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="text-sm font-medium">Overdue high-criticality assets</span>
              <span className="text-xs text-muted-foreground">See High Risk Assets on Asset Health</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 px-2">
              <CircleUser className="size-6 text-muted-foreground" />
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-medium">Admin</span>
                <span className="block text-[11px] text-muted-foreground">Super Administrator</span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span>Admin</span>
              <span className="text-xs font-normal text-muted-foreground">Super Administrator</span>
              <span className="text-xs font-normal text-muted-foreground">Last login: 06 Sep 2026, 08:14</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function Separator() {
  return <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
}
