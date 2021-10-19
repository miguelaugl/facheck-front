import { mockAccountModel } from '@/domain/tests'
import { Authentication } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = mockAccountModel()

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return null
  }
}
