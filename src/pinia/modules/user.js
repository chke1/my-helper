import { defineStore } from 'pinia';
import { getUserInfo } from '@/apis/setting.js';
const defaultAvatarUrl = import.meta.env.BASE_URL + 'account-list/ic-account-avatar-default.jpg';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      accountId: '',
      username: '',
      password: '',
      avatarUrl: '' || defaultAvatarUrl,
    },
  }),

  actions: {
    // 设置用户信息
    async setUserState() {
      let userRes = await getUserInfo().catch((err) => err);
      // console.log(userRes, 'userRes');
      if (userRes.code == 0) {
        for (let key in userRes.data) {
          this.userInfo[key] = userRes.data[key];
        }
      }
    },
  },
});
