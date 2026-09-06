import { DatasetProvider } from "@/lib/data/use-dataset"
import { loadDataset } from "@/lib/data/source"
import { DataPageView, type DataPage } from "./data-pages"

export function RoutePage({ page }: { page: DataPage }) {
  return (
    <DatasetProvider dataset={loadDataset()}>
      <DataPageView page={page} />
    </DatasetProvider>
  )
}