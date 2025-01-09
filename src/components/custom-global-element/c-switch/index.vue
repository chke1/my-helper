<template>
  <el-switch
    v-model="switchValue"
    :loading="loading"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :before-change="switchBeforeChange"
  />
</template>

<script setup name="c-switch">
import { ref, watch } from 'vue';

// components
import { ElMessage } from 'element-plus';

const emit = defineEmits(['update:modelValue', 'refresh']);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  // 状态为打开时所显示
  activeValue: {
    type: [String, Number],
    default: 1,
  },

  // 状态为关闭时所显示
  inactiveValue: {
    type: [String, Number],
    default: 0,
  },

  // 拦截
  beforeChange: {
    type: Function,
    default: () => {
      return true;
    },
  },
});

const loading = ref(false);

const switchValue = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newValue) => (switchValue.value = newValue),
);

const switchBeforeChange = async () => {
  loading.value = true;

  let res = await props.beforeChange().catch(() => {});

  loading.value = false;

  if (res.code == 0) {
    ElMessage.success('修改成功');

    // switchValue.value = null;

    emit('refresh', true);

    return true;
  }

  return false;
};
</script>

<style lang="scss" scoped></style>
