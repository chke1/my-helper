<template>
  <div class="show-drawer">
    <virtual-scroll-show :itemSize="56" :items="getListData">
      <template #default="{ item }">
        <div class="item">
          <div class="item-left">
            <img :src="item.url" alt="" />
            <div class="item-left-content">
              <p>{{ item.title }}</p>
              <p>{{ item.subTitle }}</p>
            </div>
          </div>
          <span class="item-extra">{{ item.extra }}</span>
        </div>
      </template>
    </virtual-scroll-show>

    <div class="show-drawer-fooder">
      <el-button plain @click="handleCancel"> 取 消 </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import virtualScrollShow from '@/components/virtual-scroll/virtual-scroll-show.vue';

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const emit = defineEmits(['on-end', 'on-close']);

const props = defineProps({
  list: {
    type: [Array],
    default: () => [],
  },
});

const getListData = computed(() => {
  return props.list.length ? props.list : modalStore.getModal()?.list || [];
});

const handleCancel = () => {
  modalStore.closeModal();
  emit('on-close');
};
</script>

<style lang="scss" scoped>
.show-drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-left {
  flex: 1;
  display: flex;
  align-items: center;

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

.item-extra {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  flex-shrink: 0;
  margin-left: 20px;
}
.show-drawer-fooder {
  margin-top: 26px;
  text-align: right;
}
</style>
