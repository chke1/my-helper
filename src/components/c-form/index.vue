<template>
  <div class="c-form" v-loading="formLoading">
    <el-form
      ref="formEl"
      :model="model"
      :size="size"
      :rules="rules"
      :disabled="disabled"
      :label-width="labelWidth"
      :label-position="labelPosition"
      @submit.prevent
    >
      <template v-for="(item, index) in rows" :key="item.prop">
        <form-item :model="model" :item="item" :width="width" v-if="defer(index)">
          <template v-for="(value, key) in $slots" #[key]>
            <slot :name="key"></slot>
          </template>
        </form-item>
      </template>

      <template v-if="isFooter">
        <!-- 表单页handle组 -->
        <el-form-item class="c-form-footer" v-if="!isDialog">
          <slot name="footer">
            <div class="c-form-footer-default">
              <el-button plain @click="handleReset"> 重 置 </el-button>
              <el-button plain @click="handleClose"> 取 消 </el-button>
              <el-button type="primary" @click="handleSubmit" :loading="formLoading">
                {{ formLoading ? '提交中' : '确 定' }}
              </el-button>
            </div>
          </slot>
        </el-form-item>

        <!-- 弹窗handle组 -->
        <div class="c-form-footer-dialog" v-else>
          <slot name="footer">
            <el-button plain @click="handleReset"> 重 置 </el-button>
            <el-button plain @click="handleClose"> 取 消 </el-button>
            <el-button type="primary" @click="handleSubmit" :loading="formLoading">
              {{ formLoading ? '提交中' : '确 定' }}
            </el-button>
          </slot>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script setup name="c-form">
import { ref, unref, reactive, computed, toRefs, isVNode } from 'vue';

// components
import FormItem from './form-item.vue';

// store - modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// useDefer
import { useDefer } from '@/hooks/useDefer/index.js';
const defer = useDefer({ min: 1, max: computed(() => props.rows.length).value });

const emit = defineEmits(['submit', 'close']);

const props = defineProps({
  // 表单数据源
  model: {
    type: Object,
    default: () => {
      return {};
    },
  },

  // 表单验证规则
  rules: {
    type: Array,
    default: () => [],
  },

  // 表单项数据
  rows: {
    type: Array,
    default: () => [],
  },

  // 宽度
  width: {
    type: [String, Number],
    default: '100%',
  },

  // 大小
  size: {
    type: [String],
    default: '',
  },

  // 是否禁用整个表单
  disabled: {
    type: Boolean,
    default: false,
  },

  // 表单loading
  loading: {
    type: Boolean,
    default: false,
  },

  // 标签的长度
  labelWidth: {
    type: [String, Number],
    default: '100px',
  },

  // 标签的长度，left 或 right
  labelPosition: {
    type: String,
    default: 'right',
  },

  // 提交按钮是否表单验证
  isValidate: {
    type: Boolean,
    default: false,
  },

  // 是否是弹窗内表单
  isDialog: {
    type: Boolean,
    default: false,
  },

  // 是否隐藏脚部
  isFooter: {
    type: Boolean,
    default: true,
  },
});

const { model, rows } = toRefs(props);

// loading
const formLoading = computed(() => props.loading || instance.loading);

// 重置
const handleReset = () => {
  unref(formEl).resetFields();
};

// 取消
const handleClose = () => {
  if (props.isDialog) {
    emit('close');
    modalStore.closeModal();
    return;
  }
  router.back();
};

// 确认时实例
const instance = reactive({
  loading: false,
});

// emit - submit
const submitEmit = () => {
  emit('submit', model.value, instance, handleClose);
};

const formEl = ref();

// 确认
const handleSubmit = async () => {
  console.log('formData', model.value);

  if (props.isValidate) {
    submitEmit();
    return;
  }

  unref(formEl).validate(async (valid) => {
    console.log('valid', valid);
    if (valid) submitEmit();
  });
};

defineExpose({ formEl });
</script>

<style lang="scss" scoped>
.c-form {
  width: 100%;
  position: relative;
}

.c-form-footer {
  margin-top: 48px;
  position: sticky;
  bottom: 0px;
  // bottom: -22px;
  background: #fff;
  z-index: 99;
}

.c-form-footer-default {
  display: flex;
  width: 100%;
  align-items: baseline;
  padding: 16px 0;
  box-sizing: border-box;

  :deep(.el-button) {
    min-width: 88px;
  }
}

.c-form-footer-dialog {
  display: flex;
  width: 100%;
  align-items: baseline;
  justify-content: flex-end;
  padding-top: 26px;
  box-sizing: border-box;

  :deep(.el-button) {
    min-width: 88px;
  }
}
</style>
