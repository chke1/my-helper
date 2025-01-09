// worker.js（worker线程）

const unit = 10_000; // 一万个任务

let num = 0;

// 单个任务需要处理如下
const onOneUnit = () => {
  for (let i = 0; i <= 80_000; i++) {
    num++;
  }
};

// 接收到消息
self.onmessage = () => {
  for (let index = 0; index < unit; index++) {
    onOneUnit();
  }
  num = 0;
  self.postMessage(0);
};
