// worker.js（worker线程）
self.onmessage = (e) => {
  // 接收到消息
  console.log(e.data); // Greeting from Main.js，主线程发送的消息
  let i = 0;
  for (let index = 0; index < 1000000; index++) {
    for (let index = 0; index < 100; index++) {
      i++;
    }
  }
  self.postMessage(`${i}收到${e.data}------------`); // 向主线程发送消息
};
