import { AxiosResponse } from 'axios';
import requester from './BaseInstance';

export interface PostProps {
  id: number;
  created_at: number;
  title: string;
  description: string;
}

export function getAllPost(): Promise<AxiosResponse<PostProps>> {
  return requester.get('/board/list/');
}