<template>
  <el-drawer
    class="c-drawer"
    v-bind="$attrs"
    align-center
    :size="500"
    :modelValue="(modalStore.names || []).includes(name)"
    :close-on-click-modal="true"
    :destroy-on-close="true"
    :before-close="handleBeforeClose"
    @close="handleClose"
  >
    <slot v-if="$slots.default"></slot>
    <c-empty v-else></c-empty>
  </el-drawer>
</template>

<script setup name="c-drawer">
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const emit = defineEmits(['on-close', 'on-end']);

const props = defineProps({
  name: {
    type: [String],
    default: '',
  },
});

// 关闭按钮的回调
const handleClose = () => {
  emit('on-close');
};

// 图标按钮的回调
const handleBeforeClose = () => {
  modalStore.closeModal();
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.c-drawer .el-drawer__header {
  margin-bottom: 10px;
}

.c-drawer .el-drawer__body {
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}
</style>
