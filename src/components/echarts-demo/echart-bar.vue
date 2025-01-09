<template>
  <div id="mainBar" v-element-size="handleResize"></div>
</template>

<script setup>
// import * as echarts from 'echarts';
import echarts from '@/utils/echarts';
import { onMounted } from 'vue';
import { vElementSize } from '@vueuse/components';
import { useDebounceFn } from '@vueuse/core';

let chartDom = {};
let myChart = {};

const initEcharts = () => {
  chartDom = document.getElementById('mainBar');
  myChart = echarts.init(chartDom);

  var option = {
    xAxis: {
      type: 'category',
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    },
    grid: {
      left: '5px',
      right: '5px',
      bottom: '5px',
      top: '25px',
      containLabel: true,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 220, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
          borderRadius: [20, 20, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
      },
    ],
  };

  option && myChart.setOption(option);
};

const handleResize = useDebounceFn((e) => {
  if (e?.width && e?.height) {
    myChart.resize();
  }
}, 100);

onMounted(() => {
  initEcharts();
});
</script>

<style lang="scss" scoped>
#mainBar {
  width: 100%;
  height: 100%;
}
</style>
