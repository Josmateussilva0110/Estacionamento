import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import {
  User,
  Mail,
  Phone,
  CreditCard,
  UserPlus,
  Pencil,
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

interface RegisterClientProps {
  mode: "create" | "edit"
}

function RegisterClient({ mode }: RegisterClientProps) {
  const isEditMode = mode === "edit"
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useUser()
  const { setFlashMessage } = useFlashMessage()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterClientFormInput>({
    resolver: zodResolver(RegisterClientSchema),
  })

  /**
   * 🔹 Carrega cliente no modo edição
   */
  useEffect(() => {
    if (!isEditMode) return

    if (!id) {
      setFlashMessage("Cliente inválido", "error")
      navigate("/client/list/clients")
      return
    }

    async function loadClient() {
      const response = await requestData<{
        status: boolean
        client: RegisterClientFormInput
      }>(`/client/${id}`, "GET", {}, true)

      if (response.success && response.data?.status) {
        reset(response.data.client)
      } else {
        setFlashMessage("Erro ao carregar cliente", "error")
        navigate("/client/list/clients")
      }
    }

    loadClient()
  }, [isEditMode, id, reset, navigate, setFlashMessage])

  /**
   * 🔹 Submit
   */
  async function onSubmit(form: RegisterClientFormInput) {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }

    const payload: RegisterClientFormOutput = {
      ...form,
      user_id: user.id,
    }

    const endpoint = isEditMode
      ? `/client/${id}`
      : "/client/register"

    const method = isEditMode ? "PUT" : "POST"

    const response = await requestData<RegisterResponse>(
      endpoint,
      method,
      payload,
      true
    )

    if (response.success && response.data?.status) {
      setFlashMessage(
        isEditMode
          ? "Cliente atualizado com sucesso"
          : response.data.message,
        "success"
      )
      navigate("/client/list/clients")
    } else {
      setFlashMessage(getApiErrorMessage(response), "error")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-parking-primary to-blue-600 px-6 py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-white/20 p-4 rounded-full">
                {isEditMode ? (
                  <Pencil className="w-8 h-8 text-white" />
                ) : (
                  <UserPlus className="w-8 h-8 text-white" />
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white">
              {isEditMode ? "Editar Cliente" : "Cadastro de Cliente"}
            </h1>

            <p className="text-blue-100 text-sm mt-2">
              {isEditMode
                ? "Atualize os dados do cliente"
                : "Preencha os dados abaixo para registrar um novo cliente"}
            </p>
          </div>

          {/* Form */}
                    <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-8 space-y-6"
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
                w-full
                bg-linear-to-r from-parking-primary to-blue-600
                text-white font-semibold
                py-3 rounded-lg
                hover:from-blue-700 hover:to-parking-primary
                transition-all
                shadow-lg
              "
            >
              {isEditMode ? "Salvar Alterações" : "Cadastrar Cliente"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterClient
