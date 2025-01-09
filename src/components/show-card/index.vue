<template>
  <div :class="['show-card', `is-${size}-size`]" :id="showCardIdName">
    <div class="show-card__left">
      <img class="show-card__img" :src="cover" v-if="cover" />
      <div class="show-card__content">
        <span class="show-card__title" v-if="title">{{ title }}</span>
        <span class="show-card__sub-title" v-if="subTitle">{{ subTitle }}</span>
      </div>
    </div>
    <div class="show-card__right">{{ extra }}</div>
  </div>
</template>

<script setup name="show-card">
import { nextTick, watchEffect } from 'vue';

const props = defineProps({
  // 封面
  cover: {
    type: [String],
    default: '',
  },

  // 标题
  title: {
    type: [String],
    default: '',
  },

  // 副标题
  subTitle: {
    type: [String],
    default: '',
  },

  // 额外信息
  extra: {
    type: [String],
    default: '',
  },

  // 大小 'huge' | 'large' | 'default' | 'small'
  size: {
    type: [String],
    default: 'default',
  },

  // 长度
  width: {
    type: [String, Number],
    default: '100%',
  },

  // 配置项
  options: {
    type: [Object],
    default: () => {
      return {};
    },
  },
});

const showCardIdName = `showCardElement_${props.size}`;

watchEffect(() => {
  nextTick(() => {
    let showCardElement = document.getElementById(showCardIdName);
    let { coverRadius = '4px', bgColor = 'var(--el-fill-color-light)' } = props.options;

    // width
    let width = typeof props.width == 'string' ? props.width : props.width + 'px';
    showCardElement.style.setProperty('--w', width);

    // coverRadius
    coverRadius = typeof coverRadius == 'string' ? coverRadius : coverRadius + 'px';
    showCardElement.style.setProperty('--r', coverRadius);

    // bgColor
    showCardElement.style.setProperty('--b', bgColor);
  });
});
</script>

<style lang="scss" scoped>
.show-card {
  --w: 100%;
  --z: 42px;
  --r: 4px;
  --b: var(--el-fill-color-light);
  --tf: 14px;
  --tsf: 12px;
  width: var(--w);
  display: flex;
  align-items: center;
  padding: 10px 16px;
  box-sizing: border-box;
  background-color: var(--b);
  border-radius: 4px;
  overflow: hidden;

  &.is-small-size {
    --z: 32px;
  }

  &.is-large-size {
    --z: 52px;
    --tf: 16px;
  }

  &.is-huge-size {
    --z: 62px;
    --tf: 18px;
    --tsf: 14px;
  }

  &__left {
    flex: 1;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__right {
    flex-shrink: 0;
    color: var(--el-text-color-regular);
    font-size: 12px;
    margin-left: 20px;
  }

  &__img {
    border-radius: var(--r);
    margin-right: 10px;
    flex-shrink: 0;
    width: var(--z);
    height: var(--z);
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
    align-content: space-around;
    height: var(--z);
  }

  &__title {
    width: 100%;
    color: var(--el-text-color-primary);
    font-size: var(--tf);
    line-height: 20px;
    @include useTextEllipsis;
  }

  &__sub-title {
    width: 100%;
    color: var(--el-text-color-secondary);
    font-size: var(--tsf);
    line-height: 20px;
    @include useTextEllipsis;
  }
}
</style>
