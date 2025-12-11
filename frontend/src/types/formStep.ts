import {
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
  type UseFormSetValue,
  type FieldValues,
} from "react-hook-form"

export interface FormStepProps<T extends FieldValues> {
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  watch?: UseFormWatch<T>
  setValue?: UseFormSetValue<T>
}
