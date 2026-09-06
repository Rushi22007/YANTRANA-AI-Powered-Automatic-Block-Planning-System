"use client"

import { useSyncExternalStore } from "react"

export const MAINTENANCE_REQUESTS_STORAGE_KEY = "yantrana-maintenance-requests"

export type MaintenanceRequestStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "USER_VERIFIED"
  | "CLOSED"

export interface MaintenanceRequest {
  request_id: string
  job_id: string
  preferred_date: string
  preferred_start_time: string
  reason: string
  remarks: string
  status: MaintenanceRequestStatus
  submitted_at: string
  approved_date?: string
  approved_start_time?: string
  approved_end_time?: string
  approved_duration_minutes?: number
  approval_note?: string
}

const EMPTY_REQUESTS: MaintenanceRequest[] = []
let cachedRequests = EMPTY_REQUESTS
let cachedSerialized = ""
const listeners = new Set<() => void>()

function readRequests(): MaintenanceRequest[] {
  if (typeof window === "undefined") return EMPTY_REQUESTS
  try {
    const raw = window.localStorage.getItem(MAINTENANCE_REQUESTS_STORAGE_KEY)
    if (!raw) return EMPTY_REQUESTS
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return EMPTY_REQUESTS
    return parsed.filter(isMaintenanceRequest)
  } catch {
    return EMPTY_REQUESTS
  }
}

function isMaintenanceRequest(value: unknown): value is MaintenanceRequest {
  if (!value || typeof value !== "object") return false
  const request = value as Partial<MaintenanceRequest>
  return typeof request.request_id === "string" && typeof request.job_id === "string" && typeof request.status === "string"
}

function getSnapshot(): MaintenanceRequest[] {
  if (typeof window === "undefined") return EMPTY_REQUESTS
  const serialized = window.localStorage.getItem(MAINTENANCE_REQUESTS_STORAGE_KEY) ?? ""
  if (serialized !== cachedSerialized) {
    cachedSerialized = serialized
    cachedRequests = readRequests()
  }
  return cachedRequests
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === MAINTENANCE_REQUESTS_STORAGE_KEY) {
      cachedSerialized = ""
      listener()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

function publish(requests: MaintenanceRequest[]) {
  if (typeof window === "undefined") return
  const serialized = JSON.stringify(requests)
  window.localStorage.setItem(MAINTENANCE_REQUESTS_STORAGE_KEY, serialized)
  cachedSerialized = serialized
  cachedRequests = requests
  listeners.forEach((listener) => listener())
}

export function createMaintenanceRequest(input: Omit<MaintenanceRequest, "request_id" | "status" | "submitted_at">): MaintenanceRequest {
  const request: MaintenanceRequest = {
    ...input,
    request_id: `MR-${Date.now().toString(36).toUpperCase()}`,
    status: "SUBMITTED",
    submitted_at: new Date().toISOString(),
  }
  publish([...getSnapshot(), request])
  return request
}

export function updateMaintenanceRequest(requestId: string, update: Partial<MaintenanceRequest>): MaintenanceRequest | null {
  const current = getSnapshot()
  const existing = current.find((request) => request.request_id === requestId)
  if (!existing) return null
  const updated = { ...existing, ...update }
  publish(current.map((request) => (request.request_id === requestId ? updated : request)))
  return updated
}

export function useMaintenanceRequests(): MaintenanceRequest[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_REQUESTS)
}
