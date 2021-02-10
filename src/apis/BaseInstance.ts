import axios from 'axios';

// 원래 axios 객체
// TODO: 이거 빼고 다 날려야 함
/*
const requester = axios.create({
  baseURL: '',
});

export default requester;
*/

// TODO: 날려야 함
const fakeRequester = axios.create({
  baseURL: 'http://localhost:4000/',
});

// TODO: 알아서 추가하세용 코드 더러워도 상관없음 어차피 날릴 거
//  근데 더러운 건 이 파일 안에서 다 끝내 주세요: 백엔드 연동할 때 이 파일만 고치면 되도록

const fakeRequesterWrapper = {
  get: (uri: string) => {
    switch (uri) {
      default:
        return null;
    }
  },
  post: (uri: string, body: any) => {
    switch (uri) {
      default:
        return null;
    }
  },
  put: (uri: string, body: any) => {
    switch (uri) {
      // PUT user/login/
      case 'user/login/':
        return fakeRequester.get('users/1');
      default:
        return null;
    }
  },
  delete: (uri: string, body: any) => {
    switch (uri) {
      default:
        return null;
    }
  },
};

export default fakeRequesterWrapper;
