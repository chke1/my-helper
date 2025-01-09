<template>
  <div class="virtual-scroll-show">
    <recycle-scroller :key-field="keyField" :items="items" :item-size="itemSize">
      <template #default="{ item }">
        <div class="scroller-item" :style="{ height: `${itemSize}px` }">
          <slot :item="item">
            {{ item.title }}
          </slot>
        </div>
      </template>
    </recycle-scroller>
  </div>
</template>

<script setup name="virtual-scroll-show">
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const emit = defineEmits([]);

const props = defineProps({
  // 数据
  items: {
    type: Array,
    default: () => [],
  },

  // id字段名
  keyField: {
    type: String,
    default: 'id',
  },

  // 每一项高度大小
  itemSize: {
    type: Number,
    default: 50,
  },
});
</script>

<style lang="scss" scoped>
@mixin item() {
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}

.virtual-scroll-show {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 0 6px;
  min-width: 300px;
  overflow: hidden;
}

.scroller-item {
  width: 100%;
  @include item();

  &:hover {
    background-color: var(--el-color-info-light-8);
    border-radius: 6px;
  }
  :deep(.el-radio__label) {
    width: 100%;
  }
}

.scroller .is-checked.scroller-item {
  background-color: var(--el-color-info-light-8);
  border-radius: 4px;
}

.scroller-all,
.scroller-select {
  height: 30px;
  flex-shrink: 0;
  @include item();
}
</style>
