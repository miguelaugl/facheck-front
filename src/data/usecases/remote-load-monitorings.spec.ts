import faker from 'faker'

import { HttpClientSpy } from '@/data/tests'

import { RemoteLoadMonitorings } from './remote-load-monitorings'

describe('RemoteLoadMonitorings Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteLoadMonitorings(url, httpClientSpy)
    await sut.load()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('GET')
  })
})
