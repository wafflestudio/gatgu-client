/**
 * - Gathering (모집중)
 * - Dealing (거래중)
 * - Complete (거래 완료)
 * - Expire (기간만료)
 */
export enum ArticleStatus {
  /** 모집중 */
  Gathering = 0,
  /** 거래중 */
  Dealing = 1,
  /** 거래 완료 */
  Complete = 2,
  /** 기간 만료 */
  Expire = 3,
}
