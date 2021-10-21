import { HttpClient } from '@/data/protocols'
import { LoadMonitorings } from '@/domain/usecases'

export class RemoteLoadMonitorings implements LoadMonitorings {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadMonitorings.Result>) {}

  async load(): Promise<LoadMonitorings.Result> {
    await this.httpClient.request({
      url: this.url,
      method: 'GET',
    })
    return null
  }
}
