<template>
  <c-card>
    <c-table :loading="loading" :data="tableData">
      <template #table>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="id" label="ID" min-width="120" />
        <el-table-column prop="code" label="报错类型" min-width="180">
          <template #default="{ row }">
            {{ errCodeMap[row.code] }}
          </template>
        </el-table-column>
        <el-table-column prop="msg" label="报错信息" min-width="360" />
        <el-table-column prop="router" label="报错页面" min-width="260" />
        <el-table-column prop="file" label="报错文件" min-width="260" />
        <el-table-column prop="createTime" label="报错时间" min-width="260" />
      </template>
    </c-table>
  </c-card>
</template>

<script setup name="logs.monitor-error">
// hooks
import { useTable } from '@/hooks/useTable/index.js';

// api
import { getErrors } from '@/utils/monitor-error.js';

// map
const errCodeMap = {
  E1001: '系统未知错误',
  E1002: 'vue逻辑错误',
  E1003: 'JavaScript错误',
  E1004: '静态资源加载错误',
  E1005: '请求错误',
  E1006: 'Promise错误',
};

// 表格相关
const { loading, tableData } = useTable({
  api: getErrors,
  params: {},
  options: {},
  callBack: () => {},
});
</script>

<style lang="scss" scoped></style>
