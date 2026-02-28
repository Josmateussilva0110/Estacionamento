import { Controller } from "react-hook-form"
import Input from "../../../ui/Input"
import { TimeRangePicker } from "../../../ui/TimeRangePicker"
import {
  Navigation2, MapPin, Phone, Package, Landmark, Building2, Flag,
  MapPinned, MessageCircle, Mail, Hash,
} from "lucide-react"
import { type ParkingFormData } from "../../../../types/parking/parkingTypes"
import type { FormStepProps } from "../../../../types/formStep"

export function StepAddressContacts({ register, errors, control }: FormStepProps<ParkingFormData>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

      {/* ── Endereço ── */}
      <section className="bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Endereço</h3>
            <p className="text-xs text-slate-500">Localização do estacionamento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <Input
              label="* Endereço"
              placeholder="Rua / Avenida"
              leftIcon={<Navigation2 size={16} className="text-blue-400" />}
              {...register("address.street")}
              error={errors.address?.street?.message}
            />
          </div>
          <Input
            label="* Número"
            placeholder="123"
            leftIcon={<Hash size={16} className="text-blue-400" />}
            {...register("address.number")}
            error={errors.address?.number?.message}
          />
          <Input
            label="Complemento"
            placeholder="Sala, bloco, etc."
            leftIcon={<Package size={16} className="text-blue-400" />}
            {...register("address.complement")}
            error={errors.address?.complement?.message}
          />
          <Input
            label="* Bairro"
            placeholder="Centro"
            leftIcon={<Landmark size={16} className="text-blue-400" />}
            {...register("address.district")}
            error={errors.address?.district?.message}
          />
          <Input
            label="* CEP"
            placeholder="00000-000"
            leftIcon={<MapPinned size={16} className="text-blue-400" />}
            {...register("address.zipCode")}
            error={errors.address?.zipCode?.message}
          />
          <Input
            label="* Cidade"
            placeholder="Cidade"
            leftIcon={<Building2 size={16} className="text-blue-400" />}
            {...register("address.city")}
            error={errors.address?.city?.message}
          />
          <Input
            label="* Estado"
            placeholder="UF"
            leftIcon={<Flag size={16} className="text-blue-400" />}
            {...register("address.state")}
            error={errors.address?.state?.message}
          />
        </div>
      </section>

      {/* ── Contatos ── */}
      <section className="bg-slate-700/20 border border-slate-700/40 rounded-2xl p-5 space-y-4">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Contatos</h3>
            <p className="text-xs text-slate-500">Formas de contato e horários</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="* Telefone"
            placeholder="(00) 0000-0000"
            leftIcon={<Phone size={16} className="text-emerald-400" />}
            {...register("contacts.phone")}
            error={errors.contacts?.phone?.message}
          />
          <Input
            label="* WhatsApp"
            placeholder="(00) 00000-0000"
            leftIcon={<MessageCircle size={16} className="text-emerald-400" />}
            {...register("contacts.whatsapp")}
            error={errors.contacts?.whatsapp?.message}
          />
          <div className="sm:col-span-2">
            <Input
              label="* E-mail"
              type="email"
              placeholder="contato@estacionamento.com"
              leftIcon={<Mail size={16} className="text-blue-400" />}
              {...register("contacts.email")}
              error={errors.contacts?.email?.message}
            />
          </div>
          <div className="sm:col-span-2">
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
      </section>

    </div>
  )
}
