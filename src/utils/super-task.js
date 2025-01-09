class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; //并发数量
    this.tasks = [];
    this.runningCount = 0; // 正在执行的数量
  }

  /**
   * @description: 创建任务
   * @param {*} task 任务
   * @param {*} data data可选项，用来获取执行中的任务
   * @returns
   */
  create(task, data) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, data, resolve, reject });
      this._run();
    });
  }

  // 执行任务
  _run() {
    while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
      const { task, data, resolve, reject } = this.tasks.shift();
      this.runningCount++;
      task(data)
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });
    }
  }

  // 修改并发量
  updateParallel(parallelCount) {
    if (!parallelCount) return;
    this.parallelCount = parallelCount;
  }
}

export default SuperTask;
