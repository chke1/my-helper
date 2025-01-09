<template>
  <div class="table-group" v-loading="loading">
    <template v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <template v-else>
      <c-input width="100%" v-model="groupInput" placeholder="请输入关键字" />
    </template>

    <template v-if="$slots.default">
      <div class="table-group-list">
        <slot></slot>
      </div>
    </template>
    <el-scrollbar v-else>
      <ul class="table-group-list">
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="[item[getOptions.id] == modelValue && 'is-active']"
          @click="handleGroupClick(item)"
        >
          <span>{{ item[getOptions.label] }}</span>
          <el-dropdown :hide-on-click="false">
            <el-icon class="is-more"><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item divided>
                  <span class="is-error-text">删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </el-scrollbar>
    <el-button @click="handleCreate">{{ createBtnText }}</el-button>
  </div>
</template>

<script setup name="table-group">
import { computed, ref } from 'vue';
import { MoreFilled } from '@element-plus/icons-vue';

const emit = defineEmits(['on-change', 'on-create', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Object,
    default: () => {
      return {};
    },
  },
  createBtnText: {
    type: [String],
    default: '+ 新增分组',
  },
});

const getOptions = computed(() => {
  const { id = 'id', label = 'label' } = props.options;
  return { id, label };
});

const groupInput = ref('');

const handleGroupClick = (item) => {
  emit('update:modelValue', item[getOptions.value.id]);
  emit('on-change', item);
};

const handleCreate = () => {
  emit('on-create');
};
</script>

<style lang="scss" scoped>
.table-group {
  display: flex;
  flex-direction: column;
  width: 240px;
  flex-shrink: 0;
  margin-right: 6px;
  padding: 14px 16px;
  box-sizing: border-box;
  @include card-box;
}

.table-group-list {
  height: 100%;
  padding: 0;
  margin: 10px 0;

  .is-active {
    background-color: var(--el-menu-hover-bg-color) !important;
  }

  & > li {
    padding: 16px 12px 16px 14px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--el-text-color-primary);

    &:hover {
      background-color: var(--el-menu-hover-bg-color);
    }

    .is-more {
      color: var(--el-color-info);
      font-size: 12px;
      cursor: pointer;
      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
