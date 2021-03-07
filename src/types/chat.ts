export interface IChattingRoom {
  id: number;
  participant: number[];
  article: number;
  orderStatus: number;
  trackingNumber: string;
  // not in api
  uri: string;
  title: string;
  chat: string;
  time: number;
  nickName: string;
}

export interface IChangeStatusProps {
  orderStatus: number;
}
