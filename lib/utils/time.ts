/** Time + interval helpers shared by calculations and conflict detection. */

export function toMinutes(hhmm: string): number {
  if (!hhmm || !hhmm.includes(":")) return Number.NaN
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

export function fromMinutes(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440
  const hh = String(Math.floor(m / 60)).padStart(2, "0")
  const mm = String(m % 60).padStart(2, "0")
  return `${hh}:${mm}`
}

/** Do two [start,end) minute intervals overlap? */
export function intervalsOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd
}

export function overlapMinutes(aStart: number, aEnd: number, bStart: number, bEnd: number): number {
  return Math.max(0, Math.min(aEnd, bEnd) - Math.max(aStart, bStart))
}

export function formatDuration(minutes: number): string {
  if (minutes == null || Number.isNaN(minutes)) return "Data unavailable"
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "Data unavailable"
  const d = new Date(dateStr + "T00:00:00")
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

export function daysBetween(fromISO: string, toISO: string): number {
  const a = new Date(fromISO + "T00:00:00").getTime()
  const b = new Date(toISO + "T00:00:00").getTime()
  return Math.round((b - a) / 86400000)
}
