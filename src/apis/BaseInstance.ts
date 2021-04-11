import axios from 'axios';

const requester = axios.create({
  baseURL: 'http://api.gatgu.site/v1/',
  // baseURL: 'http://localhost:4000/',
});

// set user auth token
export const setToken = (token: string): void => {
  requester.defaults.headers['Authorization'] = `${token}`;
};

// remove user auth token
export const removeToken = (): void => {
  requester.defaults.headers['Authorization'] = undefined;
};

export default requester;
