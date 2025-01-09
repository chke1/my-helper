<template>
  <c-card isAffix>
    <div class="abserver">
      <div class="io-ids">可视区域内元素：{{ ioIds.sort((a, b) => Number(a) - Number(b)) }}</div>
      <div class="io">
        <div class="io-item id-io" v-for="item in 100" :key="item" :idx="item">
          {{ item }}
        </div>
      </div>
    </div>
  </c-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const ioIds = ref([]);

const io = new IntersectionObserver((entries) => {
  // console.log(entries, 'entries');
  for (const item of entries) {
    const { isIntersecting, target } = item;
    const idx = target.getAttribute('idx');

    if (isIntersecting) {
      if (!ioIds.value.includes(idx)) {
        ioIds.value.push(idx);
      }
    } else {
      if (ioIds.value.includes(idx)) {
        const i = ioIds.value.findIndex((v) => v == idx);
        ioIds.value.splice(i, 1);
      }
    }
  }
});

onMounted(() => {
  const nodeList = document.querySelectorAll('.id-io');
  console.log(nodeList, 'dataimg entries');
  for (const item of nodeList) {
    io.observe(item);
    // io.unobserve(item);
  }
});

onUnmounted(() => {
  io.disconnect();
});
</script>

<style lang="scss" scoped>
.abserver {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.io-ids {
  padding-bottom: 12px;
  box-sizing: border-box;
}

.io {
  flex: 1;
  overflow: auto;
  background-color: var(--el-fill-color-darker);
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
}

.io-item {
  background-color: var(--el-bg-color-page);
  padding: 12px;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 12px 0;
}
</style>
