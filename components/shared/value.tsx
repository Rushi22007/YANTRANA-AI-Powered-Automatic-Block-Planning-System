import { cn } from "@/lib/utils"

/**
 * Renders a value, or a clearly-marked "Data unavailable" placeholder when the
 * value cannot be derived from the dataset (null / undefined / NaN / empty).
 * Prototype rule: never invent a value.
 */
export function Value({
  value,
  suffix = "",
  className,
}: {
  value: string | number | null | undefined
  suffix?: string
  className?: string
}) {
  const missing =
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "number" && Number.isNaN(value))
  if (missing) {
    return <span className="text-muted-foreground/70 italic text-sm">Data unavailable</span>
  }
  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  )
}

export function Mono({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[0.8em] tracking-tight", className)}>{children}</span>
}
