/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup'
import { LocaleObject } from 'yup/lib/locale'

const defaultConfig: LocaleObject = {
  mixed: {
    default: 'Inválido',
    required: 'Campo obrigatório',
    oneOf: 'Deve ser um dos seguintes valores: ${values}',
    notOneOf: 'Não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    length: 'Deve ter exatamente ${length} caracteres',
    min: 'Deve ter pelo menos ${min} caracteres',
    max: 'Deve ter no máximo ${max} caracteres',
    email: 'Deve ter um formato de e-mail válido',
    url: 'Deve ter um formato de URL válida',
    trim: 'Não deve conter espaços no início ou no fim.',
    lowercase: 'Deve estar em maiúsculo',
    uppercase: 'Deve estar em minúsculo',
  },
  number: {
    min: 'Deve ser no mínimo ${min}',
    max: 'Deve ser no máximo ${max}',
    lessThan: 'Deve ser menor que ${less}',
    moreThan: 'Deve ser maior que ${more}',
    positive: 'Deve ser um número positivo',
    negative: 'Deve ser um número negativo',
    integer: 'Deve ser um número inteiro',
  },
  date: {
    min: 'Deve ser maior que a data ${min}',
    max: 'Deve ser menor que a data ${max}',
  },
  array: {
    min: 'Deve ter no mínimo ${min} itens',
    max: 'Deve ter no máximo ${max} itens',
  },
}

export const validationMessages = {
  ...defaultConfig,
  passwordStrengh: 'Deve conter 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  onlyDigits: 'Deve conter apenas dígitos',
}

yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, validationMessages.onlyDigits)
})

yup.setLocale(defaultConfig)
