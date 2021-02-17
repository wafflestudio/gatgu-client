export type TnoticeType = 'DeadLine' | 'ECT';

export interface INotifyItem {
  user: string;
  uri: string;
  title: string;
  time: number;
  // 백엔드 api 따라 type이 달라짐
  noticeType: TnoticeType;
}
