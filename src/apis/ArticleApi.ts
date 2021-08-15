// thunk functions that return promises
import { AxiosResponse } from 'axios';
import qs from 'querystring';

import { PAGE_SIZE } from '@/constants/article';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ArticleStatus, UserArticleActivity } from '@/enums';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import {
  IArticleProps,
  IPostArticle,
  IGetArticlesResponse,
} from '@/types/article';

import apiClient from './apiClient';

export const getArticles = (
  url?: string | null,
  keyword?: string
): Promise<AxiosResponse<IGetArticlesResponse>> => {
  // keyword가 있고, url이 없으면 search 쿼리 생성
  const searchObj = !url && keyword && { title: keyword };

  const query = qs.stringify({
    ...searchObj,
    page_size: PAGE_SIZE,
    // status: [ArticleStatus.Dealing,ArticleStatus.Gathering],
  });

  // next, previous url이 있는 경우 arguments의 url 사용, 그 외 url이 없는 경우
  // article로 request
  console.log(query);
  url = `articles/${url ? `${url}&` : '?'}`;
  return apiClient.get(`${url}${query}`);
};

// for article POST
export const create = (article: IPostArticle): Promise<AxiosResponse> => {
  return apiClient.post('articles/', article);
};

// get a single article with its id
export const getSingleArticle = (
  id: number
): Promise<AxiosResponse<IArticleProps>> => {
  return apiClient.get(`articles/${id}/`);
};

export const deleteArticle = (id: number): Promise<AxiosResponse> => {
  return apiClient.delete(`articles/${id}/`);
};

export const editArticle = (
  id: number,
  body: IPostArticle
): Promise<AxiosResponse> => {
  return ObjectStorage.getObject(asyncStoragekey.USER).then((res) => {
    return apiClient.patch(`articles/${id}/`, body);
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

  return apiClient.get(
    defaultUrl +
      (cursorSearchParams ? `${cursorSearchParams}&` : '?') +
      searchParams
  );
};

// 글 신고하기
export const postArticleReport = (articleId: number, contents: string) => {
  return apiClient.post('reports/', {
    article_id: articleId,
    contents,
  });
};
