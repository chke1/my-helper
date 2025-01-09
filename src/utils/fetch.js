import axios from 'axios';
import { ElMessage } from 'element-plus';

const statusCode = {
  504: '',
};

const fetch = axios.create({
  baseURL: '',
  timeout: 15000,
});

// http request 拦截器
fetch.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return error;
  },
);

// http response 拦截器
fetch.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    ElMessage('请求出错了');
    return error;
  },
);

export default fetch;
