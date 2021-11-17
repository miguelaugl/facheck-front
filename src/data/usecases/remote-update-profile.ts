import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { UpdateProfile } from '@/domain/usecases'

export class RemoteUpdateProfile implements UpdateProfile {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<UpdateProfile.Result>) {}

  async update(data: UpdateProfile.Params): Promise<UpdateProfile.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      body: data,
      method: 'PUT',
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
