"use client"

import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from "react-leaflet"
import type { BlockRequest, MaintenanceJob, TrainMovement } from "@/lib/data/schema"
import type { Conflict } from "@/lib/conflict"
import { MUMBAI_LONAVALA_CORRIDOR, sectionFor } from "./corridor-config"

interface RailwayMapProps {
  sections: string[]
  jobs: MaintenanceJob[]
  requests: BlockRequest[]
  movements: TrainMovement[]
  conflicts: Conflict[]
}

const colors = { corridor: "#183b63", block: "#e27a22", train: "#1479c9", conflict: "#c72c41" }

function segment(sectionId: string): [number, number][] {
  const section = sectionFor(sectionId)
  return section?.stations.map((station) => station.position) ?? []
}

function label(value: string | number | undefined): string {
  return value === undefined || value === "" ? "Data unavailable" : String(value)
}

export function RailwayMap({ sections, jobs, requests, movements, conflicts }: RailwayMapProps) {
  const visibleSections = MUMBAI_LONAVALA_CORRIDOR.filter((section) => sections.includes(section.id))
  const stations = [...new Map(visibleSections.flatMap((section) => section.stations).map((station) => [station.name, station])).values()]
  const jobsWithoutRequest = jobs.filter((job) => !requests.some((request) => request.job_id === job.job_id))

  return (
    <div className="relative overflow-hidden rounded-lg border bg-slate-100">
      <MapContainer center={[18.94, 73.12]} zoom={10} scrollWheelZoom className="h-[520px] w-full sm:h-[620px]">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {visibleSections.map((section) => <Polyline key={section.id} positions={section.stations.map((station) => station.position)} pathOptions={{ color: colors.corridor, weight: 6, opacity: 0.9 }} />)}
        {stations.map((station) => <CircleMarker key={station.name} center={station.position} radius={8} pathOptions={{ color: colors.corridor, weight: 3, fillColor: "#ffffff", fillOpacity: 1 }}><Popup><strong>{station.name} station</strong><br />Mumbai–Lonavala corridor</Popup></CircleMarker>)}
        {requests.filter((request) => request.request_status?.toUpperCase() !== "REJECTED").map((request) => {
          const path = segment(request.section_id)
          const job = jobs.find((item) => item.job_id === request.job_id)
          return path.length ? <Polyline key={request.request_id} positions={path} pathOptions={{ color: colors.block, weight: 10, opacity: 0.78, dashArray: "12 8" }}><Popup><strong>Planned maintenance block</strong><div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs"><span>Job ID</span><b>{label(job?.job_id)}</b><span>Request ID</span><b>{request.request_id}</b><span>Section</span><b>{request.section_id}</b><span>Department</span><b>{request.department}</b><span>Priority</span><b>{label(job?.priority ?? request.priority)}</b><span>Work Type</span><b>{label(job?.work_type)}</b><span>Status</span><b>{label(job?.maintenance_status ?? request.request_status)}</b><span>Window</span><b>{request.requested_date} {request.requested_start}–{request.requested_end}</b></div></Popup></Polyline> : null
        })}
        {jobsWithoutRequest.map((job) => {
          const path = segment(job.section_id)
          return path.length ? <Polyline key={job.job_id} positions={path} pathOptions={{ color: colors.block, weight: 10, opacity: 0.78, dashArray: "12 8" }}><Popup><strong>Planned maintenance block</strong><div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs"><span>Job ID</span><b>{job.job_id}</b><span>Request ID</span><b>Data unavailable</b><span>Section</span><b>{job.section_id}</b><span>Department</span><b>{job.department}</b><span>Priority</span><b>{job.priority}</b><span>Work Type</span><b>{job.work_type}</b><span>Status</span><b>{job.maintenance_status}</b><span>Planned Window</span><b>{job.requested_date} {job.preferred_start_time}</b></div></Popup></Polyline> : null
        })}
        {movements.map((movement) => {
          const path = segment(movement.section_id)
          if (!path.length) return null
          return <Polyline key={movement.movement_id} positions={path} pathOptions={{ color: colors.train, weight: 4, opacity: 0.95 }}><Popup><strong>Train movement</strong><div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs"><span>Train ID</span><b>{movement.train_id}</b><span>Movement ID</span><b>{movement.movement_id}</b><span>Section</span><b>{movement.section_id}</b><span>Travel date</span><b>{movement.travel_date}</b><span>Direction</span><b>{movement.direction}</b><span>Track</span><b>{movement.track}</b><span>Entry / Exit</span><b>{movement.entry_time}–{movement.exit_time}</b><span>Occupancy</span><b>{movement.occupancy_duration_minutes} min</b></div></Popup></Polyline>
        })}
        {conflicts.map((conflict) => {
          const path = segment(conflict.section_id)
          const position = path.length ? path[0] : undefined
          if (!position) return null
          return <CircleMarker key={conflict.conflict_id} center={position} radius={10} pathOptions={{ color: "#ffffff", weight: 2, fillColor: colors.conflict, fillOpacity: 1 }}><Popup><strong>Conflict warning</strong><div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs"><span>Type</span><b>{conflict.conflict_type}</b><span>Related request</span><b>{conflict.reference}</b><span>Section</span><b>{conflict.section_id}</b><span>Affected trains</span><b>{movements.filter((movement) => movement.section_id === conflict.section_id && movement.travel_date === conflict.date).map((movement) => movement.train_id).join(", ") || "None recorded"}</b><span>Reason</span><b>{conflict.recommendation}</b></div></Popup></CircleMarker>
        })}
      </MapContainer>
      <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] w-48 rounded-md border bg-white/95 p-3 text-xs shadow-sm"><p className="mb-2 font-semibold text-slate-800">Map legend</p><div className="space-y-1.5 text-slate-700"><LegendLine color={colors.block} label="Planned Block" /><LegendLine color={colors.train} label="Train Path" /><LegendLine color={colors.conflict} label="Conflict" marker /><LegendLine color="#ffffff" border label="Station" marker /></div></div>
    </div>
  )
}

function LegendLine({ color, label, marker = false, border = false }: { color: string; label: string; marker?: boolean; border?: boolean }) {
  return <div className="flex items-center gap-2"><span className={marker ? "size-3 rounded-full" : "h-1.5 w-5 rounded-full"} style={{ backgroundColor: color, border: border ? `2px solid ${colors.corridor}` : undefined }} />{label}</div>
}
