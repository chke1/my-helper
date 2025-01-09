<template>
  <el-dialog
    v-bind="$attrs"
    align-center
    append-to-body
    :modelValue="(modalStore.names || []).includes(name)"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :show-close="false"
    :fullscreen="fullscreen"
    :before-close="handleBeforeClose"
    @close="handleClose"
  >
    <template #header>
      <div class="c-dialog__header">
        <span>
          <slot name="header">{{ title }}</slot>
        </span>
        <el-icon
          :class="['is-icon', fullscreen && 'is-primary-text']"
          @click="fullscreen = !fullscreen"
        >
          <FullScreen />
        </el-icon>
        <el-icon class="is-icon" @click="handleBeforeClose"><Close /></el-icon>
      </div>
    </template>

    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
    <slot v-if="$slots.default"></slot>
    <c-empty v-else></c-empty>
  </el-dialog>
</template>

<script setup name="c-dialog">
import { ref } from 'vue';
import { FullScreen, Close } from '@element-plus/icons-vue';
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const emit = defineEmits(['on-close', 'on-end']);

const props = defineProps({
  name: {
    type: [String],
    default: '',
  },

  title: {
    type: [String],
    default: '',
  },
});

const fullscreen = ref(false);

// 关闭按钮的回调
const handleClose = () => {
  emit('on-close');
  setTimeout(() => {
    fullscreen.value = false;
  }, 200);
};

// 图标按钮的回调
const handleBeforeClose = () => {
  modalStore.closeModal();
};
</script>

<style lang="scss" scoped>
.c-dialog__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span:nth-child(1) {
    flex: 1;
  }

  & > .is-icon {
    cursor: pointer;
    margin-left: 16px;
    color: var(--el-color-info);
  }
}
</style>
