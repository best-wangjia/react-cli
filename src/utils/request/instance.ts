import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

import type { ExpandAxiosRequestConfig, InterceptorHooks } from './types/request'

import type { ApiResponse } from './types/index'

class Request {
  private instance: AxiosInstance

  private baseConfig: ExpandAxiosRequestConfig = {
    baseURL: '/api',
    timeout: 20000,
    requestOptions: {
      globalErrorMessage: false,
      globalSuccessMessage: false,
    },
  }

  private interceptor?: InterceptorHooks
  constructor(config: ExpandAxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    this.interceptor = config.interceptor
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.interceptor &&
      this.instance.interceptors.request.use(
        this.interceptor.requestInterceptor!,
        this.interceptor.requestInterceptorCatch!,
      )
    this.interceptor &&
      this.instance.interceptors.response.use(
        this.interceptor.responseInterceptor!,
        this.interceptor.responseInterceptorCatch!,
      )
  }

  public request(config: ExpandAxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, config?: ExpandAxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.get(url, config)
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: ExpandAxiosRequestConfig,
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: ExpandAxiosRequestConfig,
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: ExpandAxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.delete(url, config)
  }
}

export default Request
