/**
 * One-time conversion script: CSV → JSON
 *
 * Reads all 8 CSV datasets using the existing csv.ts parser, strips the
 * synthetic_flag / flag fields (uniform, never displayed), and writes
 * compact JSON files to public/data/.
 *
 * Usage: npx tsx lib/data/convert-csv-to-json.ts
 */
import { loadCsvDataset } from "./csv"
import { writeFileSync, mkdirSync } from "node:fs"
import path from "node:path"

const outDir = path.join(process.cwd(), "public", "data")
mkdirSync(outDir, { recursive: true })

const dataset = loadCsvDataset()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stripField(rows: any[], ...fields: string[]): any[] {
  return rows.map((row) => {
    const copy = { ...row }
    for (const field of fields) delete copy[field]
    return copy
  })
}

const files: Record<string, unknown[]> = {
  "assets.json": stripField(dataset.assets, "synthetic_flag"),
  "equipment_availability.json": stripField(dataset.equipment_availability, "synthetic_flag"),
  "trains.json": stripField(dataset.trains, "flag"),
  "train_movements.json": dataset.train_movements, // no synthetic_flag field
  "maintenance_jobs.json": stripField(dataset.maintenance_jobs, "synthetic_flag"),
  "block_requests.json": stripField(dataset.block_requests, "synthetic_flag"),
  "historical_blocks.json": stripField(dataset.historical_blocks, "synthetic_flag"),
  "corridor_availability.json": stripField(dataset.corridor_availability, "synthetic_flag"),
}

for (const [filename, data] of Object.entries(files)) {
  const filePath = path.join(outDir, filename)
  writeFileSync(filePath, JSON.stringify(data))
  console.log(`✓ ${filename} — ${data.length} records (${(Buffer.byteLength(JSON.stringify(data)) / 1024).toFixed(1)} KB)`)
}

console.log(`\nDone! ${Object.keys(files).length} JSON files written to ${outDir}`)
