import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { InvalidCredentialsError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params,
    })
    if (httpResponse.statusCode === HttpStatusCode.UNAUTHORIZED) {
      throw new InvalidCredentialsError()
    }
    return null
  }
}
