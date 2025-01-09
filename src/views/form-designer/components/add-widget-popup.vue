<template>
  <el-tabs v-model="active" type="border-card" class="demo-tabs">
    <el-tab-pane v-for="item in layoutList" :key="item" :label="item.title" :name="item.layout">
      <template v-if="item.layout == 'cols'">
        <div class="cols-group">
          <div class="cols-group__item" v-for="(dataItem, dataIndex) in item.data" :key="dataIndex">
            <select-widget v-model="item.data[dataIndex]"></select-widget>
          </div>
        </div>
      </template>
      <template v-else>
        <select-widget v-model="item.data"></select-widget>
      </template>
    </el-tab-pane>
  </el-tabs>
  <div class="dialog-footer">
    <el-button plain @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectWidget from './select-widget.vue';
import { v4 } from 'uuid';

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const emit = defineEmits(['on-end']);

const active = ref('');

const layoutList = ref([
  { title: '默认', layout: '', data: [] },
  { title: 'item', layout: 'item', data: [] },
  { title: 'flex', layout: 'flex', data: [] },
  { title: 'cols', layout: 'cols', data: [[], []] },
  { title: 'rows', layout: 'rows', data: [], extraFields: { label: 'rows多行:' } },
  { title: 'rows-flex', layout: 'rows-flex', data: [], extraFields: { label: 'rows-flex多行:' } },
]);

// 取消
const handleClose = async () => {
  modalStore.closeModal();
};

// 确认
const handleSubmit = async () => {
  const { data = [] } = layoutList.value.find((v) => v.layout == active.value) || {};

  const addWidgetIdFn = (event) => {
    for (const item of event) {
      if (!item.widgetId) {
        item['widgetId'] = v4();
      }
    }
  };

  active.value == 'cols' ? data.forEach((item) => addWidgetIdFn(item)) : addWidgetIdFn(data);

  const { widgetId } = modalStore.getModal();

  if (active.value == '') {
    emit('on-end', active.value, data, widgetId);
  } else {
    const { extraFields = {} } = layoutList.value.find((v) => v.layout == active.value) || {};
    const _list = [{ widgetId: v4(), layout: active.value, children: data, ...extraFields }];
    emit('on-end', active.value, _list, widgetId);
  }

  modalStore.closeModal();
};

const initData = () => {
  const { data, layout = '', type, widgetId } = modalStore.getModal();
  console.log(data, type, 'data');
  if (type == 'edit') {
    active.value = layout;
    const layoutIdx = layoutList.value.findIndex((v) => v.layout == layout);
    layoutList.value[layoutIdx].data = [data];
    console.log(layoutList.value, 'layoutList.value');
  }

  if (widgetId) {
    active.value = '';
    layoutList.value = [{ title: '默认', layout: '', data: [] }];
  }
};

initData();
</script>

<style lang="scss" scoped>
.cols-group {
  width: 100%;
  display: flex;

  &__item {
    width: 100%;
    display: flex;
    text-align: center;

    &:last-child {
      &::after {
        display: none;
        opacity: 0;
      }
    }

    &::after {
      content: '';
      display: block;
      height: 100%;
      border-right: 1px dashed var(--el-border-color);
      box-sizing: border-box;
    }
  }
}
</style>
