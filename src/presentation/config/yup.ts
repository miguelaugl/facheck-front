/* eslint-disable no-template-curly-in-string */
import { cpf } from 'cpf-cnpj-validator'
import * as yup from 'yup'
import { LocaleObject } from 'yup/lib/locale'

const defaultConfig: LocaleObject = {
  mixed: {
    default: 'Inválido.',
    required: 'Campo obrigatório.',
    oneOf: 'Deve ser um dos seguintes valores: ${values}.',
    notOneOf: 'Não pode ser um dos seguintes valores: ${values}.',
  },
  string: {
    length: 'Deve ter exatamente ${length} caracteres.',
    min: 'Deve ter pelo menos ${min} caracteres.',
    max: 'Deve ter no máximo ${max} caracteres.',
    email: 'Deve ter um formato de e-mail válido.',
    url: 'Deve ter um formato de URL válida.',
    trim: 'Não deve conter espaços no início ou no fim.',
    lowercase: 'Deve estar em maiúsculo.',
    uppercase: 'Deve estar em minúsculo.',
  },
  number: {
    min: 'Deve ser no mínimo ${min}.',
    max: 'Deve ser no máximo ${max}.',
    lessThan: 'Deve ser menor que ${less}.',
    moreThan: 'Deve ser maior que ${more}.',
    positive: 'Deve ser um número positivo.',
    negative: 'Deve ser um número negativo.',
    integer: 'Deve ser um número inteiro.',
  },
  date: {
    min: 'Deve ser maior que a data ${min}.',
    max: 'Deve ser menor que a data ${max}.',
  },
  array: {
    min: 'Deve ter no mínimo ${min} itens.',
    max: 'Deve ter no máximo ${max} itens.',
  },
}

export const validationMessages = {
  ...defaultConfig,
  passwordStrength: 'Deve conter 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  onlyDigits: 'Deve conter apenas dígitos.',
  cpf: 'Deve ter um formato de CPF válido.',
}

yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, validationMessages.onlyDigits)
})

yup.addMethod(yup.string, 'cpf', function () {
  return this.test('is-cpf', validationMessages.cpf, (value: string) => cpf.isValid(value))
})

/**
 * 8 characters, 1 upper case, 1 lower case, 1 number and 1 special character
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

yup.addMethod(yup.string, 'passwordStrength', function (regex = passwordRegex, message = validationMessages.passwordStrength) {
  return this.matches(regex, message)
})

yup.setLocale(defaultConfig)
