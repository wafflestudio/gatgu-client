import axios from 'axios';

// axios 객체
export default axios.create({
  baseURL: 'http://localhost:3001',
  // params: {},
});
