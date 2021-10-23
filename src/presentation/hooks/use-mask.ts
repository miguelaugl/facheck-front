import { FieldFormatter } from '@/data/protocols'
import { cpfMask, militaryTimeMask, onlyDigitsMask } from '@/presentation/masks'

const masks = {
  cpf: cpfMask,
  onlyDigits: onlyDigitsMask,
  militaryTime: militaryTimeMask,
}

type Return = FieldFormatter & {
  maskedValue: string
  cleanedValue: string | number
}

export type Mask = keyof typeof masks

type UseMask = (mask: Mask, value: string) => Return
export const useMask: UseMask = (mask: Mask, value: string) => {
  const selectedMask = masks[mask]
  const { apply, clean } = selectedMask || { apply: (v: string) => v, clean: (v) => v }
  const maskedValue = apply?.(value) || value
  const cleanedValue = clean?.(value) || value
  return { apply, clean, maskedValue, cleanedValue }
}
