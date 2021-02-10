import requester from './BaseInstance';

export const user = {
  getInfo: () => {
    console.log('not implemented');
  },
  logout: () => {
    console.log('not implemented');
  },
  login: (id: string, pw: string) => {
    return requester.put('user/login/');
  },
  // TODO: add more functions about user
};
