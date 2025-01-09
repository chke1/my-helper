export default {
  mounted(el, binding) {
    if (!el) return;

    const resizeObserver = new ResizeObserver((entries) => {
      // 当DOM元素的宽高发生变化时执行回调函数
      binding.value(entries[0].contentRect);
    });
    resizeObserver.observe(el);

    // 组件销毁时停止观察
    el._resizeObserver_ = resizeObserver;
  },
  unmounted(el) {
    if (el._resizeObserver_) {
      el._resizeObserver_.disconnect();
      delete el._resizeObserver_;
    }
  },
};
