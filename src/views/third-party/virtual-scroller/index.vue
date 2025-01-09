<template>
  <c-card>
    <example-container name="vue-virtual-scroller">
      <div class="vue-virtual-scroller">
        <!-- recycle-scroller -->
        <div class="recycle">
          <p>recycle-scroller</p>
          <recycle-scroller
            class="recycle-scroller"
            key-field="id"
            :items="recycleList"
            :item-size="50"
          >
            <template #default="{ item }">
              <div class="recycle-scroller-item">
                <div class="recycle-scroller-item__content">{{ item.id }}</div>
              </div>
            </template>
          </recycle-scroller>
        </div>

        <!-- dynamic-scroller -->
        <div class="dynamic">
          <p>dynamic-scroller</p>
          <dynamic-scroller
            class="dynamic-scroller"
            key-field="id"
            :items="dynamicList"
            :min-item-size="50"
          >
            <template #default="{ item, index, active }">
              <dynamic-scroller-item
                :size-dependencies="[item.id]"
                :item="item"
                :active="active"
                :data-index="index"
              >
                <div class="dynamic-scroller-item">
                  <div class="dynamic-scroller-item__content">{{ item.id }}</div>
                </div>
              </dynamic-scroller-item>
            </template>
          </dynamic-scroller>
        </div>
      </div>
    </example-container>
  </c-card>
</template>

<script setup name="virtual-scroller">
import { ref } from 'vue';

// components
import exampleContainer from '@/components/example-container/index.vue';

// vue-virtual-scroller
import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

/**
 * recycle-scroller
 */
const recycleList = ref(
  Array.from(Array(2000), (v, i) => {
    return { id: i };
  }),
);

/**
 * dynamic-scroller
 */
const dynamicList = ref(
  Array.from(Array(2000), (v, i) => {
    return { id: i };
  }),
);
</script>

<style lang="scss" scoped>
.vue-virtual-scroller {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  /* recycle-scroller */
  .recycle {
    flex: 1;
    border: 1px solid var(--el-border-color);
    padding: 10px;
    box-sizing: border-box;

    .recycle-scroller {
      display: block;
      height: 520px;
      width: 100%;
      margin-right: 10px;
    }

    .recycle-scroller-item {
      height: 50px;
      display: flex;
      align-items: center;
    }

    .recycle-scroller-item__content {
      width: 100%;
      background-color: var(--el-fill-color-dark);
      height: 42px;
      line-height: 42px;
      text-align: center;
    }
  }

  /* dynamic-scroller */
  .dynamic {
    flex: 1;
    border: 1px solid var(--el-border-color);
    padding: 10px;
    box-sizing: border-box;
    margin-left: 10px;

    .dynamic-scroller {
      height: 520px;
      width: 100%;
    }

    .dynamic-scroller-item {
      height: 50px;
      display: flex;
      align-items: center;
    }

    .dynamic-scroller-item__content {
      width: 100%;
      background-color: var(--el-fill-color-dark);
      height: 42px;
      line-height: 42px;
      text-align: center;
    }
  }
}
</style>
