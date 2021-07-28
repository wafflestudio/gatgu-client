// thunk functions that return promises
import { AxiosResponse } from 'axios';

import {
  IChattingRoom,
  IChangeStatusProps,
  IAllMessagesResponse,
  IChatListAllPreview,
} from '@/types/chat';
import { IChatUserProps } from '@/types/user';

import requester from './BaseInstance';

// for chat info
export const getChatInfo = (
  articleId?: number
): Promise<AxiosResponse<IChattingRoom[]>> => {
  return requester.get(`chat/${articleId}/`);
};

// change status of order
export const changeStatus = (
  id: number,
  body: IChangeStatusProps
): Promise<AxiosResponse<IChangeStatusProps>> => {
  return requester.put(`chat/${id}/set_status/`, body);
  // TODO: @juimdpp
  // todo: requester.put(`chat/${id}/`, body); url ends with: /set_status/
  // when: api 고칠 때
};

export const getChattingMessages = (
  roomId: number
): Promise<AxiosResponse<IAllMessagesResponse>> => {
  return requester.get(`chattings/${roomId}/messages/`);
};

export const getMyChattingList = (): Promise<
  AxiosResponse<IChatListAllPreview>
> => {
  return requester.get(`users/me/chattings/`);
};

export const getChatParticipants = (
  roomId: number
): Promise<AxiosResponse<IChatUserProps[]>> => {
  return requester.get(`chattings/${roomId}/participants/`);
};
