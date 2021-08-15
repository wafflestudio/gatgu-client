/**
 * - Gathering (모집중)
 * - Dealing (거래중)
 * - Complete (거래 완료)
 * - Expire (기간만료)
 */
export enum ArticleStatus {
  /** 모집중 */
  Gathering = 1,
  /** 거래중 */
  Dealing = 2,
  /** 거래 완료 */
  Complete = 3,
  /** 기간 만료 */
  Expire = 4,
}
