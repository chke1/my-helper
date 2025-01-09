import { onUnmounted, ref, watch } from 'vue';

export function useDefer(deferConfig, tranLength) {
  let { min = 0, max = 100 } = deferConfig;

  const frameCount = ref(min);

  let rafId;

  function updateFrameCount() {
    rafId = requestAnimationFrame(() => {
      frameCount.value++;

      if (frameCount.value >= max) {
        return;
      }

      updateFrameCount();
    });
  }

  updateFrameCount();

  // 长度变化了
  if (tranLength?.value != undefined) {
    watch(
      () => tranLength.value,
      () => {
        max = tranLength.value;
        updateFrameCount();
      },
    );
  }

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
  });

  return function defer(n) {
    return frameCount.value >= n;
  };
}
