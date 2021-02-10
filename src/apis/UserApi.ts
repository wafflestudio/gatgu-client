// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';

export interface ArticleReturnType {
  id: number;
  title: string;
  // created_at: string;
}

// added baseURL here instead of in BaseInstance because not fixed yet
export const getInfo = () => {
  console.log('not implemented');
};
