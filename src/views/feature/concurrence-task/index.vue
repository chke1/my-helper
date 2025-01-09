<template>
  <c-card class="concurrence-task">
    <div class="task-wrap" v-for="(item, index) in draftTaskList" :key="item.id">
      <el-space wrap :size="12" alignment="center">
        <div class="task-wrap__name">
          <span>任务名称:</span>
          <el-input v-model="item.taskName" placeholder="请输入" />
        </div>

        <div class="task-wrap__time">
          <span>执行时间:</span>
          <el-input-number v-model="item.taskTime" controls-position="right" :min="1" />
          <span>ms</span>
        </div>

        <el-button plain @click="handleAddTask" v-if="draftTaskList.length == index + 1">
          添加
        </el-button>
      </el-space>
    </div>

    <div class="handle-wrap">
      <el-space wrap :size="12" alignment="center">
        <el-button type="primary" @click="handleCreate"> 创建任务 </el-button>
        <div class="handle-wrap__count">
          <span>并发量:</span>
          <el-input-number
            v-model="formData.parallelCount"
            controls-position="right"
            @change="onCountChange"
          />
          <span>个</span>
        </div>
      </el-space>
    </div>

    <div class="task-item" v-for="item in taskList" :key="item">
      <el-tag type="info" v-if="item.status == 0">待执行</el-tag>
      <el-tag type="success" v-if="item.status == 1">执行完成</el-tag>
      <el-button v-if="item.status == 10" type="primary" text :loading="true">执行中</el-button>
      <span>{{ item.taskName }}（{{ item.taskTime }}ms）</span>
    </div>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
// import SuperTask from '@/utils/super-task.js';
// const superTask = new SuperTask(formData.value.count);

import { useSuperTask } from '@/hooks/useSuperTask/index.js';
const superTask = useSuperTask(1);

const formData = ref({
  taskName: '',
  taskTime: 2000,
  taskCount: 2,
  parallelCount: 1,
});

const taskList = ref([]);
const draftTaskList = ref([]);

// 模拟请求
const timeoutApi = (events) => {
  return new Promise((resolve, reject) => {
    const { taskTime } = events;
    setTimeout(() => {
      resolve(events);
    }, taskTime);
  });
};

// 创建任务
const createTask = (events) => {
  superTask
    .create((res) => {
      // res 正在执行中的任务
      const index = taskList.value.findIndex((v) => v.id == res.id);
      taskList.value[index].status = 10;
      return timeoutApi(events);
    }, events)
    .then((res) => {
      // res 成功执行完成的任务
      const index = taskList.value.findIndex((v) => v.id == res.id);
      taskList.value[index].status = 1;
    });
};

// 修改并发量
const onCountChange = () => {
  superTask.updateParallel(formData.value.parallelCount);
};

// 创建操作
const handleCreate = () => {
  if (draftTaskList.value.some((v) => !v.taskTime || !v.taskName)) {
    ElMessage.warning('任务数据不完整！');
    return;
  }

  for (const item of draftTaskList.value) {
    taskList.value.push(item);
  }

  for (const item of draftTaskList.value) {
    createTask(item);
  }

  draftTaskList.value = [];
  handleAddTask();
};

// 添加任务项
let id = 0;
const handleAddTask = () => {
  id++;

  // status: 0待执行，1执行完成，10执行中
  let opt = { id, status: 0, taskName: `任务${id}`, taskTime: formData.value.taskTime };

  draftTaskList.value.push(opt);

  console.log(draftTaskList.value, 'draftTaskList.value');
};
handleAddTask();
</script>

<style lang="scss" scoped>
@mixin handle-wrap-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  &__time,
  &__name,
  &__count {
    display: flex;
    align-items: center;

    & > span {
      font-size: 14px;
      margin: 0 10px;
      flex-shrink: 0;
    }
  }
}
.concurrence-task {
  .task-wrap,
  .handle-wrap {
    @include handle-wrap-item;
  }

  .task-wrap {
    padding: 10px 10px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: var(--el-fill-color);
  }

  .handle-wrap {
    width: auto;
    border: 1px solid var(--el-border-color);
    padding: 10px 10px;
    border-radius: 4px;
    margin: 10px 0 20px;
    box-sizing: border-box;
  }
  .task-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    margin: 10px 0;

    & > span {
      margin: 0 8px;
      font-size: 14px;
    }
  }
}
</style>
