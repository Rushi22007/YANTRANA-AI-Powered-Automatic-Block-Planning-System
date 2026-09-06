import { DashboardView } from "@/components/dashboard/dashboard-view"
import { DatasetProvider } from "@/lib/data/use-dataset"
import { loadDataset } from "@/lib/data/source"

export default function Page() {
  return (
    <DatasetProvider dataset={loadDataset()}>
      <DashboardView />
    </DatasetProvider>
  )
}
