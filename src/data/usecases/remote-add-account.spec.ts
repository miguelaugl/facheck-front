import faker from 'faker'

import { HttpClientSpy } from '@/data/tests'
import { mockAddAccountParams } from '@/domain/tests'

import { RemoteAddAccount } from './remote-add-account'

describe('RemoteAddAccount Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteAddAccount(url, httpClientSpy)
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('POST')
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })
})
