import requester from './BaseInstance';
import { AxiosResponse } from 'axios';
import { UserType } from '../types/user';

const user = {
  readMyInfo: (): Promise<AxiosResponse<UserType>> => {
    return requester.get('user/me/');
  },

  logout: (): Promise<AxiosResponse<UserType>> => {
    return requester.put('user/logout/', {});
  },

  login: (
    username: string,
    password: string
  ): Promise<AxiosResponse<UserType>> => {
    return requester.put('user/login/', { username, password });
  },
};

export default user;
