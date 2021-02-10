import requester from './BaseInstance';
import { AxiosResponse } from 'axios';
import { UserType } from '../types/navigation';

const user = {
  getInfo: () => {
    console.log('not implemented');
  },
  logout: () => {
    console.log('not implemented');
  },
  login: (id: string, pw: string): Promise<AxiosResponse<UserType>> => {
    return requester.put('user/login/');
  },
  // TODO: add more functions about user
};

export default user;
