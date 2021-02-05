import { AxiosResponse } from 'axios';
import requester from './BaseInstance';

export interface PostProps {
  id: number;
  created_at: number;
  title: string;
  description: string;
}

const postApi = {
  getAll: (): Promise<AxiosResponse<PostProps>> => {
    // TODO change: board/list/ 아님
    return requester.get('/board/list/');
  }
}

export default postApi;
