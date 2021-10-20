import { EmailInUseError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'

import { HttpClient, HttpStatusCode } from '../protocols'

export class RemoteAddAccount implements AddAccount {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<AddAccount.Result>) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'POST', body: params })
    if (httpResponse.statusCode === HttpStatusCode.FORBIDDEN) {
      throw new EmailInUseError()
    }
    return null
  }
}
