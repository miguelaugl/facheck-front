import 'jest-localstorage-mock'
import faker from 'faker'

import { LocalStorageAdapter } from './local-storage-adapter'

describe('LocalStorage Adapter', () => {
  it('should call localStorage.getItem with correct key', () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.objectElement()
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
