import { ON_GOING, DONE } from '@/constants/Enum';

export interface IChattingRoom {
  id: number;
  participant: number[];
  article: number;
  orderStatus: typeof ON_GOING | typeof DONE; // TODO: back과 논의
  trackingNumber: string;
  // not in api
  uri: string;
  title: string;
  chat: string;
  time: number;
  nickName: string;
}

export interface IChangeStatusRet {
  status: 'success' | 'failure';
}
