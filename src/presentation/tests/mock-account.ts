import { mockAccountModel } from '@/domain/tests'
import { AddAccount, Authentication } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  callsCount = 0
  result = mockAccountModel()

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    this.callsCount += 1
    return this.result
  }
}

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  callsCount = 0
  result = mockAccountModel()

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    this.callsCount += 1
    return null
  }
}
