import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  User,
  Mail,
  Phone,
  CreditCard,
  UserPlus,
  Pencil,
  ArrowLeft,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  type RegisterClientFormInput,
  type RegisterClientFormOutput,
} from "../../../types/client/ClientTypes"
import { RegisterClientSchema } from "../../../schemas/RegisterClientSchema"
import Input from "../../ui/Input"
import { requestData } from "../../../services/requestApi"
import { type RegisterResponse } from "../../../types/authResponses"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"
import { useUser } from "../../../context/useUser"
import { type ClientResponseDetail } from "../../../types/client/clientResponseDetail"

interface RegisterClientProps {
  mode: "create" | "edit"
}

function RegisterClient({ mode }: RegisterClientProps) {
  const isEditMode = mode === "edit"
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useUser()
  const { setFlashMessage } = useFlashMessage()
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterClientFormInput>({
    resolver: zodResolver(RegisterClientSchema),
  })

  useEffect(() => {
    if (!isEditMode) {
      setIsLoading(false)
      return
    }

    if (!id) {
      setFlashMessage("Cliente inválido", "error")
      navigate("/client/list/clients")
      return
    }

    async function loadClient() {
      try {
        setIsLoading(true)

        const response = await requestData<ClientResponseDetail>(
          `/client/${id}`,
          "GET",
          {},
          true
        )

        if (response.success && response.data?.user) {
          reset({
            username: response.data.user.username,
            cpf: response.data.user.cpf,
            phone: response.data.user.phone,
            email: response.data.user.email,
          })
        } else {
          setFlashMessage(getApiErrorMessage(response), "error")
          navigate("/client/list/clients")
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadClient()
  }, [isEditMode, id, reset, navigate, setFlashMessage])

  async function onSubmit(form: RegisterClientFormInput) {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }

    const payload: RegisterClientFormOutput = {
      ...form,
      user_id: user.id,
    }

    const endpoint = isEditMode ? `/client/${id}` : "/client/register"

    const method = isEditMode ? "PUT" : "POST"

    const response = await requestData<RegisterResponse>(
      endpoint,
      method,
      payload,
      true
    )

    if (response.success && response.data?.status) {
      setFlashMessage(
        isEditMode ? "Cliente atualizado com sucesso" : response.data.message,
        "success"
      )
      navigate("/client/list/clients")
    } else {
      setFlashMessage(getApiErrorMessage(response), "error")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-slate-600 font-medium">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto">
      <div className="w-full max-w-md sm:max-w-lg">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
          
          {/* Header */}
          <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 sm:px-8 py-8 sm:py-10">
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
            
            <div className="relative">
              {/* Icon container */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                    {isEditMode ? (
                      <Pencil className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    ) : (
                      <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center tracking-tight">
                {isEditMode ? "Editar Cliente" : "Cadastro de Cliente"}
              </h1>
              <p className="text-blue-100 text-sm sm:text-base text-center">
                {isEditMode
                  ? "Atualize os dados do cliente"
                  : "Preencha os dados para registrar um novo cliente"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 sm:px-8 py-8 sm:py-10 space-y-5 sm:space-y-6"
          >
            <Input
              label="Nome completo *"
              placeholder="Ex: João da Silva"
              leftIcon={<User size={18} />}
              {...register("username")}
              error={errors.username?.message}
            />

            <Input
              label="CPF *"
              placeholder="000.000.000-00"
              leftIcon={<CreditCard size={18} />}
              {...register("cpf")}
              error={errors.cpf?.message}
            />

            <Input
              label="Telefone *"
              placeholder="(00) 00000-0000"
              leftIcon={<Phone size={18} />}
              {...register("phone")}
              error={errors.phone?.message}
            />

            <Input
              label="E-mail *"
              type="email"
              placeholder="cliente@email.com"
              leftIcon={<Mail size={18} />}
              {...register("email")}
              error={errors.email?.message}
            />

            <button
              type="submit"
              className="
                group
                w-full 
                flex items-center justify-center gap-2
                bg-linear-to-r from-blue-600 to-indigo-600 
                text-white font-bold 
                py-3.5 sm:py-4 px-4 
                rounded-xl 
                hover:from-blue-700 hover:to-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transform transition-all 
                hover:scale-[1.02] active:scale-[0.98] 
                shadow-lg hover:shadow-xl hover:shadow-blue-500/30
                text-sm sm:text-base
              "
            >
              {isEditMode ? (
                <>
                  <Pencil size={18} className="group-hover:rotate-12 transition-transform" />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                  Cadastrar Cliente
                </>
              )}
            </button>

            <div className="text-center pt-4 sm:pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate("/client/list/clients")}
                className="
                  inline-flex items-center justify-center gap-2
                  text-sm text-slate-500 
                  hover:text-slate-700 
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

export default RegisterClient
