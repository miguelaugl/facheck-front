import faker from 'faker'

import { HttpClient, HttpMethod, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'
import { InvalidCredentialsError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

import { RemoteAuthentication } from './remote-authentication'

class HttpClientSpy implements HttpClient {
  url: string
  method: HttpMethod
  body?: any
  response: HttpResponse = {
    statusCode: HttpStatusCode.SUCCESS,
    body: {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName(),
    },
  }

  async request (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.url = httpRequest.url
    this.body = httpRequest.body
    this.method = httpRequest.method
    return this.response
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

const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

describe('RemoteAuthentication Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('POST')
    expect(httpClientSpy.body).toEqual(authenticationParams)
  })

  it('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
