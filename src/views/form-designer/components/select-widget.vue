<template>
  <el-checkbox-group v-model="checkWidgetGroup">
    <el-checkbox
      class="select-item"
      v-for="(value, key) in widgetMap"
      :key="key"
      :label="key"
      border
    >
      {{ value.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  layout: {
    type: String,
    default: '',
  },
});

const checkWidgetGroup = computed({
  get() {
    console.log(props.modelValue, props.layout, 'props.modelValue');
    return props.modelValue.map((v) => v.formType);
  },
  set(e) {
    console.log(e, 'e');
    let data = e.map((v) => widgetMap.value[v]);
    emit('update:modelValue', data);
  },
});

const widgetMap = ref({
  title: { formType: 'title', label: '标题' },
  text: { formType: 'text', prop: 'text', label: '文本:' },
  input: { formType: 'input', prop: 'input', label: '输入框:' },
  'input-number': { formType: 'input-number', prop: 'input-number', label: '数字输入框:' },
  button: { formType: 'button', prop: 'button', label: '按钮:' },
  switch: { formType: 'switch', prop: 'switch', label: '开关:', activeLabel: 1, inactiveLabel: 0 },
  select: {
    formType: 'select',
    prop: 'select',
    label: '下拉选择器:',
    optionList: [
      { label: 'select 1', value: 1 },
      { label: 'select 2', value: 2 },
    ],
  },
  checkbox: {
    formType: 'checkbox',
    prop: 'checkbox',
    label: '多选框:',
    trueLabel: 1,
    falseLabel: 0,
  },
  cascader: { formType: 'cascader', prop: 'cascader', label: '级联选择器:' },
  'checkbox-group': {
    formType: 'checkbox-group',
    prop: 'checkbox-group',
    label: '多选框组:',
    optionList: [
      { label: 'checkbox 1', value: 1 },
      { label: 'checkbox 2', value: 2 },
    ],
  },
  'radio-group': {
    formType: 'radio-group',
    prop: 'radio-group',
    label: '单选框组:',
    optionList: [
      { label: 'radio 1', value: 1 },
      { label: 'radio 2', value: 2 },
    ],
  },
  date: { formType: 'date', prop: 'date', label: '日期:' },
  time: { formType: 'time', prop: 'time', label: '时间:' },
  slider: { formType: 'slider', prop: 'slider', label: '滑块:' },
  slot: { formType: 'slot', slot: 'slot', prop: 'slot', label: '插槽:' },
  'upload-img': { formType: 'upload-img', prop: 'upload-img', label: '单图上传:' },
  'upload-imgs': { formType: 'upload-imgs', prop: 'upload-imgs', label: '多图上传:' },
  'upload-file': { formType: 'upload-file', prop: 'upload-file', label: '文件上传:' },
});
</script>

<style lang="scss" scoped>
.select-item {
  width: 128px;
  margin: 6px 8px;
}
</style>
