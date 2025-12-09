import { User, Mail, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../../ui/Input"
import { useUser } from "../../../context/useUser"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../../hooks/useFlashMessage"

// Schema de validação Zod
const registerSchema = z.object({
  username: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

function RegisterUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const { register: registerUser } = useUser()
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()

  async function onSubmit(form: RegisterFormData) {
    const response = await registerUser(form)

    if (response.success && response.data?.status) {
      setFlashMessage(response.data.message, "success")
      navigate("/")      
    } else {
      setFlashMessage(response.message || "Erro ao registrar usuário", "error")
      console.log("Erro no cadastro:", response.message)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-linear-to-r from-parking-primary to-blue-600 px-6 py-8 text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Sistema de Estacionamento
            </h1>
            <p className="text-blue-100 text-sm">
              Crie sua conta e gerencie seu estacionamento
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">

            <Input
              label="Nome Completo"
              placeholder="Digite seu nome"
              leftIcon={<User size={18} />}
              {...register("username")}
              error={errors.username?.message}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              leftIcon={<Mail size={18} />}
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              isPassword
              leftIcon={<Lock size={18} />}
              {...register("password")}
              error={errors.password?.message}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="Repita a senha"
              isPassword
              leftIcon={<Lock size={18} />}
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <button
              type="submit"
              className="w-full bg-linear-to-r from-parking-primary to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-parking-primary focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Criar Conta
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <a href="/login" className="font-semibold text-parking-primary hover:text-blue-700 transition-colors">
                  Faça login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterUser
