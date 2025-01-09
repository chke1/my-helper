import { defineStore } from 'pinia';
import { getSetting } from '@/apis/setting.js';
import { setKeys } from '@/utils/tools.js';
import visitorId from '@/utils/fingerprint.js';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    userInfo: {}, // 当前用户信息
    visitorId: '', // 浏览器指纹
    authData: [], // 权限路由数据
    menuExpandData: [], // 菜单自定展开数据
    keepAliveInclude: [], // 页面缓存数据
    keepAliveIncludeMax: 10, // 页面缓存数量
    isTableBorder: 1, // 表示是否显示表格边框
    isTableStripe: 1, // 表示是否显示表格斑马纹
    isMenuExpand: 1, // 菜单是否收起
    isTabs: 1, // 是否显示标签页
    isBreadcrumb: 1, // 是否显示面包屑
    transitionSlide: 'default', // 页面切换效果
    lastPagePath: '', // 最后所在页面路径
  }),

  actions: {
    // 设置全局状态
    async setGlobalState() {
      let res = await getSetting().catch((err) => err);
      console.log(res, 'res');
      const { code, data = {} } = res;
      if (code == 0) {
        for (let key in res.data) {
          this[key] = data[key];
        }
      }

      // 生成浏览器指纹
      this.setSingleState('visitorId', await visitorId());
    },

    // 设置单个状态，并不缓存
    setSingleState(key, value) {
      if (!key) return;
      // this[key] = value || 0;
      setKeys(this, key, value);
    },
  },
});
