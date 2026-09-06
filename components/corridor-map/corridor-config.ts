export interface CorridorStation {
  name: string
  position: [number, number]
}

export interface CorridorSection {
  id: string
  from: string
  to: string
  stations: CorridorStation[]
}

// The CSV schemas contain no geographic fields. These coordinates are a
// presentation-only reference for the known demonstration corridor.
export const MUMBAI_LONAVALA_CORRIDOR: CorridorSection[] = [
  { id: "SEC_MUM_DAD", from: "Mumbai", to: "Dadar", stations: [{ name: "Mumbai", position: [18.969, 72.819] }, { name: "Dadar", position: [19.018, 72.843] }] },
  { id: "SEC_DAD_THA", from: "Dadar", to: "Thane", stations: [{ name: "Dadar", position: [19.018, 72.843] }, { name: "Thane", position: [19.186, 72.975] }] },
  { id: "SEC_THA_KAL", from: "Thane", to: "Kalyan", stations: [{ name: "Thane", position: [19.186, 72.975] }, { name: "Kalyan", position: [19.243, 73.135] }] },
  { id: "SEC_KAL_KAR", from: "Kalyan", to: "Karjat", stations: [{ name: "Kalyan", position: [19.243, 73.135] }, { name: "Karjat", position: [18.91, 73.324] }] },
  { id: "SEC_KAR_KHA", from: "Karjat", to: "Khandala", stations: [{ name: "Karjat", position: [18.91, 73.324] }, { name: "Khandala", position: [18.758, 73.377] }] },
  { id: "SEC_KHA_LON", from: "Khandala", to: "Lonavala", stations: [{ name: "Khandala", position: [18.758, 73.377] }, { name: "Lonavala", position: [18.748, 73.408] }] },
]

export const CORRIDOR_SECTION_IDS = MUMBAI_LONAVALA_CORRIDOR.map((section) => section.id)

export function sectionFor(id: string): CorridorSection | undefined {
  return MUMBAI_LONAVALA_CORRIDOR.find((section) => section.id === id)
}
