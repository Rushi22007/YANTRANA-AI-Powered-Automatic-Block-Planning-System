"use client"

import Link from "next/link"
import { useState } from "react"
import { Sparkles, ArrowRight, CheckCircle2, TriangleAlert } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PriorityBadge, RiskBadge } from "@/components/shared/badges"
import { Mono } from "@/components/shared/value"
import type { Dataset } from "@/lib/data/schema"
import { calculateMaintenancePriority, recommendMaintenanceBlock, topRecommendedJob } from "@/lib/scoring"
import { calculateAssetRisk } from "@/lib/calculations"
import { formatDate, formatDuration } from "@/lib/utils/time"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AiRecommendation({ dataset }: { dataset: Dataset }) {
  const top = topRecommendedJob(dataset)
  const [selectedJobId, setSelectedJobId] = useState(top?.job.job_id ?? "")
  const selectedJob = dataset.maintenance_jobs.find((job) => job.job_id === selectedJobId) ?? top?.job
  const requests = selectedJob ? dataset.block_requests.filter((request) => request.job_id === selectedJob.job_id) : []
  const [selectedRequestId, setSelectedRequestId] = useState("")
  const selectedRequest = requests.find((request) => request.request_id === selectedRequestId) ?? requests[0]

  if (!top) {
    return (
      <Card className="p-4">
        <p className="text-sm italic text-muted-foreground/70">Data unavailable</p>
      </Card>
    )
  }

  const { job, result } = top
  const activeJob = selectedJob ?? job
  const priority = calculateMaintenancePriority(dataset, activeJob)
  const recommendation = recommendMaintenanceBlock(dataset, activeJob, selectedRequest)
  const asset = dataset.assets.find((a) => a.asset_id === activeJob.asset_id)
  const risk = asset ? calculateAssetRisk(asset) : null

  return (
    <Card className="flex h-full flex-col gap-4 border-primary/20 bg-gradient-to-br from-primary/[0.06] to-transparent p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary/12 text-primary">
            <Sparkles className="size-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold leading-tight">Recommended Maintenance Action</h2>
            <p className="text-[11px] text-muted-foreground">Real-data block recommendation</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-semibold leading-none text-primary">{priority.score}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Priority / 100</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Select value={activeJob.job_id} onValueChange={(value) => { setSelectedJobId(value ?? ""); setSelectedRequestId("") }}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select maintenance job" /></SelectTrigger>
          <SelectContent>
            {dataset.maintenance_jobs.map((item) => <SelectItem key={item.job_id} value={item.job_id}>{item.job_id} · {item.work_type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={selectedRequest?.request_id ?? "NONE"} onValueChange={(value) => setSelectedRequestId(value === "NONE" || value === null ? "" : value)}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select block request" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="NONE">No linked request</SelectItem>
            {requests.map((request) => <SelectItem key={request.request_id} value={request.request_id}>{request.request_id} · {request.request_status}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
        <Field label="Job ID" value={<Mono>{activeJob.job_id}</Mono>} />
        <Field label="Section" value={<Mono>{recommendation.section_id}</Mono>} />
        <Field label="Priority" value={<PriorityBadge value={activeJob.priority} />} />
        <Field label="Asset Risk" value={risk ? <RiskBadge level={risk.level} /> : "Data unavailable"} />
        <Field label="Work Type" value={activeJob.work_type} />
        <Field label="Status" value={<StatusBadge status={recommendation.status} />} />
        <Field label="Date" value={formatDate(recommendation.date)} />
        <Field label="Start / End" value={`${recommendation.start_time} - ${recommendation.end_time}`} />
        <Field label="Duration" value={formatDuration(recommendation.duration_minutes)} />
        <Field label="Affected trains" value={recommendation.affected_trains.length ? recommendation.affected_trains.join(", ") : "None recorded"} />
      </div>

      <div className="rounded-md border border-border bg-card/60 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Conflict checks</p>
        <p className="mt-1 text-sm leading-relaxed text-pretty">{recommendation.conflicts.length ? recommendation.conflicts.join(" ") : priority.recommendation}</p>
        {recommendation.checks.length > 0 ? <div className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">{recommendation.checks.map((check) => <span key={check.label} className={check.ok ? "text-success" : "text-danger"}>{check.ok ? "OK" : "CHECK"} · {check.label}</span>)}</div> : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">Prototype recommendation — not an operational instruction.</p>
        <Button asChild size="sm" variant="secondary" className="gap-1.5">
          <Link href={`/planning/priority-engine?job=${activeJob.job_id}`}>
            Open in AI Engine <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}

function StatusBadge({ status }: { status: "RECOMMENDED" | "CONFLICT" | "NEEDS REVIEW" }) {
  const positive = status === "RECOMMENDED"
  return <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${positive ? "border-success/25 bg-success/12 text-success" : "border-danger/25 bg-danger/12 text-danger"}`}>
    {positive ? <CheckCircle2 className="size-3" /> : <TriangleAlert className="size-3" />}{status}
  </span>
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <div className="truncate text-sm font-medium">{value}</div>
    </div>
  )
}
