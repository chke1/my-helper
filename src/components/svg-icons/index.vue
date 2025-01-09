<template>
  <svg :style="{ width, height }" :class="['svg-icon', svgClass]">
    <use :xlink:href="prefix + name" :fill="svgClass ? '' : color"></use>
  </svg>
</template>

<script setup>
//接收父组件传来的参数
defineProps({
  // 接收父组件传来的前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 接收父组件传来的svg文件名
  name: {
    type: String,
    default: 'default',
  },
  // 接收父组件传来的图标颜色
  color: {
    type: String,
    default: '#fff',
  },
  // 接收父组件传来的图标宽度
  width: {
    type: String,
    default: '16px',
  },
  // 接收父组件传来的图标高度
  height: {
    type: String,
    default: '16px',
  },
  // 接收父组件传来的class
  svgClass: {
    type: String,
    default: '',
  },
});
</script>

<style scope>
.svg-icon {
  vertical-align: initial;
}
</style>
