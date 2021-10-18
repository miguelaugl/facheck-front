import axios from 'axios'
import faker from 'faker'

import { mockHttpRequest } from '@/data/tests'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const sut = new AxiosHttpClient()
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.request.mockClear().mockResolvedValue({
      data: faker.random.objectElement(),
      status: faker.datatype.number(),
    })
    await sut.request(request)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    })
  })
})
