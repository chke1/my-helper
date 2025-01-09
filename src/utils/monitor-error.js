import dayjs from 'dayjs';
import { db } from '@/utils/db.js';

// 错误
const monitor = { errors: [] };

// 错误代码
const errCodeMap = {
  E1001: '系统未知错误',
  E1002: 'vue逻辑错误',
  E1003: 'JavaScript错误',
  E1004: '静态资源加载错误',
  E1005: '请求错误',
  E1006: 'Promise错误',
};

/**
 * 开启监听
 * @param {any} app
 */
export const errorLog = (app) => {
  /**
   * vue渲染或者vue处理错误
   * @param {object} error Error对象
   * @param {object} vm Vue 应用本身
   * @param {string} info Vue 特有的字符串
   */
  app.config.errorHandler = (error, vm, info) => {
    console.error('监测到E1002错误');
    console.error(error, vm, info);
    errorHandler('E1002', `${error.name}: ${error.message} ->> ${info}`, vm._.type.name);
  };

  /**
   * 静态资源加载错误 或者 JS错误(不会捕获promise)
   * @param {string} message 错误信息
   * @param {string} source 发生错误的脚本URL
   * @param {number} lineno 发生错误的行号
   * @param {number} colon 发生错误的列号
   * @param {object} error Error对象
   */
  window.addEventListener(
    'error',
    (error) => {
      // 区分是否是js错误
      if (error.message) {
        console.error('监测到E1003错误');
        console.error(error.message);
        errorHandler('E1003', error.message, error.filename);
      } else {
        console.error('监测到E1004错误');
        console.error(error);
        errorHandler('E1004', error.target.currentSrc, error.filename);
      }
    },
    true,
  );

  /**
   * 监听 promise 错误 缺点是获取不到行数数据
   *
   */
  window.addEventListener(
    'unhandledrejection',
    (error) => {
      console.error('监测到E1006错误');
      console.error(error);
      errorHandler('E1006', error.message, error.filename);
    },
    true,
  );
};

/**
 * 错误处理函数
 * @param {string} code 错误码
 * @param {string} msg 错误信息 - 请求错误：error错误信息 + url请求地址 + param参数
 * @param {string} file 文件
 */
export const errorHandler = async (code, msg, file = 'null') => {
  let item = {
    code: code,
    msg: msg,
    router: window.location.href,
    file: file,
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  monitor.errors.push(item);
  db.table('error').add(item);
};

/**
 * 获取数据
 */
export const getErrors = async (params) => {
  console.log(params, 'params-----------1');
  let filterFn = (v, event) => {
    const { keyword = '', code = '' } = event;

    if (!keyword) return true;

    let keys = ['code', 'msg', 'router'];
    for (let item of keys) {
      if ((v[item] || '').indexOf(keyword) !== -1) return true;
    }
    return false;
  };

  // console.log(keyword.indexOf('12'), '=====');

  let error = await db.table('error').toArray();

  let data = error.filter((v) => {
    let status = filterFn(v, params);
    console.log(status, 'status');
    return status;
  });

  // error = error.filter((v) => (v.msg || '').indexOf(keyword) !== -1);

  console.log(data, 'error==');

  return { code: 0, data: { data: data, page: 1, total: data.length } };
};
