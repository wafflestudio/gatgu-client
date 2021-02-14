// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { ArticleType } from '@/types/navigation';
import { IArticleSumProps, IPageLimitRes } from '@/types/article';

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
  article: ArticleType
): Promise<AxiosResponse<ArticleType>> => {
  return requester.post('article/', article);
};
