import Stats from "../model/Stats"
import Allocation from "../model/Allocation"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { StatsErrorCode } from "../types/code/statsCode"
import { calculateAllocationValue } from "../utils/calculatePrices"
import { type KpiParkingsResponse } from "../types/stats/parkingStatsResponse"
import { type StatsVehicleCount } from "../mappers/vehicleCount.mapper"
import { type AllocationPrinces } from "../types/allocation/allocationData"
import { type Occupied } from "../types/stats/occupied"
import { RevenueByPaymentTypeDTO } from "../dtos/RevenueByPayment"


class StatsService {

  private groupRevenueByType(allocationData: AllocationPrinces[]): { revenueByType: Record<string, number>; totalRevenue: number } {
    const revenueByType: Record<string, number> = {}
    let totalRevenue = 0

    for (const allocation of allocationData) {
      const value = calculateAllocationValue(allocation)
      const type = allocation.payment_type

      if (!revenueByType[type]) {
        revenueByType[type] = 0
      }

      revenueByType[type] += value
      totalRevenue += value
    }

    return { revenueByType, totalRevenue }
  }

  private buildRevenueDTO(
    vehicleCount: StatsVehicleCount[],
    revenueByType: Record<string, number>,
    totalRevenue: number
  ): RevenueByPaymentTypeDTO[] {

    const grouped: Record<string, RevenueByPaymentTypeDTO> = {}

    for (const vc of vehicleCount) {
      const type = vc.paymentType

      if (!grouped[type]) {
        const revenue = revenueByType[type] || 0

        grouped[type] = {
          paymentType: type,
          revenue: Number(revenue.toFixed(2)),
          vehicleCount: 0,
          pct: totalRevenue > 0
            ? Number(((revenue / totalRevenue) * 100).toFixed(2))
            : 0
        }
      }
      grouped[type].vehicleCount += Number(vc.countVehicles)
    }

    return Object.values(grouped)
  }

  async parkingStats(user_id: string): Promise<ServiceResult<KpiParkingsResponse | null, StatsErrorCode>> {
    try {
      const statsKpi = await Stats.getKpiParkings(user_id)
      const allocationData = await Allocation.getAllocationData(user_id)
      if (!statsKpi || allocationData.length === 0) {
        return {
          status: false,
          error: {
            code: StatsErrorCode.PARKING_KPI_NOT_FOUND,
            message: "Nenhuma estatística do estacionamento"
          }
        }
      }

      let total_revenue = 0

      for (const allocation of allocationData) {
        const value = calculateAllocationValue(allocation)
        total_revenue += value
      }

      return { status: true, data: { kpis: statsKpi, totalRevenue: Number(total_revenue.toFixed(2)) } }

    } catch (error) {
      console.error("StatsService.getStats: ", error)
      return {
        status: false,
        error: {
          code: StatsErrorCode.STATS_FETCH_FAILED,
          message: "Erro interno ao buscar Estatísticas de estacionamento",
        }
      }
    }
  }

  async revenueCard(user_id: string): Promise<ServiceResult<RevenueByPaymentTypeDTO[], StatsErrorCode>> {
    try {
      const allocationData = await Allocation.getAllocationData(user_id)
      const vehicleCount = await Stats.getVehicles(user_id)

      if (allocationData.length === 0 || vehicleCount.length === 0) {
        return {
          status: false,
          error: {
            code: StatsErrorCode.PARKING_KPI_NOT_FOUND,
            message: "Nenhuma estatística do estacionamento"
          }
        }
      }

      const { revenueByType, totalRevenue } = this.groupRevenueByType(allocationData)

      const data = this.buildRevenueDTO(vehicleCount, revenueByType, totalRevenue)

      return {
        status: true,
        data
      }

    } catch (error) {
      console.error("StatsService.getStats: ", error)
      return {
        status: false,
        error: {
          code: StatsErrorCode.STATS_FETCH_FAILED,
          message: "Erro interno ao buscar Estatísticas de estacionamento",
        }
      }
    }
  }

  async countOccupied(user_id: string): Promise<ServiceResult<Occupied[], StatsErrorCode>> {
    try {
      const occupied = await Stats.getOccupiedParking(user_id)
      if(occupied.length === 0) {
        return {
          status: false,
          error: {
            code: StatsErrorCode.PARKING_KPI_NOT_FOUND,
            message: "Nenhuma estatística do estacionamento"
          }
        }
      }

      return { status: true, data: occupied}

    } catch(error) {
      console.error("StatsService.countOccupied: ", error)
      return {
        status: false,
        error: {
          code: StatsErrorCode.STATS_FETCH_FAILED,
          message: "Erro interno ao buscar ocupção de estacionamento",
        }
      }
    }
  }

}

export default new StatsService()
