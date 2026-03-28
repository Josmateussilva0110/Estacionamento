import Stats from "../model/Stats"
import Allocation from "../model/Allocation"
import { ServiceResult } from "../types/serviceResults/ServiceResult"
import { StatsErrorCode } from "../types/code/statsCode"
import { calculateAllocationValue } from "../utils/calculatePrices"
import { type KpiParkingsResponse } from "../types/stats/parkingStatsResponse"

class StatsService {

    async parkingStats(user_id: string): Promise<ServiceResult<KpiParkingsResponse, StatsErrorCode>> {
      try {
        const statsKpi = await Stats.getKpiParkings(user_id)
        console.log(statsKpi)
        const allocationData = await Allocation.getAllocationData(user_id)
        if(!statsKpi || allocationData.length === 0) {
            return {
                status: false,
                error: {
                    code: StatsErrorCode.PARKING_KPI_NOT_FOUND,
                    message: "Nenhuma estatística do estacionamento"
                }
            }
        }

        let total_revenue = 0

        for(const allocation of allocationData) {
            const value = calculateAllocationValue(allocation)
            total_revenue += value
        }

        return { status: true, data: {kpis: statsKpi, totalRevenue: Number(total_revenue.toFixed(2))}}

      } catch(error) {
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

}

export default new StatsService()
