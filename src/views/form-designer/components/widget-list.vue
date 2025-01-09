<template>
  <VueDraggable v-model="getRows" animation="300">
    <div v-for="(item, index) in getRows" :key="item.widgetId">
      <template v-if="item.layout">
        <fieldset
          v-if="item.layout == 'cols'"
          :class="['widget-cols', item.widgetId == widgetId && 'is-form-active']"
          @click.stop="handleSwitchItem(item)"
        >
          <legend>{{ item.layout }}</legend>
          <div class="widget-cols__item" v-for="(colsItems, idx) in item.children" :key="colsItems">
            <widget-list v-model:formRows="item.children[idx]" :widgetId="widgetId"></widget-list>
          </div>
        </fieldset>

        <fieldset
          v-else
          :class="['widget-items', item.widgetId == widgetId && 'is-form-active']"
          @click.stop="handleSwitchItem(item)"
        >
          <legend>{{ item.layout }}</legend>
          <widget-list v-model:formRows="item.children" :widgetId="widgetId"></widget-list>
        </fieldset>
      </template>

      <div
        v-else
        :class="['form-item', item.widgetId == widgetId && 'is-form-active']"
        @click.stop="handleSwitchItem(item)"
      >
        <span :class="[item.formType == 'title' && 'is-title']">{{ item.label }}</span>
        <span class="form-tag">{{ item.formType }}</span>
      </div>

      <!-- 操作栏 -->
      <div class="handle-divider" v-if="item.widgetId == widgetId">
        <el-icon class="is-icon" @click.stop="handleCircle(item)"><CirclePlus /></el-icon>
        <el-icon class="is-icon" @click.stop="handleDelete(item, index)"><Delete /></el-icon>
        <!-- <el-icon class="is-icon" @click.stop="handleEdit(item)"><Edit /></el-icon> -->
      </div>
    </div>
  </VueDraggable>
</template>

<script setup name="widget-list">
import { computed, inject } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { CirclePlus, Delete, Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { MessageBox } from '@/utils/message-box.js';

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const onSwitchFormItem = inject('on-switch-form-item');

const emit = defineEmits(['update:formRows', 'update:widgetId', 'on-switch']);

const props = defineProps({
  formRows: {
    type: Array,
    default: () => [],
  },
  widgetId: {
    type: [String],
    default: '',
  },
});

const getRows = computed({
  get() {
    return props.formRows;
  },
  set(e) {
    emit('update:formRows', e);
  },
});

const handleSwitchItem = (item) => {
  console.log(item, 'item');
  // emit('update:widgetId', item.widgetId, item);
  // emit('on-switch', item.widgetId, item);
  onSwitchFormItem(item.widgetId, item);
};

const handleSwitchWdget = (widgetId, item) => {
  console.log(widgetId, item, 'widgetId, item');
  // emit('on-switch', widgetId, item);
};

const handleCircle = (item) => {
  modalStore.openModal('add-widget-popup', { type: 'add', widgetId: item.widgetId, data: item });
};

const handleDelete = (item, index) => {
  MessageBox({
    title: '确认删除该组件项',
    beforeClose: (action, instance, done) => {
      const rows = getRows.value;
      rows.splice(index, 1);
      emit('update:formRows', rows);
      ElMessage.success('删除成功');
      done();
    },
  });
};

const handleEdit = (item) => {
  modalStore.openModal('add-widget-popup', { type: 'edit', data: item });
};
</script>

<style lang="scss" scoped>
%widget-style {
  border: 1px solid var(--el-border-color);
  text-align: center;
  margin: 10px 10px 10px 10px;
  border-radius: 4px;
  padding: 6px;
  box-sizing: border-box;
  cursor: move;
}

.widget-cols,
.widget-items {
  @extend %widget-style;

  & > legend {
    padding: 0 16px;
    font-weight: 800;
  }
}
.widget-cols {
  display: flex;
  @extend %widget-style;

  &__item {
    flex: 1;
  }
}

.is-form-active {
  border: 2px solid var(--el-color-primary);

  & > legend {
    color: var(--el-color-primary);
    padding: 0 16px;
  }

  .form-tag {
    background-color: rgb(64, 158, 255, 1);
  }
}

.handle-divider {
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  margin-bottom: 20px;

  &::before,
  &::after {
    content: '';
    display: block;
    border-top: 1px dashed var(--el-border-color-light);
    width: 100%;
    margin: 0 10px;
  }

  .is-icon {
    font-size: 16px;
    margin: 0 6px;
    cursor: pointer;
    color: var(--el-text-color-regular);

    &:hover {
      color: var(--el-color-primary);
    }
  }
}

.form-tag {
  font-size: 10px;
  color: var(--el-bg-color);
  padding: 2px 6px;
  box-sizing: border-box;
  background-color: rgb(64, 158, 255, 0.4);
  border-radius: 0px 0px 0px 0px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.form-item {
  display: flex;
  align-items: center;
  position: relative;
  height: 36px;
  @extend %widget-style;

  &:hover {
    .form-tag {
      background-color: rgb(64, 158, 255, 1);
    }
  }
}
</style>
