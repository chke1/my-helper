<template>
  <footer>
    <span>学习使用，联系方式：2735238097@qq.com</span>
    <span>当前版本：{{ version }}</span>
  </footer>
</template>

<script setup>
const version = window.version;
</script>

<style scoped lang="scss">
footer {
  height: 50px;
  line-height: 50px;
  background-color: var(--el-bg-color);
  font-size: 12px;
  color: #999999;
  border-top: 1px solid var(--el-border-color);
  // box-sizing: border-box;
  flex-shrink: 0;
  text-align: center;

  & > span {
    margin: 0 20px;
  }
}
</style>
