import { AllocationErrorCode } from "../types/code/allocation" 

export const allocationErrorHttpStatusMap: Record<AllocationErrorCode, number> = {
  [AllocationErrorCode.ALLOCATION_CREATE_FAILED]: 500, 
  [AllocationErrorCode.SPOTS_NOT_FOUND]: 404, 
  [AllocationErrorCode.SPOTS_FETCH_FAILED]: 500
}
