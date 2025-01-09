<template>
  <c-card class="visible-win-render">
    <p class="title">一共渲染{{ count }}个组件</p>
    <template v-for="item in count" :key="item">
      <div class="render-item" v-if="defer(item)">
        <span>{{ item }}</span>
      </div>
    </template>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';
import { useDefer } from '@/hooks/useDefer/index.js';

const count = ref(5000);
const defer = useDefer({ min: 20, max: count.value });
</script>

<style lang="scss" scoped>
.visible-win-render {
  .title {
    margin-bottom: 20px;
  }
  .render-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    margin: 10px 0;
    background-color: var(--el-fill-color-dark);

    & > span {
      margin: 0 8px;
      font-size: 14px;
    }
  }
}
</style>
