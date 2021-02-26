import requester from './BaseInstance';
import { AxiosResponse } from 'axios';
import { IUserProps } from '../types/user';

export const readMyInfo = (): Promise<AxiosResponse<IUserProps>> => {
  return requester.get('user/me/');
};

export const logout = (): Promise<AxiosResponse<any>> => {
  return requester.put('user/logout/', {});
};

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<IUserProps>> => {
  return requester.put('user/login/', { username, password });
};

export const signUp = (
  username: string,
  password: string,
  nickname: string,
  email: string
): Promise<AxiosResponse<IUserProps>> => {
  return requester.post('user/', {
    username,
    password,
    nickname,
    email,
  });
};
