import { Compass, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

function PageNotFound() {
  const navigate = useNavigate()

  function handleGoHome() {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-parking-primary via-blue-700 to-parking-dark flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-parking-primary to-blue-600 px-5 sm:px-6 py-6 sm:py-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Página não encontrada
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              O endereço acessado não existe ou foi movido
            </p>
          </div>

          {/* Conteúdo */}
          <div className="px-5 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-7">
            <div className="text-center space-y-4">
              <p className="text-gray-700 text-base">
                Verifique se o link está correto ou volte para a página inicial.
              </p>
              <p className="text-gray-600 text-sm">
                Se o problema persistir, tente acessar pelo menu principal.
              </p>
            </div>

            <button
              onClick={handleGoHome}
              className="w-full bg-linear-to-r from-parking-primary to-blue-600 text-white font-bold py-3 sm:py-3.5 px-4 rounded-lg hover:from-blue-700 hover:to-parking-primary focus:outline-none focus:ring-2 focus:ring-parking-primary focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Home size={18} />
              <span>Voltar ao início</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound

