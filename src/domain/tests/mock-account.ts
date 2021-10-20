import faker from 'faker'

import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName(),
})

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  course: faker.database.column(),
  cpf: faker.datatype.uuid(),
  ra: faker.datatype.uuid(),
})
