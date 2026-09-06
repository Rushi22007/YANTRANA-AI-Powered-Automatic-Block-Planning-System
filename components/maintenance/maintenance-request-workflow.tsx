"use client"

import { useState } from "react"
import { CheckCircle2, ClipboardCheck, Clock3, Send, ShieldCheck, UserRound, XCircle } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import { PriorityBadge } from "@/components/shared/badges"
import { Button } from "@/components/ui/button"
import { calculateAssetRisk } from "@/lib/calculations"
import { recommendMaintenanceBlock } from "@/lib/scoring"
import { formatDuration } from "@/lib/utils/time"
import { createMaintenanceRequest, updateMaintenanceRequest, useMaintenanceRequests, type MaintenanceRequest, type MaintenanceRequestStatus } from "@/lib/maintenance-requests"
import type { Dataset, MaintenanceJob } from "@/lib/data/schema"

function statusTone(status: MaintenanceRequestStatus) {
  if (status === "REJECTED") return "text-danger"
  if (status === "CLOSED") return "text-success"
  if (status === "IN_PROGRESS") return "text-info"
  return "text-primary"
}

function Status({ value }: { value: MaintenanceRequestStatus }) {
  return <span className={`text-xs font-semibold tracking-wide ${statusTone(value)}`}>{value.replaceAll("_", " ")}</span>
}

function JobDetails({ job, asset }: { job: MaintenanceJob; asset?: Dataset["assets"][number] }) {
  return (
    <div className="grid gap-x-4 gap-y-1 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
      <span>Job <strong className="text-foreground">{job.job_id}</strong></span>
      <span>Asset <strong className="text-foreground">{job.asset_id}</strong></span>
      <span>Department <strong className="text-foreground">{job.department}</strong></span>
      <span>Section <strong className="text-foreground">{job.section_id}</strong></span>
      <span>Work type <strong className="text-foreground">{job.work_type}</strong></span>
      <span>Requested date <strong className="text-foreground">{job.requested_date}</strong></span>
      <span>Duration <strong className="text-foreground">{formatDuration(job.estimated_duration_minutes)}</strong></span>
      <span>Crew <strong className="text-foreground">{job.crew_required}</strong></span>
      <span>Equipment <strong className="text-foreground">{job.equipment_required}</strong></span>
      <span>Maintenance status <strong className="text-foreground">{job.maintenance_status}</strong></span>
      {asset ? <span>Asset risk <strong className="text-foreground">{calculateAssetRisk(asset).level}</strong></span> : null}
    </div>
  )
}

function RequestForm({ job, onSubmitted }: { job: MaintenanceJob; onSubmitted: () => void }) {
  const [date, setDate] = useState(job.requested_date)
  const [start, setStart] = useState(job.preferred_start_time)
  const [reason, setReason] = useState(`Maintenance required for ${job.work_type.toLowerCase()}.`)
  const [remarks, setRemarks] = useState("")

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createMaintenanceRequest({ job_id: job.job_id, preferred_date: date, preferred_start_time: start, reason, remarks })
    onSubmitted()
  }

  return (
    <form onSubmit={submit} className="mt-4 grid gap-3 rounded-md border bg-muted/20 p-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium text-muted-foreground">Selected job<input readOnly value={job.job_id} className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-sm text-foreground" /></label>
        <label className="text-xs font-medium text-muted-foreground">Preferred date<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-sm text-foreground" /></label>
        <label className="text-xs font-medium text-muted-foreground">Preferred start time<input required type="time" value={start} onChange={(event) => setStart(event.target.value)} className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-sm text-foreground" /></label>
        <label className="text-xs font-medium text-muted-foreground">Reason<input required value={reason} onChange={(event) => setReason(event.target.value)} className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-sm text-foreground" /></label>
      </div>
      <label className="text-xs font-medium text-muted-foreground">Remarks<textarea value={remarks} onChange={(event) => setRemarks(event.target.value)} rows={2} placeholder="Add site or access details" className="mt-1 w-full rounded-md border bg-background p-2 text-sm text-foreground" /></label>
      <div><Button type="submit" size="sm"><Send className="size-3.5" />Submit request</Button></div>
    </form>
  )
}

function RequestSummary({ request, job }: { request: MaintenanceRequest; job?: MaintenanceJob }) {
  if (!job) return null
  return (
    <div className="grid gap-x-4 gap-y-1 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
      <span>Request ID <strong className="text-foreground">{request.request_id}</strong></span>
      <span>Job ID <strong className="text-foreground">{job.job_id}</strong></span>
      <span>Department <strong className="text-foreground">{job.department}</strong></span>
      <span>Section <strong className="text-foreground">{job.section_id}</strong></span>
      <span>Work type <strong className="text-foreground">{job.work_type}</strong></span>
      <span>Requested date <strong className="text-foreground">{request.preferred_date}</strong></span>
      <span>Requested time <strong className="text-foreground">{request.preferred_start_time}</strong></span>
      <span>Duration <strong className="text-foreground">{formatDuration(job.estimated_duration_minutes)}</strong></span>
      <span>Crew <strong className="text-foreground">{job.crew_required}</strong></span>
      <span>Equipment <strong className="text-foreground">{job.equipment_required}</strong></span>
      <span>Reason <strong className="text-foreground">{request.reason}</strong></span>
      <span>Status <Status value={request.status} /></span>
    </div>
  )
}

function UserPortal({ dataset }: { dataset: Dataset }) {
  const requests = useMaintenanceRequests()
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [notice, setNotice] = useState("")
  const jobs = dataset.maintenance_jobs.filter((job) => job.maintenance_status.toUpperCase() !== "COMPLETED")
  const selectedJob = jobs.find((job) => job.job_id === selectedJobId)
  const requestByJob = new Map(requests.map((request) => [request.job_id, request]))
  const activeRequests = requests.filter((request) => request.status !== "CLOSED")
  const maintenance = requests.filter((request) => ["APPROVED", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "USER_VERIFIED", "CLOSED"].includes(request.status))

  function transition(request: MaintenanceRequest, status: MaintenanceRequestStatus) {
    updateMaintenanceRequest(request.request_id, { status })
    setNotice(status === "USER_VERIFIED" ? "Completion verified and sent to the admin team." : "Request status updated.")
  }

  return (
    <div className="flex flex-col gap-4">
      {notice ? <div className="rounded-md border border-success/30 bg-success/10 p-3 text-sm text-success-foreground">{notice}</div> : null}
      <SectionCard title="Available Maintenance" icon={ClipboardCheck} description="Maintenance jobs loaded from the existing local CSV dataset.">
        <div className="space-y-3">
          {jobs.map((job) => {
            const asset = dataset.assets.find((item) => item.asset_id === job.asset_id)
            const existing = requestByJob.get(job.job_id)
            return <div key={job.job_id} className="rounded-md border p-3"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><h3 className="text-sm font-semibold">{job.work_type}</h3><PriorityBadge value={job.priority} /></div><p className="mt-1 text-xs text-muted-foreground">{job.job_id} · {job.asset_id} · {asset?.asset_type ?? "Asset"}</p></div>{existing ? <Status value={existing.status} /> : <Button size="sm" variant="secondary" onClick={() => { setSelectedJobId(job.job_id); setNotice("") }}>Request maintenance</Button>}</div><div className="mt-3"><JobDetails job={job} asset={asset} /></div>{selectedJobId === job.job_id ? <RequestForm job={job} onSubmitted={() => { setSelectedJobId(null); setNotice(`Request submitted for ${job.job_id}.`) }} /> : null}</div>
          })}
        </div>
      </SectionCard>
      <SectionCard title="My Requests" icon={Clock3} description="Requests shared with the admin workflow in this browser.">
        {activeRequests.length ? <div className="space-y-3">{activeRequests.map((request) => <div key={request.request_id} className="rounded-md border p-3"><div className="flex flex-wrap items-center justify-between gap-2"><div className="text-sm font-semibold">{request.request_id} · {request.job_id}</div><Status value={request.status} /></div><p className="mt-1 text-xs text-muted-foreground">{request.reason} · {request.preferred_date} {request.preferred_start_time}</p></div>)}</div> : <p className="text-sm text-muted-foreground">No maintenance requests submitted yet.</p>}
      </SectionCard>
      <SectionCard title="My Maintenance" icon={UserRound} description="Approved work and completion actions.">
        {maintenance.length ? <div className="space-y-3">{maintenance.map((request) => { const job = dataset.maintenance_jobs.find((item) => item.job_id === request.job_id); if (!job) return null; const canStart = request.status === "SCHEDULED" || request.status === "APPROVED"; const canComplete = request.status === "IN_PROGRESS"; const canVerify = request.status === "COMPLETED"; return <div key={request.request_id} className="rounded-md border p-3"><div className="flex flex-wrap items-center justify-between gap-2"><div className="text-sm font-semibold">{request.request_id} · {job.work_type}</div><Status value={request.status} /></div><div className="mt-3"><RequestSummary request={request} job={job} /></div>{request.approved_date ? <div className="mt-3 rounded-md bg-success/10 p-3 text-xs text-success-foreground">Approved window: {request.approved_date} {request.approved_start_time}-{request.approved_end_time} · Safety buffer: {job.safety_buffer_before} min before / {job.safety_buffer_after} min after</div> : null}<div className="mt-3 flex flex-wrap gap-2">{canStart ? <Button size="sm" onClick={() => transition(request, "IN_PROGRESS")}><Clock3 className="size-3.5" />Start work</Button> : null}{canComplete ? <Button size="sm" onClick={() => transition(request, "COMPLETED")}><CheckCircle2 className="size-3.5" />Mark work complete</Button> : null}{canVerify ? <><p className="w-full text-sm text-warning-foreground">Maintenance completed. Please verify the completion.</p><Button size="sm" onClick={() => transition(request, "USER_VERIFIED")}><ShieldCheck className="size-3.5" />Confirm completion</Button></> : null}{request.status === "CLOSED" ? <span className="text-sm font-semibold text-success">✓ Maintenance Closed</span> : null}</div></div> })}</div> : <p className="text-sm text-muted-foreground">Approved maintenance will appear here.</p>}
      </SectionCard>
    </div>
  )
}

function AdminPortal({ dataset }: { dataset: Dataset }) {
  const requests = useMaintenanceRequests()
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
  const [notice, setNotice] = useState("")
  const selectedRequest = requests.find((request) => request.request_id === selectedRequestId)

  function approve(request: MaintenanceRequest) {
    const job = dataset.maintenance_jobs.find((item) => item.job_id === request.job_id)
    if (!job) return
    const recommendation = recommendMaintenanceBlock(dataset, job, { request_id: request.request_id, job_id: job.job_id, department: job.department, section_id: job.section_id, requested_date: request.preferred_date, requested_start: request.preferred_start_time, requested_end: request.preferred_start_time, requested_duration_minutes: job.estimated_duration_minutes, priority: job.priority, reason: request.reason, crew_required: job.crew_required, equipment_required: job.equipment_required, dependency: "", request_status: "SUBMITTED", synthetic_flag: "FALSE" })
    updateMaintenanceRequest(request.request_id, { status: recommendation.status === "RECOMMENDED" ? "SCHEDULED" : "APPROVED", approved_date: recommendation.date, approved_start_time: recommendation.start_time, approved_end_time: recommendation.end_time, approved_duration_minutes: recommendation.duration_minutes, approval_note: recommendation.status === "RECOMMENDED" ? "Window recommended by the existing Block Planner." : recommendation.conflicts.join(" ") })
    setNotice(`${request.request_id} approved and shared with the field user.`)
  }

  function reject(request: MaintenanceRequest) {
    updateMaintenanceRequest(request.request_id, { status: "REJECTED" })
    setNotice(`${request.request_id} rejected.`)
  }

  return (
    <div className="flex flex-col gap-4">
      {notice ? <div className="rounded-md border border-info/30 bg-info/10 p-3 text-sm text-info-foreground">{notice}</div> : null}
      <SectionCard title="Maintenance Requests" icon={ShieldCheck} description="Review requests submitted by the field user and manage final verification.">
        {requests.length ? <div className="space-y-3">{requests.map((request) => { const job = dataset.maintenance_jobs.find((item) => item.job_id === request.job_id); if (!job) return null; return <div key={request.request_id} className="rounded-md border p-3"><div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2"><span className="text-sm font-semibold">{request.request_id}</span><Status value={request.status} /></div><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => { setSelectedRequestId(request.request_id); if (request.status === "SUBMITTED") updateMaintenanceRequest(request.request_id, { status: "UNDER_REVIEW" }) }}>View</Button>{request.status === "SUBMITTED" || request.status === "UNDER_REVIEW" ? <><Button size="sm" onClick={() => approve(request)}><CheckCircle2 className="size-3.5" />Approve</Button><Button size="sm" variant="destructive" onClick={() => reject(request)}><XCircle className="size-3.5" />Reject</Button></> : null}{request.status === "USER_VERIFIED" ? <Button size="sm" onClick={() => { updateMaintenanceRequest(request.request_id, { status: "CLOSED" }); setNotice(`${request.request_id} verified and closed.`) }}><ShieldCheck className="size-3.5" />Verify & close</Button> : null}</div></div><div className="mt-3"><RequestSummary request={request} job={job} /></div>{request.status === "USER_VERIFIED" ? <p className="mt-3 text-sm text-success">User has confirmed maintenance completion.</p> : null}{selectedRequestId === request.request_id ? <div className="mt-3 rounded-md bg-muted/20 p-3 text-xs text-muted-foreground">Remarks: <strong className="text-foreground">{request.remarks || "None"}</strong>{request.approval_note ? <p className="mt-1">Approval details: <strong className="text-foreground">{request.approval_note}</strong></p> : null}</div> : null}</div> })}</div> : <p className="text-sm text-muted-foreground">No maintenance requests have been submitted.</p>}
      </SectionCard>
    </div>
  )
}

export function MaintenanceRequestWorkflow({ dataset }: { dataset: Dataset }) {
  const [role, setRole] = useState<"ADMIN" | "FIELD USER">("FIELD USER")
  return <div className="flex flex-col gap-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-xl font-semibold tracking-tight">Maintenance Request Workflow</h1><p className="text-sm text-muted-foreground">Prototype user and admin workflow over the existing local CSV dataset.</p></div><div className="flex items-center gap-2 rounded-md border bg-muted/20 p-1"><Button size="sm" variant={role === "ADMIN" ? "default" : "ghost"} onClick={() => setRole("ADMIN")}><ShieldCheck className="size-3.5" />Admin</Button><Button size="sm" variant={role === "FIELD USER" ? "default" : "ghost"} onClick={() => setRole("FIELD USER")}><UserRound className="size-3.5" />Field user</Button></div></div>{role === "ADMIN" ? <AdminPortal dataset={dataset} /> : <UserPortal dataset={dataset} />}</div>
}
