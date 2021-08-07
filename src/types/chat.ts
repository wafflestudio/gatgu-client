import { OrderStatus, ParticipantStatus } from '@/enums';

import { ICursorPaginationResponse } from './shared';
import { IChatUserProps, IUserListPreview } from './user';

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

export interface IChatListSinglePreview {
  id: number;
  order_status: number;
  tracking_number: string;
  recent_message: IChatMessagePreview;
}

export type IChatListAllPreview = ICursorPaginationResponse<IChatListSinglePreview>;

export interface IChatMessagePreview {
  id: number;
  image: string[];
  sent_at: number;
  sent_by: IUserListPreview;
  text: string;
  type: string;
}

// TODO: @ssu1018 @juimdpp
// Chatting API 확정되면 IChattingRoom이랑 합칠지 말지 결정하기
export interface IOrderChat {
  id: number;
  participant_profile: IChatUserProps[];
  tracking_number: number;
  order_status: OrderStatus;
}

export interface IChangeStatusProps {
  pay_status?: ParticipantStatus;
  wish_price?: number;
  participant_id: number;
}
export interface IChatMessage {
  id?: number;
  text: string;
  image: {
    id: number;
    img_url: string;
  }[];
  sent_by: {
    id: number;
    nickname: string;
    picture: string;
    updated_at: number;
    withdrew_at: number | null;
  };
  sent_at: string;
  type: string;
  system?: boolean;
}

export type IAllMessagesResponse = ICursorPaginationResponse<IChatMessage>;

export interface ISendMessage {
  room_id: number;
  user_id?: number;
  message: {
    text: string;
    img: string;
  };
  websocket_id: string;
}

export interface IMessageImage {
  text: string;
  imgUrl: string;
}
