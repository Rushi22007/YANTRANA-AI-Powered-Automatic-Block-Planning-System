"use client"

import { Gauge } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { OptimizationScore } from "@/lib/scoring"

export function OptimizationCard({ optimization }: { optimization: OptimizationScore }) {
  return (
    <Card className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-info/12 text-info">
            <Gauge className="size-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold leading-tight">AI Optimization Score</h2>
            <p className="text-[11px] text-muted-foreground">Transparent composite · not a trained model</p>
          </div>
        </div>
        <div className="text-right">
          {optimization.score == null ? (
            <p className="text-sm italic text-muted-foreground/70">Data unavailable</p>
          ) : (
            <>
              <p className="font-mono text-2xl font-semibold leading-none">{optimization.score}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Score / 100</p>
            </>
          )}
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {optimization.components.map((c) => (
          <li key={c.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">{c.label}</span>
              <span className="text-muted-foreground">{c.detail}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, c.value))}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right font-mono text-[11px] text-muted-foreground">{Math.round(c.value)}</span>
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground/70">Weight {Math.round(c.weight * 100)}%</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
