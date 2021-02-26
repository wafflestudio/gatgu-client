import axios from 'axios';

const requester = axios.create({
  baseURL: 'http://localhost:8000/v1/',
});

requester.defaults.xsrfCookieName = 'csrftoken';
requester.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

// set user auth token
export const setToken = (token: string): void => {
  requester.defaults.headers['Authorization'] = `${token}`;
};

// remove user auth token
export const removeToken = (): void => {
  requester.defaults.headers['Authorization'] = undefined;
};

export default requester;
