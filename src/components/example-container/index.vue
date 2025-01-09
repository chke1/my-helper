<template>
  <div>
    <p class="example-container-name">
      <span>{{ exampleName }}</span>
      <span v-for="item in exampleUrls" :key="item.url">
        <a target="_blank" :href="item.url">{{ item.name }}</a>
      </span>
    </p>
    <div class="example-container-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});

const titleMap = {
  vuedraggable: {
    desc: 'vue拖拽库',
    name: 'vuedraggable',
    urls: [{ name: '文档地址', url: 'https://github.com/SortableJS/vue.draggable.next' }],
  },

  sortable: {
    desc: 'sortable拖拽库',
    name: 'sortable',
    urls: [
      { name: '文档地址', url: 'https://github.com/SortableJS/Sortable' },
      { name: '中文文档', url: 'http://www.sortablejs.com/options.html' },
    ],
  },

  'vue-draggable-plus': {
    desc: 'vue-draggable-plus拖拽库',
    name: 'vue-draggable-plus',
    urls: [{ name: '中文文档', url: 'https://alfred-skyblue.gitee.io/vue-draggable-plus/' }],
  },

  'vue-virtual-scroller': {
    desc: 'vue-virtual-scroller，虚拟列表，虚拟滚动',
    name: 'vue-virtual-scroller',
    urls: [{ name: '文档地址', url: 'https://github.com/akryum/vue-virtual-scroller' }],
  },

  'vue-lazyload': {
    desc: 'vue-lazyload，图像加载，优选',
    name: 'vue-lazyload',
    urls: [{ name: '文档地址', url: 'https://github.com/hilongjw/vue-lazyload' }],
  },

  sass: {
    desc: 'sass',
    name: 'sass',
    urls: [
      { name: '文档地址', url: 'https://sass-lang.com/' },
      { name: '中文文档', url: 'https://www.sass.hk/' },
    ],
  },

  vueuse: {
    desc: 'vueuse，是一个基于 Composition API 的实用程序函数集合',
    name: 'vueuse',
    urls: [{ name: '文档地址', url: 'https://vueuse.org/guide/' }],
  },

  echarts: {
    desc: 'vueuse图表插件',
    name: 'echarts',
    urls: [{ name: '文档地址', url: 'https://echarts.apache.org/zh/index.html' }],
  },

  cropperjs: {
    desc: 'cropperjs裁剪',
    name: 'cropperjs',
    urls: [
      { name: '文档地址', url: 'https://github.com/fengyuanchen/cropperjs' },
      { name: '演示地址', url: 'https://fengyuanchen.github.io/cropperjs/' },
    ],
  },
};

const exampleName = ref(titleMap[props.name]?.name);
const exampleUrls = ref(titleMap[props.name]?.urls);
</script>

<style lang="scss" scoped>
.example-container-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 4px 0 10px;

  & > span {
    margin: 0 4px;
  }
}

.example-container-content {
  width: 100%;
  margin-bottom: 20px;
}
</style>
