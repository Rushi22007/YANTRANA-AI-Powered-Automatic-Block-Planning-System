import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function SectionCard({
  title,
  icon: Icon,
  description,
  actions,
  className,
  bodyClassName,
  children,
}: {
  title: string
  icon?: LucideIcon
  description?: string
  actions?: React.ReactNode
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}) {
  return (
    <Card className={cn("flex flex-col gap-3 p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {Icon ? (
            <span className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Icon className="size-4" />
            </span>
          ) : null}
          <div>
            <h3 className="text-sm font-semibold leading-tight">{title}</h3>
            {description ? <p className="text-[11px] text-muted-foreground">{description}</p> : null}
          </div>
        </div>
        {actions}
      </div>
      <div className={cn(bodyClassName)}>{children}</div>
    </Card>
  )
}
