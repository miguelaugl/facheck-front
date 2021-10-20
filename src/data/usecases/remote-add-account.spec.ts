import faker from 'faker'

import { HttpStatusCode } from '@/data/protocols'
import { HttpClientSpy } from '@/data/tests'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockAddAccountParams } from '@/domain/tests'

import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddAccount(url, httpClientSpy)
  return {
    sut,
    httpClientSpy,
  }
}

describe('RemoteAddAccount Usecase', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('POST')
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  it('should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN,
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
