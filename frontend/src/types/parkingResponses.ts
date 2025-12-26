import type { ApiPayload } from "./api"
import type { ParkingRemove } from "./parkingRemove"

export type RegisterParkingResponse = ApiPayload
export type RemoveParkingResponse = ApiPayload<ParkingRemove>
