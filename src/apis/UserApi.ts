import requester from './BaseInstance';

const userApi = {
  login: () => {
    // TODO change: board/list/ 아님
    return requester.get('어디냐');
  }
}

const fakeUserApi = {
  login: () => {
    return requester.get('json-server의 어딘가로');
  }
}

// export default userApi;
export default fakeUserApi;
