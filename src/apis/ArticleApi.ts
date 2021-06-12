// thunk functions that return promises
import { AxiosResponse } from 'axios';
import qs from 'querystring';

import { PAGE_SIZE, SearchType } from '@/constants/article';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import {
  IArticleProps,
  IMessageRet,
  TSearchType,
  IPostArticle,
  IGetArticlesResponse,
} from '@/types/article';

import requester from './BaseInstance';

const getToken = (res: any) => {
  const token = res['token'];
  const headers = {
    'Content-type': 'application/json',
    Authorization: `token ${token}`,
  };
  return headers;
};

export const getArticles = (
  url?: string,
  keyword?: string,
  searchType?: TSearchType
): Promise<AxiosResponse<IGetArticlesResponse>> => {
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

// for article POST
export const create = (
  article: IPostArticle
): Promise<AxiosResponse<IMessageRet>> => {
  return ObjectStorage.getObject(asyncStoragekey.USER).then((res) => {
    const headers = getToken(res);
    return requester.post('article/', article, { headers });
  });
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

export const editArticle = (
  id: number,
  body: IPostArticle
): Promise<AxiosResponse<IMessageRet>> => {
  return ObjectStorage.getObject(asyncStoragekey.USER).then((res) => {
    const headers = getToken(res);
    return requester.put(`article/${id}/`, body, { headers });
  });
};
