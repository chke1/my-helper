<template>
  <el-popover
    popper-class="c-popover"
    trigger="click"
    clearable
    :persistent="false"
    v-bind="$attrs"
  >
    <template v-for="(value, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-popover>
</template>

<script setup name="c-popover">
const props = defineProps({});
</script>

<style lang="scss" scoped></style>
