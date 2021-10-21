import faker from 'faker'

import { HttpClientSpy } from '@/data/tests'
import { UnexpectedError } from '@/domain/errors'

import { HttpStatusCode } from '../protocols'
import { RemoteLoadMonitorings } from './remote-load-monitorings'

type SutTypes = {
  sut: RemoteLoadMonitorings
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteLoadMonitorings(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteLoadMonitorings Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.load()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('GET')
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
