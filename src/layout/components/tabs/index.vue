<template>
  <div class="tabs">
    <div class="tabs-left">
      <el-tabs
        v-model="tabsValue"
        type="card"
        :closable="tabsList.length > 1"
        @tab-click="onTabClick"
        @tab-remove="onTabRemove"
      >
        <el-tab-pane
          v-for="item in tabsList"
          :label="item.label"
          :key="item.fullPath"
          :name="item.fullPath"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="tabs-right" v-if="tabsList.length > 1">
      <el-button type="primary" text @click="onAllTabRemove">清空</el-button>
    </div>
  </div>
</template>

<script setup name="tabs">
import { computed, ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { useGlobalStore } from '@/pinia/modules/global';
const globalStore = useGlobalStore();

const tabsValue = ref(route.fullPath);

const tabsList = computed(() => globalStore.keepAliveInclude);

// 更新全局keepAliveInclude
const updateKeepAliveInclude = (data) => {
  globalStore.setSingleState('keepAliveInclude', data || tabsList.value);
};

// tabs点击
const onTabClick = (e) => {
  router.push(e?.paneName || tabsValue.value);
};

// tabs删除
const onTabRemove = (tabsName) => {
  if (tabsList.value.length <= 1) return;

  let tabsArr = tabsList.value.filter((v) => v.fullPath !== tabsName);

  if (tabsValue.value == tabsName) {
    let index = tabsList.value.findIndex((v) => v.fullPath == tabsName);
    tabsValue.value = tabsList.value[index - 1].fullPath;
    onTabClick();
  }

  updateKeepAliveInclude(tabsArr);
};

// 全部清除
const onAllTabRemove = () => {
  let tabsArr = tabsList.value.filter((v) => v.fullPath == tabsValue.value);

  updateKeepAliveInclude(tabsArr);
};

router.afterEach((to) => (tabsValue.value = to.fullPath));
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;

  :deep(.el-tabs),
  :deep(.el-tabs__header),
  :deep(.el-tabs__nav),
  :deep(.el-tabs__item),
  :deep(.el-tabs__nav-prev),
  :deep(.el-tabs__nav-next) {
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    border-radius: 4px;
  }

  :deep(.el-tabs__header) {
    margin-bottom: 0px;
    border-bottom: none;
  }

  :deep(.el-tabs__nav) {
    border-bottom: 1px solid var(--el-border-color-light);
  }

  :deep(.el-tabs__nav-wrap) {
    display: flex;
    align-items: center;
  }

  &-left {
    flex-shrink: 0;
    width: 92%;
  }

  &-right {
    flex-shrink: 0;
  }
}
</style>
