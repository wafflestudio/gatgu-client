import axios from 'axios';
import { Dictionary } from 'lodash';
import { Platform } from 'react-native';

// 원래 axios 객체
// TODO: fakeRequester 지우고 이거로 대체
/*
const requester = axios.create({
  baseURL: '',
});

export default requester;
*/

// set user auth token
export const setToken = (token: string): void => {
  fakeRequester.defaults.headers['Authorization'] = `${token}`;
  // TODO: replace with
  // requester.defaults.headers['Authorization'] = `${token}`;
};

// remove user auth token
export const removeToken = (): void => {
  fakeRequester.defaults.headers['Authorization'] = null;
  // TODO: replace with
  // requester.defaults.headers['Authorization'] = `${token}`;
};

const fakeHosts: Dictionary<string> = {};
fakeHosts['android'] = 'http://10.0.2.2:4000/';
fakeHosts['ios'] = 'http://localhost:4000/';

// TODO: 날려야 함
const fakeRequester = axios.create({
  baseURL: fakeHosts[Platform.OS],
});

// TODO: check
// 어떻게 쓰는 건진 다들 이해하신 것 같으니 여기에 각자 api 추가해 주시기 바랍니다

// 이건 날릴 파일이고 wrapper입니다
// 더럽게 짜도 됩니다 알아서 구현하세요, 리뷰도 안합니다 여긴
// 파일이 너무 길어진다 싶어도 나중을 위해 그냥 진행해 주세요
// 근데 lint가 자꾸 화내서 any는 다 갖다 붙여 뒀습니다, 어차피 버릴 거 그냥 any 썼어요
// 혹시 불편하시다면 불편하신 분이 이슈 파고 수정해주시는 걸로?
// 그래도 서로를 위해 case마다 앞에 주석 달아서 무슨 api인지 써 주시면 감사
//    Ex) GET user/me/
const fakeRequesterWrapper = {
  get: (uri: string): any => {
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
  post: (uri: string, body: any): any => {
    switch (uri) {
      // POST article
      case 'post':
        return fakeRequester.post('article', body);
      default:
        throw new Error('Code is wrong');
    }
  },
  put: (uri: string, body: any): any => {
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
  delete: (uri: string, body: any): any => {
    switch (uri) {
      default:
        throw new Error('Code is wrong');
    }
  },
};

export default fakeRequesterWrapper;
