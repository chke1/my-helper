<template>
  <!-- flex布局 -->
  <template v-if="item.layout == 'flex'">
    <div class="c-form-item-flex" :style="{ width: width }">
      <template v-for="flexItem in item.children" :key="flexItem.prop">
        <form-item :model="model" :item="flexItem"></form-item>
      </template>
    </div>
  </template>

  <!-- 多列布局 -->
  <template v-else-if="item.layout == 'cols'">
    <div class="c-form-item-cols" :style="{ width: width }">
      <div class="c-form-item-cols__item" v-for="colsItem in item.children" :key="colsItem">
        <template v-for="colsChildItem in colsItem" :key="colsChildItem">
          <form-item :model="model" :item="colsChildItem"></form-item>
        </template>
      </div>
    </div>
  </template>

  <!-- 多行布局 -->
  <template v-else-if="item.layout == 'rows'">
    <div class="c-form-item-rows" :style="{ width: width }">
      <form-item :model="model" :item="{ ...item, layout: '', formType: '', prop: '' }">
        <template #c-form-item-rows>
          <div
            class="c-form-item-rows__item"
            v-for="rowsItem in item.children"
            :key="rowsItem.prop"
          >
            <form-item :model="model" :item="rowsItem"></form-item>
          </div>
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
      v-if="item.formType !== 'title' && !item.isHide"
      class="c-form-item"
      :style="{ maxWidth: width }"
      :prop="item.prop"
      :label="item.label"
      :label-width="item.labelWidth"
      :required="item.required"
      :rules="item.rules || formatRules(item)"
      :show-message="item.showMessage == undefined ? true : item.showMessage"
    >
      <slot name="c-form-item-rows"></slot>

      <!-- text -->
      <template v-if="item.formType === 'text'">
        <div :style="item.style">{{ getProp }}</div>
      </template>

      <!-- button -->
      <template v-if="item.formType === 'button'">
        <el-button
          :style="item.style"
          :type="item.type"
          :text="item.text"
          :link="item.link"
          :icon="item.icon"
          :plain="item.plain"
          :round="item.round"
          :circle="item.circle"
          :loading="item.loading"
          :disabled="item.disabled"
          @click="item.click"
        >
          {{ item.buttonText || '按钮' }}
        </el-button>
      </template>

      <!-- input -->
      <template v-if="item.formType === 'input'">
        <el-input
          v-model="getProp"
          :style="item.style"
          :show-word-limit="item.showWordLimit"
          :maxlength="item.maxlength"
          :placeholder="item.placeholder || formatPlaceholder(item)"
          :clearable="item.clearable == undefined ? true : item.clearable"
          :disabled="item.disabled"
          :readonly="item.readonly"
          :type="item.inputType || 'text'"
          :show-password="item.showPassword"
          :rows="item.rows"
          :autosize="item.autosize"
          @change="onFormChange(item)"
          @blur="item.blur"
          @input="item.input"
        ></el-input>
      </template>

      <!-- input-number -->
      <template v-if="item.formType === 'input-number'">
        <el-input-number
          v-model="getProp"
          :style="item.style"
          :min="item.min"
          :max="item.max"
          :value-on-clear="item.min"
          :disabled="item.disabled"
          :precision="item.precision"
          :controls-position="item.controlsPosition"
          @change="onFormChange(item)"
        />
      </template>

      <!-- switch -->
      <template v-if="item.formType === 'switch'">
        <el-switch
          v-model="getProp"
          :style="item.style"
          :disabled="item.disabled"
          :active-value="item.activeValue == undefined ? true : item.activeValue"
          :inactive-value="item.inactiveValue == undefined ? false : item.inactiveValue"
          @change="onFormChange(item)"
        ></el-switch>
      </template>

      <!-- select -->
      <template v-if="item.formType === 'select'">
        <el-select
          v-model="getProp"
          :style="{ width: '100%', ...item.style }"
          :filterable="item.filterable == undefined ? true : item.filterable"
          :clearable="item.clearable == undefined ? true : item.clearable"
          :placeholder="item.placeholder || formatPlaceholder(item)"
          :multiple="item.multiple"
          :popper-class="item.popperClass"
          :disabled="item.disabled"
          @change="onFormChange(item)"
        >
          <el-option
            v-for="option in item.optionList || []"
            :key="option.value"
            :label="option[item?.optionProps?.label || 'label']"
            :value="option[item?.optionProps?.value || 'value']"
            :disabled="option.disabled"
          ></el-option>
        </el-select>
      </template>

      <!-- cascader -->
      <template v-if="item.formType === 'cascader'">
        <el-cascader
          v-model="getProp"
          :style="{ width: '100%', ...item.style }"
          :options="item.options"
          :props="item.props"
          :disabled="item.disabled"
          :popper-class="item.popperClass"
          :placeholder="item.placeholder || formatPlaceholder(item)"
          :filterable="item.filterable == undefined ? true : item.filterable"
          :clearable="item.clearable == undefined ? true : item.clearable"
          @change="onFormChange(item)"
          @expand-change="item.expandChange"
        ></el-cascader>
      </template>

      <!-- checkbox-group、checkbox -->
      <template v-if="['checkbox-group', 'checkbox'].includes(item.formType)">
        <!-- checkbox-group -->
        <template v-if="item.formType == 'checkbox-group'">
          <el-checkbox-group
            v-model="getProp"
            :style="item.style"
            :min="item.min"
            :max="item.max"
            :disabled="item.disabled"
            @change="onFormChange(item)"
          >
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
          <el-checkbox
            v-model="getProp"
            :style="item.style"
            :checked="item.checked"
            :true-label="item.trueLabel == undefined ? true : item.trueLabel"
            :false-label="item.falseLabel == undefined ? true : item.falseLabel"
          >
            {{ item.label }}
          </el-checkbox>
        </template>
      </template>

      <!-- radio -->
      <template v-if="item.formType == 'radio-group'">
        <el-radio-group
          v-model="getProp"
          :style="item.style"
          :disabled="item.disabled"
          @change="onFormChange(item)"
        >
          <el-radio
            v-model="getProp"
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
          v-model="getProp"
          :style="{ width: '100%', ...item.style }"
          :type="item.type || 'date'"
          :disabled="item.disabled"
          :popper-class="item.popperClass"
          :format="item.format || 'YYYY-MM-DD'"
          :value-format="item.valueFormat || 'YYYY-MM-DD'"
          :placeholder="item.placeholder || formatPlaceholder(item)"
          :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'"
          :range-separator="item.rangeSeparator || '-'"
          :clearable="item.clearable == undefined ? true : item.clearable"
          :teleported="item.teleported == undefined ? true : item.teleported"
          @change="onFormChange(item)"
          @blur="item.blur"
          @focus="item.focus"
        ></el-date-picker>
      </template>

      <!-- time -->
      <template v-if="item.formType == 'time'">
        <el-time-picker
          v-model="getProp"
          :style="{ width: '100%', ...item.style }"
          :is-range="item.isRange"
          :disabled="item.disabled"
          :popper-class="item.popperClass"
          :format="item.format || 'HH:mm:ss'"
          :placeholder="item.placeholder || formatPlaceholder(item)"
          :start-placeholder="item.startPlaceholder || '开始时间'"
          :end-placeholder="item.endPlaceholder || '结束时间'"
          :range-separator="item.rangeSeparator || '-'"
          :clearable="item.clearable == undefined ? true : item.clearable"
          :teleported="item.teleported == undefined ? true : item.teleported"
          @change="onFormChange(item)"
          @blur="item.blur"
          @focus="item.focus"
        />
      </template>

      <!-- upload-img -->
      <template v-if="item.formType === 'upload-img'">
        <upload-img
          v-model="getProp"
          :width="item.width"
          :height="item.height"
          :accept="item.accept"
          :size="item.size"
          :ratio="item.ratio"
          :desc="item.desc"
        ></upload-img>
      </template>

      <!-- upload-imgs -->
      <template v-if="item.formType === 'upload-imgs'">
        <upload-imgs
          v-model="getProp"
          :width="item.width"
          :height="item.height"
          :accept="item.accept"
          :size="item.size"
          :ratio="item.ratio"
          :desc="item.desc"
        ></upload-imgs>
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
      <template v-if="!formTypeList.includes(item.formType)">请正确填写类型</template>
    </el-form-item>
  </template>
</template>

<script setup name="c-form-item">
import { isVNode, ref, computed } from 'vue';

import uploadImg from '@/components/upload/upload-img.vue';
import uploadImgs from '@/components/upload/upload-imgs.vue';

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
});

const getModal = computed(() => props.model);

// 匹配逻辑
const propFn = (type, newValue) => {
  try {
    let prop = props.item.prop || '';

    if (Array.isArray(prop)) {
      let i = 0;

      let fn = (event) => {
        if (event[prop[i]] == undefined) {
          console.log(`${type}查找不到该属性`, {
            data: event[prop[i]],
            label: props.item.label,
            prop: prop,
          });

          return type == 'get' ? '' : (event[prop[i]] = '');
        }

        if (prop.length - 1 == i) {
          return type == 'get' ? event[prop[i]] : (event[prop[i]] = newValue);
        }

        i++;

        if (type == 'get') return fn(event[prop[i - 1]]);
        if (type == 'set') fn(event[prop[i - 1]]);
      };

      if (type == 'get') return fn(getModal.value);
      if (type == 'set') fn(getModal.value);
    } else {
      if (type == 'get') return getModal.value[prop];
      if (type == 'set') getModal.value[prop] = newValue;
    }
  } catch (error) {
    console.log('getProp', 'error', type, error);
  }
};

// 匹配字符串&数组的属性
const getProp = computed({
  get() {
    return propFn('get');
  },
  set(newValue) {
    propFn('set', newValue);
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

// 每项的change
const onFormChange = (item) => {
  item.change && item.change(getModal.value[item.prop], item);
};
</script>

<style lang="scss" scoped>
/* el-form-item样式 */
.c-form-item {
  box-sizing: border-box;

  /* 双层嵌套的el-form-item样式 */
  :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  /* 描述 */
  &__tips {
    width: 100%;
    line-height: 20px;
    font-size: 12px;
    color: var(--text-color-secondary);
    margin: 6px 0 6px;
  }
}

/* flex样式 */
.c-form-item-flex {
  display: flex;
  flex-wrap: wrap;
}

/* 多列样式 */
.c-form-item-cols {
  display: flex;

  &__item {
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

/* 多行布局 */
.c-form-item-rows {
  & > :deep(.el-form-item) {
    margin-bottom: 0;
  }

  &__item {
    width: 100%;
  }
}

/* 表单标题项 */
.c-form-item__title {
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
</style>
