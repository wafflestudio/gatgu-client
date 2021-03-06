// thunk functions that return promises
import { AxiosResponse } from 'axios';
<<<<<<< HEAD
import qs from 'querystring';
=======
import qs from 'queryString';
>>>>>>> 586c799... Refactor getArticleSum api
import requester from './BaseInstance';
import {
  IArticleProps,
  IMessageRet,
  IArticleSumResponse,
} from '@/types/article';
import { PAGE_SIZE } from '@/constants/Enum';

<<<<<<< HEAD
=======
// for home page
>>>>>>> 586c799... Refactor getArticleSum api
export const getArticlesSummary = (
  url?: string | null
): Promise<AxiosResponse<IArticleSumResponse>> => {
  const query = qs.stringify({
    page_size: PAGE_SIZE,
  });
<<<<<<< HEAD
  // next, previous url이 있는 경우 arguments의 url 사용, 그 외 url이 없는 경우
  // article로 request
  url =
    url?.slice(requester.defaults.baseURL?.length, url.length) || 'article/';
=======
  url = url || 'article/';
>>>>>>> 586c799... Refactor getArticleSum api
  return requester.get(`${url}?${query}`);
};

// for article page
export const create = (
  article: IArticleProps
): Promise<AxiosResponse<IArticleProps>> => {
  return requester.post('article/', article);
};

// get a single article with its id
export const getSingleArticle = (
  id: number
): Promise<AxiosResponse<IArticleProps>> => {
  return requester.get(`article/${id}/`);
};

export const deleteArticle = (
  id: number
): Promise<AxiosResponse<IMessageRet>> => {
  return requester.delete(`article/${id}/`);
};
