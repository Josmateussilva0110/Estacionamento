import { ParkingErrorCode } from "../code/parkingCode"
import { AllocationErrorCode } from "../code/allocation"

export type SpotServiceError = ParkingErrorCode | AllocationErrorCode
