<template>
  <div class="virtual-scroll-checkout" :style="{ height: `${height}px` }">
    <!-- 左列虚拟列表 -->
    <div class="scroller-left">
      <div class="scroller-all">
        <el-checkbox
          :model-value="isAllChecked"
          :indeterminate="isIndeterminate"
          @change="onAllChange()"
        >
          全选：{{ cacheCheckItems.length }}/{{ items.length }}
        </el-checkbox>
      </div>
      <recycle-scroller :key-field="keyField" :items="items" :item-size="itemSize">
        <template #default="{ item }">
          <el-checkbox
            class="scroller-left-item"
            :style="{ height: `${itemSize}px` }"
            :model-value="checkItemsMap[item[keyField]]"
            @change="onItemChange(item)"
          >
            <template v-if="$slots.default">
              <slot :item="item">
                {{ item.title }}
              </slot>
            </template>
            <template v-else>
              <slot name="left" :item="item">
                {{ item.title }}
              </slot>
            </template>
          </el-checkbox>
        </template>
      </recycle-scroller>
    </div>

    <!-- 右列虚拟列表 -->
    <div class="scroller-right">
      <recycle-scroller :key-field="keyField" :items="cacheCheckItems" :item-size="itemSize">
        <template #default="{ item }">
          <div class="scroller-right-item" :style="{ height: `${itemSize}px` }">
            <div class="scroller-right-item--left">
              <template v-if="$slots.default">
                <slot :item="item">
                  {{ item.title }}
                </slot>
              </template>
              <template v-else>
                <slot name="right" :item="item">
                  {{ item.title }}
                </slot>
              </template>
            </div>
            <el-icon class="scroller-right-item--close" @click="onItemClose(item)">
              <Close />
            </el-icon>
          </div>
        </template>
      </recycle-scroller>
    </div>
  </div>
</template>

<script setup name="virtual-scroll-checkout">
import { computed, nextTick, ref, watchEffect } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const emit = defineEmits(['update:checkItems']);

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
  checkItems: {
    type: Array,
    default: () => [],
  },
});

// 是否全选
const isAllChecked = computed(() => cacheCheckItems.value.length === props.items.length);

// 部分数据勾选状态
const isIndeterminate = computed(() =>
  isAllChecked.value ? false : cacheCheckItems.value.length > 0,
);

// 是否选择字典
const checkItemsMap = ref({});

// 已选择暂存数据
const cacheCheckItems = ref(props.checkItems);

// 是否执行watchEffect里的计算
let isEffect = true;

watchEffect(() => {
  if (isEffect) {
    console.log('checkItems更新');
    console.log('items更新');

    cacheCheckItems.value = props.checkItems;

    for (const item of props.items) {
      checkItemsMap.value[item[props.keyField]] = false;
    }

    for (const item of props.checkItems) {
      checkItemsMap.value[item[props.keyField]] = true;
    }
  }
});

const onItemChange = (item) => {
  let status = checkItemsMap.value[item[props.keyField]];

  checkItemsMap.value[item[props.keyField]] = !status;

  let index = cacheCheckItems.value.findIndex((v) => v[props.keyField] == item[props.keyField]);

  if (index === -1) {
    cacheCheckItems.value = cacheCheckItems.value.concat([item]);
  } else {
    cacheCheckItems.value.splice(index, 1);
    cacheCheckItems.value = cacheCheckItems.value.concat([]);
  }

  updateCheckItems();
};

const onAllChange = () => {
  for (const item of props.items) {
    checkItemsMap.value[item[props.keyField]] = !isAllChecked.value;
  }
  cacheCheckItems.value = !isAllChecked.value ? props.items.concat([]) : [];
  updateCheckItems();
};

const onItemClose = (item) => {
  onItemChange(item);
};

const updateCheckItems = () => {
  isEffect = false;
  emit('update:checkItems', cacheCheckItems.value);
  nextTick(() => (isEffect = true));
};
</script>

<style lang="scss" scoped>
@mixin item() {
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}

.virtual-scroll-checkout {
  width: 100%;
  display: flex;
  border: 1px solid var(--el-border-color);
  padding: 18px 0;
  box-sizing: border-box;
  border-radius: 4px;
}

.scroller-left,
.scroller-right {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 6px;
  min-width: 220px;
}

.scroller-left .is-checked.scroller-left-item {
  background-color: var(--el-color-info-light-8);
  border-radius: 4px;
}

.scroller-right {
  border-left: 1px dashed var(--el-border-color);
  box-sizing: border-box;
}

.scroller-left-item,
.scroller-right-item {
  width: 100%;
  @include item();

  &:hover {
    background-color: var(--el-color-info-light-8);
    border-radius: 6px;
  }
}

.scroller-right-item {
  justify-content: space-between;

  &--left {
    flex: 1;
  }

  &--close {
    cursor: pointer;
    font-size: 14px;
  }
}

.scroller-all,
.scroller-select {
  height: 30px;
  flex-shrink: 0;
  @include item();
}
</style>
