export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

export enum HttpStatusCode {
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SUCCESS = 200,
  INTERNAL_SERVER_ERROR = 500,
}
