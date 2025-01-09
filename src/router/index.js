import { createRouter, createWebHashHistory } from 'vue-router';
import { useRouterStore } from '@/pinia/modules/router.js';
import { useGlobalStore } from '@/pinia/modules/global.js';
import { useUserStore } from '@/pinia/modules/user.js';
import { getVersion } from '@/utils/helpers';
import { getUserAgent } from '@/utils/tools';
import Nprogress from 'nprogress';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/el-encap',
    component: () => import('../layout/index.vue'),
    meta: { title: 'home' },
    children: [],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../views/error/404.vue'),
  },
  {
    name: 'tip',
    path: '/tip',
    component: () => import('../views/error/tip.vue'),
  },
  {
    name: 'form-designer',
    path: '/form-designer',
    component: () => import('../views/form-designer/index.vue'),
  },
];

// 是否是手机端
const { mobile, ios, android, iPhone, iPad } = getUserAgent();
const isMobile = mobile || ios || android || iPhone || iPad;
console.log(isMobile, 'isMobile');

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

let num = 0; // 最大重定向次数
router.beforeEach(async (to, from, next) => {
  console.log('当前路由数据：', to);
  Nprogress.start();

  // 检测版本
  if (to.name) getVersion();

  // 记录最后所在的页面
  if (!['/', '/login', '/404', '/tip'].includes(to.path)) {
    const globalStore = useGlobalStore();
    globalStore.setSingleState('lastPagePath', to.fullPath);
  }

  // 重定向
  if (num > 5) next('/404');
  console.log(num, to.matched, to.matched.length, 'to.matched.length');
  if (to.matched.length) {
    num = 0;
    // 手机端重定向提示页
    isMobile && to.path != '/tip' ? next('/tip') : next();
  } else {
    num++;
    const routerStore = useRouterStore();
    const globalStore = useGlobalStore();
    const userStore = useUserStore();
    Promise.all([
      await routerStore.setMenuRouter(),
      await globalStore.setGlobalState(),
      await userStore.setUserState(),
    ]);
    next({ ...to, replace: true });
  }
});

router.afterEach(async () => {
  window.scrollTo(0, 0);
  Nprogress.done();
});

router.onError(() => {
  console.log('---------router onError---------');
  Nprogress.remove();
});

// 重置路由-直接覆盖
export function resetRouter() {
  for (const item of routes) {
    router.addRoute(item);
  }
}

export default router;
