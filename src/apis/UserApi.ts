import requester from './BaseInstance';
import { AxiosResponse } from 'axios';
import { UserType } from '../types/user';

export const readMyInfo = (): Promise<AxiosResponse<UserType>> => {
  return requester.get('user/me/');
};

export const logout = (): Promise<AxiosResponse<UserType>> => {
  return requester.put('user/logout/', {});
};

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<UserType>> => {
  return requester.put('user/login/', { username, password });
};
