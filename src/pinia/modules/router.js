import { defineStore } from 'pinia';
import { routes } from '@/router/routes';
import router from '@/router';
import { ref } from 'vue';
import { getRoutes } from '@/apis/setting.js';
import { ElLoading } from 'element-plus';

const modules = import.meta.glob('../../views/**/*.vue');

export const useRouterStore = defineStore('router', () => {
  const routerList = ref([]); // 路由数据
  const menuList = ref([]); // 菜单数据

  // 设置路由
  const setRouter = (routesRes) => {
    routerList.value = [];

    const formatRouter = (routeData, routeItem) => {
      routeData.forEach(async (item) => {
        // 路由name
        let name = item.name || item.path.split('/').filter((v) => v);

        // 当前页面层级
        let currentCrumb = (routeItem?.meta?.currentCrumb || []).concat([
          { ...item.meta, path: item.path },
        ]);

        let obj = {
          name: name.join('.'),
          meta: { ...item.meta, currentCrumb },
          path: item.path,
          component: modules[`../../${item.component}`],
        };

        // 父级页面重定向
        if (item.redirect) {
          obj['redirect'] = `${item.redirect}`;
        } else {
          if (item.children && item.children.length > 0) {
            let _redirect = item.children.find((v) => v.meta.menu != false);

            if (_redirect) obj['redirect'] = _redirect.path;
          }
        }

        routerList.value.push({ ...obj });

        if (item.children) formatRouter(item.children, obj);
      });
    };

    formatRouter(JSON.parse(JSON.stringify(routesRes)));

    // 添加路由
    for (let item of routerList.value) {
      router.addRoute('home', item);
    }
  };

  // 设置菜单
  const setMenu = (routesRes) => {
    menuList.value = [];

    const formatMenu = (menuData) => {
      return menuData
        .filter((v) => v.meta.menu !== false)
        .map((item) => {
          let name = item.name || item.path.split('/').filter((v) => v);
          let obj = {
            meta: item.meta,
            path: `${item.path}`,
            name: name.join('.'),
          };

          if (item.children) obj['children'] = formatMenu(item.children);

          return obj;
        });
    };

    menuList.value = formatMenu(JSON.parse(JSON.stringify(routesRes)));
  };

  const setMenuRouter = async () => {
    const loadingInstance = ElLoading.service({ fullscreen: true });

    // 模仿接口返回路由
    let res = await getRoutes();

    const { code, data } = res;

    setRouter(code == 0 ? data : routes);
    setMenu(code == 0 ? data : routes);

    loadingInstance.close();

    // console.log(routerList.value, 'routerList.value');
    // console.log(menuList.value, 'menuList.value');
  };

  return { setMenuRouter, routerList, menuList };
});
