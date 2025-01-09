<template>
  <div class="picker">
    <div class="picker-row">
      <div class="picker-row__item" v-for="(item, index) in 30" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.picker {
}
.picker-row {
  width: 50px;
  height: 260px;
  background-color: antiquewhite;
  overflow: auto;
}

.picker-row__item {
  height: 30px;
  &:hover {
    background-color: #eee;
  }
}
</style>
