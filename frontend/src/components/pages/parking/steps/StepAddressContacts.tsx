import { Controller } from "react-hook-form"
import Input from "../../../ui/Input"
import { TimeRangePicker } from "../../../ui/TimeRangePicker"
import {
  Navigation2, MapPin, Phone, Package, Landmark, Building2, Flag, MapPinned, MessageCircle, Mail,
  Hash

} from "lucide-react"
import { type ParkingFormData } from "../../../../types/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"



export function StepAddressContacts({ register, errors, control }: FormStepProps<ParkingFormData>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Endereço</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="* Endereço"
            placeholder="Rua / Avenida"
            leftIcon={<Navigation2 size={18} className="text-blue-600" />}
            {...register("address.street")}
            error={errors.address?.street?.message}
          />
          <Input
            label="* Número"
            placeholder="123"
            leftIcon={<Hash size={18} className="text-blue-600" />}
            {...register("address.number")}
            error={errors.address?.number?.message}
          />
          <Input
            label="Complemento"
            placeholder="Sala, bloco, etc."
            leftIcon={<Package size={18} className="text-blue-600" />}
            {...register("address.complement")}
            error={errors.address?.complement?.message}
          />
          <Input
            label="* Bairro"
            placeholder="Centro"
            leftIcon={<Landmark size={18} className="text-blue-600" />}
            {...register("address.district")}
            error={errors.address?.district?.message}
          />
          <Input
            label="* Cidade"
            placeholder="Cidade"
            leftIcon={<Building2 size={18} className="text-blue-600" />}
            {...register("address.city")}
            error={errors.address?.city?.message}
          />
          <Input
            label="* Estado"
            placeholder="UF"
            leftIcon={<Flag size={18} className="text-blue-600" />}
            {...register("address.state")}
            error={errors.address?.state?.message}
          />
          <Input
            label="* CEP"
            placeholder="00000-000"
            leftIcon={<MapPinned size={18} className="text-blue-600" />}
            {...register("address.zipCode")}
            error={errors.address?.zipCode?.message}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Phone className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Contatos</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="* Telefone"
            placeholder="(00) 0000-0000"
            leftIcon={<Phone size={18} className="text-blue-600" />}
            {...register("contacts.phone")}
            error={errors.contacts?.phone?.message}
          />
          <Input
            label="* WhatsApp"
            placeholder="(00) 00000-0000"
            leftIcon={<MessageCircle size={18} className="text-green-600" />}
            {...register("contacts.whatsapp")}
            error={errors.contacts?.whatsapp?.message}
          />
          <Input
            label="* E-mail"
            type="email"
            placeholder="contato@estacionamento.com"
            leftIcon={<Mail size={18} className="text-blue-600" />}
            {...register("contacts.email")}
            error={errors.contacts?.email?.message}
          />
          <Controller
            name="contacts.openingHours"
            control={control}
            render={({ field }) => (
              <TimeRangePicker
                label="* Horário de Funcionamento"
                value={field.value}
                onChange={field.onChange}
                error={errors.contacts?.openingHours?.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
