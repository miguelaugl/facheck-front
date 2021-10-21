import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadMonitorings } from '@/domain/usecases'

export class RemoteLoadMonitorings implements LoadMonitorings {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadMonitorings.Result>) {}

  async load(): Promise<LoadMonitorings.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    })
    if (httpResponse.statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      throw new UnexpectedError()
    }
    if (httpResponse.statusCode === HttpStatusCode.FORBIDDEN) {
      throw new AccessDeniedError()
    }
    return null
  }
}
