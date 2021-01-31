import { AxiosResponse } from 'axios';
import axios from './axios';

export interface PostProps {
  id: number;
  created_at: number;
  title: string;
  description: string;
}

export async function getAllPost(
  token: string
): Promise<AxiosResponse<PostProps>> {
  const config = { headers: { Authorization: `Token ${token}` } };
  const response = await axios.get('/board/list/', config);
  return response;
}
