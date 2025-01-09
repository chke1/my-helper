export default {
  mounted(el) {
    if (!el) return;
    const dom = el.querySelector('input') || el.querySelector('textarea');
    if (dom) dom.focus();
  },
};
