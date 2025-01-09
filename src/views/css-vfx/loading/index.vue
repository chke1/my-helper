<template>
  <c-card>
    <spiral-loading></spiral-loading>
  </c-card>
</template>

<script setup>
import spiralLoading from '@/components/loading/spiral-loading.vue';
</script>

<style lang="scss" scoped>
.loading {
  @include useTheme {
    color: getVar('textColor');
  }
}
</style>
