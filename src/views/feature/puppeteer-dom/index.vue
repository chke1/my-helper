<template>
  <c-card class="wrap-page puppeteer-dom">
    <template #header> 提示：需要启动爬虫服务端 </template>
    <c-table
      row-key="id"
      class="table-template__table"
      :loading="loading"
      :data="tableData"
      :isResetButton="false"
      v-model:search="searchParams"
      @refresh="queryTableData"
    >
      <!-- 搜索栏 -->
      <template #search>
        <c-input v-model="searchParams.link" placeholder="请输入爬取目标地址" :prefixIcon="Link" />
        <c-input
          v-model="searchParams.dom"
          placeholder="请输入dom的标签，id，class"
          :prefixIcon="Document"
        />
        <c-select
          v-model="searchParams.type"
          prefixText="dom类型："
          :optionList="[{ label: '图片', value: 1 }]"
        ></c-select>
        <el-button type="primary" @click="hanleModal">爬取</el-button>
      </template>

      <!-- 操作栏 -->
      <template #handle="{}">
        <el-button type="primary" @click="hanleModal">下载</el-button>
      </template>

      <!-- 表格 -->
      <template #table>
        <el-table-column type="selection" width="40"></el-table-column>
      </template>
    </c-table>
  </c-card>
</template>

<script setup name="feature.puppeteer-dom">
import { computed, onMounted, reactive, ref } from 'vue';
import { Link, Document } from '@element-plus/icons-vue';

// api
import { getApi } from '@/utils/tools';

// hooks
import { useTable } from '@/hooks/useTable/index.js';

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

// 表格相关
const { loading, searchParams, tableData, queryTableData } = useTable({
  api: getApi,
  params: {
    link: '',
    dom: '',
    type: 1,
  },
  options: {},
  callBack: () => {},
});
</script>

<style lang="scss" scoped>
.puppeteer-dom {
  display: flex;
}
</style>
