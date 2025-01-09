<template>
  <c-card class="draggable">
    <!-- vuedraggable -->
    <example-container name="vuedraggable">
      <draggable
        class="c-item-content vuedraggable"
        v-model="draggableList"
        item-key="index"
        animation="300"
        @end="handleDrag"
      >
        <template #item="{ element, index }">
          <div class="item" :key="index">
            {{ element.id }}
          </div>
        </template>
      </draggable>
    </example-container>

    <!-- sortable -->
    <example-container name="sortable">
      <div class="c-item-content sortable">
        <div class="item" v-for="(item, index) in sortableList" :key="index">
          {{ index }}
        </div>
      </div>
    </example-container>

    <!-- vue-draggable-plus -->
    <example-container name="vue-draggable-plus">
      <p class="tips">双列表拖拽</p>
      <div class="c-item-content vue-draggable-plus">
        <VueDraggable
          v-model="draggablePlusList1"
          animation="300"
          ghostClass="ghost"
          group="people"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <div class="item" v-for="item in draggablePlusList1" :key="item.id">
            {{ item.name }}
          </div>
        </VueDraggable>
        <VueDraggable
          v-model="draggablePlusList2"
          animation="300"
          ghostClass="ghost"
          group="people"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <div class="item" v-for="item in draggablePlusList2" :key="item.id">
            {{ item.name }}
          </div>
        </VueDraggable>
      </div>
    </example-container>
  </c-card>
</template>

<script setup name="draggabletest">
import { ref, onMounted } from 'vue';

// components
import exampleContainer from '@/components/example-container/index.vue';
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';
import { VueDraggable } from 'vue-draggable-plus';

import { useRoute } from 'vue-router';
const route = useRoute();

/**
 * vuedraggable
 */

const draggableList = ref(
  Array.from(Array(20), (v, i) => {
    return { id: i };
  }),
);

console.log(draggableList.value);

const handleDrag = (e) => {
  console.log(e, 'e');
};

/**
 * sortable
 */

const sortableList = ref(
  Array.from(Array(20), (v, i) => {
    return { id: i };
  }),
);

const sortableDrop = () => {
  const sortableDom = document.querySelector('.sortable');
  Sortable.create(sortableDom, {
    group: {
      name: 'words',
      pull: true,
      put: true,
    },
    animation: 300, //动画参数
    onEnd({ newIndex, oldIndex }) {
      console.log(newIndex, oldIndex, 'newIndex, oldIndex');
    },
  });
};

/**
 * vue-draggable-plus
 */

const draggablePlusList1 = ref(
  Array.from(Array(20), (v, i) => {
    return { id: i, name: `item1-${i}` };
  }),
);

const draggablePlusList2 = ref(
  Array.from(Array(20), (v, i) => {
    return { id: i, name: `item2-${i}` };
  }),
);

const onUpdate = () => {
  console.log('update');
};

const onAdd = () => {
  console.log('add');
};

const remove = () => {
  console.log('remove');
};

onMounted(() => {
  sortableDrop();
});
</script>

<style lang="scss" scoped>
.vuedraggable,
.sortable,
.vue-draggable-plus {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.vue-draggable-plus {
  & > div {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    // align-items: flex-end;

    width: 48%;
    border: 1px solid var(--el-border-color);
    box-sizing: border-box;
    padding: 6px;
    margin: 1%;
  }
}

.tips {
  margin: 12px 0 0 12px;
  color: var(--el-text-color-secondary);
}

.item {
  width: 24%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: var(--el-fill-color-dark);
  margin: 0.5%;
  cursor: move;
}
</style>
