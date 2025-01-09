<template>
  <div>
    <video-player v-bind="$attrs">
      <template v-for="(value, key) in $slots" #[key]>
        <slot :name="key"></slot>
      </template>
    </video-player>
  </div>
</template>

<script setup>
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

const emit = defineEmits([]);

const props = defineProps({
  options: {
    type: [Object],
    default: () => {
      return {
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          volumePanel: { inline: false }, // 音量控制  不使用水平方式
          currentTimeDisplay: true, // 是否显示当前时间
          progressControl: true, // 是否显示进度条
          playbackRateMenuButton: true, // 是否显示调整播放倍速按钮
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: true, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
          // children: [],
        },
      };
    },
  },
});
</script>

<style lang="scss" scoped></style>
