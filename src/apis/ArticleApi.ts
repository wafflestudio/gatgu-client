// thunk functions that return promises
import { AxiosResponse } from 'axios';
import qs from 'querystring';
import requester from './BaseInstance';
import {
  IArticleProps,
  IMessageRet,
  IArticleSumResponse,
  IArticleSumProps,
} from '@/types/article';
import { PAGE_SIZE } from '@/constants/article';

// TODO: @ssu1018
// - Refactore all apisrelated with ArticleSumaary
// when: until 3/12

// for home page

export const getArticleSummary = (
  url: string | null
): Promise<AxiosResponse<IArticleSumResponse>> => {
  const query = qs.stringify({
    page_size: PAGE_SIZE,
  });
  // next, previous url이 있는 경우 arguments의 url 사용, 그 외 url이 없는 경우
  // article로 request
  url = `article/${url ? `${url}&` : '?'}`;
  return requester.get(`${url}${query}`);
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
