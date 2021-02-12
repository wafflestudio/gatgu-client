import axios from 'axios';

// 원래 axios 객체
// TODO: fakeRequester 지우고 이거로 대체
/*
const requester = axios.create({
  baseURL: '',
});

export default requester;
*/

export const setToken = (token: string): void => {
  fakeRequester.defaults.headers['Authorization'] = `${token}`;
  // TODO: replace with
  // requester.defaults.headers['Authorization'] = `${token}`;
};

export const removeToken = (): void => {
  fakeRequester.defaults.headers['Authorization'] = null;
};

// TODO: 날려야 함
const fakeRequester = axios.create({
  baseURL: 'http://localhost:4000/',
});

// TODO: 알아서 추가하세용 코드 더러워도 상관없음 어차피 날릴 거
//  근데 더러운 건 이 파일 안에서 다 끝내 주세요: 백엔드 연동할 때 이 파일만 고치면 되도록

const fakeRequesterWrapper = {
  get: (uri: string) => {
    switch (uri) {
      // GET user/me/
      case 'user/me/':
        return fakeRequester.get('users/1');
      default:
        if (uri.includes('posts?_limit=7&_page=')) {
          return fakeRequester.get(uri);
        } else {
          throw new Error('Code is wrong');
        }
    }
  },
  post: (uri: string, body: any) => {
    switch (uri) {
      default:
        throw new Error('Code is wrong');
    }
  },
  put: (uri: string, body: any) => {
    switch (uri) {
      // PUT user/login/
      case 'user/login/':
        return fakeRequester.get('users/1');
      case 'user/logout/':
        return fakeRequester.get('users/1');
      default:
        throw new Error('Code is wrong');
    }
  },
  delete: (uri: string, body: any) => {
    switch (uri) {
      default:
        throw new Error('Code is wrong');
    }
  },
};

export default fakeRequesterWrapper;
