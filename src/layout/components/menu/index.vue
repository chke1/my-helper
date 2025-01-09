<template>
  <div class="c-menu">
    <div class="logo">
      <div class="logo-icon">{{ !globalStore.isMenuExpand ? '' : 'logo' }}</div>
    </div>

    <div :class="['autocomplete', !globalStore.isMenuExpand && 'autocomplete-collapse']">
      <el-icon v-if="!globalStore.isMenuExpand"><Search /></el-icon>
      <el-autocomplete
        v-else
        v-model="menuSearchValue"
        placeholder="搜索"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
        <template #default="{ item }">
          <div v-html="item.rich"></div>
        </template>
      </el-autocomplete>
    </div>

    <el-scrollbar ref="scrollbarRef" class="scrollbar-warp">
      <div id="menuId" v-if="sideData.length">
        <el-menu
          ref="menuRef"
          router
          :default-active="menuActive"
          :default-openeds="globalStore.menuExpandData"
          :collapse="isCollapse"
        >
          <menu-item :menus="sideData"></menu-item>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup name="c-menu">
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { Search } from '@element-plus/icons-vue';

import menuItem from './menu-item.vue';

import { useRouterStore } from '@/pinia/modules/router';
const routerStore = useRouterStore();

import { useGlobalStore } from '@/pinia/modules/global';
const globalStore = useGlobalStore();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// ref
const menuRef = ref();
const scrollbarRef = ref();

// 搜索值
const menuSearchValue = ref('');

// 侧边栏数据
const sideData = computed(() => routerStore.menuList);

// 激活状态
const menuActive = computed(() => {
  if (route.meta.menu == false) {
    let lastIdx = route.meta.currentCrumb.findLastIndex((v) => v.menu !== false);
    return route.meta.currentCrumb[lastIdx].path;
  } else {
    return route.path;
  }
});

// 是否折叠
const isCollapse = computed(() => !globalStore.isMenuExpand);

// 关键字查找
const querySearch = (value, callback) => {
  if (!value) return callback([]);
  let results = [];
  let queryFn = (data) => {
    for (const item of data) {
      queryFn(item.children || []);
      if (item.meta.title.indexOf(value) != -1) {
        let exp = `<span class='is-primary-text'>${value}</span>`;
        let text = item.meta.title.replace(new RegExp(value, 'g'), exp);
        results.push({ value: item.meta.title, rich: text, path: item.path });
      }
    }
  };
  queryFn(routerStore.menuList);
  callback(results);
};

// 关键字选择
const handleSelect = (item) => {
  router.push({ path: item.path });
};

// 展开，折叠
watch(
  () => globalStore.menuExpandData,
  (newValue, oldValue) => {
    if (oldValue.length > 0) {
      let isActive = newValue.length > oldValue.length;
      for (let item of isActive ? newValue : oldValue) {
        if (!(isActive ? oldValue : newValue).includes(item)) {
          nextTick(() => {
            isActive ? menuRef.value.open(item) : menuRef.value.close(item);
          });
        }
      }
    }
  },
);

onMounted(() => {
  nextTick(() => {
    const activeEl = document.querySelector('.el-menu-item.is-active');
    const menuEl = document.getElementById('menuId');
    const { top: menuTop } = menuEl?.getBoundingClientRect() || {};
    const { top: activeTop } = activeEl?.getBoundingClientRect() || {};
    // const clientHeight = menuEl.clientHeight;
    const top = activeTop - menuTop;
    // const top = activeTop - menuTop - clientHeight / 4;
    // menuEl.scrollTo({ top: top, behavior: 'smooth' });
    scrollbarRef.value.setScrollTop(top);
  });
});
</script>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse),
.autocomplete:not(.autocomplete-collapse) {
  width: 220px;
}

.el-menu {
  min-height: 100%;
  border-right: none;

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 44px;
  }

  & > :deep(.el-sub-menu > .el-sub-menu__title),
  & > :deep(.el-menu-item) {
    font-weight: 600;
  }

  :deep(.el-menu-item):hover,
  :deep(.el-menu-item.is-active) {
    &::before {
      content: '';
      position: absolute;
      top: 2px;
      bottom: 2px;
      left: 10px;
      right: 10px;
      border-radius: 6px;
      background-color: rgb(64, 158, 255, 0.12);
    }
  }

  :deep(.el-menu-item),
  :deep(.el-menu-item.is-active) {
    position: relative;

    &:hover {
      background-color: transparent !important;
    }
  }

  :deep(.el-menu-item.is-active) {
    font-weight: 600;
  }
}

.c-menu {
  max-width: 220px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--el-bg-color);
}

.autocomplete,
.logo {
  height: 54px;
  width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--el-bg-color);
  border-right: solid 1px var(--el-menu-border-color);
  box-sizing: border-box;
  transition: width 0.3s ease-in;
  padding: 0 12px;
  flex-shrink: 0;

  :deep(.el-autocomplete) {
    width: 100%;
  }
}
.logo {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
}

.logo-icon {
  display: block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  background-color: var(--el-fill-color);
  border-radius: 6px;
  color: var(--el-text-color-secondary);
}

.scrollbar-warp {
  // overflow-y: auto;
  flex: 1;
  border-right: solid 1px var(--el-menu-border-color);
}
</style>
