/**
 * 模拟请求
 */
import { USER_AUTH_SETTING_INFO, USER_INFO, THEME_COLOR_NAME } from '@/config/storage-variable.js';
import { getApi } from '@/utils/tools.js';
import { routes } from '@/router/routes';

const getMenuAutoExpand = () => {
  let menuAutoExpand = [];
  let getExpandFn = (data) => {
    for (let item of data) {
      if (item.meta.autoExpand) menuAutoExpand.push(item.path);
      if (item.children) getExpandFn(item.children);
    }
  };
  getExpandFn(routes);
  return menuAutoExpand;
};

// 获取权限
export const getSetting = async () => {
  await getApi();
  let info = localStorage.getItem(USER_AUTH_SETTING_INFO);
  let res = {
    data: info ? JSON.parse(info) : {},
    code: 0,
  };

  if (!res.data?.menuExpandData) {
    res.data.menuExpandData = getMenuAutoExpand();
  }

  return res;
};

// 设置权限
export const setSetting = async (key, value) => {
  if (!key) return;

  let info = localStorage.getItem(USER_AUTH_SETTING_INFO);

  let data = JSON.parse(info) || {};

  data[key] = value;

  localStorage.setItem(USER_AUTH_SETTING_INFO, JSON.stringify(data));
  let res = { data: {}, code: 0 };
  return res;
};

// 获取路由
export const getRoutes = async () => {
  await getApi();
  let info = localStorage.getItem(USER_AUTH_SETTING_INFO);
  let authData = JSON.parse(info)?.authData || [];
  let menuExpandData = JSON.parse(info)?.menuExpandData;

  let iteraFn = (data) => {
    return data
      .map((item) => {
        // 菜单自动展开
        if (menuExpandData) item.meta.autoExpand = menuExpandData.includes(item.path);

        // 筛选需要返回的路由
        let index = authData.findIndex((path) => path == item.path);

        if (item.children) item.children = iteraFn(item.children);

        if (index == -1) {
          return item.children && item.children.length > 0 ? item : '';
        } else {
          return item;
        }
      })
      .filter((v) => v != '');
  };

  let routesData = iteraFn(JSON.parse(JSON.stringify(routes)));

  return {
    code: routesData && routesData.length ? 0 : 500,
    data: routesData,
  };
};

// 登录
export const login = async (param) => {
  await getApi();
  localStorage.setItem(USER_INFO, JSON.stringify(param));
  let res = {
    data: param,
    code: 0,
  };
  return res;
};

// 获取用户信息
export const getUserInfo = async () => {
  await getApi();
  let info = localStorage.getItem(USER_INFO);
  let res = {
    data: info ? JSON.parse(info) : {},
    code: info ? 0 : 500,
  };
  return res;
};
