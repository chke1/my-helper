<template>
  <div id="mainLine" v-element-size="handleResize"></div>
</template>

<script setup>
import { onMounted } from 'vue';
// import * as echarts from 'echarts';
import echarts from '@/utils/echarts';
import { vElementSize } from '@vueuse/components';
import { useDebounceFn } from '@vueuse/core';

let chartDom = {};
let myChart = {};

const initEcharts = () => {
  chartDom = document.getElementById('mainLine');
  myChart = echarts.init(chartDom);
  var option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '15px',
      right: '25px',
      bottom: '15px',
      top: '25px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  option && myChart.setOption(option);
};

const handleResize = useDebounceFn((e) => {
  console.log(e, 'e');
  if (e?.width && e?.height) {
    myChart.resize();
  }
}, 100);

onMounted(() => {
  initEcharts();
});
</script>

<style lang="scss" scoped>
#mainLine {
  width: 100%;
  height: 100%;
}
</style>
