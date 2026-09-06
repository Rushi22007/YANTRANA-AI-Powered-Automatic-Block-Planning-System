"use client"

import { CalendarClock } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AvailabilityBadge, BoolBadge, DensityBadge } from "@/components/shared/badges"
import { Mono } from "@/components/shared/value"
import type { CorridorAvailability } from "@/lib/data/schema"
import { findAvailableWindows } from "@/lib/calculations"
import { formatDate } from "@/lib/utils/time"

export function UpcomingWindows({ corridor }: { corridor: CorridorAvailability[] }) {
  const windows = findAvailableWindows(corridor)
    .slice()
    .sort((a, b) => (a.date + a.start_time).localeCompare(b.date + b.start_time))
    .slice(0, 8)

  return (
    <SectionCard
      title="Upcoming Maintenance Windows"
      icon={CalendarClock}
      description="corridor_availability where status = AVAILABLE and maintenance_allowed = TRUE"
      bodyClassName="overflow-x-auto"
    >
      {windows.length === 0 ? (
        <p className="py-6 text-center text-sm italic text-muted-foreground/70">Data unavailable</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Train Density</TableHead>
              <TableHead>Maint. Allowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {windows.map((w) => (
              <TableRow key={w.availability_id}>
                <TableCell className="whitespace-nowrap">{formatDate(w.date)}</TableCell>
                <TableCell><Mono>{w.section_id}</Mono></TableCell>
                <TableCell className="font-mono text-xs">{w.start_time}</TableCell>
                <TableCell className="font-mono text-xs">{w.end_time}</TableCell>
                <TableCell><AvailabilityBadge value={w.availability_status} /></TableCell>
                <TableCell><DensityBadge value={w.train_density} /></TableCell>
                <TableCell><BoolBadge value={w.maintenance_allowed} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SectionCard>
  )
}
