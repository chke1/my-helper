<template>
  <c-card>
    <c-form label-width="120px" width="100%" :model="formData" :rows="formRows" :isFooter="false">
      <template #moreInfoRef>
        <el-button @click="handleMoreModal">点击选择</el-button>
        <div style="width: 100%" v-if="formData.moreInfo.length">
          当前已选择 {{ formData.moreInfo.length }} 个，
          <span class="is-button" @click="handleMoreInfo">查看更多</span>
        </div>
      </template>

      <template #singleInfoRef>
        <el-button @click="handleSingleModal">点击选择</el-button>
        <div style="width: 100%; margin-top: 10px" v-if="Object.keys(formData.singleInfo).length">
          <show-card
            :width="300"
            :title="formData.singleInfo.title"
            :sub-title="formData.singleInfo.subTitle"
            :extra="formData.singleInfo.extra"
            :cover="formData.singleInfo.url"
          ></show-card>
        </div>
      </template>

      <template #showDrawerRef>
        <el-button @click="handleShowDrawer">点击选择</el-button>
      </template>

      <template #showCardRef>
        <el-space wrap>
          <show-card
            size="large"
            title="大号号标题"
            sub-title="大号副标题"
            extra="额外内容"
            :width="260"
            :cover="imgCover"
          ></show-card>

          <show-card
            size="default"
            title="默认标题"
            sub-title="默认副标题"
            extra="额外内容"
            :width="260"
            :cover="imgCover"
          ></show-card>

          <show-card
            size="small"
            title="小号标题"
            sub-title="小号副标题"
            extra="额外内容"
            :width="260"
            :cover="imgCover"
          ></show-card>
        </el-space>
      </template>
    </c-form>

    <c-dialog title="虚拟列表多选" :width="800" name="more-modal">
      <more-modal v-model="formData.moreInfo"></more-modal>
    </c-dialog>

    <c-dialog title="虚拟列表单选" :width="520" name="single-modal">
      <single-modal v-model="formData.singleInfo"></single-modal>
    </c-dialog>

    <!-- 抽屉 -->
    <c-drawer title="抽屉标题" :width="500" name="show-drawer">
      <show-drawer :list="[]"></show-drawer>
    </c-drawer>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';

import moreModal from '@/components/virtual-scroll-modal/more-modal.vue';
import singleModal from '@/components/virtual-scroll-modal/single-modal.vue';
import showDrawer from '@/components/virtual-scroll-modal/show-drawer.vue';
import showCard from '@/components/show-card/index.vue';

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const imgCover = import.meta.env.BASE_URL + 'account-list/ic-account-avatar4.jpg';

const formData = ref({
  singleInfo: {},
  moreInfo: [],
  showDrawerList: [],
  uploadImg: '',
  uploadImgs: [],
  uploadFile: [],
});

formData.value.showDrawerList = Array.from(Array(20000), (v, i) => {
  return {
    id: i,
    title: `我是标题${i}`,
    subTitle: `描述描述描述描述描述描述描述描述描述${i}`,
    extra: `额外内容${i}`,
    url: import.meta.env.BASE_URL + 'avatar.jpg',
  };
});

const formRows = ref([
  {
    layout: 'cols',
    children: [
      [
        { formType: 'title', label: '虚拟列表组件' },
        {
          slot: 'moreInfoRef',
          formType: 'slot',
          label: '多选择窗：',
        },
        {
          slot: 'singleInfoRef',
          formType: 'slot',
          label: '单选择窗：',
        },
        {
          slot: 'showDrawerRef',
          formType: 'slot',
          label: '抽屉展示：',
        },
        { formType: 'title', label: '显示组件' },
        {
          slot: 'showCardRef',
          formType: 'slot',
          label: '展示卡片：',
        },
      ],
      [
        { formType: 'title', label: '上传组件', subLabel: '' },
        {
          formType: 'upload-img',
          prop: 'uploadImg',
          label: '单图上传：',
          size: '',
          ratio: '',
          tips: '支持图片类型、大小、尺寸、比例识别。',
          desc: false,
        },
        {
          formType: 'upload-imgs',
          prop: 'uploadImgs',
          label: '多图上传：',
          size: '',
          ratio: '',
          tips: '支持图片类型、大小、尺寸、比例识别，可拖拽排序。',
          desc: false,
        },
        {
          formType: 'upload-file',
          prop: 'uploadFile',
          label: '文件上传：',
          size: '',
          desc: false,
        },
      ],
    ],
  },
  // { formType: 'title', label: '上拉分页组件' },
]);

const handleMoreModal = () => {
  modalStore.openModal('more-modal');
};

const handleSingleModal = () => {
  modalStore.openModal('single-modal');
};

const handleShowDrawer = () => {
  modalStore.openModal('show-drawer', {
    list: formData.value.showDrawerList,
  });
};

const handleMoreInfo = () => {
  modalStore.openModal('show-drawer', {
    list: formData.value.moreInfo,
  });
};

const benClick = () => {
  console.log(123123);
};

const disabled = ref(true);
setTimeout(() => {
  disabled.value = false;
}, 2000);
</script>

<style lang="scss" scoped></style>
