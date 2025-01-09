<template>
  <div class="c-table">
    <!-- 搜索栏 -->
    <div class="c-table-search" v-if="$slots.search">
      <el-space wrap :size="10" alignment="center">
        <slot name="search" :data="search"></slot>

        <el-button @click="handleReset">重置</el-button>
        <template v-if="searchMode === 'unify'">
          <el-button type="primary">查询</el-button>
        </template>
      </el-space>
    </div>

    <!-- 操作栏 -->
    <div class="c-table-handle" v-if="$slots.handle">
      <el-space wrap :size="12" alignment="center">
        <slot
          name="handle"
          :data="search"
          :selectionList="selectionList"
          :selectionLength="(selectionList || []).length"
        ></slot>

        <div class="c-table-handle__selection" v-if="(selectionList || []).length">
          已选中<span> {{ (selectionList || []).length }} </span>项
          <el-button type="primary" text @click="handleCancelSlection">取消选中</el-button>
        </div>
      </el-space>
    </div>

    <!-- 表格 -->
    <el-table
      v-if="$slots.table"
      ref="tableRef"
      style="width: 100%"
      v-loading="props.loading"
      :data="data"
      :border="globalStore.isTableBorder ? true : false"
      :stripe="globalStore.isTableStripe ? true : false"
      @selection-change="handleSelectionChange"
      v-bind="$attrs"
    >
      <slot name="table"></slot>
    </el-table>

    <!-- 分页 -->
    <div class="c-table-pagination" v-if="paging">
      <el-pagination
        :page-size="paging.size"
        :currentPage="paging.page"
        :page-sizes="[10, 20, 30, 50, 100]"
        :total="paging.total"
        layout="total, prev, pager, next, sizes"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup name="c-table">
import { ref, watch } from 'vue';

import { useGlobalStore } from '@/pinia/modules/global';
const globalStore = useGlobalStore();

const emit = defineEmits(['selection-change', 'refresh', 'update:search', 'update:paging']);

const props = defineProps({
  // 筛选搜索数据
  search: {
    type: Object,
    default: () => {},
  },

  // 分页数据
  paging: {
    type: Object,
  },

  // loading
  loading: {
    type: Boolean,
    default: false,
  },

  // data
  data: {
    type: Array,
    default: () => [],
  },

  // 搜索方式 auto unify
  searchMode: {
    type: String,
    default: 'auto',
  },
});

const selectionList = ref([]);

const tableRef = ref();

// 拷贝筛选初始值
const searchCopy = JSON.stringify({ ...props.search });

// 	选择项发生变化事件
const handleSelectionChange = (selection) => {
  selectionList.value = selection;
  emit('selection-change', selection);
};

// 页数改变
const handleCurrentChange = (value) => {
  emit('update:paging', { ...props.paging, page: value });
  emit('refresh');
};

// page-size 改变时触发
const handleSizeChange = (value) => {
  emit('update:paging', { ...props.paging, size: value });
  emit('refresh');
};

// 重置
const handleReset = () => {
  emit('update:search', JSON.parse(searchCopy));
  if (props.searchMode !== 'auto') emit('refresh');
};

// 取消选中
const handleCancelSlection = () => {
  tableRef.value.clearSelection();
};

// 初始化
const init = () => {
  if (props.searchMode === 'auto') {
    watch(
      () => props.search,
      () => {
        console.log(props.search, 'props.search');
        emit('refresh');
      },
      { deep: true },
    );
  }
};

init();
</script>

<style lang="scss" scoped>
.c-table {
  height: 100%;
  display: flex;
  flex-direction: column;

  :deep(.el-table__header .el-table__cell) {
    height: 48px;
    // background: #f7f8fd;
    // color: var(--el-color-black);
  }

  /* 搜索栏 */
  &-search {
    width: 100%;
    margin-bottom: 16px;
  }

  /* 操作栏 */
  &-handle {
    width: 100%;
    margin-bottom: 12px;

    &__selection {
      color: #606266;
      font-size: 14px;

      & > span {
        margin: 0 4px;
        color: #303133;
      }
    }
  }

  /* 分页 */
  &-pagination {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    position: sticky;
    bottom: 0px;
    background-color: var(--el-bg-color);
    z-index: 99;
  }
}
</style>
