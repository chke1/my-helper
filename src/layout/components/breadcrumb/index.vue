<template>
  <el-breadcrumb class="c-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in route.meta.currentCrumb" :key="index">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style lang="scss"></style>
