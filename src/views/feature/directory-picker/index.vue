<template>
  <c-card isNone isAffix class="wrap-page directory-picker">
    <div class="table-group">
      <table-group createBtnText="读取文件" :loading="groupLoading" @on-create="toReadDirectory">
        <template #header> </template>
        <template #default>
          <div class="dir-tree-box" id="dirTreeBox">
            <el-tree-v2
              v-if="groupData.children.length"
              ref="treeRef"
              class="dir-tree"
              node-key="path"
              default-expand-all
              check-on-click-node
              :height="treeHeight"
              :expand-on-click-node="false"
              :data="groupData.children"
              :props="{ value: 'id', label: 'name', children: 'children' }"
              @node-click="onNodeClick"
            ></el-tree-v2>
          </div>
        </template>
      </table-group>
      <div class="table-group__content">
        <div class="name is-title">{{ renderState.name }}</div>
        <div class="list" v-if="renderState.type == 1">
          <render-list
            v-for="item in renderState.children"
            :key="item.name"
            :item="item"
            :isFileName="formData.isFileName"
          ></render-list>
        </div>
        <render-list
          v-if="renderState.type > 1"
          :item="renderState"
          :key="renderState.name"
          :isFileName="formData.isFileName"
        ></render-list>
      </div>
    </div>

    <c-dialog title="选择类型" :width="600" :append-to-body="false" name="file-type-popup">
      <c-form
        ref="formRef"
        label-width="150px"
        isDialog
        :model="formData"
        :rows="formRows"
        @submit="onSubmit"
      ></c-form>
    </c-dialog>
  </c-card>
</template>

<script setup name="feature.directory-picker">
import { computed, onMounted, reactive, ref } from 'vue';
import TableGroup from '@/components/group-menus/table-group.vue';
import { ElMessage } from 'element-plus';
import { fileFormUrl } from '@/utils/tools.js';
import RenderList from './render-list.vue';
// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

const imageAccept = ['jpg', 'png', 'jpeg'];
const wordAccept = ['doc', 'docx'];

const fileTypeMap = {
  2: { label: '图片', accept: imageAccept },
  3: { label: 'word', accept: wordAccept },
};

const treeHeight = ref(600);

const activeId = ref('');

const groupLoading = ref(false);

const renderState = ref({
  children: [],
  name: '',
  kind: '',
});

const groupData = ref({
  children: [],
  name: '',
  kind: '',
});

const formData = ref({
  fileType: [],
  isFlat: 0,
  isFileName: 1,
});

const formRows = ref([
  {
    formType: 'select',
    prop: 'fileType',
    label: '文件类型:',
    teleported: false,
    optionList: Object.entries(fileTypeMap).map(([key, value]) => {
      return { label: value.label, value: key };
    }),
  },
  {
    formType: 'switch',
    prop: 'isFlat',
    label: '是否扁平化:',
    inactiveValue: 0,
    activeValue: 1,
  },
  {
    formType: 'switch',
    prop: 'isFileName',
    label: '是否显示文件名称:',
    inactiveValue: 0,
    activeValue: 1,
  },
]);

const getFileType = (e) => {
  if (e.kind === 'directory') {
    return 1; // 文件夹
  } else if (e.kind === 'file') {
    let imageSuffix = e.name.split('.').pop();
    let wordSuffix = e.name.split('.').pop();
    if (imageAccept.includes(imageSuffix)) {
      return 2; // 图片
    } else if (wordAccept.includes(wordSuffix)) {
      return 3; // word文档
    } else {
      return -1; // 其他
    }
  } else {
    return 0; // 未知
  }
};

const getImageUrl = () => {};

//获取根目录及其子文件 递归处理
let id = 1;
async function processHandle(handle) {
  handle['id'] = id;
  id++;
  handle['type'] = getFileType(handle);
  if (handle.kind === 'file') {
    if (handle['type'] === 2) {
      handle['imageUrl'] = fileFormUrl(await handle.getFile());
    }
    return handle;
  }
  handle.children = []; //子文件
  //得到异步迭代器
  const iter = handle.entries();
  for await (const item of iter) {
    handle.children.push(await processHandle(item[1]));
  }
  return handle;
}

const toReadDirectory = () => {
  modalStore.openModal('file-type-popup', {});
};

const setGroupData = (data) => {
  let acceptArr = [];
  for (const item of formData.value.fileType) {
    acceptArr = acceptArr.concat(fileTypeMap[item].accept);
  }
  acceptArr = [...new Set(acceptArr)];

  let flatList = [];

  const fn = (event) => {
    // console.log(event, 'event');

    if (formData.value.isFlat && event.kind === 'file') {
      flatList.push(event);
      console.log(event, 'event---');
    }

    if (event.kind === 'directory') {
      event.children = event.children.filter((v) => {
        let suffix = v.name.split('.').pop();
        return v.kind === 'directory' || acceptArr.length == 0
          ? true
          : v.kind === 'file' && acceptArr.includes(suffix);
      });

      for (let item of event.children) {
        item = fn(item);
      }
    }

    return event;
  };
  let obj = fn(data);

  if (formData.value.isFlat) {
    obj.children = [{ id: -1, name: '全部', kind: 'directory', type: 1, children: flatList }];
  }

  console.log(data, '===', obj, 'groupData.value', flatList, 'flatList');
  return obj;
};

const onSubmit = async () => {
  const { protocol, hostname } = window.location;
  if (protocol === 'http:' && hostname !== 'localhost') {
    ElMessage.error('http需要使用localhost访问');
    return;
  }

  const handle = await window.showDirectoryPicker();
  console.log(handle, 'handle');

  groupLoading.value = true;
  modalStore.closeModal('file-type-popup');

  // 获取根目录及其子文件
  const root = await processHandle(handle);
  groupData.value = setGroupData(root);
  // onNodeClick(groupData.value);
  console.log('+++++++++', root);
  groupLoading.value = false;
};

const onNodeClick = (data) => {
  console.log(data, '--------------');
  renderState.value = data;
};

const init = () => {
  const dom = document.getElementById('dirTreeBox');
  const { height } = dom.getBoundingClientRect();
  treeHeight.value = height;
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.directory-picker {
  display: flex;
}

.table-group {
  height: 100%;
  display: flex;

  &__content {
    width: 100%;
    overflow: auto;
    margin-left: 6px;
    padding: 10px;
    box-sizing: border-box;
    @include card-box;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}

.dir-tree-box {
  height: 100%;
}

.dir-tree {
  height: 100%;
}
</style>
