import { readFileSync } from "node:fs"
import path from "node:path"
import type {
  Asset,
  BlockRequest,
  CorridorAvailability,
  Dataset,
  EquipmentAvailability,
  HistoricalBlock,
  MaintenanceJob,
  Train,
  TrainMovement,
} from "./schema"

const dataDirectory = path.join(process.cwd(), "public", "data")

function loadJson<T>(filename: string): T[] {
  return JSON.parse(readFileSync(path.join(dataDirectory, filename), "utf8"))
}

export function loadJsonDataset(): Dataset {
  return {
    assets: loadJson<Asset>("assets.json"),
    equipment_availability: loadJson<EquipmentAvailability>("equipment_availability.json"),
    trains: loadJson<Train>("trains.json"),
    train_movements: loadJson<TrainMovement>("train_movements.json"),
    maintenance_jobs: loadJson<MaintenanceJob>("maintenance_jobs.json"),
    block_requests: loadJson<BlockRequest>("block_requests.json"),
    historical_blocks: loadJson<HistoricalBlock>("historical_blocks.json"),
    corridor_availability: loadJson<CorridorAvailability>("corridor_availability.json"),
  }
}
