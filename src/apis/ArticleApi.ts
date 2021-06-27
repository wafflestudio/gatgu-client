// thunk functions that return promises
import { AxiosResponse } from 'axios';
import qs from 'querystring';

import { PAGE_SIZE, SearchType } from '@/constants/article';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { UserArticleActivity } from '@/enums';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import {
  IArticleProps,
  TSearchType,
  IPostArticle,
  IGetArticlesResponse,
} from '@/types/article';

import requester from './BaseInstance';
import gatguAxios from './gatguAxios';

const getToken = (res: any) => {
  const token = res['token'];
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

export const getArticles = (
  url?: string | null,
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
  url = `articles/${url ? `${url}&` : '?'}`;
  return requester.get(`${url}${query}`);
};

// for article POST
export const create = (article: IPostArticle): Promise<AxiosResponse> => {
  return ObjectStorage.getObject(asyncStoragekey.USER).then((res) => {
    const headers = getToken(res);
    return requester.post('articles/', JSON.stringify(article), { headers });
  });
};

// get a single article with its id
export const getSingleArticle = (
  id: number
): Promise<AxiosResponse<IArticleProps>> => {
  return requester.get(`articles/${id}/`);
};

export const deleteArticle = (id: number): Promise<AxiosResponse> => {
  return requester.delete(`articles/${id}/`);
};

export const editArticle = (
  id: number,
  body: IPostArticle
): Promise<AxiosResponse> => {
  return ObjectStorage.getObject(asyncStoragekey.USER).then((res) => {
    const headers = getToken(res);
    return requester.put(`articles/${id}/`, body, { headers });
  });
};

export const getPresignedURL = (
  id: number,
  file_name: string
): Promise<AxiosResponse> => {
  const body = {
    method: 'get',
    file_name: file_name,
  };
  return requester.put(`articles/${id}/get_presigned_url/`, body);
};

export const putPresignedURL = (
  id: number,
  file_name: string
): Promise<AxiosResponse> => {
  const body = {
    method: 'put',
    file_name: file_name,
  };
  return requester.put(`articles/${id}/get_presigned_url/`, body);
};

// 유저 같구 리스트
export const getUserArticles = (
  cursorSearchParams: string | null,
  activity: UserArticleActivity,
  userId: number | null
) => {
  const defaultUrl = `users/${userId || 'me'}/articles/`;

  const searchParams = new URLSearchParams({
    activity,
    page_size: `${PAGE_SIZE}`,
  });

  return gatguAxios.get(
    defaultUrl +
      (cursorSearchParams ? `${cursorSearchParams}&` : '?') +
      searchParams
  );
};
