import axios, { AxiosResponse } from 'axios'

import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'

export class AxiosHttpClient implements HttpClient {
  async request (httpRequest: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: httpRequest.url,
        data: httpRequest.body,
        headers: httpRequest.headers,
        method: httpRequest.method,
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
