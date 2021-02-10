import axios from 'axios';

// axios 객체
const requester = axios.create({
  baseURL: '',
});

export default requester;
