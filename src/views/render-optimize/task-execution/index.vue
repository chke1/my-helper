<template>
  <c-card class="task-execution">
    <div class="handle-button">
      <el-button plain @click="handleExecute" :disabled="executeDisabled">
        执行大量任务 <span v-if="executeTime">({{ executeTime }}ms)</span>
      </el-button>
      <el-button plain :disabled="executeShardingDisabled" @click="handleExecuteSharding">
        分片执行 <span v-if="executeShardingTime">({{ executeShardingTime }}ms)</span>
      </el-button>
      <el-button plain :disabled="worderDisabled" @click="handleWorker">
        worker线程执行 <span v-if="executeWorder">({{ executeWorder }}ms)</span>
      </el-button>
    </div>

    <div class="content">
      <div class="content-anima"></div>
    </div>
  </c-card>
</template>

<script setup name="task-execution">
import { ref } from 'vue';

const unit = 10_000; // 一万个任务

const FREE_TIME = 1; // 每个任务预留执行时间1ms

var recordNum = 0; // 记录num

// 单个任务需要处理如下
const onOneUnit = () => {
  for (let i = 0; i <= 80_000; i++) {
    recordNum++;
  }
};

// 正常执行
const executeTime = ref(0);
const executeDisabled = ref(false);
const handleExecute = () => {
  executeDisabled.value = true;
  executeTime.value = '';
  recordNum = 0;

  let start = Date.now();
  for (let index = 0; index < unit; index++) {
    onOneUnit();
  }

  executeTime.value = Date.now() - start;
  executeDisabled.value = false;
  console.log(recordNum, 'recordNum');
};

// 分片执行
const executeShardingTime = ref(0);
const executeShardingDisabled = ref(false);
const handleExecuteSharding = () => {
  executeShardingDisabled.value = true;
  executeShardingTime.value = 0;
  let num = 0;
  recordNum = 0;
  function run(deadline) {
    let start = Date.now();
    // 当任务还没有被处理完 & 一帧还有的空闲时间 > 1ms
    while (num < unit && deadline.timeRemaining() > FREE_TIME) {
      onOneUnit();
      num++;
    }
    executeShardingTime.value += Date.now() - start;
    // 任务干完
    if (num >= unit) {
      console.log(num, unit, 'num >= unit');
      console.log(recordNum, 'recordNum');
      executeShardingDisabled.value = false;
      return;
    }
    // 任务没完成, 继续等空闲执行
    requestIdleCallback((e) => run(e));
  }
  requestIdleCallback((e) => run(e));
};

let url = new URL('./worker.js', import.meta.url).href;
const myWorker = new Worker(url);

const executeWorder = ref(0);
const worderDisabled = ref(false);

let startTime = '';

// 接收消息
myWorker.onmessage = (e) => {
  console.log(e.data, '---');
  executeWorder.value = Date.now() - startTime;
  worderDisabled.value = false;
};

// worker线程执行
const handleWorker = () => {
  startTime = Date.now();
  executeWorder.value = '';
  worderDisabled.value = true;
  myWorker.postMessage(0);
};
</script>

<style lang="scss" scoped>
.task-execution {
  .handle-button {
    margin-bottom: 20px;
  }

  .content {
    width: 400px;
    height: 300px;
    position: relative;
    border: 1px solid var(--el-border-color);

    &-anima {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgb(255, 0, 0);
      animation: task 2.4s ease-in infinite;
    }
  }
}

@keyframes task {
  0%,
  100% {
    top: 0px;
    left: 0px;
  }
  25% {
    top: 0px;
    left: 320px;
  }
  50% {
    top: 220px;
    left: 320px;
  }
  75% {
    top: 220px;
    left: 0px;
  }
}
</style>
