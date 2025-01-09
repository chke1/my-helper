<template>
  <c-card>
    <c-table :loading="loading" :data="tableData" show-overflow-tooltip>
      <template #table>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="router" label="页面" />
        <el-table-column prop="userAgent" label="浏览器信息" />
        <el-table-column prop="FP" label="FP(白屏时间)" />
        <el-table-column prop="FCP" label="FCP(首屏时间)" />
        <el-table-column prop="TTI" label="TTI(首次可交互)" />
        <el-table-column prop="TTFB" label="TTFB(请求到响应)" min-width="90" />
        <el-table-column prop="domReady" label="DOM渲染" />
        <el-table-column prop="dom" label="DOM解析" />
        <el-table-column prop="resources" label="资源加载" />
        <el-table-column prop="redirect" label="重定向" />
        <el-table-column prop="loadTime" label="所有资源加载" />
      </template>
    </c-table>
  </c-card>
</template>

<script setup name="logs.monitor-performance">
// hooks
import { useTable } from '@/hooks/useTable/index.js';

// api
import { getPerformance } from '@/utils/monitor-performance.js';

// 表格相关
const { loading, tableData } = useTable({
  api: getPerformance,
  params: {},
  options: {},
  callBack: () => {},
});
</script>

<style lang="scss" scoped></style>
