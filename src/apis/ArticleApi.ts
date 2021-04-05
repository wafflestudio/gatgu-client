// thunk functions that return promises
import { AxiosResponse } from 'axios';
import qs from 'querystring';

// TODO: @ssu1018
// - Refactore all apisrelated with ArticleSumaary
// when: until 3/12
// for home page
import { PAGE_SIZE, SearchType } from '@/constants/article';
import {
  IArticleProps,
  IMessageRet,
  IArticleSumResponse,
  TSearchType,
} from '@/types/article';

import requester from './BaseInstance';

export const getArticleSummary = (
  url: string | null,
  keyword?: string,
  searchType?: TSearchType
): Promise<AxiosResponse<IArticleSumResponse>> => {
  // keyword가 있고, url이 없으면 search 쿼리 생성
  const searchObj =
    !url &&
    keyword &&
    (searchType === SearchType.TITLE ? { title: keyword } : { tag: keyword });

  const query = qs.stringify({
    ...searchObj,
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
