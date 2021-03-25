export interface IChattingRoom {
  id: number;
  participant_profile: number[];
  article: number;
  order_status: number;
  trackingNumber: string;
  // not in api
  uri: string;
  title: string;
  chat: string;
  time: number;
  nickName: string;
}

export interface IChangeStatusProps {
  order_status: number;
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
