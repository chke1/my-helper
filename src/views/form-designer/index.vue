<template>
  <div class="form-designer">
    <div class="form-widget">
      <div class="form-widget__list">
        <widget-list v-model:formRows="previewFormRows" :widgetId="widgetId"></widget-list>
      </div>
      <div class="form-widget__add">
        <el-button size="large" type="primary" plain @click="hanleAddWidgetModal">+添加</el-button>
      </div>
    </div>

    <div class="form-container">
      <div class="form-container__handle">
        <div></div>
        <div>
          <el-button text type="primary">导出代码</el-button>
        </div>
      </div>
      <div class="form-container__preview">
        <c-form
          class="form-container__form"
          ref="previewFormRef"
          v-bind="getformSetBind"
          :model="previewFormData"
          :rows="previewFormRows"
        ></c-form>
      </div>
    </div>

    <div class="form-set">
      <el-tabs v-model="activeName">
        <el-tab-pane label="表单设置" name="form-set">
          <c-form
            ref="formSetRef"
            label-width=""
            width="100%"
            size="small"
            :isFooter="false"
            :model="formSetData"
            :rows="formSetRows"
          ></c-form>
        </el-tab-pane>
        <el-tab-pane label="组件设置" name="widget-set">
          <c-form
            ref="widgetSetRef"
            label-width=""
            width="100%"
            size="small"
            :isFooter="false"
            :model="widgetSetData"
            :rows="widgetSetRows"
          ></c-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 弹窗 -->
    <c-dialog title="添加组件" :width="800" name="add-widget-popup">
      <add-widget-popup @on-end="handleAddWidgetEnd"></add-widget-popup>
    </c-dialog>
  </div>
</template>

<script setup>
import { computed, ref, watch, provide } from 'vue';
import WidgetList from './components/widget-list.vue';
import AddWidgetPopup from './components/add-widget-popup.vue';
import { setKeys } from '@/utils/tools.js';
import { v4 } from 'uuid';

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const clone = (e) => {
  return JSON.parse(JSON.stringify(e));
};

const formMap = {
  text: '',
  button: '',
  input: '',
  switch: 1,
  select: '',
  cascader: [],
  checkbox: '',
  date: '',
  time: '',
  slider: 0,
  slot: '',
  'input-number': 1,
  'checkbox-group': [],
  'radio-group': '',
  'upload-img': '',
  'upload-imgs': [],
  'upload-file': [],
};

const widgetSetCommon = {
  data: { required: true, label: '', prop: '', labelWidth: 120, disabled: false },
  rows: [
    { formType: 'title', label: '基础设置', type: 'divider' },
    { formType: 'switch', prop: 'required', label: '必填项:' },
    { formType: 'input', prop: 'label', label: '标签文本:' },
    { formType: 'input', prop: 'prop', label: '字段名称:' },
    { formType: 'input-number', prop: 'labelWidth', label: '标签宽度:' },
    { formType: 'switch', prop: 'disabled', label: '是否禁用:' },
    { formType: 'input', prop: 'tips', label: '提示语:' },
  ],
};

const widgetSet = {
  title: {
    data: { label: '', type: 'text' },
    rows: [
      { formType: 'title', label: '基础设置', type: 'divider' },
      { formType: 'input', prop: 'label', label: '标签文本:' },
      {
        formType: 'select',
        prop: 'type',
        label: '类型:',
        optionList: [
          { label: '分割线', value: 'divider' },
          { label: '文字', value: 'text' },
        ],
      },
    ],
  },
  text: {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      // { formType: 'title', label: '组件设置', type: 'divider' },
      // { formType: 'input', prop: 'text', label: '文本内容:' },
    ],
  },
  input: {
    data: {
      ...clone(widgetSetCommon.data),
      maxlength: 200,
      placeholder: '请输入',
      clearable: false,
      showWordLimit: false,
      type: 'text',
      rows: 3,
    },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      {
        formType: 'select',
        prop: 'type',
        label: '类型:',
        optionList: [
          { label: 'text', value: 'text' },
          { label: 'textarea', value: 'textarea' },
        ],
      },
      { formType: 'input', prop: 'placeholder', label: '占位文本:' },
      { formType: 'switch', prop: 'showWordLimit', label: '显示统计字数:' },
      { formType: 'input-number', prop: 'maxlength', label: '最大长度:' },
      { formType: 'switch', prop: 'clearable', label: '清空选项:' },
      { formType: 'input-number', prop: 'rows', label: '输入框行数:' },
    ],
  },
  select: {
    data: {
      ...clone(widgetSetCommon.data),
      placeholder: '',
      switch: false,
      clearable: false,
      collapseTags: false,
      collapseTagsTooltip: false,
    },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'placeholder', label: '占位文本:' },
      { formType: 'switch', prop: 'multiple', label: '是否多选:' },
      { formType: 'switch', prop: 'clearable', label: '清空选项:' },
      { formType: 'switch', prop: 'collapseTags', label: '是否按文字显示:' },
      // { formType: 'switch', prop: 'collapseTagsTooltip ', label: '是否显示悬停文本:' },
      { formType: 'title', label: '选项设置', type: 'divider' },
    ],
  },
  button: {
    data: { ...clone(widgetSetCommon.data), text: false, buttonText: '按钮', type: 'primary' },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      {
        formType: 'select',
        prop: 'type',
        label: '样式类型:',
        optionList: [
          { label: 'primary', value: 'primary' },
          { label: 'success', value: 'success' },
          { label: 'info', value: 'info' },
          { label: 'warning', value: 'warning' },
          { label: 'danger', value: 'danger' },
        ],
      },
      { formType: 'switch', prop: 'text', label: '是否文字按钮:' },
      { formType: 'input', prop: 'buttonText', label: '按钮文本:' },
    ],
  },

  'input-number': {
    data: {
      ...clone(widgetSetCommon.data),
      step: 1,
      controlsPosition: '',
      stepStrictly: false,
      precision: 2,
    },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input-number', prop: 'step', label: '步长:' },
      { formType: 'switch', prop: 'stepStrictly', label: '严格步进:' },
      { formType: 'input-number', prop: 'precision', label: '精度:' },
      { formType: 'input-number', prop: 'min', label: '最小值:' },
      { formType: 'input-number', prop: 'max', label: '最大值:' },
      { formType: 'input-number', prop: 'valueOnClear', label: '清空时显示的值:' },
      {
        formType: 'select',
        prop: 'controlsPosition',
        label: '控制按钮位置:',
        optionList: [
          { label: '默认', value: '' },
          { label: 'right', value: 'right' },
        ],
      },
    ],
  },
  switch: {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'activeValue', label: '状态为on的值:' },
      { formType: 'input', prop: 'inactiveValue', label: '状态为off的值:' },
      { formType: 'input', prop: 'activeText', label: '状态为on的文字描述:' },
      { formType: 'input', prop: 'inactiveText', label: '状态为off的文字描述:' },
    ],
  },
  cascader: {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'placeholder', label: '占位文本:' },
      { formType: 'switch', prop: 'clearable', label: '清空选项:' },
    ],
  },
  'checkbox-group': {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input-number', prop: 'min', label: '最小数量:' },
      { formType: 'input-number', prop: 'max', label: '最大数量:' },
    ],
  },
  checkbox: {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'falseLabel', label: '选中的值:' },
      { formType: 'input', prop: 'trueLabel', label: '没有选中的值:' },
    ],
  },
  'radio-group': {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'switch', prop: 'border', label: '是否显示边框:' },
    ],
  },
  date: {
    data: { ...clone(widgetSetCommon.data), type: 'date' },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'placeholder', label: '占位文本:' },
      { formType: 'switch', prop: 'clearable', label: '清空选项:' },
      {
        formType: 'select',
        prop: 'type',
        label: '显示类型:',
        optionList: [
          { label: 'year', value: 'year' },
          { label: 'month', value: 'month' },
          { label: 'date', value: 'date' },
          { label: 'datetime', value: 'datetime' },
          { label: 'week', value: 'week' },
          { label: 'datetimerange', value: 'datetimerange' },
          { label: 'daterange', value: 'daterange' },
        ],
      },
    ],
  },
  time: {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'placeholder', label: '占位文本:' },
      { formType: 'switch', prop: 'clearable', label: '清空选项:' },
      { formType: 'switch', prop: 'isRange', label: '是否为时间范围选择:' },
    ],
  },
  slider: {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input-number', prop: 'min', label: '最小值:' },
      { formType: 'input-number', prop: 'max', label: '最大值:' },
      { formType: 'input-number', prop: 'step', label: '步长:' },
      { formType: 'switch', prop: 'vertical', label: '垂直模式:' },
      { formType: 'switch', prop: 'range', label: '	是否开启选择范围:' },
      { formType: 'switch', prop: 'showStops', label: '是否显示间断点:' },
      { formType: 'switch', prop: 'showTooltip', label: '	是否显示提示信息:' },
    ],
  },
  'upload-img': {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'width', label: '宽度:' },
      { formType: 'input', prop: 'height', label: '高度:' },
      { formType: 'input', prop: 'size', label: '图片大小/MB:' },
      { formType: 'input', prop: 'ratio', label: '图片上传比例:' },
      { formType: 'input', prop: 'desc', label: '图片描述:' },
      { formType: 'switch', prop: 'isPreview', label: '是否使用base64预览:' },
    ],
  },
  'upload-imgs': {
    data: { ...clone(widgetSetCommon.data) },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'width', label: '宽度:' },
      { formType: 'input', prop: 'height', label: '高度:' },
      { formType: 'input', prop: 'size', label: '图片大小/MB:' },
      { formType: 'input', prop: 'ratio', label: '图片上传比例:' },
      { formType: 'input', prop: 'desc', label: '图片描述:' },
      { formType: 'switch', prop: 'isPreview', label: '	是否使用base64预览:' },
    ],
  },
  'upload-file': {
    data: {
      ...clone(widgetSetCommon.data),
      showFileList: true,
      drag: true,
      multiple: true,
    },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'width', label: '宽度:' },
      { formType: 'input', prop: 'height', label: '高度:' },
      { formType: 'input', prop: 'size', label: '文件大小/MB:' },
      { formType: 'input', prop: 'desc', label: '文件描述:' },
      { formType: 'switch', prop: 'showFileList', label: '	是否显示已选择的列表:' },
      { formType: 'switch', prop: 'drag', label: '	是否使用拖拽上传:' },
      { formType: 'switch', prop: 'multiple', label: '	是否多选:' },
    ],
  },
  slot: {
    data: { ...clone(widgetSetCommon.data), slot: '' },
    rows: [
      ...clone(widgetSetCommon.rows),
      { formType: 'title', label: '组件设置', type: 'divider' },
      { formType: 'input', prop: 'slot', label: '插槽名称:' },
    ],
  },
};

const previewFormRef = ref();
const formSetRef = ref();
const widgetSetRef = ref();

const widgetId = ref('');

const widgetItemRecursionFn = (data, cb) => {
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    if (item.widgetId == widgetId.value) {
      cb && cb(data, index);
      return item;
    }

    if (item.layout) {
      if (item.layout == 'cols') {
        for (let colsItem of item.children) {
          return widgetItemRecursionFn(colsItem, cb);
        }
      } else {
        return widgetItemRecursionFn(item.children, cb);
      }
    }
  }
};

const widgetItem = computed(() => {
  return widgetItemRecursionFn(previewFormRows.value) || {};
});

const getformSetBind = computed(() => {
  let bindMap = {};
  for (const key in formSetData.value) {
    bindMap[key] = formSetData.value[key];
    if (key == 'width') bindMap[key] = formSetData.value[key] + '%';
  }
  return bindMap;
});

const previewFormData = ref({});

const previewFormRows = ref([
  { widgetId: v4(), formType: 'title', label: '基础设置' },
  { widgetId: v4(), formType: 'input', prop: 'input', label: '输入框:' },
]);

const activeName = ref('form-set');

const widgetSetData = ref({});

const widgetSetRows = ref([]);

const formSetData = ref({
  size: 'default',
  labelWidth: 120,
  labelPosition: 'right',
  isDialog: false,
  isFooter: true,
  width: 100,
});

const formSetRows = ref([
  {
    formType: 'radio-group',
    prop: 'size',
    label: '组件大小:',
    optionList: [
      { label: 'small', value: 'small' },
      { label: 'default', value: 'default' },
      { label: 'large', value: 'large' },
    ],
  },
  { formType: 'input-number', prop: 'labelWidth', label: '标签宽度:' },
  {
    formType: 'radio-group',
    prop: 'labelPosition',
    label: '字段对齐:',
    optionList: [
      { label: 'right', value: 'right' },
      { label: 'left', value: 'left' },
    ],
  },
  { formType: 'slider', prop: 'width', label: '表单宽度:' },
  {
    formType: 'switch',
    prop: 'isDialog',
    label: '是否弹窗表单:',
  },
  {
    formType: 'switch',
    prop: 'isFooter',
    label: '是否隐藏脚部:',
  },
]);

const getFormDefaultData = (formType) => {
  const v = formMap[formType];
  if (formType == 'select') {
    return widgetItem.value.multiple ? [] : v;
  }

  return v;
};

// 添加
const hanleAddWidgetModal = () => {
  modalStore.openModal('add-widget-popup', { type: '', data: [] });
};

const handleAddWidgetEnd = (layout, list, widgetId) => {
  console.log(layout, list, widgetId, 'layout, list, widgetId');
  if (widgetId) {
    list.forEach((listVal, listIdx) => {
      widgetItemRecursionFn(previewFormRows.value, (data, i) => {
        console.log(data, i, 'data, idata, idata, i');
        data.splice(i + listIdx + 1, 0, listVal);
      });
    });
    return;
  }
  previewFormRows.value = previewFormRows.value.concat(list);
};

const getUpdateWidget = (key, value) => {
  const { widgetId = '', formType = '', layout = '' } = widgetItem.value;
  if (formType == 'select') {
    if (key == 'multiple') {
      // if () {
      // }
    }
  }
  return value;
};

const handleSwitchWdget = (id, item) => {
  widgetId.value = id;

  const { formType = '', layout = '' } = item;

  if (layout) {
    return;
  }

  activeName.value = 'widget-set';

  if (!widgetSet[formType]) {
    widgetSetData.value = {};
    widgetSetRows.value = [];
    return;
  }

  if (formType && widgetSet[formType]) {
    widgetSetData.value = clone(widgetSet[formType].data);
    widgetSetRows.value = clone(widgetSet[formType].rows);

    for (let key in widgetItem.value) {
      if (widgetSetData.value[key] != undefined) {
        widgetSetData.value[key] = widgetItem.value[key];
      }
    }
    console.log(widgetItem.value, 'widgetItem.value---');
    console.log(widgetSetData.value, 'widgetSetData-----', previewFormRows.value);
  }
};

// 监听组件列表
watch(
  () => previewFormRows.value,
  () => {
    let dataMap = {};
    let fn = (data) => {
      for (const item of data) {
        if (item.prop) {
          setKeys(dataMap, item.prop, getFormDefaultData(item.formType));
        }
        if (item.children) {
          if (item.layout == 'cols') {
            for (let colsItem of item.children) {
              fn(colsItem);
            }
          } else {
            fn(item.children);
          }
        }
      }
    };
    fn(previewFormRows.value);
    // console.log(dataMap, 'dataMap');
    previewFormData.value = dataMap;
  },
  { immediate: true, deep: true },
);

// 监听组件配置数据
watch(
  () => widgetSetData.value,
  () => {
    for (let key in widgetSetData.value) {
      widgetItem.value[key] = getUpdateWidget(key, widgetSetData.value[key]);
    }
    // console.log(widgetSetData.value, 'widgetSetData.value');
    // console.log(previewFormData.value, 'previewFormData');
  },
  { deep: true },
);

provide('on-switch-form-item', handleSwitchWdget);
</script>

<style lang="scss" scoped>
.form-designer {
  display: flex;
  height: 100%;
  width: 100%;
}

.form-widget {
  width: 350px;
  height: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  &__list {
    flex: 1;
    overflow-y: auto;
  }

  &__add {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    :deep(.el-button) {
      width: 100%;
    }
  }
}

.form-container {
  flex: 1;
  height: 100%;
  border-left: 1px solid var(--el-border-color);
  border-right: 1px solid var(--el-border-color);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &__handle {
    border-bottom: 1px solid var(--el-border-color);
    background-color: #fff;
    padding: 4px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__preview {
    padding: 10px 10px 0px 10px;
    box-sizing: border-box;
    background: #f1f2f3;
    height: 100%;
    overflow: auto;
  }

  &__form {
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
}

.form-set {
  width: 350px;
  height: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
