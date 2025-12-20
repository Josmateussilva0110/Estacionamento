import { ParkingErrorCode } from "../types/code/parkingCode"

export const ParkingErrorHttpStatusMap: Record<ParkingErrorCode , number> = {
  [ParkingErrorCode.PARKING_CREATE_FAILED]: 500, 
  [ParkingErrorCode.EMAIL_ALREADY_EXISTS]: 409
}
