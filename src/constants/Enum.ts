// constant 요소들을 적는 곳.

export const PI = 3.14;

export const IS_MONEY = 2;
export const IS_PEOPLE = 1;

export enum Status {
  UNDEFINED_STATUS,
  WAITING_MEMBERS = 1,
  MEMBER_ASSEMBLED = 2,
  PAY_STATUS_CHECKED = 3,
  ORDER_COMPLETE = 4, // 이 후로 회색으로 변함, 이전까지는 다 가능하게...
  WAITING_PARCELS = 5,
  WAITING_SHARE = 6,
  GATGU_COMPLETE = 7,
}

// used in articleSum
export const MAX_ARTICLE_NUM = 200;
export const PAGE_SIZE = 10;

export enum GetArticleSumStatus {
  NEXT = 'next',
  PREVIOUS = 'previous',
  FIRST = 'first',
}
