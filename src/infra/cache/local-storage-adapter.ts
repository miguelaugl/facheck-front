import { GetStorage } from '@/data/protocols'

export class LocalStorageAdapter implements GetStorage {
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
