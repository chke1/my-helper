const importFn = import.meta.globEager('./*/index.vue');

export default {
  install(app) {
    // 批量注册全局组件
    Object.keys(importFn).forEach((key) => {
      // 导入组件
      const component = importFn[key].default;

      // 注册组件
      app.component(component.name, component);
    });
  },
};
