import qs from 'querystring';

import { IArticleSumSearchResponse } from '@/types/article';

import requester from './BaseInstance';

export const getPopularSearchKeyword = (): Promise<string[]> => {
  // TODO: @ssu1018
  // - Refactore all apisrelated with search
  // when: until 3/12
};
// TODO: @ssu1018
// - 인기 검색어 보류

// export const getPopularSearchKeyword = (): Promise<string[]> => {

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         '검색어1',
//         '검색어2',
//         '검색어3',
//         '검색어4',
//         '검색어5',
//         '검색어6',
//         '검색어7',
//       ]);
//     });
//   });
// };
