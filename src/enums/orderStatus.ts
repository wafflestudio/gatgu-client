import { palette } from '@/styles';

/**
 * - Gathering (모집중)
 * - Dealing (입금 대기중)
 * - Delivering (배송중)
 * - Complete (거래 완료)
 */
export enum OrderStatus {
  Undefined = 0,
  /** 모집중 */
  gathering = 1,
  /** 입금 대기중 */
  Pending = 2,
  /** 배송중 */
  Delivering = 3,
  /** 거래 완료 */
  Complete = 4,
}

export const StringOrderStatus = [
  'UNDEFINED',
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
