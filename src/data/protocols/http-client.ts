export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export type HttpMethod = 'POST'

export enum HttpStatusCode {
  UNAUTHORIZED = 401,
  SUCCESS = 200
}
