<template>
  <c-card isNone>
    <div class="main-box">
      <div class="main-box__left">
        <div class="workbench">
          <div class="top-header">
            <div class="is-title">工作台</div>
            <div class="workbench-date">{{ curDate }}</div>
          </div>
          <el-row :gutter="24" align="middle" justify="center" class="workbench-body">
            <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
              <show-card
                size="huge"
                sub-title="今天天气很好"
                :title="`${goodTimeText()}，${userStore?.userInfo?.username}，即将开始新的一天~`"
                :cover="userStore?.userInfo?.avatarUrl"
                :options="{ coverRadius: '50%', bgColor: 'none' }"
              ></show-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="workbench-body__item">
              <el-space :size="40">
                <el-statistic :value="5">
                  <template #title>
                    <div style="display: inline-flex; align-items: center; font-size: 14px">
                      <el-icon style="margin-right: 4px" :size="16">
                        <Clock />
                      </el-icon>
                      待办
                    </div>
                  </template>
                  <template #suffix>
                    <span style="font-size: 14px"> / 10</span>
                  </template>
                </el-statistic>
                <el-divider style="height: 36px" direction="vertical" border-style="dashed" />
                <el-statistic :value="999">
                  <template #title>
                    <div style="display: inline-flex; align-items: center; font-size: 14px">
                      <el-icon style="margin-right: 4px; vertical-align: -0.125em" :size="16">
                        <ChatLineRound />
                      </el-icon>
                      反馈数
                    </div>
                  </template>
                </el-statistic>
              </el-space>
            </el-col>
          </el-row>
        </div>
        <div class="echart-line">
          <div class="top-header"><div class="is-title">数据统计</div></div>
          <div class="padding-box">
            <echart-line></echart-line>
          </div>
        </div>
      </div>
      <div class="quick">
        <div class="top-header"><div class="is-title">快捷操作</div></div>
        <div class="quick-reply">
          <RouterLink
            class="quick-reply-item"
            v-for="item in routerStore.menuList"
            :key="item"
            :to="item.path"
          >
            <el-icon class="is-quick-icon" v-if="item.meta.icon" :size="16">
              <component :is="iconsMap[item.name]"></component>
            </el-icon>
            <span>{{ item?.meta?.title }}</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="bottom-box">
      <div class="table">
        <div class="top-header"><div class="is-title">代办任务</div></div>
        <c-table row-key="id" :loading="loading" :data="tableData" height="100%">
          <template #table>
            <el-table-column prop="id" label="时间">
              <template #default>12:25:30</template>
            </el-table-column>
            <el-table-column prop="id" label="任务名称">
              <template #default="{ $index }">{{ `任务${$index}` }}</template>
            </el-table-column>
            <el-table-column prop="id" label="内容">
              <template #default="{ $index }">{{ `内容${$index}` }}</template>
            </el-table-column>
            <el-table-column prop="id" label="进度">
              <template #default="{ $index }">{{ `进度${$index}` }}</template>
            </el-table-column>
          </template>
        </c-table>
      </div>
      <div class="echart-pie">
        <div class="top-header"><div class="is-title">内容占比</div></div>
        <div class="padding-box"><echart-pie></echart-pie></div>
      </div>
      <div class="echart-pie">
        <div class="top-header"><div class="is-title">数据占比</div></div>
        <div class="padding-box"><echart-bar></echart-bar></div>
      </div>
      <div class="notice">
        <div class="top-header"><div class="is-title">最近公告</div></div>
        <div class="notice-box">
          <div class="notice-item" v-for="item in 30" :key="item">
            <el-tag effect="dark" type="warning" size="small">公告</el-tag>
            内容通知最新公告最新公告最新公告最新公告最新公告最新公告最新公告最新公告
          </div>
        </div>
      </div>
    </div>
  </c-card>
</template>

<script setup>
// @vueuse/core
import { useNow, useDateFormat } from '@vueuse/core';
import { Clock, ChatLineRound } from '@element-plus/icons-vue';

// components
import echartLine from '@/components/echarts-demo/echart-line.vue';
import echartPie from '@/components/echarts-demo/echart-pie.vue';
import echartBar from '@/components/echarts-demo/echart-bar.vue';
import showCard from '@/components/show-card/index.vue';

// hooks
import { useTable } from '@/hooks/useTable/index.js';

// pinia
import { useUserStore } from '@/pinia/modules/user.js';
const userStore = useUserStore();

import { useRouterStore } from '@/pinia/modules/router.js';
const routerStore = useRouterStore();

// utils
import { getApi } from '@/utils/tools';
import iconsMap from '@/utils/menu-icons.js';

const curDate = useDateFormat(useNow(), 'YYYY[年]MM[月]DD[日] HH:mm:ss dddd');

// 表格相关
const { loading, tableData } = useTable({
  api: getApi,
  params: {},
  options: {},
  callBack: () => {},
});

const goodTimeText = () => {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好';
};
</script>

<style lang="scss" scoped>
.top-header {
  padding: 12px 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  flex-shrink: 0;
}

.padding-box {
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
}

.main-box {
  display: flex;
  margin-bottom: 16px;

  &__left {
    flex: 1;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
  }
}

.bottom-box {
  width: 100%;
  margin-right: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  flex-shrink: 0;

  .echart-pie,
  .table,
  .notice {
    display: flex;
    flex-direction: column;
    aspect-ratio: 1/1;
    @include card-box;
  }

  .table :deep(.c-table) {
    flex: 1;
    overflow: hidden;
    padding: 14px;
    box-sizing: border-box;
  }
}

.echart-line {
  flex: 1;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  @include card-box;
}

.workbench {
  @include card-box;
  margin-bottom: 16px;

  &-date {
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  &-body {
    padding: 16px 20px;

    &__item {
      text-align: right;
    }
  }
}

.quick {
  @include card-box;
  width: 300px;
  margin-left: 8px;

  &-reply {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    padding: 6px 0;
    box-sizing: border-box;
    overflow: auto;
    justify-items: center;
    align-items: center;
  }

  &-reply-item {
    height: 90px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    overflow: hidden;

    .is-quick-icon {
      color: var(--el-text-color-primary);
      width: 18px;
      height: 18px;
      padding: 16px;
      border-radius: 12px;
      background-color: var(--el-fill-color-darker);
      transition: all 0.3s;
      &:hover {
        transform: scale(1.2);
      }
    }

    & > span {
      font-size: 12px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      margin-top: 8px;
    }
  }
}

.notice {
  &-box {
    flex: 1;
    overflow: auto;
  }

  &-item {
    padding: 2px 24px;
    box-sizing: border-box;
    line-height: 32px;
    color: var(--el-text-color-regular);
    @include useTextEllipsis;

    &:nth-child(1) {
      margin-top: 10px;
    }
  }
}
</style>
