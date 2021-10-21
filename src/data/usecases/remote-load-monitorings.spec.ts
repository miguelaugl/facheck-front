import faker from 'faker'

import { HttpClientSpy } from '@/data/tests'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockMonitoringModels } from '@/domain/tests/mock-monitoring'

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

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN,
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of LoadMonitorings.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockMonitoringModels()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.SUCCESS,
      body: httpResult,
    }
    const surveyList = await sut.load()
    expect(surveyList).toEqual(httpResult)
  })

  it('should return a empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockMonitoringModels()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: httpResult,
    }
    const surveyList = await sut.load()
    expect(surveyList).toEqual([])
  })
})
