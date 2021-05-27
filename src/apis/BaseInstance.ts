import axios from 'axios';

const requester = axios.create({
  baseURL: 'http://api.gatgu.site/v1/',
});

// set user auth token
export const setRequesterToken = (token: string): void => {
  requester.defaults.headers['Authorization'] = `token ${token}`;
};

// remove user auth token
export const removeRequesterToken = (): void => {
  requester.defaults.headers['Authorization'] = undefined;
};

export default requester;
