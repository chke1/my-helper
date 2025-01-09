import { onUnmounted } from 'vue';

export function useSuperTask(count = 2) {
  let parallelCount = count; //并发数量
  let tasks = []; // 待任务任务
  let runningCount = 0; // 正在执行的数量

  /**
   * @description: 创建任务
   * @param {*} task 任务
   * @param {*} data data可选项，用来获取执行中的任务
   * @returns
   */
  function create(task, data) {
    return new Promise((resolve, reject) => {
      tasks.push({ task, data, resolve, reject });
      _run();
    });
  }

  // 执行任务
  function _run() {
    while (runningCount < parallelCount && tasks.length > 0) {
      const { task, data, resolve, reject } = tasks.shift();
      console.log(tasks, 'tasks');
      runningCount++;
      task(data)
        .then(resolve, reject)
        .finally(() => {
          runningCount--;
          _run();
        });
    }
  }

  // 修改并发量
  function updateParallel(count) {
    if (!count) return;
    parallelCount = count;
  }

  // 卸载
  onUnmounted(() => {
    tasks = [];
    runningCount = 0;
  });

  return { create, updateParallel };
}
