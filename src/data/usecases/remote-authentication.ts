import { HttpClient } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params,
    })
    return null
  }
}
