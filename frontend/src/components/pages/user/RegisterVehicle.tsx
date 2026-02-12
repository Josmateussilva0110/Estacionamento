import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Car, FileText, CarFront, Pencil, ArrowLeft } from "lucide-react"

import Input from "../../ui/Input"
import { Select } from "../../ui/Select"
import { ColorPicker } from "../../ui/ColorPicker"
import { SearchSelect } from "../../ui/SelectSearch"

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
import { type VehicleResponseDetail } from "../../../types/vehicle/vehicleResponseDetail"

interface RegisterVehicleProps {
  mode: "create" | "edit"
}

function RegisterVehicle({ mode }: RegisterVehicleProps) {
  const isEditMode = mode === "edit"
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()
  const [clients, setClients] = useState<ClientDetails[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  useEffect(() => {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }

    async function fetchClients() {
      const response = await requestData<ListClientsData>(
        `/clients/${user?.id}`,
        "GET",
        {},
        true,
      )
      if (response.success && response.data?.clients) {
        setClients(response.data.clients)
      } else {
        setClients([])
      }
    }

    fetchClients()
  }, [user, setFlashMessage])

  useEffect(() => {
    if (!isEditMode) {
      setIsLoading(false)
      return
    }

    if (!id) {
      setFlashMessage("Veículo inválido", "error")
      navigate("/vehicle/list/vehicles")
      return
    }

    async function loadVehicle() {
      try {
        setIsLoading(true)

        const response = await requestData<VehicleResponseDetail>(
          `/vehicle/${id}`,
          "GET",
          {},
          true,
        )

        if (response.success && response.data?.vehicle) {
          reset({
            plate: response.data.vehicle.plate,
            brand: response.data.vehicle.brand,
            color: response.data.vehicle.color,
            vehicle_type: response.data.vehicle.vehicleType,
            client_id: response.data.vehicle.clientId,
          })
        } else {
          setFlashMessage(getApiErrorMessage(response), "error")
          navigate("/vehicle/list/vehicles")
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicle()
  }, [isEditMode, id, reset, navigate, setFlashMessage])

  async function onSubmit(data: RegisterVehicleFormData) {
    const endpoint = isEditMode ? `/vehicle/${id}` : "/vehicle/register"

    const method = isEditMode ? "PUT" : "POST"

    const response = await requestData<RegisterVehicleResponse>(
      endpoint,
      method,
      data,
      true,
    )

    if (response.success && response.data?.status) {
      setFlashMessage(
        isEditMode ? "Veículo atualizado com sucesso" : response.data.message,
        "success",
      )
      navigate("/vehicle/list/vehicles")
    } else {
      setFlashMessage(getApiErrorMessage(response), "error")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-blue-500"></div>
          <p className="text-slate-300 font-medium">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Header */}
          <div className="relative overflow-hidden bg-slate-800/80 backdrop-blur-xl px-6 sm:px-8 py-8 sm:py-10">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-blue-600/20 to-blue-600/20" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative">
              {/* Icon container */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-blue-400/30">
                    {isEditMode ? (
                      <Pencil className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
                    ) : (
                      <CarFront className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center tracking-tight">
                {isEditMode ? "Editar Veículo" : "Cadastro de Veículo"}
              </h1>
              <p className="text-blue-200 text-sm sm:text-base text-center">
                {isEditMode
                  ? "Atualize os dados do veículo"
                  : "Preencha os dados para registrar um novo veículo"}
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 sm:px-8 py-8 sm:py-10 space-y-5 sm:space-y-6">
            <SearchSelect<ClientDetails, number>
              items={clients}
              value={clientId}
              label="Cliente *"
              placeholder="Buscar cliente por nome ou CPF"
              isLoading={false}
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
                  <div className="text-sm text-slate-500">
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
                  { shouldValidate: true },
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
                group
                w-full 
                flex items-center justify-center gap-2
                bg-linear-to-r from-blue-600 to-blue-600 
                hover:from-blue-700 hover:to-blue-700
                text-white font-semibold 
                py-3.5 sm:py-4 px-4 
                rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800
                transform transition-all 
                hover:scale-[1.02] active:scale-[0.98] 
                shadow-lg hover:shadow-xl hover:shadow-blue-500/30
                text-sm sm:text-base
              "
            >
              {isEditMode ? (
                <>
                  <Pencil
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <CarFront
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  Cadastrar Veículo
                </>
              )}
            </button>

            <div className="text-center pt-4 sm:pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => navigate("/vehicle/list/vehicles")}
                className="
                  inline-flex items-center justify-center gap-2
                  text-sm text-slate-400 
                  hover:text-slate-200 
                  transition-colors
                  font-medium
                "
              >
                <ArrowLeft size={16} />
                Voltar para listagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterVehicle
