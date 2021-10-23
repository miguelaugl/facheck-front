import { HttpClient } from '@/data/protocols'
import { AddMonitoring } from '@/domain/usecases'

export class RemoteAddMonitoring implements AddMonitoring {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  async add(params: AddMonitoring.Params): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params,
    })
  }
}
