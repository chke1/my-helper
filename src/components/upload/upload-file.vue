<template>
  <div class="c-upload-file">
    <!-- 按钮上传 -->
    <div class="c-upload-file__button" v-if="!drag">
      <el-upload
        :accept="accept.join(',')"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :http-request="initHttpRequest"
      >
        <el-button>选择文件</el-button>
      </el-upload>
    </div>

    <!-- 拖拽上传 -->
    <el-upload
      v-else
      drag
      id="uploadDragID"
      class="c-upload-file__upload"
      :style="{ width: width, height: height }"
      :accept="accept.join(',')"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="initHttpRequest"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件放到这里或 <em>点击上传</em></div>
    </el-upload>
    <div class="c-upload-file__desc" v-if="desc">
      <slot>
        <span v-if="getDescText">注：{{ getDescText }}</span>
      </slot>
    </div>
    <template v-if="showFileList">
      <div class="c-upload-file__file" v-for="(item, index) in cacheList" :key="item.uid">
        <span>
          <el-icon class="is-document"><Document /></el-icon>{{ item.name }}
        </span>
        <span>
          <span v-if="item.size">{{ formatBytes(item.size) }}</span>
          <el-icon class="is-close" @click="handleClose(index)"><Close /></el-icon>
        </span>
      </div>
    </template>
  </div>
</template>

<script setup name="c-upload-file">
import { ref, computed, watch } from 'vue';
import { UploadFilled, Document, Close } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { formatBytes } from '@/utils/tools.js';

const emit = defineEmits(['update:modelValue', 'end']);

const props = defineProps({
  modelValue: {
    type: [Array, Object],
    default: () => [],
  },

  // 宽度
  width: {
    type: [String],
  },

  // 高度
  height: {
    type: [String],
  },

  // 允许上传类型
  accept: {
    type: [Array],
    default: () => [],
  },

  // 大小MB
  size: {
    type: [String, Number],
    default: '',
  },

  // 描述
  desc: {
    type: [Boolean, String],
    default: true,
  },

  // 是否显示已选择的列表
  showFileList: {
    type: [Boolean, String],
    default: true,
  },

  // 是否使用拖拽上传
  drag: {
    type: [Boolean, String],
    default: true,
  },

  // 是否多选
  multiple: {
    type: [Boolean],
    default: true,
  },
});

// 储存上传状态
const cacheList = ref([]);

// 提示文本
const getDescText = computed(() => {
  let descMap = {
    ratio: `图片比例${props.ratio}`,
    size: `图片大小不能超过${props.size}MB`,
    accept: `仅限${props.accept.join('，')}格式`,
  };
  let isExitsArr = Object.keys(descMap).filter((v) => props[v]);

  return isExitsArr.map((v) => descMap[v]).join('，');
});

// 上传限制拦截
const beforeUpload = async (rawFile) => {
  console.log(rawFile, 'rawFile');
  // 类型拦截
  // 大小拦截
  if (props.size && rawFile.size / 1024 / 1024 > props.size) {
    ElMessage.error(`支持${props.size}MB以内大小上传`);
    return false;
  }

  let cacheItem = {
    loading: true,
    uid: rawFile.uid,
    url: '',
    name: rawFile.name,
    size: rawFile.size,
    type: rawFile.type,
  };

  // 添加文件
  if (props.multiple) {
    cacheList.value.push(cacheItem);
  } else {
    cacheList.value = [cacheItem];
  }

  return true;
};

// 自定义上传
const initHttpRequest = async (options) => {
  const { file } = options;
  const formData = new FormData();
  formData.append('file', options.file);

  let index = cacheList.value.findIndex((v) => v.uid == file.uid);
  cacheList.value[index].loading = false;
  cacheList.value[index].url = '';

  if (props.multiple) {
    emit('update:modelValue', cacheList.value);
  } else {
    emit('update:modelValue', cacheList.value[0]);
  }

  console.log(cacheList.value, 'cacheList.value');

  emit('end', options);
};

const handleClose = (index) => {
  cacheList.value.splice(index, 1);

  if (props.multiple) {
    emit('update:modelValue', cacheList.value);
  } else {
    let len = cacheList.value.length;
    emit('update:modelValue', len == 0 ? {} : cacheList.value[0]);
  }
};

// 监听modelValue异步
watch(
  () => props.modelValue,
  (newValue) => {
    cacheList.value = props.multiple ? newValue : [newValue];
  },
);
</script>

<style lang="scss" scoped>
.c-upload-file {
  width: 100%;

  :deep(.el-upload-dragger) {
    border: none;
  }
}

.c-upload-file__button {
  text-align: left;
}

.c-upload-file__upload {
  width: 100%;
  height: 100%;
  min-width: 260px;
  border: 1px dashed var(--el-border-color);
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    border-color: var(--el-color-primary);
  }

  :deep(.el-upload) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 描述
.c-upload-file__desc {
  width: 100%;
  display: block;
  font-size: 12px;
  color: #8f959e;
  margin: 6px 0;
  line-height: 1.4;
}

.c-upload-file__file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.04);
  padding: 8px;
  box-sizing: border-box;
  margin-top: 4px;
  border-radius: 4px;

  & > span {
    font-size: 12px;
    color: #8f959e;
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .is-document {
    cursor: pointer;
    margin-right: 5px;
  }

  .is-close {
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      color: var(--color-error);
    }
  }
}
</style>
