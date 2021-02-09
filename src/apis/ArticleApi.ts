// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { ArticleType } from '@/types/navigation';

export interface ArticleReturnType {
  id: number;
  title: string;
  created_at: string;
}

// added baseURL here instead of in BaseInstance because not fixed yet
export function postArticleApi(
  article: ArticleType
): Promise<ArticleReturnType> {
  console.log('axios');
  console.log(article);
  return requester.post('/article', article);
}
