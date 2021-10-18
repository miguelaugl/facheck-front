import faker from 'faker'

import { HttpRequest } from '@/data/protocols'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
})
