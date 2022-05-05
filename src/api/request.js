import axios from 'axios';
// 引入加载进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

request.interceptors.request.use(
  config => {
    nprogress.start();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  config => {
    nprogress.done();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default request;
