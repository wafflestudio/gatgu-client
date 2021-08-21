// thunk functions that return promises
import { AxiosResponse } from 'axios';
import queryString from 'querystring';

import {
  IChattingRoom,
  IChangeStatusProps,
  IAllMessagesResponse,
  IChatListAllPreview,
  IApiImage,
} from '@/types/chat';
import { IChatUserProps } from '@/types/user';

import apiClient from './apiClient';

// for chat info
export const getChatInfo = (
  articleId?: number
): Promise<AxiosResponse<IChattingRoom[]>> => {
  return apiClient.get(`chat/${articleId}/`);
};

// change status of order
export const changeParticipantStatus = (
  id: number, // roomID
  body: IChangeStatusProps
): Promise<AxiosResponse<IChangeStatusProps>> => {
  return apiClient.patch(`chattings/${id}/participants/`, body);
  // TODO: @juimdpp
  // todo: apiClient.put(`chat/${id}/`, body); url ends with: /set_status/
  // when: api 고칠 때
};

export const getChattingMessages = (
  roomId: number,
  url?: string | null
): Promise<AxiosResponse<IAllMessagesResponse>> => {
  url = url === 'first' ? '?' : url ? `${url}&` : '?';

  console.log(`chattings/${roomId}/messages/${url}page_size=5`);
  return apiClient.get(`chattings/${roomId}/messages/${url}page_size=15`);
};

export const getMyChattingList = (
  offset: number
): Promise<AxiosResponse<IChatListAllPreview>> => {
  const searchParams = queryString.stringify({
    offset,
  });

  return apiClient.get(`users/me/chattings/?${searchParams}`);
};

export const getChatParticipants = (
  roomId: number
): Promise<AxiosResponse<IChatUserProps[]>> => {
  return apiClient.get(`chattings/${roomId}/participants/`);
};

export const getChatPictures = (
  roomId: number
): Promise<AxiosResponse<IApiImage[]>> => {
  return apiClient.get(`chattings/${roomId}/images/`);
};
