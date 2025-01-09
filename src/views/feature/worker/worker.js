// worker.js（worker线程）

// 接收到消息
self.onmessage = (e) => {
  console.log(e.data);
  self.postMessage(`self：${e.data}`);
};
