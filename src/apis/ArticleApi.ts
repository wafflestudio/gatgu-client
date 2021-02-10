// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { ArticleType } from '@/types/navigation';

// added baseURL here instead of in BaseInstance because not fixed yet
export const postArticleApi = (article: ArticleType) => {
  const res = requester.post('http://localhost:3000/article/', article);
  return res;
};
