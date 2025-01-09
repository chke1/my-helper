<template>
  <c-card isAffix>
    <div class="flex text-label">
      <div class="left-menu">
        <div class="left-menu-search">
          <c-input
            v-model="searchValue"
            width="100%"
            class="left-menu-input"
            placeholder="查找关键字"
          >
          </c-input>
          <el-button type="primary" @click="handleMark">标注</el-button>
        </div>
        <c-input
          v-model="contentText"
          class="left-menu-textarea"
          type="textarea"
          width="100%"
          show-word-limit
        ></c-input>
      </div>
      <div class="right-content">
        <div class="right-content-num">存在{{ contentMarkNum || 0 }}个标注数据</div>
        <pre class="right-content-text" v-html="contentMarkText"></pre>
        <c-empty v-if="!contentMarkText"></c-empty>
      </div>
    </div>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';
import { richExistText } from '@/utils/tools.js';

const searchValue = ref('');
const contentText = ref('');

const contentMarkNum = ref('');
const contentMarkText = ref('');
const loading = ref(false);

const handleMark = () => {
  if (!searchValue.value) return;

  loading.value = true;

  let exp = `<span class='is-primary-text'>${searchValue.value}</span>`;

  // 处理特殊标签
  let text = richExistText(contentText.value).replace(new RegExp(searchValue.value, 'g'), exp);

  let length = searchValue.value.length;

  let textLength = contentText.value.length;

  let num = 0;

  let index = 0;

  while (searchValue.value && index != -1 && index < textLength) {
    index = contentText.value.indexOf(searchValue.value, num == 0 ? index : index + length);
    num++;
    console.log(num, 'num', index, 'index', searchValue.value);
  }

  contentMarkNum.value = num - 1;

  contentMarkText.value = text;

  loading.value = false;
};
</script>

<style lang="scss" scoped>
.text-label {
  height: 100%;
}
.left-menu {
  width: 360px;
  border-right: 1px solid var(--border-color);
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &-search {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &-input {
    margin-right: 10px;
  }

  &-textarea {
    flex: 1;

    :deep(.el-textarea__inner) {
      height: 100%;
    }
  }
}

.right-content {
  height: 100%;
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: auto;

  &-text {
    line-height: 22px;
    white-space: pre;
  }
}
</style>
