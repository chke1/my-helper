<template>
  <c-card isAffix bodyClass="stars-wrap">
    <stars-bg></stars-bg>
  </c-card>
</template>

<script setup>
import starsBg from '@/components/canvas-demo/stars-bg.vue';
</script>

<style lang="scss" scoped>
:deep(.stars-wrap) {
  padding: 0;
}
</style>
