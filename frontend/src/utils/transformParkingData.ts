import type { ParkingEdit } from "../types/parkingEdit"
import type { ParkingFormData } from "../types/parkingTypes"


export function mapNumberToAreaType(num: number): "coberta" | "descoberta" | "mista" {
  const map: Record<number, "coberta" | "descoberta" | "mista"> = {
    1: "coberta",
    2: "descoberta",
    3: "mista",
  }
  return map[num] || "coberta"
}


export function mapAreaTypeToNumber(areaType: string): number {
  const map: Record<string, number> = {
    coberta: 1,
    descoberta: 2,
    mista: 3,
  }
  return map[areaType] || 1
}



export function transformApiToForm(apiData: ParkingEdit): ParkingFormData {
  return {
    parkingName: apiData.parkingName,
    managerName: apiData.managerName,
    address: {
      street: apiData.address.street,
      number: apiData.address.number,
      complement: apiData.address.complement || "",
      district: apiData.address.district,
      city: apiData.address.city,
      state: apiData.address.state,
      zipCode: apiData.address.zipCode,
    },
    contacts: {
      phone: apiData.contacts.phone,
      whatsapp: apiData.contacts.whatsapp,
      email: apiData.contacts.email,
      openingHours: apiData.contacts.openingHours || { start: "", end: "" },
    },
    operations: {
      totalSpots: apiData.operations.totalSpots,
      carSpots: apiData.operations.carSpots,
      motoSpots: apiData.operations.motoSpots,
      truckSpots: apiData.operations.truckSpots,
      pcdSpots: apiData.operations.pcdSpots,
      elderlySpots: apiData.operations.elderlySpots,
      hasCameras: apiData.operations.hasCameras,
      hasWashing: apiData.operations.hasWashing,
      areaType: mapNumberToAreaType(apiData.operations.areaType),
    },
    prices: {
      priceHour: apiData.prices.priceHour,
      priceExtraHour: apiData.prices.priceExtraHour,
      dailyRate: apiData.prices.dailyRate,
      nightPeriod: apiData.prices.nightPeriod || { start: "", end: "" },
      nightRate: apiData.prices.nightRate,
      monthlyRate: apiData.prices.monthlyRate,
      carPrice: apiData.prices.carPrice,
      motoPrice: apiData.prices.motoPrice,
      truckPrice: apiData.prices.truckPrice,
    },
  }
}


export function transformFormToApi(formData: ParkingFormData): any {
  return {
    ...formData,
    operations: {
      ...formData.operations,
      areaType: mapAreaTypeToNumber(formData.operations.areaType),
    },
  }
}
