<template>
  <c-card class="warp">
    <p class="warp-title">Worker</p>
    <div class="warp-worker">
      <el-input v-model="msgValue" placeholder="请输入"></el-input>
      <el-button @click="onSendMessage">发送消息</el-button>
      <div>{{ receiveValue }}</div>
    </div>

    <p class="warp-title">SharedWorker</p>
    <div class="warp-shared-worker"></div>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';

const msgValue = ref('');
const receiveValue = ref('');

let url = new URL('./worker.js', import.meta.url).href;
const myWorker = new Worker(url);

// 接收消息
myWorker.onmessage = (e) => {
  console.log(e.data);
  receiveValue.value = e.data;
};

// 发送消息
const onSendMessage = () => {
  myWorker.postMessage(msgValue.value);
};
</script>

<style lang="scss" scoped>
.warp {
  &-title {
    font-size: 16px;
  }

  &-worker {
    display: flex;
    align-items: center;

    :deep(.el-input) {
      width: 220px;
    }

    :deep(.el-button) {
      margin: 0 16px;
    }
  }

  &-shared-worker {
  }
}
</style>
