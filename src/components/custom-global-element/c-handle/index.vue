<template>
  <div class="c-handle">
    <!-- slot -->
    <el-space class="handle-left" :size="size" wrap>
      <slot></slot>
    </el-space>
    <!-- right -->
    <slot name="right"></slot>
  </div>
</template>

<script setup name="c-handle">
import {} from 'vue';

const props = defineProps({
  //  间隔大小
  size: {
    type: Number,
    default: 12,
  },
});
</script>

<style lang="scss" scoped>
.c-handle {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;

  .handle-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
  }
  .handle-right {
    display: flex;
  }
}
</style>
