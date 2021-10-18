import faker from 'faker'

import { HttpClient, HttpMethod, HttpRequest, HttpResponse } from '@/data/protocols'

import { RemoteAuthentication } from './remote-authentication'

class HttpClientSpy implements HttpClient {
  url: string
  method: HttpMethod
  body?: any

  async request (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.url = httpRequest.url
    this.body = httpRequest.body
    this.method = httpRequest.method
    return null
  }
}

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteAuthentication Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const authParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    await sut.auth(authParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('POST')
    expect(httpClientSpy.body).toEqual(authParams)
  })
})
