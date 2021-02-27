// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { IChattingRoom, IChangeStatusRet } from '@/types/chat';

// for chat info
export const getChatInfo = (
  articleId: number
): Promise<AxiosResponse<IChattingRoom[]>> => {
  return requester.get(`chat?article=${articleId}`);
};

// change status of order
export const changeStatus = (
  id: number,
  body: IChattingRoom
): Promise<AxiosResponse<IChangeStatusRet>> => {
  return requester.put(`chat/${id}/`, body);
};
