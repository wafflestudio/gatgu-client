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

export interface IChatMessage {
  message: string;
  system: boolean;
  sent_at: string;
  image: string;
  // 보낸사람
  sent_by?: {
    nickname: string;
    picture: string;
  };
}
