<template>
  <c-card>
    <template #header>
      <div class="form-template-header">
        <span>统一封装常见表单项，数据形式创建表单。通过hooks统一表单操作。</span>
        <router-link to="/form-designer">
          <el-button type="primary" text>
            表单设计器 <span class="form-template-header__tip">（开发中）</span>
          </el-button>
        </router-link>
      </div>
    </template>
    <c-form
      ref="formRef"
      label-width="100px"
      width="80%"
      :loading="submitLoading"
      :model="formData"
      :rows="formRows"
      @submit="onSubmit"
    >
      <template #defaultTest>
        <div>我是默认内容插槽</div>
      </template>

      <template #slotErrorTest>
        <div>我是验证信息插槽</div>
      </template>
    </c-form>
  </c-card>
</template>

<script setup lang="jsx" name="el-encap.form-template">
import { computed, ref } from 'vue';

const formData = ref({
  uploadImg: '',
  uploadImgs: [],
  text: 'text',
  input: '',
  inputNumber: 1,
  switch: 1,
  select: 1,
  cascader: [],
  checkboxGroup: [1],
  checkbox: 1,
  radioGroup: 1,
  date: '',
  daterange: [],
  datetime: '',
  datetimerange: [],
  time: '',
  timerange: [],
  flex: {
    text: 'text',
    input: '',
    inputNumber: 1,
    switch: 1,
    checkboxGroup: [],
    checkbox1: 1,
    checkbox2: 2,
    radioGroup: 1,
  },
  rows: {
    input1: '',
    input2: '',
  },
  tips: {
    string: '',
    vnode: '',
  },
  slot: {
    default: '',
    vnode: '',
    slotError: '',
    slotErrorVnode: '',
  },
  status: {
    showRadioGroup: 0,
    showText: '我是文本显示',
    disabledRadioGroup: 0,
    disabledText: '',
  },
});

const formRows = ref([
  // 多列布局
  { formType: 'title', label: '多列布局' },
  {
    layout: 'cols',
    children: [
      // 第一列
      [
        {
          formType: 'upload-img',
          prop: 'uploadImg',
          label: '单图上传:',
          size: '',
          ratio: '',
          tips: '支持图片类型、大小、尺寸、比例识别。',
          desc: false,
        },
        {
          formType: 'upload-imgs',
          prop: 'uploadImgs',
          label: '多图上传:',
          size: '',
          ratio: '',
          tips: '支持图片类型、大小、尺寸、比例识别，可拖拽排序。',
          desc: false,
        },
      ],

      // 第二列
      [
        { formType: 'text', prop: 'text', label: '文本:', ratio: '123' },
        { formType: 'switch', prop: 'switch', label: '开关:', inactiveValue: 0, activeValue: 1 },
        {
          formType: 'checkbox-group',
          prop: 'checkboxGroup',
          label: '多选框组:',
          optionList: [
            { label: '类型1', value: 1 },
            { label: '类型2', value: 2 },
          ],
          optionProps: { label: 'label', value: 'value' },
        },
        { formType: 'checkbox', label: '选框:', prop: 'checkbox', trueLabel: 1, falseLabel: 2 },
        {
          formType: 'radio-group',
          prop: 'radioGroup',
          label: '单选框组:',
          optionList: [
            { label: '类型1', value: 1 },
            { label: '类型2', value: 2 },
          ],
          optionProps: { label: 'label', value: 'value' },
        },
        { formType: 'input-number', prop: 'inputNumber', label: '数字框:' },
      ],

      // 第三列
      [
        { formType: 'input', prop: 'input', label: '输入框:' },
        {
          formType: 'select',
          prop: 'select',
          label: '下拉选择:',
          optionList: [
            { label: '类型1', value: 1 },
            { label: '类型2', value: 2 },
          ],
          optionProps: { label: 'label', value: 'value' },
        },
        {
          formType: 'cascader',
          prop: 'cascader',
          label: '级联选择:',
          options: [
            {
              value: '1',
              label: '一级',
              children: [
                {
                  value: '1-1',
                  label: '二级',
                  children: [
                    { value: '1-1-1', label: '三级（1）' },
                    { value: '1-1-2', label: '三级（2）' },
                  ],
                },
              ],
            },
          ],
        },
        { formType: 'date', type: 'date', prop: 'date', label: '日期:' },
        { formType: 'date', type: 'daterange', prop: 'daterange', label: '日期段:' },
        { formType: 'time', prop: 'time', label: '时间:' },
        { formType: 'time', prop: 'timerange', label: '时间段:', isRange: true },
      ],
    ],
  },

  // item布局
  { formType: 'title', label: 'item布局' },
  {
    layout: 'item',
    children: [
      { formType: 'text', prop: 'text', label: '文本:', ratio: '123' },
      { formType: 'switch', prop: 'switch', label: '开关:', inactiveValue: 0, activeValue: 1 },
      {
        formType: 'checkbox-group',
        prop: 'checkboxGroup',
        label: '多选框组:',
        optionList: [
          { label: '类型1', value: 1 },
          { label: '类型2', value: 2 },
        ],
        optionProps: { label: 'label', value: 'value' },
      },
    ],
  },

  {
    layout: 'item',
    children: [
      { formType: 'checkbox', label: '选框:', prop: 'checkbox', trueLabel: 1, falseLabel: 2 },
      {
        formType: 'radio-group',
        prop: 'radioGroup',
        label: '单选框组:',
        optionList: [
          { label: '类型1', value: 1 },
          { label: '类型2', value: 2 },
        ],
        optionProps: { label: 'label', value: 'value' },
      },
      { formType: 'input-number', prop: 'inputNumber', label: '数字框:' },
      { formType: 'text', prop: 'text', label: '文本:', ratio: '123' },
    ],
  },

  // flex布局
  { formType: 'title', label: 'flex行内表单' },
  {
    layout: 'flex',
    children: [
      { formType: 'input', prop: ['flex', 'input'], label: '输入框:' },
      { formType: 'text', prop: ['flex', 'text'], label: '文本:' },
      { formType: 'input-number', prop: ['flex', 'inputNumber'], label: '数字框:' },
      {
        formType: 'switch',
        prop: ['flex', 'switch'],
        label: '开关:',
        inactiveValue: 0,
        activeValue: 1,
      },
      {
        formType: 'checkbox-group',
        prop: ['flex', 'checkboxGroup'],
        label: '多选框:',
        optionList: [
          { label: '类型1', value: 1 },
          { label: '类型2', value: 2 },
        ],
        optionProps: { label: 'label', value: 'value' },
      },
      { formType: 'checkbox', label: '选框:', prop: 'checkbox', trueLabel: 1, falseLabel: 2 },
      {
        formType: 'radio-group',
        prop: ['flex', 'radioGroup'],
        label: '单选框:',
        optionList: [
          { label: '类型1', value: 1 },
          { label: '类型2', value: 2 },
        ],
        optionProps: { label: 'label', value: 'value' },
      },
    ],
  },

  // 多行布局
  { formType: 'title', label: '多行表单' },
  {
    layout: 'rows',
    prop: 'input',
    label: '多行输入框:',
    children: [
      { formType: 'input', prop: ['rows', 'input1'], label: '输入框1:' },
      { formType: 'input', prop: ['rows', 'input2'], label: '输入框2:' },
    ],
  },

  // 表单提示
  { formType: 'title', label: '表单提示' },
  {
    formType: 'input',
    prop: ['tips', 'string'],
    label: '字符提示:',
    tips: '注：字符类型提示',
  },
  {
    formType: 'input',
    prop: ['tips', 'vnode'],
    label: 'vnode提示:',
    tips: <span>注：VNode类型提示</span>,
  },

  // 表单插槽
  { formType: 'title', label: '表单插槽' },
  {
    formType: 'slot',
    prop: ['slot', 'default'],
    label: '默认内容插槽:',
    slot: 'defaultTest',
    labelWidth: '120px',
  },
  {
    formType: 'slot',
    prop: ['slot', 'vnode'],
    label: 'vnode内容插槽:',
    slot: <span>我是vnode内容插槽</span>,
    labelWidth: '130px',
  },
  {
    formType: 'input',
    prop: ['slot', 'slotError'],
    label: '验证信息插槽:',
    slotError: 'slotErrorTest',
    labelWidth: '120px',
  },
  {
    formType: 'input',
    prop: ['slot', 'slotErrorVnode'],
    label: 'vnode验证信息插槽:',
    slotError: <span>我是vnode类型验证错误信息</span>,
    labelWidth: '160px',
  },

  // 表单状态控制
  { formType: 'title', label: '表单状态控制' },
  {
    layout: 'flex',
    children: [
      {
        formType: 'radio-group',
        prop: ['status', 'showRadioGroup'],
        label: '动态显示:',
        optionList: [
          { label: '隐藏', value: 0 },
          { label: '显示', value: 1 },
        ],
        optionProps: { label: 'label', value: 'value' },
      },
      {
        formType: 'text',
        prop: ['status', 'showText'],
        label: '文本:',
        isIf: computed(() => formData.value.status.showRadioGroup == 1),
      },
    ],
  },
  {
    layout: 'flex',
    children: [
      {
        formType: 'radio-group',
        prop: ['status', 'disabledRadioGroup'],
        label: '动态禁用:',
        optionList: [
          { label: '关闭', value: 0 },
          { label: '启用', value: 1 },
        ],
        optionProps: { label: 'label', value: 'value' },
      },
      {
        formType: 'input',
        prop: ['status', 'disabledText'],
        label: '文本:',
        disabled: computed(() => formData.value.status.disabledRadioGroup == 0),
      },
    ],
  },
]);

const formRef = ref(null);
const submitLoading = ref(false);

const onSubmit = async (values, instance, done) => {
  instance.loading = true;

  setTimeout(() => {
    instance.loading = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
.form-template-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__tip {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}
</style>
