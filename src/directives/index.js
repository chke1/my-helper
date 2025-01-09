const importFn = import.meta.globEager('./*/index.js');

export default (app) => {
  Object.keys(importFn).forEach((key) => {
    const directive = importFn[key].default;

    const name = key.split('/')[1];

    // 注册全局自定义指令
    app.directive(name, directive);
  });
};
