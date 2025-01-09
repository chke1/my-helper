<template>
  <c-card isNone isAffix>
    <div class="user-info">
      <img :src="userStore?.userInfo?.avatarUrl" alt="" />
      <ul class="user-info-list">
        <li><span>用户名：</span>{{ userStore?.userInfo?.username }}</li>
        <li><span>账号ID：</span>{{ userStore?.userInfo?.accountId }}</li>
        <li><span>注册时间：</span>{{ dayjs().format('YYYY-MM-DD HH:mm:ss') }}</li>
      </ul>
      <ul class="user-info-list">
        <li><span>手机号：</span>{{ hidePhone(17666660000) }}</li>
        <li><span>登录密码：</span>******</li>
      </ul>
    </div>
    <div class="user-details">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="basics">基础信息</el-tab-pane>
        <el-tab-pane label="安全设置" name="second">安全设置</el-tab-pane>
        <el-tab-pane label="权限分配" name="third">权限分配</el-tab-pane>
      </el-tabs>
    </div>
  </c-card>
</template>

<script setup name="system.user">
import { ref } from 'vue';
import dayjs from 'dayjs';
import { hidePhone } from '@/utils/tools.js';

// user
import { useUserStore } from '@/pinia/modules/user.js';
const userStore = useUserStore();

const activeName = ref('basics');
</script>

<style lang="scss" scoped>
.user-info {
  @include card-box;
  padding: 16px 30px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 80px;
  margin-bottom: 16px;

  & > img {
    width: 80px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    flex-shrink: 0;
    box-sizing: border-box;
    border: 1px solid var(--el-border-color);
  }

  &-list {
    list-style-type: none;
    font-size: 14px;
    min-width: 260px;
    margin-right: 10px;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: space-around;

    & > li {
      width: 100%;
      display: flex;

      & > span {
        width: 80px;
        text-align: right;
        margin-right: 6px;
      }
    }
  }
}

.user-details {
  height: 100%;
  padding: 16px 30px;
  @include card-box;
}
</style>
