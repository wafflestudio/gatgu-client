import { palette } from '@/styles';

/**
 * - Gathering (모집중)
 * - Dealing (거래중)
 * - Complete (거래 완료)
 * - Expire (기간만료)
 */
export enum ArticleStatus {
  Undefined = 0,
  /** 모집중 */
  Gathering = 1,
  /** 거래중 */
  Dealing = 2,
  /** 거래 완료 */
  Complete = 3,
  /** 기간 만료 */
  Expire = 4,
}

export const StringArticleStatus = [
  'UNDEFINED',
  '모집중',
  '거래중',
  '거래완료',
  '기간만료',
];

export const ColorArticleStatus = [
  'black',
  palette.yellow,
  'orange',
  palette.blue,
  palette.gray,
];
