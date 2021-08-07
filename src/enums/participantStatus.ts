export enum ParticipantStatus {
  /** 입금 전 */
  before_pay = 1,
  /** 입금 확인 요청 중 */
  request_check_pay = 2,
  /** 입금 확인 후 */
  pay_checked = 3,
}
