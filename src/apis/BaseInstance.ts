import axios from 'axios';

// 원래 axios 객체
// TODO: 이거 빼고 다 날려야 함
/*
const requester = axios.create({
  baseURL: '',
});

export default requester;
*/

const fakeRequester = axios.create({
  baseURL: 'http://localhost:4000/',
});

const fakeRequesterWrapper = {
  get: (uri: string) => {
    switch (uri) {
      default:
        return null;
    }
  },
  post: (uri: string) => {
    switch (uri) {
      default:
        return null;
    }
  },
  put: (uri: string) => {
    switch (uri) {
      case 'user/login/':
        return fakeRequester.get('users/1');
      default:
        return null;
    }
  },
  delete: (uri: string) => {
    switch (uri) {
      default:
        return null;
    }
  },
};

export default fakeRequesterWrapper;
