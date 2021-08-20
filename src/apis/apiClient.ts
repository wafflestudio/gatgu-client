import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { ErrorCode } from '@/enums/errorCode';
import { loginWithAccessToken } from '@/helpers/functions/auth';

type Request = () => AxiosPromise;

export const requester = axios.create({
  baseURL: 'http://api.gatgu.site/v1/',
  // baseURL: 'http://gatgu-api.wafflestudio.com/v1/',
});

// set user auth token
export const setRequesterToken = (token: string): void => {
  requester.defaults.headers['Authorization'] = `Bearer ${token}`;
};

// remove user auth token
export const removeRequesterToken = (): void => {
  requester.defaults.headers['Authorization'] = undefined;
};

/**
 * retry request
 */
const retryRequest = async (request: Request, err?: AxiosError) => {
  try {
    await loginWithAccessToken();
    return await request();
  } catch (_err) {
    console.error('retry error:', _err);
    return err ?? _err;
  }
};

const axiosProxyHandler = async (request: Request) => {
  try {
    return await request();
  } catch (err) {
    const error_code = err?.response?.data?.error_code;

    if (error_code === ErrorCode.UnAuthorized) {
      return await retryRequest(request, err);
    }
    throw err;
  }
};

class ApiClient {
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return axiosProxyHandler(() => requester.get(url, config));
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axiosProxyHandler(() => requester.put(url, data, config));
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axiosProxyHandler(() => requester.post(url, data, config));
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return axiosProxyHandler(() => requester.delete(url, config));
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axiosProxyHandler(() => requester.patch(url, data, config));
  }
}

const apiClient = new ApiClient();
export default apiClient;
