<template>
  <el-input v-bind="$attrs" clearable :prefixIcon="Search" :style="{ width: width }">
    <template v-for="(value, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-input>
</template>

<script setup name="c-input">
import { Search } from '@element-plus/icons-vue';

const props = defineProps({
  width: {
    type: [String],
    default: '240px',
  },
});
</script>
