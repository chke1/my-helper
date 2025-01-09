import { onUnmounted, ref } from 'vue';

export function usePolling(callback, time = 10) {
  let interval = null;
  const duration = ref(time);

  const clear = () => {
    clearInterval(interval);
    interval = null;
  };

  const reset = () => {
    clear();
    duration.value = time;
    callback();
  };

  const run = () => {
    clear();
    duration.value = time;
    interval = setInterval(() => {
      duration.value = duration.value - 1;
      if (duration.value <= 0) {
        duration.value = time;
        callback();
      }
    }, 1000);
  };

  onUnmounted(() => {
    clear();
  });

  return { duration, run, clear, reset };
}
