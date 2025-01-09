<template>
  <div class="virtual-scroll-radio" :style="{ height: `${height}px` }">
    <div class="scroller-all">全部：{{ items.length }}</div>
    <recycle-scroller :key-field="keyField" :items="items" :item-size="itemSize">
      <template #default="{ item }">
        <el-radio
          class="scroller-item"
          v-model="getCheckItem[keyField]"
          :label="item[keyField]"
          :style="{ height: `${itemSize}px` }"
          @change="onItemChange(item)"
        >
          <slot :item="item">
            {{ item.title }}
          </slot>
        </el-radio>
      </template>
    </recycle-scroller>
  </div>
</template>

<script setup name="virtual-scroll-radio">
import { computed } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const emit = defineEmits(['update:checkItem']);

const props = defineProps({
  // 待选择数据
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

  // 整体高度
  height: {
    type: Number,
    default: 520,
  },

  // 已选中数据
  checkItem: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const getCheckItem = computed(() => props.checkItem);

const onItemChange = (item) => {
  emit('update:checkItem', { ...item });
};
</script>

<style lang="scss" scoped>
@mixin item() {
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}

.virtual-scroll-radio {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 300px;
  border: 1px solid var(--el-border-color);
  padding: 8px 6px 0;
  box-sizing: border-box;
  border-radius: 4px;
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

.virtual-scroll-radio .is-checked.scroller-item {
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
