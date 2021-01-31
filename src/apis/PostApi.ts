import { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from './BaseInstance';

export interface PostProps {
  id: number;
  created_at: number;
  title: string;
  description: string;
}

export function getAllPost(token: string): Promise<AxiosResponse<PostProps>> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Token ${token}` },
  };
  return axios.get('/board/list/', config);
}
