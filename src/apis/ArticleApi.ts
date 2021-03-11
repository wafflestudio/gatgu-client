// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import {
  IArticleSumProps,
  IArticleProps,
  IMessageRet,
  IArticleSumResponse,
} from '@/types/article';

// TODO: @ssu1018
// - Refactore all apisrelated with ArticleSumaary
// when: until 3/12

// for home page
export const readAll = (
  page: number
): Promise<AxiosResponse<IArticleSumProps[]>> => {
  const url = `posts?_limit=7&_page=${page}`;
  return requester.get(url);
};

export const getArticleSummary = (
  url: string
): Promise<AxiosResponse<IArticleSumResponse>> => {
  return requester.get(url);
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
