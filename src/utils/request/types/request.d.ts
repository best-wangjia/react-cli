import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

export interface RequestOptions {
  globalErrorMessage?: boolean
  globalSuccessMessage?: boolean
}

export interface ExpandAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
  interceptor?: InterceptorHooks
  requestOptions?: RequestOptions
}

export interface ExpandInternalAxiosRequestConfig<T = any> extends InternalAxiosRequestConfig<T> {
  interceptor?: InterceptorHooks
  requestOptions?: RequestOptions
}

export interface ExpandAxiosResponse<T = any, K = any> extends AxiosResponse<T, K> {
  config: ExpandInternalAxiosRequestConfig<K>
}

export interface InterceptorHooks {
  requestInterceptor?: (config: ExpandInternalAxiosRequestConfig) => ExpandInternalAxiosRequestConfig
  requestInterceptorCatch?: (err: AxiosError) => Promise<AxiosError>
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  responseInterceptorCatch?: (err: AxiosError) => Promise<AxiosError>
}
