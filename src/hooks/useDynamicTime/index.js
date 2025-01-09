import { onUnmounted, ref } from 'vue';
import { durationFormat, diffFormat } from '@/utils/day.js';
import dayjs from 'dayjs';

// 动态时长
export function useDuration() {
  let IntervalMap = {};

  const runCompute = (value = 0, { mode = 'inc', option = 'section', id = 'defaultId' } = {}) => {
    const durationTime = ref('');

    if (IntervalMap[id]) clearTimeout(IntervalMap[id].intervalFn);

    IntervalMap[id] = {
      id: id,
      intervalFn: null,
      duration: value,
      calculateTime: 0,
    };

    IntervalMap[id].calculateTime = dayjs().unix() + (mode === 'inc' ? -value : value);

    const assignFn = () => {
      // 增加
      if (mode === 'inc') {
        IntervalMap[id].duration = dayjs().unix() - IntervalMap[id].calculateTime;
      }

      // 减少
      if (mode === 'dec') {
        IntervalMap[id].duration = IntervalMap[id].calculateTime - dayjs().unix();
      }

      // 部分展示
      if (option === 'section') {
        durationTime.value = durationFormat(IntervalMap[id].duration).text;
      }

      // 完整展示
      if (option === 'intact') {
        durationTime.value = diffFormat(IntervalMap[id].duration);
      }

      console.log(IntervalMap[id], 'duration', IntervalMap);
    };

    assignFn();

    IntervalMap[id].intervalFn = setInterval(() => {
      assignFn();

      if (IntervalMap[id].duration <= 0) {
        stopCompute(id);
        return durationTime;
      }
    }, 1000);

    return durationTime;
  };

  // 停止
  const stopCompute = (e) => {
    if (!!e) {
      clearInterval(IntervalMap[e].intervalFn);
      IntervalMap[e].intervalFn = null;
    } else {
      resetCompute();
    }
  };

  //  重置
  const resetCompute = () => {
    for (let key in IntervalMap) {
      clearInterval(IntervalMap[key].intervalFn);
      IntervalMap[key].intervalFn = null;
    }
    IntervalMap = {};
  };

  onUnmounted(() => resetCompute());

  return { runCompute, stopCompute, resetCompute };
}

// 动态时间
export function useTime() {
  let IntervalMap = {};

  const runCompute = (value = '', event) => {
    const { option = 'section', format = '', unit = '', id = 'defaultId' } = event || {};

    const durationTime = ref('');

    if (IntervalMap[id]) clearTimeout(IntervalMap[id].intervalFn);

    IntervalMap[id] = {
      id: id,
      intervalFn: null,
      duration: value,
      calculateTime: dayjs(value).unix(),
    };

    const assignFn = () => {
      if (IntervalMap[id].calculateTime <= dayjs().unix()) {
        // 增加
        IntervalMap[id].duration = dayjs().unix() - IntervalMap[id].calculateTime;
      } else {
        // 减少
        IntervalMap[id].duration = IntervalMap[id].calculateTime - dayjs().unix();
      }

      // 部分展示
      if (option === 'section') {
        durationTime.value = durationFormat(IntervalMap[id].duration).text;
      }

      // 完整展示
      if (option === 'intact') {
        durationTime.value = diffFormat(IntervalMap[id].duration, unit, format);
      }

      console.log(IntervalMap[id], 'time', IntervalMap);
    };

    assignFn();

    IntervalMap[id].intervalFn = setInterval(() => {
      if (IntervalMap[id].duration < 0) {
        stopCompute(IntervalMap[id].id);
        durationTime.value = 0;
        return;
      }
      assignFn();
    }, 1000);

    return durationTime;
  };

  // 停止
  const stopCompute = (e) => {
    if (!!e) {
      clearInterval(IntervalMap[e].intervalFn);
      IntervalMap[e].intervalFn = null;
    } else {
      resetCompute();
    }
  };

  //  重置
  const resetCompute = () => {
    for (let key in IntervalMap) {
      clearInterval(IntervalMap[key].intervalFn);
      IntervalMap[key].intervalFn = null;
    }
    IntervalMap = {};
  };

  onUnmounted(() => resetCompute());

  return { runCompute, stopCompute, resetCompute };
}
