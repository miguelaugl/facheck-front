import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AddMonitoring } from '@/domain/usecases'

export class RemoteAddMonitoring implements AddMonitoring {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  async add(params: AddMonitoring.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params,
    })
    if (httpResponse.statusCode === HttpStatusCode.FORBIDDEN) {
      throw new AccessDeniedError()
    }
    if (httpResponse.statusCode !== HttpStatusCode.SUCCESS) {
      throw new UnexpectedError()
    }
  }
}
