import { FieldFormatter } from '@/data/protocols'

export const militaryTimeMask: FieldFormatter = {
  apply: (value: string) => {
    if (!value) return ''
    const regexp = /^([01]\d|2[0-3]):?([0-5]\d)$/
    const result = '$1:$2'
    return value.replace(regexp, result).replace(/:$/, '')
  },
  clean: (value: string) => value,
}
