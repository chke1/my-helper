<template>
  <c-card>
    <c-form
      ref="formRef"
      label-width="160px"
      width="80%"
      :model="formData"
      :rows="formRows"
      :isFooter="false"
    >
      <template #focus>
        <el-input v-focus v-model="formData.focus"></el-input>
      </template>

      <template #click-outside>
        <el-button v-click-outside="handleClickOutside">点击外部监听</el-button>
        &nbsp;
        <span v-if="formData.clickOutside">点击：{{ formData.clickOutside }}</span>
      </template>

      <template #resize>
        <textarea v-resize="handleResize" style="width: 330px; height: 150px"> </textarea>
        <div style="width: 100%" v-text="JSON.stringify(formData.resize, null, 2)"></div>
      </template>

      <template #watermark>
        <div class="watermark-warp" v-watermark></div>
      </template>
    </c-form>
  </c-card>
</template>

<script setup name="feature.directives">
import { ref } from 'vue';

const formData = ref({
  focus: '',
  clickOutside: 0,
  resize: {},
});

const formRows = ref([
  { formType: 'title', label: '自定义指令' },
  {
    formType: 'slot',
    slot: 'focus',
    label: 'v-focus:',
    tips: '自动聚焦指令',
  },
  {
    formType: 'slot',
    slot: 'click-outside',
    label: 'v-click-outside:',
    tips: '监听外部点击事件指令',
  },
  {
    formType: 'slot',
    slot: 'resize',
    label: 'v-resize:',
    tips: 'dom大小监听指令',
  },
  {
    formType: 'slot',
    slot: 'watermark',
    label: 'v-watermark:',
    tips: '防篡改水印指令',
  },
]);

const handleClickOutside = () => {
  formData.value.clickOutside++;
};

const handleResize = (e) => {
  formData.value.resize = JSON.parse(JSON.stringify(e));
};
</script>

<style lang="scss" scoped>
.watermark-warp {
  width: 100%;
  height: 300px;
  border: 1px solid #eee;
}
.disabled-warp {
  width: 300px;
  height: 90px;
  background-color: #eee;
}
</style>
