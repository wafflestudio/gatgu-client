// thunk functions that return promises
import { AxiosResponse } from 'axios';
import qs from 'querystring';

import { PAGE_SIZE } from '@/constants/article';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { UserArticleActivity } from '@/enums';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import {
  IArticleProps,
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
  keyword?: string,
  url?: string | null
): Promise<AxiosResponse<IGetArticlesResponse>> => {
  // keyword가 있고, url이 없으면 search 쿼리 생성
  const searchObj = !url && keyword && { title: keyword };

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
  return requester.post('articles/', article);
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
    return requester.patch(`articles/${id}/`, body);
  });
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

// 글 신고하기
export const postArticleReport = (articleId: number, contents: string) => {
  return requester.post('reports/', {
    article_id: articleId,
    contents,
  });
};
