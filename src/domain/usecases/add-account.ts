import { AccountModel } from '@/domain/models'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    ra: string
    course: string
    cpf: string
    role?: string
  }

  export type Result = AccountModel
}
