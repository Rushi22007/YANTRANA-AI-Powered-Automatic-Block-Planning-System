import type { LucideIcon } from "lucide-react"

export function PageHeader({
  icon: Icon,
  title,
  hindi,
  description,
  actions,
}: {
  icon: LucideIcon
  title: string
  hindi?: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-x-2">
            <h1 className="text-xl font-semibold tracking-tight text-pretty">{title}</h1>
            {hindi ? <span className="text-sm text-muted-foreground">{hindi}</span> : null}
          </div>
          {description ? <p className="mt-0.5 max-w-2xl text-sm text-muted-foreground text-pretty">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
