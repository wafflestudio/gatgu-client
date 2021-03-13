// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { IChattingRoom, IChangeStatusProps } from '@/types/chat';

// for chat info
export const getChatInfo = (
  articleId: number | undefined
): Promise<AxiosResponse<IChattingRoom[]>> => {
  return requester.get(`chat?article=${articleId}`);
};

// change status of order
export const changeStatus = (
  id: number,
  body: IChangeStatusProps
): Promise<AxiosResponse<IChangeStatusProps>> => {
  return requester.patch(`chat/${id}/`, body);
  // TODO: @juimdpp
  // todo: requester.put(`chat/${id}/`, body); url ends with: /set_status/
  // when: api 고칠 때
};
