import { AddAccount } from '@/domain/usecases'

import { HttpClient } from '../protocols'

export class RemoteAddAccount implements AddAccount {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<AddAccount.Result>) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.httpClient.request({ url: this.url, method: 'POST', body: params })
    return null
  }
}
