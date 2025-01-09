<template>
  <div class="render-list">
    <div class="list-item card-box" v-if="item.type === 1">
      <div class="list-item-name line-feed">{{ item.name }}</div>
      <div>文件夹</div>
    </div>
    <div class="list-item card-box" v-if="item.type === 2">
      <div class="list-item-name line-feed">{{ item.name }}</div>
      <el-image
        class="file-img"
        lazy
        :src="item.imageUrl"
        :preview-src-list="[item.imageUrl]"
        fit="cover"
      />
    </div>
    <div class="docx-box" v-if="item.type === 3">
      <div class="list-item-name line-feed">{{ item.name }}</div>
      <vue-office-docx
        v-if="docxSrc"
        :src="docxSrc"
        style="height: 100%; width: 100%"
        @rendered="rendered"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx';
//引入相关样式
import '@vue-office/docx/lib/index.css';

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const docxSrc = ref('');

const rendered = () => {
  console.log('渲染完成');
};

const getfile = async () => {
  console.log(await props.item.getFile(), ' props.item.getFile()');
  const file = await props.item.getFile();
  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);
  fileReader.onload = () => {
    docxSrc.value = fileReader.result;
  };
};

getfile();
</script>

<style lang="scss" scoped>
.render-list {
}

.list-item {
  width: 150px;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 6px;
  margin: 6px;
  display: flex;
  flex-direction: column;
}

.list-item-name {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}

.file-img {
  width: 100%;
  height: auto;
}

.docx-box {
  width: 100%;
  height: 100%;
}
</style>
