import { ref, watchEffect } from 'vue';
import { useWatermark } from '@/hooks/useWatermark/index.js';

let ob;
let div;
const flag = ref(0);

export default {
  mounted(el, binding) {
    if (!el) return;
    const props = binding.value;
    const watermarkBg = useWatermark(props);

    watchEffect(() => {
      flag.value;
      if (!el) return;
      if (div) div.remove();

      const { base64, styleSize } = watermarkBg.value;
      el.style.position = 'relative';
      div = document.createElement('div');
      div.style.backgroundImage = `url(${base64})`;
      div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
      div.style.backgroundRepeat = 'repeat';
      div.style.inset = 0;
      div.style.zIndex = 99;
      div.style.position = 'absolute';
      div.style.pointerEvents = 'none';
      el.appendChild(div);
    });

    // 创建一个 MutationObserver 来进行监控
    ob = new MutationObserver((records) => {
      for (const record of records) {
        for (const dom of record.removedNodes) {
          if (dom === div) return flag.value++; // 水印删除时
        }
        if (record.target === div) return flag.value++; // 水印修改时
      }
    });

    ob.observe(el, {
      childList: true, // 元素内容有没有发生变化
      attributes: true, // 元素本身的属性有没有发生变化
      subtree: true, // 告诉它监控的是整个子树，就是包含整个子元素
    });
  },

  unmounted() {
    ob && ob.disconnect(); // 取消监听
    div = null;
  },
};
