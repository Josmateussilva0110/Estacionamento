import { useState } from "react"
import {
  Car,
  FileText,
  CarFront,
} from "lucide-react"
import Input from "../../ui/Input"
import { Select } from "../../ui/Select"
import { ColorPicker } from "../../ui/ColorPicker"



function RegisterVehicle() {
  const [formData, setFormData] = useState({
    plate: "",
    brand: "",
    model: "",
    color: "",
    year: "",
    vehicleType: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando usuário digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  function validateForm() {
    const newErrors: Record<string, string> = {}

    if (!formData.plate || formData.plate.length < 7) {
      newErrors.plate = "Placa deve ter pelo menos 7 caracteres"
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = "Selecione o tipo de veículo"
    }

    if (!formData.brand || formData.brand.length < 2) {
      newErrors.brand = "Marca é obrigatória"
    }

    if (!formData.model || formData.model.length < 2) {
      newErrors.model = "Modelo é obrigatório"
    }

    if (!formData.color || formData.color.length < 3) {
      newErrors.color = "Cor é obrigatória"
    }

    if (!formData.year || !/^\d{4}$/.test(formData.year)) {
      newErrors.year = "Ano deve ter 4 dígitos"
    } else {
      const yearNum = parseInt(formData.year)
      if (yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
        newErrors.year = "Ano inválido"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validateForm()) {
      return
    }

    // Simular chamada à API
    console.log("Dados do veículo:", formData)
    
    // Aqui você faria:
    // const response = await requestData("/vehicle/register", "POST", formData, true)
    // if (response.success && response.data?.status) {
    //   setFlashMessage(response.data.message, "success")
    //   navigate("/vehicle/list")
    // }
    
    alert("Veículo cadastrado com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-8 text-center">
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
          <div className="px-6 py-8 space-y-6">
            <Input
              label="Placa *"
              placeholder="ABC-1234 ou ABC1D23"
              leftIcon={<FileText size={18} />}
              value={formData.plate}
              onChange={(e: any) => handleChange("plate", e.target.value.toUpperCase())}
              error={errors.plate}
              maxLength={8}
            />

            <Select
              label="Tipo de veículo *"
              leftIcon={<Car size={18} />}
              value={formData.vehicleType}
              onChange={(e) => handleChange("vehicleType", e.target.value)}
              error={errors.vehicleType}
            >
              <option value="">Selecione o tipo</option>
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
              <option value="caminhonete">Caminhonete</option>
            </Select>


            <Input
              label="Marca *"
              placeholder="Ex: Volkswagen, Honda, Toyota"
              leftIcon={<Car size={18} />}
              value={formData.brand}
              onChange={(e: any) => handleChange("brand", e.target.value)}
              error={errors.brand}
            />

            {/* Seletor de cores */}
            <ColorPicker
              label="Cor"
              value={formData.color}
              onChange={(color) => handleChange("color", color)}
              error={errors.color}
            />


            <button
              onClick={handleSubmit}
              className="
                w-full
                bg-gradient-to-r from-blue-600 to-blue-500
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
                onClick={() => window.history.back()}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-semibold"
              >
                Voltar para página inicial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterVehicle
