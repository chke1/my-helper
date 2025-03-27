<template>
  <el-date-picker
    class="c-date-picker"
    :type="type"
    placeholder="请选择"
    :format="getFormat"
    :value-format="getValueFormat"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :prefix-icon="customPrefix"
    v-model="getCreateDate"
    :style="{ width: getWidth }"
  >
    <template #prefix v-if="prefixText">
      <span class="c-date-picker--prefix">{{ prefixText }}</span>
    </template>
  </el-date-picker>
</template>

<script setup name="c-date-picker">
import { h, shallowRef, ref } from 'vue';

const props = defineProps({
  // prefix文字
  prefixText: {
    type: [String, Number, Boolean],
    default: '',
  },

  // 宽度
  width: {
    type: [String],
  },

  // 类型
  type: {
    type: [String],
    default: 'date',
  },

  // 格式
  format: {
    type: [String],
  },

  // 绑定值的格式
  valueFormat: {
    type: [String],
  },
});
const getCreateDate = ref([]);
// 格式map
const formatMap = {
  date: 'YYYY-MM-DD',
  daterange: 'YYYY-MM-DD',
  datetimerange: 'YYYY-MM-DD HH:mm:ss',
};

// 宽度map
const widthMap = {
  date: '240px',
  daterange: '300px',
  datetimerange: '420px',
};

// 自定义标题dom
const customPrefix = shallowRef({
  render() {
    return h('span', { class: 'c-date-picker--prefix' }, props.prefixText);
  },
});

// 动态宽度
const getWidth = ref(props.width ? props.width : widthMap[props.type]);

// 动态格式
const getFormat = ref(props.format ? props.format : formatMap[props.type]);

// 动态绑定值格式
const getValueFormat = ref(props.valueFormat ? props.valueFormat : formatMap[props.type]);
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.c-date-picker--prefix {
  display: block;
  font-size: 14px;
  color: var(--el-text-color-primary);
  line-height: 1;
  font-style: normal !important;
}

.c-date-picker .el-range__icon {
  width: auto;
  flex-shrink: 0;
}
</style>
