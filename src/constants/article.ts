import { palette } from '@/styles';

// used in articleSum
export const MAX_ARTICLE_NUM = 200;
export const PAGE_SIZE = 10;

export enum GetArticleSumStatus {
  NEXT = 'next',
  PREVIOUS = 'previous',
  FIRST = 'first',
}

export enum SearchType {
  TITLE = 'title',
  TAG = 'tag',
}

export const StringOrderStatus = [
  '모집중',
  '입금 대기중',
  '배송중',
  '거래 완료',
];

export const ColorOrderStatus = [
  'black',
  palette.yellow,
  'orange',
  palette.blue,
  palette.gray,
];

export const StringArticleStatus = ['모집중', '거래중', '거래완료', '기간만료'];

export const ColorArticleStatus = [
  'black',
  palette.yellow,
  'orange',
  palette.blue,
  palette.gray,
];
