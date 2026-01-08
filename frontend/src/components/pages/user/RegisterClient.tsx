import { useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  Phone,
  CreditCard,
  UserPlus,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type RegisterClientFormInput } from "../../../types/ClientTypes"
import { type RegisterClientFormOutput } from "../../../types/ClientTypes"
import { RegisterClientSchema } from "../../../schemas/RegisterClientSchema"
import Input from "../../ui/Input"
import { requestData } from "../../../services/requestApi"
import { type RegisterResponse } from "../../../types/authResponses"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage"
import { useUser } from "../../../context/useUser"



function RegisterClient() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClientFormInput>({
    resolver: zodResolver(RegisterClientSchema),
  })

  
  async function onSubmit(form: RegisterClientFormInput) {
    if (!user) {
      setFlashMessage("Usuário não autenticado", "error")
      return
    }

    const payload: RegisterClientFormOutput = {
      ...form,
      user_id: user.id, 
    }

    const response = await requestData<RegisterResponse>(
      "/client/register",
      "POST",
      payload,
      true
    )

    if (response.success && response.data?.status) {
      setFlashMessage(response.data.message, "success")
      navigate("/")
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
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white">
              Cadastro de Cliente
            </h1>

            <p className="text-blue-100 text-sm mt-2">
              Preencha os dados abaixo para registrar um novo cliente
            </p>
          </div>

          {/* Formulário */}
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
                focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2
                transition-all
                shadow-lg
              "
            >
              Cadastrar Cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterClient
