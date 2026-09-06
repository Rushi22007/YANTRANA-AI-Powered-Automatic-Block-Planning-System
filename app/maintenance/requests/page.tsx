import { MaintenanceRequestWorkflow } from "@/components/maintenance/maintenance-request-workflow"
import { DatasetProvider } from "@/lib/data/use-dataset"
import { loadDataset } from "@/lib/data/source"

export default function Page() {
  const dataset = loadDataset()
  return (
    <DatasetProvider dataset={dataset}>
      <MaintenanceRequestWorkflow dataset={dataset} />
    </DatasetProvider>
  )
}
