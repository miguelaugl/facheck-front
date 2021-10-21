import { FieldFormatter } from '@/data/protocols'

export const onlyDigitsMask: FieldFormatter = {
  apply: (value: string) => {
    return (value || '').replace(/\D/gi, '')
  },
  clean: (value: string) => (value || '').replace(/\D/gi, ''),
}
