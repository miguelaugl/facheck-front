import { GetStorage, HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(private readonly getStorage: GetStorage, private readonly httpClient: HttpClient) {}

  async request(params: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken,
        }),
      })
    }
    const httpResponse = await this.httpClient.request(params)
    return httpResponse
  }
}
