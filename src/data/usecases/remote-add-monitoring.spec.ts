import faker from 'faker'

import { HttpStatusCode } from '@/data/protocols'
import { HttpClientSpy } from '@/data/tests'
import { UnexpectedError } from '@/domain/errors'
import { mockAddMonitoringParams } from '@/domain/tests'

import { RemoteAddMonitoring } from './remote-add-monitoring'

type SutTypes = {
  sut: RemoteAddMonitoring
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddMonitoring(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('AddMonitoring Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const addMonitoringParams = mockAddMonitoringParams()
    await sut.add(addMonitoringParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('POST')
    expect(httpClientSpy.body).toEqual(addMonitoringParams)
  })

  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    }
    const promise = sut.add(mockAddMonitoringParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }
    const promise = sut.add(mockAddMonitoringParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    }
    const promise = sut.add(mockAddMonitoringParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
