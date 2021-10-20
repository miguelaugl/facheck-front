import faker from 'faker'

import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName(),
})

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = '@Teste12345'
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
    course: faker.database.column(),
    cpf: '00871260018',
    ra: '1234567891234',
  }
}
