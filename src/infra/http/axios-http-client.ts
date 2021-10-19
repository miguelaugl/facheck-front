import axios from 'axios'

import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'

export class AxiosHttpClient implements HttpClient {
  async request (httpRequest: HttpRequest): Promise<HttpResponse> {
    const axiosResponse = await axios.request({
      url: httpRequest.url,
      data: httpRequest.body,
      headers: httpRequest.headers,
      method: httpRequest.method,
    })
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
