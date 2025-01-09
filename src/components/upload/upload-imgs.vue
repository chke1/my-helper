<template>
  <div class="c-upload-imgs" :id="uploadImgsID">
    <div class="container c-upload-imgs-sortable">
      <div
        v-loading="item.loading"
        class="preview"
        v-for="(item, index) in props.modelValue"
        :key="item.imageUrl || index"
      >
        <template v-if="item.imageUrl">
          <el-image
            fit="cover"
            class="preview-img"
            preview-teleported
            hide-on-click-modal
            :ref="`imageRef${index}`"
            :src="item.imageUrl"
            :initial-index="index"
            :preview-src-list="props.modelValue.map((v) => v.imageUrl)"
            @error="onImageError"
          ></el-image>
          <div class="preview-mask">
            <el-icon class="preview-mask--icon" @click="handleView(index)" v-if="!isError">
              <View />
            </el-icon>
            <el-icon class="preview-mask--icon" @click="handleDelete(index)">
              <Delete />
            </el-icon>
          </div>
        </template>
      </div>
      <div class="c-upload-handle" key="handle">
        <el-upload
          multiple
          :show-file-list="false"
          :accept="accept.join(',')"
          :before-upload="beforeUpload"
          :http-request="initHttpRequest"
        >
          <div class="uploader">
            <el-icon class="uploader-icon"><Plus /></el-icon>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="c-upload-imgs-desc" v-if="desc">
      <slot>
        <span v-if="getDescText">注：{{ getDescText }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup name="c-upload-imgs">
import { ref, watch, computed, nextTick, getCurrentInstance, onMounted } from 'vue';
import { Plus, View, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { fileFormBase64, calculateImageSize } from '@/utils/tools.js';
import { cloneDeep } from 'lodash-es';
import Sortable from 'sortablejs';
import { v4 } from 'uuid';

const currentInstance = getCurrentInstance();

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: [Array],
    default: () => [],
  },

  // 宽度
  width: {
    type: [String, Number],
    default: '100px',
  },

  // 高度
  height: {
    type: [String, Number],
    default: '100px',
  },

  // 允许上传类型
  accept: {
    type: [Array],
    default: () => ['image/*'],
  },

  // 图片大小MB
  size: {
    type: [String, Number],
    default: '',
  },

  // 图片上传比例大小，1:1
  ratio: {
    type: String,
    default: '',
  },

  // 图片描述
  desc: {
    type: [Boolean, String],
    default: true,
  },

  // 选择时是否使用base64预览
  isPreview: {
    type: Boolean,
    default: true,
  },
});

const uploadImgsID = `uploadImgsID-${v4()}`;

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

// 储存上传状态
const cacheList = ref([]);

// 上传限制拦截
const beforeUpload = async (rawFile) => {
  // 图片类型拦截
  if (!props.accept.includes('image/*') && props.accept) {
    const arr = props.accept.map((val) => val.replace(/[.]/g, 'image/'));
    if (!arr.includes(rawFile.type)) {
      ElMessage.error(`支持${props.accept.join(',')}格式上传`);
      return false;
    }
  }

  // 图片大小拦截
  if (props.size && rawFile.size / 1024 / 1024 > props.size) {
    ElMessage.error(`支持${props.size}MB以内大小上传`);
    return false;
  }

  // 图片比例拦截
  if (props.ratio) {
    const ratio_arr = props.ratio.split(':');
    if (ratio_arr.length == 2) {
      const { width, height } = await calculateImageSize(rawFile);
      if (width / height != ratio_arr[0] / ratio_arr[1]) {
        ElMessage.error(`支持比例${props.ratio}，该图片为${width}*${height}！`);
        return false;
      }
    }
  }

  cacheList.value.push({ loading: true, uid: rawFile.uid, imageUrl: '' });

  return true;
};

// 自定义上传
const initHttpRequest = async (options) => {
  const { file } = options;
  const formData = new FormData();
  formData.append('file', file);

  emit('update:modelValue', cacheList.value);

  // 是否预览
  if (props.isPreview) {
    let index = cacheList.value.findIndex((v) => v.uid == file.uid);
    let base64Img = await fileFormBase64(file);
    cacheList.value[index] = { loading: false, imageUrl: base64Img };
    emit('update:modelValue', cacheList.value);
  }
};

// 图片是否加载失败
const isError = ref(false);
const onImageError = (e) => {
  console.log(e, 'onImageError');
  isError.value = true;
};

// 查看
const handleView = (index) => {
  const { refs } = currentInstance;
  refs['imageRef' + index][0].$refs.container.firstElementChild.click();
};

// 删除
const handleDelete = (index) => {
  let data = JSON.parse(JSON.stringify(props.modelValue));
  data.splice(index, 1);
  emit('update:modelValue', data);
};

const initSortable = () => {
  const sortableDom = document.querySelector('.c-upload-imgs-sortable');
  console.log(sortableDom, 'sortableDom');
  Sortable.create(sortableDom, {
    group: {
      name: 'words',
      pull: true,
      put: true,
    },
    animation: 200,
    filter: '.c-upload-handle',
    onEnd({ newIndex, oldIndex }) {
      const data = cloneDeep(props.modelValue);
      const currRow = data.splice(oldIndex, 1)[0];
      data.splice(newIndex, 0, currRow);
      emit('update:modelValue', data);
    },
  });
};

// 初始化
const init = () => {
  const uploadImgsDom = document.getElementById(uploadImgsID);
  uploadImgsDom.style.setProperty('--w', props.width);
  uploadImgsDom.style.setProperty('--h', props.height);
  if (props.ratio) {
    const ratio_arr = props.ratio.split(':');
    if (ratio_arr.length == 2) {
      const [w, h] = ratio_arr;
      const max = Math.max(w, h);
      const curw = Number((props.width || props.height || '100px').split('px')[0]);
      const part = curw / max;
      uploadImgsDom.style.setProperty('--w', `${Math.round(part * w)}px`);
      uploadImgsDom.style.setProperty('--h', `${Math.round(part * h)}px`);
    }
  }
};

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      initSortable();
    });
  },
  { deep: true },
);

watch(
  () => [props.width, props.height],
  () => {
    init();
  },
);

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.c-upload-imgs {
  --w: 100px;
  --h: 100px;
  width: 100%;
}

.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  // 图片预览
  .preview {
    width: var(--w);
    height: var(--h);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    margin: 0px 6px 6px 0px;
    .preview-img {
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      box-sizing: border-box;
    }

    .preview-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
      opacity: 0;
      transition: opacity 0.2s ease-in;
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-mask--icon {
        color: #fff;
        margin: 0 6px;
      }

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }

  // 上传框
  .c-upload-handle {
    width: var(--w);
    height: var(--h);
    margin: 0px 6px 6px 0px;

    & > div,
    :deep(.el-upload) {
      width: 100%;
      height: 100%;
    }

    // 上传框样式
    .uploader {
      width: 100%;
      height: 100%;
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      box-sizing: border-box;

      &:hover {
        border-color: var(--el-color-primary);
      }

      .uploader-icon {
        font-size: 22px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        text-align: center;
      }
    }
  }
}

// 描述
.c-upload-imgs-desc {
  width: 100%;
  display: block;
  font-size: 12px;
  color: #8f959e;
  margin-top: 10px;
  line-height: 1.4;
}
</style>
