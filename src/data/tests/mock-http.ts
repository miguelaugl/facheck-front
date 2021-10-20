import faker from 'faker'

import { HttpClient, HttpMethod, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url: string
  method: HttpMethod
  body?: any
  response: HttpResponse = {
    statusCode: HttpStatusCode.SUCCESS,
  }

  async request(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.url = httpRequest.url
    this.body = httpRequest.body
    this.method = httpRequest.method
    return this.response
  }
}
