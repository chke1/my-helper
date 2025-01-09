<template>
  <div class="more-modal">
    <virtual-scroll-checkout
      :itemSize="56"
      :items="virtualItems"
      v-model:checkItems="virtualCheckItems"
    >
      <template #default="{ item }">
        <div class="item">
          <img :src="item.url" alt="" />
          <div class="item-content">
            <p>{{ item.title }}</p>
            <p>{{ item.subTitle }}</p>
          </div>
        </div>
      </template>
    </virtual-scroll-checkout>

    <div class="more-modal-fooder">
      <el-button plain @click="handleCancel"> 取 消 </el-button>
      <el-button type="primary" @click="handleConfirm"> 确 定 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import virtualScrollCheckout from '@/components/virtual-scroll/virtual-scroll-checkout.vue';

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const emit = defineEmits(['update:modelValue', 'on-end', 'on-close']);

const props = defineProps({
  modelValue: {
    type: [Array],
    default: () => [],
  },
});

const virtualItems = ref(
  Array.from(Array(20000), (v, i) => {
    return {
      id: i,
      title: `我是标题${i}`,
      subTitle: `描述描述描述描述描述描述描述描述描述${i}`,
      extra: `额外内容${i}`,
      url: import.meta.env.BASE_URL + 'avatar.jpg',
    };
  }),
);

const virtualCheckItems = ref([]);

const handleCancel = () => {
  modalStore.closeModal();
  emit('on-close');
};

const handleConfirm = () => {
  modalStore.closeModal();

  emit('update:modelValue', virtualCheckItems.value);
  emit('on-end', virtualCheckItems.value);
};

const initModal = () => {
  virtualCheckItems.value = props.modelValue;
};

initModal();
</script>

<style lang="scss" scoped>
:deep(.el-checkbox) {
  white-space: normal;
}
.item {
  display: flex;
  align-items: center;
  width: 100%;

  & > img {
    width: 38px;
    height: 38px;
    border-radius: 6px;
    margin-right: 10px;
    object-fit: cover;
    flex-shrink: 0;
  }

  &-content {
    flex: 1;
    height: 38px;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    flex-flow: row wrap;

    & > p {
      width: 100%;
      margin: 0;
      overflow: hidden;

      &:nth-child(1) {
        color: var(--el-text-color-primary);
        font-size: 14px;
        font-weight: 500;
        @include useTextEllipsis;
      }

      &:nth-child(2) {
        font-size: 12px;
        color: var(--el-text-color-placeholder);
        @include useTextEllipsis;
      }
    }
  }
}
.more-modal-fooder {
  margin-top: 26px;
  text-align: right;
}
</style>
