// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import {
  IArticleSumProps,
  IArticleProps,
  IArticleSumResponse,
} from '@/types/article';

// for home page
export const readAll = (
  page: number
): Promise<AxiosResponse<IArticleSumProps[]>> => {
  // TODO: check
  // pagination 이렇게 안하는데, 백엔드와 논의 필요
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
