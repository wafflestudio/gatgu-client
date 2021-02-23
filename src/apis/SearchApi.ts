import requester from './BaseInstance';
import { IArticleSumSearchResponse } from '@/types/article';

export const getPopularSearchKeyword = (): Promise<string[]> => {
  // TODO:
  // change after serach api docs are defined
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        '검색어1',
        '검색어2',
        '검색어3',
        '검색어4',
        '검색어5',
        '검색어6',
        '검색어7',
      ]);
    });
  });
};

export const searchArticles = (
  keyword: string
): Promise<IArticleSumSearchResponse> => {
  return requester.get(`articles/?search=${keyword}&page=1`);
};

export const loadMoreArticles = (
  keyword: string,
  url: string
): Promise<IArticleSumSearchResponse> => {
  return requester.get(url + `&search=${keyword}`);
};
