<template>
  <el-select popper-class="c-select-popper" v-bind="$attrs" clearable :style="{ width: width }">
    <template #prefix v-if="prefixText">
      <span class="c-select--prefix">{{ prefixText }}</span>
    </template>

    <template v-for="(value, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>

    <!-- 使用数据源 -->
    <template v-if="!$slots.default">
      <el-option
        v-for="option in optionList"
        :key="option[optionProps?.value || 'value']"
        :label="option[optionProps?.label || 'label']"
        :value="option[optionProps?.value || 'value']"
        :disabled="option[optionProps?.disabled || 'disabled']"
      >
        <img
          v-if="option[optionProps?.imageUrl]"
          :src="option[optionProps?.imageUrl || 'imageUrl']"
        />
        <span>{{ option[optionProps?.label || 'label'] }}</span>
      </el-option>
    </template>
  </el-select>
</template>

<script setup name="c-select">
const props = defineProps({
  // prefix文字
  prefixText: {
    type: [String, Number, Boolean],
    default: '',
  },

  // 宽度
  width: {
    type: [String],
    default: '240px',
  },

  // 选项的数据源
  optionList: {
    type: [Array],
    default: () => [],
  },

  // 配置选项
  optionProps: {
    type: [Object],
    default: () => {
      return { label: '', value: '', imageUrl: '', disabled: '' };
    },
  },

  // 声明 防止属性透传
  formType: {},
  prop: {},
});
</script>

<style lang="scss" scoped>
.c-select--prefix {
  font-size: 14px;
  color: var(--el-text-color-primary) !important;
  line-height: 1;
}
</style>
<style lang="scss">
.c-select-popper .el-select-dropdown__item {
  height: auto;
  line-height: 1;
  min-height: 34px;
  padding-top: 6px;
  padding-bottom: 6px;
  display: flex;
  align-items: center;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
    object-fit: cover;
  }
}
</style>
