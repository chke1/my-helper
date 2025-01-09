<template>
  <div class="image-box" :style="{ width, height }">
    <img ref="imgRef" :src="src" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

const emit = defineEmits(['on-crop']);

const props = defineProps({
  width: {
    type: String,
    default: '300px',
  },
  height: {
    type: String,
    default: '300px',
  },
  src: {
    type: String,
    default: '',
  },
});

const imgRef = ref();

const cropper = ref();

const cut = () => {
  const data = cropper.value.getCroppedCanvas();
  console.log(data.toDataURL());
};

onMounted(() => {
  cropper.value = new Cropper(imgRef.value, {
    guides: true, // 是否显示虚拟网格线
    viewMode: 1, // 不允许超出图片边界
    // aspectRatio: 16 / 9, // 裁剪图片的宽高比例
    crop(event) {
      console.log(event);
      console.log(event.target);
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
      emit('on-crop', 'event');
    },
  });
  console.log(cropper, 'cropper');
});

defineExpose({ cropper });
</script>

<style lang="scss" scoped>
.image-box {
  width: 400px;
  height: 400px;

  // 插件bug
  :deep(.cropper-point.point-se) {
    width: 5px;
    height: 5px;
  }
}
</style>
