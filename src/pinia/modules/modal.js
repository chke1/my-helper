import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const names = ref([]);
  const data = ref({});

  // 打开弹窗
  const openModal = (attr, value) => {
    if (!attr) return console.log('弹窗名不能为空！');

    if (attr && typeof attr !== 'string') return console.log('弹窗名格式错误！');

    if (names.value.includes(attr)) return console.log('已存在该弹窗名！');

    // console.log(attr, value);

    names.value.push(attr);

    data.value[attr] = value;
  };

  // 默认清除最新的弹窗
  const closeModal = (attr) => {
    if (!names.value.length) return console.log('names为空！');

    if (!Object.keys(data.value).length) return console.log('names数据为空！');

    if (attr && typeof attr !== 'string') return console.log('弹窗名格式错误！');

    if (attr && !names.value.includes(attr)) return console.log('不存在该弹窗！');

    // 参数为空则使用最后一个数据
    if (!attr) attr = names.value[names.value.length - 1];

    let index = names.value.findIndex((v) => v == attr);

    if (index !== -1) names.value.splice(index, 1);

    if (Object.keys(data.value).includes(attr)) delete data.value[attr];

    console.log('names', names.value, 'data', data.value);
  };

  // 获取弹窗数据
  const getModal = (attr) => {
    // 参数为空则使用最后一个数据
    if (!attr) attr = names.value[names.value.length - 1];

    console.log('弹窗数据：', attr, data.value[attr] || {});

    return data.value[attr] || {};
  };

  return { names, data, openModal, closeModal, getModal };
});
