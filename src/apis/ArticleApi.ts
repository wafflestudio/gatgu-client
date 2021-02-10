// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { ArticleType } from '@/types/navigation';

export interface ArticleReturnType {
  id: number;
  title: string;
  // created_at: string;
}

// added baseURL here instead of in BaseInstance because not fixed yet
export async function postArticleApi(article: ArticleType) {
  console.log('axios');
  const res = await requester.post('http://localhost:3000/article/', article);
  return res;
}
