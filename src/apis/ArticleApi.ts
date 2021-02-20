// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import {
  IArticleSumProps,
  IPageLimitRes,
  IArticleProps,
  IMessageRet,
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

export const readPageLimit = (): Promise<AxiosResponse<IPageLimitRes>> => {
  // TODO: check
  // 이거 있는 API인가요? 없으면 차라리 자주 변하는 정보도 아니고 @/constants/에 두는 게 나을 듯
  return requester.get('pageLimit');
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
