<template>
  <div class="c-pagination">
    <el-pagination
      v-model:page-size="sizeNum"
      :currentPage="pageNum"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup name="c-pagination">
import { watch, ref } from 'vue';

const emit = defineEmits(['update:page', 'update:size', 'change']);

const props = defineProps({
  // 当前页数
  page: {
    type: Number,
    default: 1,
  },

  // 每页显示个数
  size: {
    type: Number,
    default: 10,
  },

  // 总条目数
  total: {
    type: Number,
    default: 0,
  },

  // 每页显示个数选择器的选项设置
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },

  // 组件布局，子组件名用逗号分隔
  layout: {
    type: String,
    default: 'total, prev, pager, next, sizes',
  },
});

const pageNum = ref(props.page);
const sizeNum = ref(props.size);

watch(
  () => props.page,
  (modelValue) => {
    pageNum.value = modelValue;
  },
);

watch(
  () => props.size,
  (modelValue) => {
    sizeNum.value = modelValue;
  },
);

// 页数改变
const handleCurrentChange = (value) => {
  emit('update:page', value);
  emit('change');
};

// page-size 改变时触发
const handleSizeChange = (value) => {
  emit('update:size', value);
  emit('change');
};
</script>

<style lang="scss" scoped>
.c-pagination {
  width: 100%;
  padding: 10px 0 0;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
}
</style>
