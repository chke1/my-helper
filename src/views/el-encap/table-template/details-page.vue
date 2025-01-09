<template>
  <c-card>
    <c-form
      ref="formRef"
      label-width="100px"
      width="80%"
      :loading="loading"
      :model="formData"
      :rows="formRows"
      @submit="onSubmit"
    ></c-form>
  </c-card>
</template>

<script setup name="el-encap.table-template.details-page">
import { ref } from 'vue';

import { getApi } from '@/utils/tools';

// hooks
import { useForm } from '@/hooks/useForm';

const emit = defineEmits(['refresh']);

const { loading, formData, queryDetailsData, submitForm } = useForm({
  initParams: {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    select: 1,
    select1: '123123----------',
    name: '',
    map: {
      abc: 'abc123123',
    },
    ke: {},
  },

  getMaps: {
    'test.abc': 'test.abc',
    chen: 'test.abc',
    input1: 'test.abc',
    chen1: 'select1',
  },

  setMaps: {
    abc: 'map.abc',
  },
});

// 获取详情
queryDetailsData({
  api: getApi,
  callBack: (e) => {
    return {
      ...e,
      data: {
        name: '123123123',
        age: [{}],
        six: 12,
        input1: '123123123',
        input2: '2344345',
        input3: '4566',
        input4: '678678',
        select1: 2,
        select: 2,
        test: {
          input: '-------------========',
          select: 2,
          abc: 'CAD发abcabcabcabc都发CAD发都发',
        },
      },
    };
  },
});

const formRows = ref([
  { formType: 'title', label: '基础设置' },
  { formType: 'input', prop: 'name', label: '名称:' },
  { formType: 'input', prop: 'input1', label: '栏目一:' },
  { formType: 'input', prop: 'input2', label: '栏目二:' },
  { formType: 'input', prop: 'input3', label: '栏目三:' },
  { formType: 'input', prop: 'input4', label: '栏目四:' },
  {
    formType: 'select',
    prop: 'select',
    label: '栏目五:',
    optionList: [
      { label: '类型1', value: 1 },
      { label: '类型2', value: 2 },
    ],
    optionProps: { label: 'label', value: 'value' },
  },
  { formType: 'input', prop: ['test', 'abc'], label: '测试:' },
]);

const formRef = ref(null);
const onSubmit = async () => {
  submitForm({ createApi: getApi, updateApi: getApi });
};
</script>

<style lang="scss" scoped></style>
