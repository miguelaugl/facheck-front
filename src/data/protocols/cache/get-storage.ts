export interface GetStorage<T = any> {
  get: (key: string) => T
}
