export function arrange() {
  const tasks = [];

  // 打印函数
  function print(text) {
    tasks.push(() => {
      console.log(text || '打印成功！！！');
    });
    return this;
  }

  // 延时函数
  function wait(t) {
    tasks.push(() => {
      setTimeout(() => {
        console.log('延时函数！！！');
      }, t);
    });
    return this;
  }

  // 休眠函数
  function sleep(t) {
    tasks.push(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, t);
      });
    });
    return this;
  }

  // 启动函数
  async function execute() {
    for (let t of tasks) {
      await t();
    }
  }

  return { print, wait, sleep, execute };
}
