// thunk functions that return promises
import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { ArticleType } from '@/types/navigation';
import { IPostProps, IPageLimitRes } from '@/types/post';

const article = {
  getAll: (page: number): Promise<AxiosResponse<IPostProps[]>> => {
    // TODO: check
    // pagination 이렇게 안하는데, 백엔드와 논의 필요
    const url = `posts?_limit=7&_page=${page}`;
    return requester.get(url);
  },
  create: (article: ArticleType): AxiosResponse => {
    return requester.post('article/', article);
  },
  getPageLimit: (): Promise<AxiosResponse<IPageLimitRes>> => {
    // TODO: check
    // 이거 있는 API인가요? 없으면 차라리 자주 변하는 정보도 아니고 @/constants/에 두는 게 나을 듯
    return requester.get('pageLimit');
  },
};

export default article;
