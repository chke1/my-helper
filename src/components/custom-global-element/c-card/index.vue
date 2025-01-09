<template>
  <div :class="['c-card', isAffix && 'is-affix']">
    <div :class="['c-card__box', isNone ? 'is-none' : 'is-shadow']" :id="id">
      <!-- header -->
      <div class="c-card__header" v-if="$slots.header">
        <slot name="header"></slot>
      </div>
      <!-- body -->
      <div :class="['c-card__body', bodyClass, isNone && 'is-none']" :style="bodyStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup name="c-card">
const props = defineProps({
  // id
  id: {
    type: String,
    default: '',
  },

  // 自定义样式
  bodyStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },

  // 自定义类型
  bodyClass: {
    type: String,
    default: '',
  },

  // 将元素固定在特定可视区域。
  isAffix: {
    type: Boolean,
    default: false,
  },

  // 行内布局
  isNone: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.c-card {
  width: 100%;
  flex: 1;
  padding: 12px;
  box-sizing: border-box;
  background-color: var(--el-fill-color-light);
}

.c-card__box {
  width: 100%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  // background-color: var(--el-bg-color);
}

.c-card__header {
  padding: 14px 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  box-sizing: border-box;
  color: var(--el-text-color-regular);
  font-size: 14px;
}

.c-card__body {
  // flex: 1;
  width: 100%;
  height: 100%;
  // overflow 会导致粘性布局失效
  // overflow-x: auto;
  padding: 20px;
  box-sizing: border-box;
}

.is-affix {
  overflow: hidden;

  .c-card__body {
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    // 加了overflow阴影不显示
    // overflow: hidden;
    // overflow: auto;
  }

  .c-card__box {
    height: 0;
  }
}

.is-flex-column {
  display: flex;
  flex-direction: column;
}

.is-none {
  // background-color: transparent;
  border-radius: 0px;
  box-shadow: none;
  padding: 0px;
}

.is-shadow {
  background-color: var(--el-bg-color);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-lighter);
  border: 1px solid var(--el-border-color-light);
  transition: var(--el-transition-duration);
}

.is-body-padding {
  padding: 20px;
}
</style>
