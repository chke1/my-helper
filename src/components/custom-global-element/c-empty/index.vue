<template>
  <el-empty :image-size="imageSize" :description="description" />
</template>

<script setup name="c-empty">
const props = defineProps({
  // 组件的描述信息
  description: {
    type: String,
    default: '暂无数据',
  },

  // 组件的图像尺寸（宽度）
  imageSize: {
    type: Number,
  },
});
</script>

<style lang="scss" scoped></style>
