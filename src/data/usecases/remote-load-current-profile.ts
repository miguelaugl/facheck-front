import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadCurrentProfile } from '@/domain/usecases'

export class RemoteLoadCurrentProfile implements LoadCurrentProfile {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadCurrentProfile.Result>) {}

  async load(): Promise<LoadCurrentProfile.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    })
    if (httpResponse.statusCode === HttpStatusCode.FORBIDDEN) {
      throw new AccessDeniedError()
    }
    if (httpResponse.statusCode === HttpStatusCode.SUCCESS) {
      return httpResponse.body
    }
    throw new UnexpectedError()
  }
}
