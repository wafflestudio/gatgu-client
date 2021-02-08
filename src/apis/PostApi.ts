import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { IPostProps } from '@/types/post';

export function getPosts(page: number): Promise<AxiosResponse<IPostProps[]>> {
  const url = 'http://localhost:3001/posts?_limit=8&_page=' + page;
  return requester.get(url);
}
