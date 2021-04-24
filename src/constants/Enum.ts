// constant 요소들을 적는 곳.

export const PI = 3.14;

export enum Need {
  UNDEFINED_TYPE,
  IS_PEOPLE = 1,
  IS_MONEY = 2,
}

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
