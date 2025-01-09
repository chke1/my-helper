<template>
  <c-card>
    <example-container name="echarts">
      <div class="echarts">
        <div class="echarts-item">
          <echart-bar></echart-bar>
        </div>
        <div class="echarts-item">
          <echart-pie></echart-pie>
        </div>
        <div class="echarts-item">
          <echart-line></echart-line>
        </div>
      </div>
    </example-container>
  </c-card>
</template>

<script setup name="echarts">
import exampleContainer from '@/components/example-container/index.vue';
import echartBar from '@/components/echarts-demo/echart-bar.vue';
import echartPie from '@/components/echarts-demo/echart-pie.vue';
import echartLine from '@/components/echarts-demo/echart-line.vue';
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.echarts-item {
  width: calc(50% - 12px);
  height: 380px;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box;
  margin: 6px;
}
</style>
