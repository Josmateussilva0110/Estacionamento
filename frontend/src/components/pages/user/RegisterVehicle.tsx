import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Car, FileText, CarFront } from "lucide-react"

import Input from "../../ui/Input"
import { Select } from "../../ui/Select"
import { ColorPicker } from "../../ui/ColorPicker"
import { SearchSelect } from "../../ui/ClientSearch"

import { VEHICLE_TYPES, type VehicleType } from "../../../types/vehicleTypes"
import { VEHICLE_TYPE_LABEL } from "../../../utils/mapVehicleType"

import { RegisterVehicleSchema } from "../../../schemas/VehicleSchema"
import { type RegisterVehicleFormData } from "../../../types/client/ClientTypes"
import { type ClientDetails } from "../../../types/client/clientDetail"
import { type ListClientsData } from "../../../types/client/listClientsData"
import { requestData } from "../../../services/requestApi"
import { useUser } from "../../../context/useUser"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { type RegisterVehicleResponse } from "../../../types/client/clientResponse"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"



function RegisterVehicle() {
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()
  const [clients, setClients] = useState<ClientDetails[]>([])

  useEffect(() => {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }

    async function fetchClients() {
      setIsLoading(true)
      const response = await requestData<ListClientsData>(`/clients/${user?.id}`, "GET", {}, true)
      if(response.success && response.data?.clients) {
        setClients(response.data.clients)
      }
      else {
        setClients([])
      }
      setIsLoading(false)
    }
    fetchClients()
  },[user, setFlashMessage])


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterVehicleFormData>({
    resolver: zodResolver(RegisterVehicleSchema),
    defaultValues: {
      plate: "",
      brand: "",
      color: "",
      vehicle_type: undefined,
      client_id: null,
    },
  })

  const vehicleType = watch("vehicle_type")
  const clientId = watch("client_id")

  async function onSubmit(data: RegisterVehicleFormData) {
    const response = await requestData<RegisterVehicleResponse>("/client/vehicle/register", "POST", data, true)
    if(response.success && response.data?.status) {
      setFlashMessage(response.data.message, "success")
      navigate("/")
    }
    else {
      setFlashMessage(getApiErrorMessage(response), "error")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-linear-to-br from-blue-600 to-blue-500 px-6 py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <CarFront className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white">
              Cadastro de Veículo
            </h1>

            <p className="text-blue-100 text-sm mt-2">
              Preencha os dados abaixo para registrar um novo veículo
            </p>
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-8 space-y-6"
          >
            <SearchSelect<ClientDetails, number>
              items={clients}
              value={clientId}
              label="Cliente"
              placeholder="Buscar cliente por nome ou CPF"
              isLoading={isLoading}

              onChange={(id) =>
                setValue("client_id", id, { shouldValidate: true })
              }

              getId={(c) => c.id}
              getLabel={(c) => c.username}

              filterBy={(c, search) =>
                c.username.toLowerCase().includes(search.toLowerCase()) ||
                c.cpf.includes(search)
              }

              renderItem={(client) => (
                <>
                  <div className="font-medium">{client.username}</div>
                  <div className="text-sm text-gray-500">
                    CPF: {client.cpf}
                  </div>
                </>
              )}
            />



            <Input
              label="Placa *"
              placeholder="ABC1D23"
              leftIcon={<FileText size={18} />}
              {...register("plate")}
              error={errors.plate?.message}
            />

            <Select
              label="Tipo de veículo *"
              value={vehicleType ?? ""}
              onChange={(e) =>
                setValue(
                  "vehicle_type",
                  Number(e.target.value) as VehicleType,
                  { shouldValidate: true }
                )
              }
              error={errors.vehicle_type?.message}
            >
              <option value="">Selecione o tipo</option>

              <option value={VEHICLE_TYPES.CARRO}>
                {VEHICLE_TYPE_LABEL[VEHICLE_TYPES.CARRO]}
              </option>

              <option value={VEHICLE_TYPES.MOTO}>
                {VEHICLE_TYPE_LABEL[VEHICLE_TYPES.MOTO]}
              </option>

              <option value={VEHICLE_TYPES.CAMINHONETE}>
                {VEHICLE_TYPE_LABEL[VEHICLE_TYPES.CAMINHONETE]}
              </option>
            </Select>

            <Input
              label="Marca *"
              placeholder="Ex: Volkswagen, Honda, Toyota"
              leftIcon={<Car size={18} />}
              {...register("brand")}
              error={errors.brand?.message}
            />

            <ColorPicker
              label="Cor"
              value={watch("color")}
              onChange={(color) =>
                setValue("color", color, { shouldValidate: true })
              }
              error={errors.color?.message}
            />

            <button
              type="submit"
              className="
                w-full
                bg-linear-to-br from-blue-600 to-blue-500
                text-white font-semibold
                py-3 rounded-lg
                hover:from-blue-700 hover:to-blue-600
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg
              "
            >
              Cadastrar Veículo
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-semibold"
              >
                Voltar para página inicial
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterVehicle
