<template>
  <c-card>
    <p>常见操作BOM api</p>
    <table>
      <tr v-for="(item, index) in familiarJsApi" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.desc }}</td>
      </tr>
    </table>

    <p>常见操作DOM api</p>
    <table>
      <tr v-for="(item, index) in familiarElementApi" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.desc }}</td>
      </tr>
    </table>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';

const familiarJsApi = ref([
  {
    name: 'new IntersectionObserver()',
    desc: '监听元素是否进入了设备的可视区域之内',
  },
  {
    name: 'requestAnimationFrame(() => {})',
    desc: '你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。允许我们按照浏览器的刷新率来调度动画帧，从而实现更加流畅和高效的动画效果',
  },
  {
    name: 'requestIdleCallback(() => {})',
    desc: '是一个还在实验中的 api,可以让我们在浏览器空闲的时候做一些事情，请参考浏览器兼容性表格',
  },
  {
    name: 'requestVideoFrameCallback(() => {})',
    desc: '视频帧操作',
  },
  {
    name: 'structuredClone',
    desc: 'js自带的深度克隆',
  },
  {
    name: 'performance.getEntriesByType(e)',
    desc: '测量浏览器加载资源时间',
  },
]);

const familiarElementApi = ref([
  {
    name: '.getElementById()',
    desc: '返回匹配指定id属性的元素节点;没有发现匹配的节点，则返回null',
  },
  {
    name: '.getElementsByName()',
    desc: '选择拥有name属性的HTML元素，返回值是一个类似数组的HTMLCollection对象；匹配失败，返回[]。参数为 标签的name属性的值',
  },
  {
    name: '.getElementsByClassName()',
    desc: '返回所有class名字符合指定条件的元素,返回值是一个类似数组的HTMLCollection对象；匹配失败，返回[]',
  },
  {
    name: '.getElementsByTagName()',
    desc: '返回所有指定HTML标签的元素，返回值是一个类似数组的HTMLCollection对象；匹配失败，返回[]',
  },
  {
    name: '.querySelector()',
    desc: '则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null， 可以是标签选择器、类选择器、id选择器等',
  },
  {
    name: '.querySelectorAll()',
    desc: '返回一个类似数组的HTMLCollection对象，包含所有匹配给定选择器的节点',
  },
  {
    name: '.setSelectionRange()',
    desc: '控制输入框光标位置',
  },
]);
</script>

<style lang="scss" scoped>
p {
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
}

table {
  width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 22px;
  color: var(--el-text-color-primary);

  td {
    padding: 12px 10px;
    border: 1px solid var(--el-border-color);

    &:first-child {
      width: 260px;
    }
  }
}
</style>
