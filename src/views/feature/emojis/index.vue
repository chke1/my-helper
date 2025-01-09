<template>
  <c-card>
    <template #header>注：素材来源于网络</template>
    <div class="emojis">
      <div class="emojis-left">
        <emoji-picker isBorder @change="onEmojiChange"></emoji-picker>
        <c-input
          v-model="defaultValue"
          class="emojis-left-textarea"
          width="100%"
          type="textarea"
          placeholder="请选择表情"
          :rows="3"
        ></c-input>
      </div>
      <div class="emojis-right">
        <c-input
          v-model="defaultPopoverValue"
          class="emojis-right-textarea"
          width="100%"
          type="textarea"
          placeholder="请选择表情"
          :rows="5"
        ></c-input>
        <c-popover width="auto">
          <emoji-picker v-model="defaultPopoverValue" @change="onPopoverEmojiChange"></emoji-picker>
          <template #reference>
            <el-button>表情</el-button>
          </template>
        </c-popover>
      </div>
    </div>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';

import emojiPicker from '@/components/emoji-picker/index.vue';

const defaultValue = ref('');
const onEmojiChange = (e) => {
  defaultValue.value += e;
};

const defaultPopoverValue = ref('');
const onPopoverEmojiChange = (e) => {
  defaultPopoverValue.value += e;
};
</script>

<style lang="scss" scoped>
.emojis {
  display: flex;

  &-left {
    margin: 20px;

    &-textarea {
      width: 100%;
      margin-top: 20px;
    }
  }
  &-right {
    width: 410px;
    margin: 20px 20px 20px 120px;

    text-align: center;
    &-textarea {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
