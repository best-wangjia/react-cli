import Request from './instance'
import type { AxiosError } from 'axios'

import type { ExpandInternalAxiosRequestConfig, ExpandAxiosResponse, InterceptorHooks } from './types/request'

const transform: InterceptorHooks = {
  requestInterceptor(config: ExpandInternalAxiosRequestConfig) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!.Authorization = token
    }
    return config
  },
  requestInterceptorCatch(err: AxiosError) {
    return Promise.reject(err)
  },
  responseInterceptor(response: ExpandAxiosResponse) {
    const { status, data, config } = response
    if (status !== 200) {
      return Promise.reject(data)
    }
    if (data.code) {
      if (config.requestOptions?.globalErrorMessage) {
        console.error(data.msg)
      }
      return Promise.reject(data)
    }
    if (config.requestOptions?.globalSuccessMessage) {
      console.log(data.msg)
    }
    return data
  },
  responseInterceptorCatch(err: AxiosError) {
    return Promise.reject(err)
  },
}

const request = new Request({
  interceptor: transform,
})

export default request
