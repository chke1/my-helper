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
      <template v-for="(item, index) in rows" :key="item">
        <!-- item布局 -->
        <template v-if="item.layout == 'item'">
          <div class="c-form-item__item" :style="{ width: width }">
            <template v-for="im in item.children" :key="im.prop">
              <form-item :model="model" :item="im" :className="im.className">
                <template v-if="im.slot && !isVNode(im.slot)" v-slot:[im.slot]>
                  <slot :name="im.slot" :row="im" v-if="$slots[im.slot]"></slot>
                </template>
                <template v-if="im.slotError && !isVNode(im.slotError)" v-slot:[im.slotError]>
                  <slot :name="im.slotError" :row="im" v-if="$slots[im.slotError]"></slot>
                </template>
              </form-item>
            </template>
          </div>
        </template>

        <!-- flex布局 -->
        <template v-else-if="item.layout == 'flex'">
          <div class="c-form-item__flex" :style="{ width: width }">
            <template v-for="fm in item.children" :key="fm.prop">
              <form-item :model="model" :item="fm" :className="fm.className">
                <template v-if="fm.slot && !isVNode(fm.slot)" v-slot:[fm.slot]>
                  <slot :name="fm.slot" :row="fm" v-if="$slots[fm.slot]"></slot>
                </template>
                <template v-if="fm.slotError && !isVNode(fm.slotError)" v-slot:[fm.slotError]>
                  <slot :name="fm.slotError" :row="fm" v-if="$slots[fm.slotError]"></slot>
                </template>
              </form-item>
            </template>
          </div>
        </template>

        <!-- 多列布局 -->
        <template v-else-if="item.layout == 'cols'">
          <div class="c-form-item__cols" :style="{ width: width }">
            <div class="c-form-item__cols-item" v-for="colsItem in item.children" :key="colsItem">
              <template v-for="cdm in colsItem" :key="cdm">
                <form-item :model="model" :item="cdm" :className="cdm.className">
                  <template v-if="cdm.slot && !isVNode(cdm.slot)" v-slot:[cdm.slot]>
                    <slot :name="cdm.slot" :row="cdm" v-if="$slots[cdm.slot]"></slot>
                  </template>
                  <template v-if="cdm.slotError && !isVNode(cdm.slotError)" v-slot:[cdm.slotError]>
                    <slot :name="cdm.slotError" :row="cdm" v-if="$slots[cdm.slotError]"></slot>
                  </template>
                </form-item>
              </template>
            </div>
          </div>
        </template>

        <!-- 多行布局&flex -->
        <template v-else-if="item.layout == 'rows' || item.layout == 'rows-flex'">
          <div :class="`c-form-item__${item.layout}`" :style="{ width: width }">
            <form-item
              :className="item.className"
              :model="model"
              :item="{ ...item, layout: '', formType: '', prop: '' }"
            >
              <template #item-rows>
                <div :class="`c-form-item__${item.layout}--child`">
                  <form-item
                    v-for="rm in item.children"
                    :key="rm.prop"
                    :model="model"
                    :width="item.layout == 'rows' ? '100%' : 'auto'"
                    :item="rm"
                    :className="rm.className"
                  >
                    <template v-if="rm.slot && !isVNode(rm.slot)" v-slot:[rm.slot]>
                      <slot :name="rm.slot" :row="rm" v-if="$slots[rm.slot]"></slot>
                    </template>
                    <template v-if="rm.slotError && !isVNode(rm.slotError)" v-slot:[rm.slotError]>
                      <slot :name="rm.slotError" :row="rm" v-if="$slots[rm.slotError]"></slot>
                    </template>
                  </form-item>
                </div>
              </template>

              <template v-if="item.slot && !isVNode(item.slot)" v-slot:[item.slot]>
                <slot :name="item.slot" :row="item" v-if="$slots[item.slot]"></slot>
              </template>
              <template v-if="item.slotError && !isVNode(item.slotError)" v-slot:[item.slotError]>
                <slot :name="item.slotError" :row="item" v-if="$slots[item.slotError]"></slot>
              </template>
            </form-item>
          </div>
        </template>

        <!-- 默认布局 -->
        <template v-else>
          <form-item :model="model" :item="item" :width="width" v-if="defer(index)">
            <template v-if="item.slot && !isVNode(item.slot)" v-slot:[item.slot]>
              <slot :name="item.slot" :row="item" v-if="$slots[item.slot]"></slot>
            </template>
            <template v-if="item.slotError && !isVNode(item.slotError)" v-slot:[item.slotError]>
              <slot :name="item.slotError" :row="item" v-if="$slots[item.slotError]"></slot>
            </template>
          </form-item>
        </template>
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
        <div class="dialog-footer" v-else>
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
const defer = useDefer(
  { min: 1, max: computed(() => props.rows.length).value },
  computed(() => props.rows.length),
);

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
  // bottom: -10px;
  background-color: var(--el-bg-color);
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

/* el-form-item样式 */
.c-form-item {
  box-sizing: border-box;
  margin-bottom: 22px;

  /* 表单标题项 */
  &__title {
    position: relative;
    line-height: 22px;
    margin-bottom: 16px;

    &:first-child {
      &::before {
        margin: 0;
        border: none;
        display: none;
      }
    }

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin: 36px 0 20px;
      border-top: 1px dashed var(--el-border-color);
    }

    &--text {
      display: flex;
      align-items: center;
      height: 22px;
      line-height: 22px;
      font-size: 15px;
      font-weight: 800;
      color: var(--el-text-color-primary);
      margin-top: 0px;

      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 14px;
        margin-right: 8px;
        background: var(--el-color-primary);
        border-radius: 2px;
      }
    }
  }

  /* item样式 */
  &__item {
    background-color: var(--el-fill-color);
    border-radius: 4px;
    padding: 16px 16px 16px 0;
    box-sizing: border-box;
    margin-bottom: 12px;
    margin-top: 12px;

    :deep(.c-form-item:last-of-type) {
      margin-bottom: 0;
    }
  }

  /* flex样式 */
  &__flex {
    display: flex;
    flex-wrap: wrap;
  }

  /* 多列样式 */
  &__cols {
    display: flex;

    &-item {
      flex: 1;
      min-width: 320px;
      padding: 0 26px;
      box-sizing: border-box;
      position: relative;
      overflow-x: auto;

      &::after {
        content: '';
        display: block;
        height: 100%;
        width: 1px;
        border-right: 1px dashed var(--el-border-color);
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;

        &::after {
          height: 0;
          width: 0;
          display: none;
        }
      }
    }
  }

  &__rows,
  &__rows-flex {
    &--child {
      width: 100%;
      background-color: var(--el-fill-color);
      border-radius: 4px;
      padding: 16px;
      box-sizing: border-box;
      // margin-top: 12px;
    }
  }

  /* 多行布局&rows */
  &__rows {
    :deep(.c-form-item .c-form-item) {
      width: 100%;
      margin-bottom: 16px;

      &:nth-last-of-type(1) {
        margin-bottom: 0px;
      }
    }
  }

  /* 多行布局&rows-flex */
  &__rows-flex {
    :deep(.c-form-item) {
      width: 100%;
    }

    :deep(.c-form-item .c-form-item) {
      margin-bottom: 0px;
    }

    &--child {
      display: flex;
      align-items: center;
    }
  }

  /* 描述 */
  &__tips {
    width: 100%;
    line-height: 22px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin-top: 6px;
    margin-bottom: 0px;
  }
}
</style>
