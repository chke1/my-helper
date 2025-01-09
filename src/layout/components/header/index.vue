<template>
  <header class="header">
    <!-- 左侧 -->
    <div class="header-left">
      <el-icon @click="handleSwitch()" class="header-left__icon">
        <component :is="globalStore.isMenuExpand ? Fold : Expand" />
      </el-icon>

      <div class="header-left__crumb" v-if="$slots.breadcrumb">
        <slot name="breadcrumb"></slot>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="header-right">
      <div class="header-right-theme">
        <theme-switch
          v-model="isDark"
          @on-change="onThemeChange"
          @on-rect="onThemeRect"
        ></theme-switch>
      </div>

      <div class="header-right-setting">
        <el-icon @click="onSettingDrawer" :size="18"><Setting /></el-icon>
      </div>

      <div class="header-right-screen">
        <el-icon @click="onFullscrenn" :size="18"><FullScreen /></el-icon>
      </div>

      <div class="header-right-userinfo">
        <c-popover trigger="hover" popper-style="min-width: auto;width: auto;padding: 0">
          <template #reference>
            <div class="header-right-userinfo__wrap">
              <img :src="userStore?.userInfo?.avatarUrl" />
              <span>{{ userStore?.userInfo?.username ?? '-' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
          </template>

          <template #default>
            <ul class="header-right-userinfo__list">
              <li @click="handleUser">
                <el-icon :size="14"><User /></el-icon>
                <span>个人中心</span>
              </li>
              <li @click="handleAddress">
                <el-icon :size="14"><Promotion /></el-icon>
                <span>项目地址</span>
              </li>
              <li @click="handleLogout">
                <el-icon :size="14"><SwitchButton /></el-icon>
                <span>退出登录</span>
              </li>
            </ul>
          </template>
        </c-popover>
      </div>
    </div>
  </header>

  <!-- 设置弹窗 -->
  <c-drawer title="设置" :size="520" name="setting-drawer">
    <auth-control></auth-control>
  </c-drawer>
</template>

<script setup>
import { ref } from 'vue';

// components
import {
  Expand,
  Fold,
  Setting,
  User,
  Promotion,
  ArrowDown,
  SwitchButton,
  FullScreen,
} from '@element-plus/icons-vue';
import AuthControl from '@/components/auth-control/index.vue';
import ThemeSwitch from '@/components/css-demo/theme-switch.vue';

// global
import { useGlobalStore } from '@/pinia/modules/global';
const globalStore = useGlobalStore();

// useEventListener
import { useEventListener } from '@/hooks/useEventListener/index.js';

// user
import { useUserStore } from '@/pinia/modules/user.js';
const userStore = useUserStore();

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

// router
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

import { resetRouter } from '@/router/index.js';

// variable
import { USER_INFO, THEME_COLOR_NAME } from '@/config/storage-variable.js';

// vueuse
import { useDark, useToggle } from '@vueuse/core';

const isFullScreen = ref(false);

const isDark = useDark({
  storageKey: THEME_COLOR_NAME,
  valueDark: 'dark',
  valueLight: 'light',
});

// 监听全屏
useEventListener(document, 'fullscreenchange', () => {
  isFullScreen.value = !isFullScreen.value;
});

// 折叠/展开操作
const handleSwitch = () => {
  let status = globalStore.isMenuExpand == 0 ? 1 : 0;
  globalStore.setSingleState('isMenuExpand', status);
};

// 打开设置抽屉
const onSettingDrawer = () => {
  modalStore.openModal('setting-drawer');
};

// 切换主题
const onThemeChange = useToggle(isDark);

const onThemeRect = (e) => {
  const { x, y } = e;
  document.documentElement.style.setProperty('--dark-clip-x', x + 'px');
  document.documentElement.style.setProperty('--dark-clip-y', y + 'px');
  console.log(document.startViewTransition, 'document.startViewTransition');
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark');
    });
  } else {
    document.documentElement.classList.toggle('dark');
  }
};

// 开启全屏
const onFullscrenn = () => {
  if (!isFullScreen.value) {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullScreen) {
      document.body.webkitRequestFullScreen();
    } else if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    } else if (document.body.msRequestFullscreen) {
      // IE11
      document.body.msRequestFullscreen();
    }
  } else {
    console.log(document.exitFullscreen, 'document.exitFullscreen');
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
};

// 个人中心
const handleUser = () => {
  router.push('/system/user');
};

// 项目地址
const handleAddress = () => {
  window.open('https://gitee.com/ch-ke/my-helper', '_blank');
};

// 退出登录
const handleLogout = () => {
  localStorage.removeItem(USER_INFO);
  resetRouter();
  router.push('/');
};
</script>

<style lang="scss" scoped>
.header {
  height: 54px;
  line-height: 54px;
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  flex-shrink: 0;
  background-color: var(--el-bg-color);
}

.header-left {
  display: flex;
  align-items: center;

  &__icon {
    margin-right: 16px;
    font-size: 16px;
    cursor: pointer;
    padding: 6px;
    background: var(--el-fill-color-light);
    border-radius: 4px;
    color: var(--el-text-color-primary);
    transition: background 0.3s;

    &:hover {
      background: var(--el-fill-color-dark);
    }
  }

  &__back {
    display: flex;
    margin: 0 6px;

    :deep(.el-button) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  &__crumb {
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: block;
      height: 14px;
      width: 1px;
      background-color: var(--el-border-color);
      margin-right: 16px;
    }
  }
}

.header-right {
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 16px;

  &-theme {
    margin: 0 10px;
  }

  &-setting {
    cursor: pointer;
    display: flex;
    margin: 0 10px;
  }

  &-screen {
    cursor: pointer;
    display: flex;
    margin: 0 10px;
  }

  &-userinfo {
    display: flex;
    align-items: center;
    font-size: 14px;

    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 14px;
      margin: 0 20px;
      background-color: #e5e5e5;
    }

    &__wrap {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 34px;

      & > img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        flex-shrink: 0;
        box-sizing: border-box;
        border: 1px solid var(--el-bg-color-light);
      }

      & > span {
        display: block;
        max-width: 120px;
        margin: 0 8px;
        @include useTextEllipsis();
      }
    }

    &__list {
      padding: 4px 0;
      margin: 0;

      & > li {
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0 20px 0 18px;

        &:hover {
          background-color: var(--el-color-primary-light-9);
        }

        &:last-child {
          border-top: 1px solid #eee;
        }

        & > span {
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
