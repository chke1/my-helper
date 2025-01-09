<template>
  <c-card>
    <div>
      <turntable
        ref="turntableRef"
        :id="2"
        :sectorData="sector"
        @on-change="onTurntableChange"
        @on-start="onStart"
      ></turntable>
    </div>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';
import turntable from './components/turntable.vue';
import { ElMessage } from 'element-plus';

const imageUrl = import.meta.env.BASE_URL + 'account-list/ic-account-avatar1.jpg';

const turntableRef = ref();

let sector = [
  { id: 1, text: '扇形1', color: '#044A75', url: imageUrl },
  { id: 2, text: '扇形2', color: '#0085FF', url: imageUrl },
  { id: 3, text: '扇形3', color: '#E8684A', url: imageUrl },
  { id: 4, text: '扇形4', color: '#5A8155', url: imageUrl },
  { id: 5, text: '扇形5', color: '#00ccff', url: imageUrl },
  { id: 6, text: '扇形6', color: '#24C639', url: imageUrl },
  { id: 7, text: '扇形7', color: '#3E4A3C', url: imageUrl },
  { id: 8, text: '扇形8', color: '#A2AF9F', url: imageUrl },
];

const onStop = () => {
  turntableRef.value.stop();
};

const onStart = () => {
  turntableRef.value.start();
};

const onDownSpeed = () => {
  turntableRef.value.down();
};

const onUpSpeed = () => {
  turntableRef.value.up();
};

const onRandom = () => {
  turntableRef.value.random();
};

const onLottery = () => {
  turntableRef.value.lottery();
};

const onTurntableChange = (e) => {
  ElMessage.success(`选中了${e.text}`);
};
</script>

<style lang="scss" scoped></style>
