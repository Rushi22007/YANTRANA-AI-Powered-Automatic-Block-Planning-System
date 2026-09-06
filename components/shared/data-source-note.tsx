import { Database, Info } from "lucide-react"
import { DATA_SOURCE_META } from "@/lib/data/meta"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function DataSourceNote() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-warning/30 bg-warning/8 px-3 py-1.5 text-xs">
      <Database className="size-3.5 shrink-0 text-warning-foreground/80 dark:text-warning" />
      <span className="text-muted-foreground">
        Source: <span className="font-medium text-foreground">{DATA_SOURCE_META.label}</span> · schemas match the 8
        source CSVs · all values computed from records
      </span>
      <Tooltip>
        <TooltipTrigger className="ml-auto text-muted-foreground hover:text-foreground">
          <Info className="size-3.5" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-pretty">{DATA_SOURCE_META.description}</TooltipContent>
      </Tooltip>
    </div>
  )
}
