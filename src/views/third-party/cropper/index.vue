<template>
  <c-card>
    <example-container name="cropperjs">
      <div class="cropper">
        <cropper
          ref="cropperEl"
          width="520px"
          height="520px"
          :src="imgUrl"
          @on-crop="onCrop"
        ></cropper>

        <img class="cropper-img" :src="cropperImgUrl" alt="" />
      </div>
    </example-container>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';

import { useDebounceFn } from '@vueuse/core';

// components
import exampleContainer from '@/components/example-container/index.vue';

import { useAsyncComponent } from '@/hooks/useAsyncComponent/index.js';
const cropper = useAsyncComponent(() => import('@/components/cropper/index.vue'));

const imgUrl = import.meta.env.BASE_URL + 'account-list/ic-account-avatar1.jpg';

const cropperImgUrl = ref('');

const cropperEl = ref();

const onCrop = useDebounceFn(() => {
  const data = cropperEl.value.cropper.getCroppedCanvas();
  cropperImgUrl.value = data.toDataURL();
}, 300);
</script>

<style lang="scss" scoped>
.cropper {
  display: flex;
  align-items: center;

  &-img {
    width: auto;
    height: 300px;
    margin-left: 20px;
  }
}
</style>
