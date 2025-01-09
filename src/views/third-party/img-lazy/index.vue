<template>
  <c-card class="img-lazy">
    <!-- vue-lazyload -->
    <example-container name="vue-lazyload">
      <div class="img-lazy-box">
        <img v-for="item in imgList" :key="item" v-lazy="item.url" />
      </div>
    </example-container>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';

// components
import exampleContainer from '@/components/example-container/index.vue';
import img from '@/assets/img-lazy.jpg';

const imgList = ref(
  Array.from(Array(200), () => {
    return { url: img };
  }),
);
</script>

<style lang="scss" scoped>
.img-lazy-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & > img {
    width: calc(25% - 16px);
    height: auto;
    object-fit: cover;
    margin: 8px;
  }
}
</style>
