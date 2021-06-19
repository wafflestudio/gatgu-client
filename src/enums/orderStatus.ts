/**
 * - Gathering (모집중)
 * - Dealing (입금 대기중)
 * - Delivering (배송중)
 * - Complete (거래 완료)
 */
export enum OrderStatus {
  /** 모집중 */
  gathering = 1,
  /** 입금 대기중 */
  Pending = 2,
  /** 배송중 */
  Delivering = 3,
  /** 거래 완료 */
  Complete = 4,
}
