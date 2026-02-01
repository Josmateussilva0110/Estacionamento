import { type AllocationDetail } from "./allocationDetail";

export interface PaginationAllocations {
    rows: AllocationDetail[],
    total: number
}