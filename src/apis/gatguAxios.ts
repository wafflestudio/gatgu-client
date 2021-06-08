import { Alert } from 'react-native';

import { AxiosPromise, AxiosRequestConfig } from 'axios';

import requester from './BaseInstance';

const treatGatguResponse = (promise: AxiosPromise) => {
  return promise
    .then((response) => response)
    .catch((err) => {
      console.debug(err.config);
      console.debug(err.response?.data);
      switch (err.response?.code) {
        // handle util errors here
        case 500:
          Alert.alert('서버 에러입니다.');
          break;
        default:
          break;
      }
      throw new Error(err);
    });
};

class GatguAxios {
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return treatGatguResponse(requester.get(url, config));
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return treatGatguResponse(requester.put(url, data, config));
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return treatGatguResponse(requester.post(url, data, config));
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return treatGatguResponse(requester.delete(url, config));
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return treatGatguResponse(requester.patch(url, data, config));
  }
}

const gatguAxios = new GatguAxios();
export default gatguAxios;
