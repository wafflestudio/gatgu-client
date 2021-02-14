import requester from './BaseInstance';
import { AxiosResponse } from 'axios';
import { TUserProps } from '../types/user';

export const readMyInfo = (): Promise<AxiosResponse<TUserProps>> => {
  return requester.get('user/me/');
};

export const logout = (): Promise<AxiosResponse<TUserProps>> => {
  return requester.put('user/logout/', {});
};

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<TUserProps>> => {
  return requester.put('user/login/', { username, password });
};
