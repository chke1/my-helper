<template>
  <div id="mainPie" v-element-size="handleResize"></div>
</template>

<script setup>
// import * as echarts from 'echarts';
import echarts from '@/utils/echarts';
import { onMounted, onUnmounted } from 'vue';
import { vElementSize } from '@vueuse/components';
import { useDebounceFn } from '@vueuse/core';

let chartDom = {};
let myChart = {};

var intervalFn = null;

const initEcharts = () => {
  chartDom = document.getElementById('mainPie');
  myChart = echarts.init(chartDom);

  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      bottom: 'bottom',
      data: ['直接访问', '邮件营销', '视频广告', '搜索引擎'],
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 135, name: '视频广告' },
          { value: 1048, name: '搜索引擎' },
        ],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 26,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
      },
    ],
  };

  option && myChart.setOption(option);

  let currentIndex = -1;

  clearInterval(intervalFn);
  intervalFn = null;
  intervalFn = setInterval(function () {
    var dataLen = option.series[0].data.length;
    // 取消之前高亮的图形
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    currentIndex = (currentIndex + 1) % dataLen;
    // 高亮当前图形
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    // 显示 tooltip
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
  }, 1000);
};

const handleResize = useDebounceFn((e) => {
  if (e?.width && e?.height) {
    myChart.resize();
  }
}, 100);

onMounted(() => {
  initEcharts();
});

onUnmounted(() => {
  clearInterval(intervalFn);
  intervalFn = null;
});
</script>

<style lang="scss" scoped>
#mainPie {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
