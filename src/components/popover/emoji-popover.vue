<template>
  <c-popover v-model:visible="visible" width="auto">
    <emoji-picker @change="onEmojiChange"></emoji-picker>
    <template #reference>
      <slot>
        <img class="is-emoji" src="@/assets/common/ic-emoji.png" alt="" />
      </slot>
    </template>
  </c-popover>
</template>

<script setup>
import { ref } from 'vue';
import emojiPicker from '@/components/emoji-picker/index.vue';

const emit = defineEmits(['change']);

const visible = ref(false);

const onEmojiChange = (e) => {
  emit('change', e);
  visible.value = false;
};
</script>

<style lang="scss" scoped>
.is-emoji {
  width: 20px;
  height: 20px;
  object-fit: cover;
  cursor: pointer;
}
</style>
