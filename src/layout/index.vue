<template>
  <div class="layout">
    <ivue-menu></ivue-menu>
    <div class="article">
      <ivue-header>
        <template #breadcrumb v-if="isBreadcrumb">
          <ivue-breadcrumb></ivue-breadcrumb>
        </template>
      </ivue-header>
      <div class="article-tabs" v-if="isTabs">
        <el-button
          v-if="route.meta.menu == false"
          class="article-tabs__back"
          type="primary"
          text
          :icon="ArrowLeft"
          @click="handleBack"
        >
          返回
        </el-button>
        <ivue-tabs></ivue-tabs>
      </div>

      <section class="article-view" ref="routerViewRef">
        <router-view v-slot="{ Component }">
          <transition :name="`slide-${globalStore.transitionSlide}`" mode="out-in">
            <keep-alive :include="includeList" :max="includeMax">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <ivue-footer></ivue-footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import ivueMenu from './components/menu/index.vue';
import ivueHeader from './components/header/index.vue';
import ivueFooter from './components/footer/index.vue';
import ivueTabs from './components/tabs/index.vue';
import ivueBreadcrumb from './components/breadcrumb/index.vue';

import { useGlobalStore } from '@/pinia/modules/global';
const globalStore = useGlobalStore();

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

/**
 * 使用keep-alive缓存需要满足
 * 1、页面或组件名字和路由name相同
 * 2、routes.js路由meta.keepAlive设置为true
 */
const includeList = computed(() => {
  let include = globalStore.keepAliveInclude.filter((v) => v.keepAlive).map((v) => v.name);
  return include || [];
});

// 缓存最大数量
const includeMax = computed(() => globalStore.keepAliveIncludeMax || 0);

// 是否显示tabs
const isTabs = computed(() => !!globalStore.isTabs);

// 是否显示breadcrumb
const isBreadcrumb = computed(() => !!globalStore.isBreadcrumb);

// 切换页面重置滚动条位置
const routerViewRef = ref();

// 返回
const handleBack = () => {
  router.back();
};

// 创建或更新tabs
const updateTabs = (to) => {
  let data = globalStore.keepAliveInclude;
  let index = data.findIndex((v) => v.path == to.path);
  let obj = {
    label: to.meta?.title,
    path: to.path,
    fullPath: to.fullPath,
    name: to.name,
    keepAlive: !!to.meta?.keepAlive,
  };
  index == -1 ? data.push(obj) : (data[index] = obj);
  globalStore.setSingleState('keepAliveInclude', data);
};
updateTabs(route);

// 监听路由创建或更新tabs
router.afterEach((to) => {
  routerViewRef.value && routerViewRef.value.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  if (to.path != '/login' && to.path != '/') updateTabs(to);
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  min-width: 900px;
}

.article {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  overflow: hidden;

  &-tabs {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 6px 12px 6px;
    box-sizing: border-box;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color);

    &__back {
      margin-right: 10px;
      padding: 0 10px 0 10px;
    }
  }

  &-view {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
  }
}

.slide-default-enter-active,
.slide-default-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.2s ease;
}

.slide-default-enter-from {
  opacity: 0;
}
.slide-default-leave-to {
  opacity: 0;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-12px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
