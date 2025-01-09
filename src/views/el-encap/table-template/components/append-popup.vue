<template>
  <c-form
    ref="formRef"
    label-width="100px"
    isDialog
    :model="formData"
    :rows="formRows"
    @submit="onSubmit"
  ></c-form>
</template>

<script setup name="append-popup">
import { ref } from 'vue';

import { getApi } from '@/utils/tools';

// modal,pinia
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const emit = defineEmits(['refresh']);

const formData = ref({
  name: '',
  select: '',
});

const formRows = ref([
  { formType: 'input', prop: 'name', label: '名称:' },
  {
    formType: 'select',
    prop: 'select',
    label: '班级:',
    optionList: [
      { label: '班级1', value: 1 },
      { label: '班级2', value: 2 },
    ],
  },
]);

// 获取传递弹窗的数据
const modalData = modalStore.getModal();

const formRef = ref(null);
const onSubmit = async (values, instance, done) => {
  instance.loading = true;

  let res = await getApi({ ...values }).catch((err) => err);

  if (res?.code) {
    done();
    instance.loading = false;
  }
};
</script>

<style lang="scss" scoped></style>
