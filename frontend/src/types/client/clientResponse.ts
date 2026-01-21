import type { ApiPayload } from "../api"
import type { ClientRemove } from "./clientRemove"
import type { VehicleRemove } from "./vehicleRemove"

export type RegisterVehicleResponse = ApiPayload
export type RemoveClientResponse = ApiPayload<ClientRemove>
export type RemoveVehicleResponse = ApiPayload<VehicleRemove>
