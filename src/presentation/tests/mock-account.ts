import { mockAccountModel } from '@/domain/tests'
import { Authentication } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  callsCount = 0
  result = mockAccountModel()

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    this.callsCount += 1
    return null
  }
}
