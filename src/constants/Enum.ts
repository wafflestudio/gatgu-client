// constant 요소들을 적는 곳.

export const PI = 3.14;

export enum Need {
  UNDEFINED_TYPE,
  IS_PEOPLE = 1,
  IS_MONEY = 2,
}

export enum ArticleStatus {
  UNDEFINED_STATUS,
  OPEN = 1, // 모집중
  BARGAINING = 2, // 거래중
  COMPLETE = 3, // 거래완료
  EXPIRED = 4, // 기간만료
}

export enum OrderStatus {
  UNDEFINED_STATUS,
  RECRUITING = 1, // 모집중
  WAITING_MONEY = 2, // 입금대기중
  IN_DELIVERY = 3, // 배송중
  GATGU_COMPLETE = 4, // 거래완료
}
