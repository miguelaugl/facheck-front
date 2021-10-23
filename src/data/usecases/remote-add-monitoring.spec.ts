import faker from 'faker'

import { HttpClientSpy } from '@/data/tests'
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
})
