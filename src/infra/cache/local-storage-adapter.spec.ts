import 'jest-localstorage-mock'
import faker from 'faker'

import { AccountModel } from '@/domain/models'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorage Adapter', () => {
  it('should call localStorage.getItem with correct key', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement()
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })

  it('should call localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()
    const setItemSpy = jest.spyOn(localStorage, 'setItem')
    sut.set(key, value)
    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
