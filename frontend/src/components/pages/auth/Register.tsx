import { User, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react"
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
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
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
                    <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center tracking-tight">
                Sistema de Estacionamento
              </h1>
              <p className="text-blue-100 text-sm sm:text-base text-center">
                Crie sua conta e gerencie seu estacionamento
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 sm:px-8 py-8 sm:py-10 space-y-5 sm:space-y-6">

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
              <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
              Criar Conta
            </button>

            <div className="text-center pt-4 sm:pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">
                Já tem uma conta?{" "}
                <a 
                  href="/login" 
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline"
                >
                  Faça login
                </a>
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  inline-flex items-center justify-center gap-2
                  text-sm text-slate-500 
                  hover:text-slate-700 
                  transition-colors
                  font-medium
                "
              >
                <ArrowLeft size={16} />
                Voltar para home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterUser
