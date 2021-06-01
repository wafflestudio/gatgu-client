import { OrderStatus } from '@/constants/Enum';

import { IChatUserProps, IUserProfile } from './user';

export interface IChattingRoom {
  id: number;
  participant_profile: IChatUserProps[];
  article: number;
  order_status: number;
  tracking_number: number;
  // not in api
  uri: string;
  title: string;
  chat: string;
  time: number;
  nickName: string;
}

// TODO: @ssu1018 @juimdpp
// Chatting API 확정되면 IChattingRoom이랑 합칠지 말지 결정하기
export interface IOrderChat {
  id: number;
  participant_profile: IChatUserProps[];
  article: number;
  order_status: OrderStatus;
  tracking_number: number;
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
