<template>
  <c-card isAffix bodyClass="watermark-wrap">
    <div class="watermark-box" v-watermark></div>
  </c-card>
</template>

<script setup></script>

<style lang="scss" scoped>
:deep(.watermark-wrap) {
  padding: 0;
  background-color: #fff;
}
.watermark-box {
  width: 100%;
  height: 100%;
}
</style>
