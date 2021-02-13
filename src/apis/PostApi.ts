import { AxiosResponse } from 'axios';
import requester from './BaseInstance';
import { IPostProps, IPageLimitRes } from '@/types/post';

// TODO:
// - backend url이 정해지면 url 교체하기.

// 리덕스에서 다음 함수들을 쓸건데, 액션과 이름이 겹쳐(네이밍 하기가 어렵다.) api 앞에는 _를 붙였다.
// android에서 local server를 돌리려면 localhost 대신 10.0.2.2를 사용해야 한다. 아이폰 에뮬레이터면 localhost로 바꿔서 테스트 해야한다.

export function _getPosts(page: number): Promise<AxiosResponse<IPostProps[]>> {
  const url = 'posts?_limit=7&_page=' + page;
  return requester.get(url);
}

export function _getPageLimit(): Promise<AxiosResponse<IPageLimitRes>> {
  return requester.get('pageLimit');
}
