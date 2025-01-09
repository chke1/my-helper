<template>
  <c-form
    ref="formRef"
    label-width="100px"
    isDialog
    :model="formData"
    :rows="formRows"
    @submit="onSubmit"
  ></c-form>

  <c-dialog title="嵌套标题" append-to-body :width="500" name="append-popup">
    <append-popup></append-popup>
  </c-dialog>

  <c-drawer title="抽屉标题" append-to-body :width="500" name="append-drawer"></c-drawer>
</template>

<script setup name="popup" lang="jsx">
import { ref } from 'vue';

// components
import appendPopup from './append-popup.vue';

import { getApi } from '@/utils/tools';

// modal,pinia
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

// api

const emit = defineEmits(['refresh']);

const formData = ref({
  input: '',
  inputNumber: 0,
  switch: 1,
  select: 1,
});

const formRows = ref([
  { formType: 'input', prop: 'input', label: '输入框:' },
  { formType: 'input-number', prop: 'inputNumber', label: '数字框:' },
  {
    formType: 'switch',
    prop: 'switch',
    label: '开关:',
    inactiveValue: 0,
    activeValue: 1,
  },
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
    formType: 'slot',
    prop: 'slot',
    label: '弹窗嵌套:',
    slot: <el-button onClick={() => onAppendModalClick()}>打开嵌套弹窗</el-button>,
  },
  {
    formType: 'slot',
    prop: 'slot',
    label: '弹窗抽屉:',
    slot: <el-button onClick={() => onAppendDrawerClick()}>打开弹窗抽屉</el-button>,
  },
]);

// 获取传递弹窗的数据
const modalData = modalStore.getModal();
if (modalData.type == 'edit') {
  console.log(modalData);
}

const formRef = ref(null);
const onSubmit = async (values, instance, done) => {
  instance.loading = true;

  let res = await getApi({ ...values }).catch((err) => err);

  if (res?.code) {
    done();
    instance.loading = false;
  }
};

// 弹窗嵌套
const onAppendModalClick = () => {
  modalStore.openModal('append-popup');
};

const onAppendDrawerClick = () => {
  modalStore.openModal('append-drawer');
};
</script>

<style lang="scss" scoped></style>
