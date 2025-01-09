<template>
  <div :class="['emoji-warp', isBg && 'is-bg', isBorder && 'is-border']">
    <el-carousel
      v-if="currentEm == 'iosem'"
      ref="carouselRef"
      class="emoji-carousel"
      :autoplay="false"
      @mousewheel="rollScroll"
      indicator-position="outside"
      height="370px"
      trigger="click"
    >
      <el-carousel-item v-for="(item, index) in emojiIosData" :key="index">
        <div class="emoji-box">
          <span
            class="emoji-ios-icon"
            v-for="(childItem, childIndex) in item"
            :key="childIndex"
            @click="onEmoji(childItem, childIndex)"
          >
            <i :class="['em', `em-${childItem.code}`]"></i>
          </span>
        </div>
      </el-carousel-item>
    </el-carousel>

    <el-carousel
      v-else-if="currentEm == 'wxem'"
      ref="carouselRef"
      class="emoji-carousel"
      :autoplay="false"
      @mousewheel="rollScroll"
      indicator-position="outside"
      height="370px"
      trigger="click"
    >
      <el-carousel-item v-for="(item, index) in emojiWxData" :key="index">
        <div class="emoji-box">
          <span
            class="emoji-wx-icon"
            v-for="(childItem, childIndex) in item"
            :key="childIndex"
            @click="onEmoji(childItem, childIndex)"
          >
            <i class="wxem" :style="{ backgroundPosition: childItem.position }"></i>
          </span>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- footer -->
    <div class="emoji-footer">
      <span
        :class="['emoji-ios-icon', currentEm == 'iosem' && 'em-active']"
        @click="onSwitch('iosem')"
      >
        <i :class="['em', 'em-smile']"></i>
      </span>
      <span
        :class="['emoji-wx-icon', currentEm == 'wxem' && 'em-active']"
        @click="onSwitch('wxem')"
      >
        <i :class="['wxem']"></i>
      </span>
    </div>
  </div>
</template>

<script setup name="emoji-picker">
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { setTwoDimArray } from '@/utils/tools.js';
import emojiIos from './emoji-ios.js';
import emojiWx from './emoji-wx.js';

const props = defineProps({
  isBg: {
    type: Boolean,
    default: false,
  },
  isBorder: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change']);

// ref
const carouselRef = ref();

// 当前选择的标签类型
const currentEm = ref('iosem');

// ios
const emojiIosData = ref(setTwoDimArray(emojiIos, 56));

// weixin
const emojiWxData = ref([]);

// 获取weixin表格的定位点
const getEmojiWx = (data) => {
  let x = 0;
  let y = 0;
  return data.map((v, i) => {
    if (i) {
      x++;
      if (!(i % 8)) {
        x = 0;
        y++;
      }
    }
    return { ...v, position: `-${x * 44}px -${y * 44.2}px` };
  });
};

emojiWxData.value = setTwoDimArray(getEmojiWx(emojiWx), 56);

// 选择表情
const onEmoji = (item) => {
  emit('change', item.emoji);
};

// 切换表情类型
const onSwitch = (event) => {
  currentEm.value = event;
};

// 鼠标滚轮滚动
const rollScroll = useDebounceFn(async (event) => {
  if (event.wheelDelta > 0) {
    carouselRef.value.prev();
  } else if (event.wheelDelta < 0) {
    carouselRef.value.next();
  }
}, 100);
</script>

<style lang="scss" scoped>
@import url(./emoji.css);
.is-border {
  border: 1px solid #eee;
}
.is-bg {
  background-color: #eee;
}
.emoji-warp {
  width: 410px;
  border-radius: 6px;
}

.emoji-carousel {
  width: 384px;
  margin: auto;
}

.emoji-box {
  min-height: 350px;
  padding-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
}

// ios
.emoji-ios-icon {
  display: inline-block;
  width: 48px;
  height: 48px;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  margin-bottom: 4px;

  &:hover {
    background: #e0e0e0;
    cursor: pointer;
    border-radius: 6px;
  }
}

// 微信
.emoji-wx-icon {
  @extend .emoji-ios-icon;
  vertical-align: middle;
  .wxem {
    display: inline-block;
    background: url(../../assets/emojis/ic-wx-emoji.png);
    height: 1.4em;
    width: 1.4em;
    font-size: 20px;
    overflow: hidden;
    line-height: 16px;
    vertical-align: middle;
    background-size: 1200%;
    padding: 0;
    margin-top: -4px;
    background-position: 0 0;
  }
}

// footer切换
.emoji-footer {
  box-sizing: border-box;
  padding: 8px;
  border-top: 1px solid #dee0e3;
  display: flex;
  align-items: center;

  & > span {
    width: 44px;
    height: 44px;
    line-height: 44px;
    margin-bottom: 0px;
    border-radius: 6px;
    .wxem {
      font-size: 16.4px;
    }
    .em {
      font-size: 16.5px;
    }
  }
}

.em-active {
  background: #e0e0e0;
}
</style>

<style lang="scss">
.emoji-carousel .el-carousel__button {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
// 隐藏carousel两侧箭头
.emoji-carousel .el-carousel__arrow {
  display: none;
}
.emoji-carousel .el-carousel__arrow--left {
  display: none;
}
.emoji-carousel .el-carousel__arrow--right {
  display: none;
}
</style>
