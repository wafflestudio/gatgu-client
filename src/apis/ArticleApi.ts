// thunk functions that return promises
import { AxiosResponse } from 'axios';
import qs from 'queryString';
import requester from './BaseInstance';
import {
  IArticleProps,
  IMessageRet,
  IArticleSumResponse,
} from '@/types/article';
import { PAGE_SIZE } from '@/constants/Enum';

// for home page
export const getArticlesSummary = (
  url?: string | null
): Promise<AxiosResponse<IArticleSumResponse>> => {
  const query = qs.stringify({
    page_size: PAGE_SIZE,
  });
  url = url || 'article/';
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
