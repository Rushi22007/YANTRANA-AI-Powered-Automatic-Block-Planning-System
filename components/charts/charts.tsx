"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const axisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
}

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
    color: "var(--popover-foreground)",
  },
  labelStyle: { color: "var(--popover-foreground)", fontWeight: 600 },
  itemStyle: { color: "var(--popover-foreground)" },
}

export function EmptyChart({ height = 240 }: { height?: number }) {
  return (
    <div className="flex items-center justify-center text-sm italic text-muted-foreground/70" style={{ height }}>
      Data unavailable
    </div>
  )
}

export function SimpleBar({
  data,
  xKey,
  bars,
  height = 260,
  horizontal = false,
}: {
  data: Record<string, unknown>[]
  xKey: string
  bars: { key: string; name: string; color?: string }[]
  height?: number
  horizontal?: boolean
}) {
  if (!data.length) return <EmptyChart height={height} />
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={!horizontal} horizontal={horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" {...axisProps} />
            <YAxis type="category" dataKey={xKey} width={90} {...axisProps} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} {...axisProps} />
            <YAxis {...axisProps} allowDecimals={false} />
          </>
        )}
        <Tooltip cursor={{ fill: "var(--muted)", opacity: 0.5 }} {...tooltipStyle} />
        {bars.length > 1 ? <Legend wrapperStyle={{ fontSize: 11 }} /> : null}
        {bars.map((b, i) => (
          <Bar key={b.key} dataKey={b.key} name={b.name} fill={b.color ?? CHART_COLORS[i % CHART_COLORS.length]} radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]} maxBarSize={44} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CategoryBar({
  data,
  height = 260,
  colorMap,
}: {
  data: { name: string; value: number }[]
  height?: number
  colorMap?: Record<string, string>
}) {
  if (!data.length) return <EmptyChart height={height} />
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" {...axisProps} />
        <YAxis {...axisProps} allowDecimals={false} />
        <Tooltip cursor={{ fill: "var(--muted)", opacity: 0.5 }} {...tooltipStyle} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((d, i) => (
            <Cell key={i} fill={colorMap?.[d.name] ?? CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function SimpleDonut({
  data,
  height = 260,
  colorMap,
}: {
  data: { name: string; value: number }[]
  height?: number
  colorMap?: Record<string, string>
}) {
  if (!data.length || data.every((d) => d.value === 0)) return <EmptyChart height={height} />
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={2} stroke="var(--card)">
          {data.map((d, i) => (
            <Cell key={i} fill={colorMap?.[d.name] ?? CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function SimpleLine({
  data,
  xKey,
  lines,
  height = 260,
}: {
  data: Record<string, unknown>[]
  xKey: string
  lines: { key: string; name: string; color?: string }[]
  height?: number
}) {
  if (!data.length) return <EmptyChart height={height} />
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} allowDecimals={false} />
        <Tooltip {...tooltipStyle} />
        {lines.length > 1 ? <Legend wrapperStyle={{ fontSize: 11 }} /> : null}
        {lines.map((l, i) => (
          <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color ?? CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export { CHART_COLORS }
