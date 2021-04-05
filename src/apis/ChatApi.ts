// thunk functions that return promises
import { AxiosResponse } from 'axios';

import { IChattingRoom, IChangeStatusProps } from '@/types/chat';

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
