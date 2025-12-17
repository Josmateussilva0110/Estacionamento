import api from "./api"
import { type AxiosRequestConfig, type Method } from "axios"
import { type ApiResponse } from "../types/api"



export async function requestData<T = any>(
    endpoint: string,
    method: Method = "get",
    data: Record<string, any> | FormData = {},
    withCredentials: boolean = false
): Promise<ApiResponse<T>> {
    try {
        const config: AxiosRequestConfig = {
            method: method.toLowerCase() as Method,
            url: endpoint,
        }

        if (config.method === "get") {
            config.params = data
        } else {
            config.data = data
        }

        if (data instanceof FormData) {
            config.headers = {
                "Content-Type": "multipart/form-data",
            }
        }

        if (withCredentials) {
            config.withCredentials = true
        }

        const response = await api<T>(config)

        return {
            success: true,
            status: response.status,
            data: response.data,
            message: (response.data as any)?.message,
        }
    } catch (err: any) {
        // 401 → expira sessão global
        if (err.response?.status === 401) {
            window.dispatchEvent(new Event("SESSION_EXPIRED"))
        }

        return {
            success: false,
            status: err.response?.status ?? 500,
            message: err.response?.data?.message ?? err.message,
        }
    }
}
