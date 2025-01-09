<template>
  <!-- flex布局 -->
  <template v-if="item.layout == 'flex'">
    <div class="c-form-item__flex" :style="{ width: width }">
      <template v-for="flexItem in item.children" :key="flexItem.prop">
        <form-item :model="model" :item="flexItem">
          <template v-for="(value, key) in $slots" #[key]>
            <slot :name="key"></slot>
          </template>
        </form-item>
      </template>
    </div>
  </template>

  <!-- 多列布局 -->
  <template v-else-if="item.layout == 'cols'">
    <div class="c-form-item__cols" :style="{ width: width }">
      <div class="c-form-item__cols-item" v-for="colsItem in item.children" :key="colsItem">
        <template v-for="colsChildItem in colsItem" :key="colsChildItem">
          <form-item :model="model" :item="colsChildItem">
            <template v-for="(value, key) in $slots" #[key]>
              <slot :name="key"></slot>
            </template>
          </form-item>
        </template>
      </div>
    </div>
  </template>

  <!-- 多行布局&flex -->
  <template v-else-if="item.layout == 'rows' || item.layout == 'rows-flex'">
    <div :class="`c-form-item__${item.layout}`" :style="{ width: width }">
      <form-item :model="model" :item="{ ...item, layout: '', formType: '', prop: '' }">
        <template #item-rows>
          <form-item
            v-for="rowsItem in item.children"
            :key="rowsItem.prop"
            :model="model"
            :width="item.layout == 'rows' ? '100%' : 'auto'"
            :item="rowsItem"
          >
            <template v-for="(value, key) in $slots" #[key]>
              <slot :name="key"></slot>
            </template>
          </form-item>
        </template>
        <template v-for="(value, key) in $slots" #[key]>
          <slot :name="key"></slot>
        </template>
      </form-item>
    </div>
  </template>

  <!-- 常规布局 -->
  <template v-else>
    <!-- 标题 -->
    <div class="c-form-item__title" v-if="item.formType === 'title'">
      <p class="c-form-item__title--text">{{ item.label }}</p>
    </div>

    <!-- 表单项 -->
    <el-form-item
      v-if="item.formType !== 'title' && (item.isIf === void 0 ? true : item.isIf)"
      :class="[
        className,
        'c-form-item',
        (item.isShow === void 0 ? false : !item.isShow) && 'is-none',
      ]"
      :style="{ maxWidth: width }"
      :prop="item.prop"
      :label="item.label"
      :label-width="item.labelWidth"
      :required="item.required"
      :rules="item.rules || formatRules(item)"
      :show-message="item.showMessage == void 0 ? true : item.showMessage"
    >
      <slot name="item-rows"></slot>

      <!-- text -->
      <template v-if="item.formType === 'text'">
        <div v-bind="item">{{ getModel }}</div>
      </template>

      <!-- button -->
      <template v-if="item.formType === 'button'">
        <el-button v-bind="item">
          {{ item.buttonText || '按钮' }}
        </el-button>
      </template>

      <!-- input -->
      <template v-if="item.formType === 'input'">
        <el-input
          v-model="getModel"
          :placeholder="formatPlaceholder(item)"
          :clearable="true"
          v-bind="item"
        ></el-input>
      </template>

      <!-- input-number -->
      <template v-if="item.formType === 'input-number'">
        <el-input-number v-model="getModel" :value-on-clear="item.min" v-bind="item" />
      </template>

      <!-- switch -->
      <template v-if="item.formType === 'switch'">
        <el-switch v-model="getModel" v-bind="item"></el-switch>
      </template>

      <!-- select -->
      <template v-if="item.formType === 'select'">
        <c-select
          v-model="getModel"
          :filterable="true"
          :clearable="true"
          :placeholder="formatPlaceholder(item)"
          v-bind="item"
          :style="{ width: '100%', ...item.style }"
          :optionList="item.optionList"
          :optionProps="item?.optionProps"
        ></c-select>
      </template>

      <!-- cascader -->
      <template v-if="item.formType === 'cascader'">
        <el-cascader
          v-model="getModel"
          :placeholder="formatPlaceholder(item)"
          :filterable="true"
          :clearable="true"
          v-bind="item"
          :style="{ width: '100%', ...item.style }"
        ></el-cascader>
      </template>

      <!-- checkbox-group -->
      <template v-if="item.formType == 'checkbox-group'">
        <el-checkbox-group v-model="getModel" v-bind="item">
          <el-checkbox
            v-for="option in item.optionList || []"
            :key="option.value"
            :disabled="option.disabled"
            :label="option[item?.optionProps?.value || 'value']"
          >
            {{ option[item?.optionProps?.label || 'label'] }}
          </el-checkbox>
        </el-checkbox-group>
      </template>

      <!-- checkbox -->
      <template v-if="item.formType == 'checkbox'">
        <el-checkbox v-model="getModel" :true-label="true" :false-label="false" v-bind="item">
          {{ item.label }}
        </el-checkbox>
      </template>

      <!-- radio -->
      <template v-if="item.formType == 'radio-group'">
        <el-radio-group v-model="getModel" v-bind="item">
          <el-radio
            v-model="getModel"
            v-for="option of item.optionList || []"
            :key="option.value"
            :border="option.border"
            :disabled="option.disabled"
            :label="option[item?.optionProps?.value || 'value']"
          >
            {{ option[item?.optionProps?.label || 'label'] }}
          </el-radio>
        </el-radio-group>
      </template>

      <!-- date -->
      <template v-if="item.formType == 'date'">
        <el-date-picker
          v-model="getModel"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          range-separator="-"
          :format="formatDate(item)"
          :value-format="formatDate(item)"
          :placeholder="formatPlaceholder(item)"
          :clearable="true"
          :teleported="true"
          v-bind="item"
          :style="{ width: '100%', ...item.style }"
        ></el-date-picker>
      </template>

      <!-- time -->
      <template v-if="item.formType == 'time'">
        <el-time-picker
          v-model="getModel"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          range-separator="-"
          :placeholder="formatPlaceholder(item)"
          :clearable="true"
          :teleported="true"
          v-bind="item"
          :style="{ width: '100%', ...item.style }"
        />
      </template>

      <!-- upload-img -->
      <template v-if="item.formType === 'upload-img'">
        <upload-img v-model="getModel" v-bind="item"></upload-img>
      </template>

      <!-- upload-imgs -->
      <template v-if="item.formType === 'upload-imgs'">
        <upload-imgs v-model="getModel" v-bind="item"></upload-imgs>
      </template>

      <!-- upload-file -->
      <template v-if="item.formType === 'upload-file'">
        <upload-file v-model="getModel" v-bind="item"></upload-file>
      </template>

      <!-- slot -->
      <template v-if="item.formType == 'slot' || item.slot">
        <slot :name="item.slot" v-if="$slots[item.slot]"></slot>
        <component :is="item.slot" v-else-if="isVNode(item.slot)"></component>
        <span v-else>{{ item.slot }}</span>
      </template>

      <!-- slotError -->
      <template #error v-if="item.slotError">
        <slot :name="item.slotError" v-if="$slots[item.slotError]"></slot>
        <component :is="item.slotError" v-else-if="isVNode(item.slotError)"></component>
        <span v-else>{{ item.slotError }}</span>
      </template>

      <!-- tips -->
      <p class="c-form-item__tips" v-if="item.tips">
        <component :is="item.tips" v-if="isVNode(item.tips)"></component>
        <span v-else>{{ item.tips }}</span>
      </p>

      <!-- 没有匹配的类型 -->
      <template v-if="!formTypeList.includes(item.formType)">{{ item }}请正确填写类型</template>
    </el-form-item>

    <template v-if="item.children"> </template>
  </template>
</template>

<script setup name="c-form-item">
import { isVNode, computed } from 'vue';
import uploadImg from '@/components/upload/upload-img.vue';
import uploadImgs from '@/components/upload/upload-imgs.vue';
import uploadFile from '@/components/upload/upload-file.vue';
import { getValues, setKeys } from '@/utils/tools.js';

const props = defineProps({
  model: {
    type: Object,
    default: () => {
      return {};
    },
  },

  item: {
    type: Object,
    default: () => {
      return {};
    },
  },

  width: {
    type: [String, Number],
    default: '100%',
  },

  className: {
    type: String,
  },
});

// 匹配字符串&数组的属性
const getModel = computed({
  get() {
    return getValues(props.model, props.item.prop);
  },
  set(newValue) {
    setKeys(props.model, props.item.prop, newValue);
    return;
  },
});

// 类型列表
const formTypeList = [
  'text',
  'button',
  'input',
  'input-number',
  'switch',
  'select',
  'cascader',
  'checkbox-group',
  'checkbox',
  'radio-group',
  'date',
  'time',
  'upload-img',
  'upload-imgs',
  'upload-file',
  'slot',
  '',
];

// 格式化 placeholder
const formatPlaceholder = (item) => {
  let _label = item.label || '';

  let isExist = [':', '：'].includes(_label[_label.length - 1]);

  if (isExist) _label = _label.slice(0, -1);

  return (['input'].includes(item.formType) ? '请输入' : '请选择') + _label;
};

// 格式化规则
const formatRules = (item) => {
  return [{ required: true, message: formatPlaceholder(item), trigger: 'change' }];
};

// format
const formatDate = (item) => {
  let dateFormatMap = {
    date: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    daterange: 'YYYY-MM-DD HH:mm:ss',
    datetimerange: 'YYYY-MM-DD HH:mm:ss',
  };
  return dateFormatMap[item.type];
};
</script>

<style lang="scss" scoped>
.is-none {
  display: none;
}

/* el-form-item样式 */
.c-form-item {
  box-sizing: border-box;
  margin-bottom: 22px;

  /* 双层嵌套的el-form-item样式 */
  // :deep(.el-form-item) {
  // margin-bottom: 22px;
  // }

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
      border-top: 1px dashed var(--border-color);
    }

    &--text {
      display: flex;
      align-items: center;
      height: 22px;
      line-height: 22px;
      font-size: 15px;
      font-weight: 800;
      color: var(--text-color-primary);
      margin-top: 0px;

      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 14px;
        margin-right: 8px;
        background: var(--color-primary);
        border-radius: 2px;
      }
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

      &::after {
        content: '';
        display: block;
        height: 90%;
        width: 1px;
        border-right: 1px dashed var(--border-color);
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

  /* 多行布局&flex */
  &__rows {
    & > .c-form-item .c-form-item {
      margin-bottom: 22px;
      width: 100%;

      &:nth-last-of-type(1) {
        margin-bottom: 0px;
      }
    }
  }

  &__rows-flex {
    & > .c-form-item .c-form-item {
      margin-bottom: 0px;
    }
  }

  /* 描述 */
  &__tips {
    width: 100%;
    line-height: 22px;
    font-size: 12px;
    color: var(--text-color-secondary);
    margin-top: 6px;
    margin-bottom: 0px;
  }
}
</style>
