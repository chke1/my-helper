<template>
  <c-card class="note">
    <ul class="note-left">
      <li
        v-for="item in noteList"
        :key="item.key"
        :class="{ 'is-active': noteActionKey == item.key }"
        @click="handleSelectNote(item)"
      >
        {{ item.title }}
      </li>
    </ul>

    <div class="note-middle">
      <iframe :src="iframeUrl" width="100%" height="100%" frameborder="0"></iframe>
    </div>

    <ul class="note-right">
      <template v-for="item in paragraphList" :key="item.ID">
        <li
          :class="{ 'is-active': paragraphActionID == item.ID }"
          @click="handleSelectParagraph(item)"
        >
          {{ item.title }}
        </li>
        <ul class="note-right-child" v-if="item.child && item.child.length">
          <li
            v-for="itemChild in item.child"
            :key="itemChild.ID"
            :class="{ 'is-active': paragraphActionID == itemChild.ID }"
            @click="handleSelectParagraph(itemChild)"
          >
            {{ itemChild.title }}
          </li>
        </ul>
      </template>
    </ul>
  </c-card>
</template>

<script setup>
import { computed, ref } from 'vue';

const iframeUrl = computed(() => {
  let url = `${import.meta.env.BASE_URL}note/${noteActionKey.value}.html`;
  return url + '#' + paragraphActionID.value;
});

const noteActionKey = ref('');

const paragraphActionID = ref('');

const noteList = ref([
  {
    key: 'software',
    title: '软考考纲',
    child: [
      {
        ID: 'software-basics',
        title: '软件工程基础知识',
        child: [
          { ID: 'software-basics-1', title: '开发生命周期' },
          { ID: 'software-basics-2', title: '开发模式' },
        ],
      },
    ],
  },
  {
    key: 'jsknowledge',
    title: 'javascript相关',
    child: [
      { ID: 'jsknowledge-datatype', title: '8种数据类型' },
      { ID: 'jsknowledge-curry', title: '柯里化函数' },
      { ID: 'jsknowledge-read', title: '浏览器读写能力' },
    ],
  },
]);

const paragraphList = ref([]);

const handleSelectParagraph = (item) => {
  paragraphActionID.value = item.ID || '';
};

const handleSelectNote = (item) => {
  noteActionKey.value = item.key;
  paragraphList.value = item.child || [];
  handleSelectParagraph(item.child[0] || {});
};
handleSelectNote(noteList.value[0]);
</script>

<style lang="scss" scoped>
%bg-box {
  background-color: #fff;
  border-radius: 4px;
  margin: 0 10px;
  flex-shrink: 0;
}

@mixin item-box {
  font-weight: 500;
  color: #515767;
  box-sizing: border-box;
  position: relative;
  padding: 12px 17px;
  border-radius: 4px;

  &:hover {
    background-color: #f7f8fa;
    color: #1e80ff;
    cursor: pointer;
  }
}

.note {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #f6f6fa;
  font-size: 14px;

  &-left {
    width: 180px;
    padding: 10px;
    box-sizing: border-box;
    list-style-type: none;
    @extend %bg-box;

    .is-active {
      background-color: #eaf2ff;
      color: #1a7dff;
    }

    & > li {
      @include item-box;
    }
  }

  &-middle {
    min-width: 66%;
    height: 100%;
    @extend %bg-box;
  }

  &-right {
    width: 180px;
    padding: 10px;
    list-style-type: none;
    @extend %bg-box;

    .is-active {
      color: #1a7dff;
    }

    & > li {
      @include item-box;
    }

    &-child {
      list-style-type: none;
      margin: 0;
      padding-left: 20px;

      & > li {
        @include item-box;
      }
    }
  }
}
</style>
