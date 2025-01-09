<template>
  <div class="c-upload-img" :id="uploadImgID">
    <div class="container">
      <el-upload
        v-if="!modelValue"
        :show-file-list="false"
        :accept="accept.join(',')"
        :before-upload="beforeUpload"
        :http-request="initHttpRequest"
      >
        <slot>
          <div class="uploader" v-loading="loading">
            <el-icon class="uploader-icon"><Plus /></el-icon>
          </div>
        </slot>
      </el-upload>

      <div class="preview" v-else>
        <el-image
          ref="imageRef"
          fit="cover"
          class="preview-img"
          :src="modelValue"
          preview-teleported
          hide-on-click-modal
          :preview-src-list="[modelValue]"
          @error="onImageError"
        ></el-image>

        <div class="preview-mask">
          <el-icon class="preview-mask--icon" @click="handleView" v-if="!isError">
            <View />
          </el-icon>

          <el-icon class="preview-mask--icon" @click="handleDelete">
            <Delete />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="c-upload-img-desc" v-if="desc">
      <slot name="desc">
        <span v-if="getDescText">注：{{ getDescText }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup name="c-upload-img">
import { computed, ref, unref, onMounted, watch } from 'vue';
import { Plus, View, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { fileFormBase64, calculateImageSize } from '@/utils/tools.js';
import { v4 } from 'uuid';

const emit = defineEmits(['update:modelValue', 'on-change']);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
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

const uploadImgID = `uploadImgID-${v4()}`;

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
  const ratio_arr = props.ratio.split(':');
  if (props.ratio && ratio_arr.length == 2) {
    const { width, height } = await calculateImageSize(rawFile);

    if (width / height != ratio_arr[0] / ratio_arr[1]) {
      ElMessage.error(`支持比例${props.ratio}，该图片为${width}*${height}！`);
      return false;
    }
  }

  emit('on-change', rawFile);
  return true;
};

// 自定义上传
const loading = ref(false);
const initHttpRequest = async (options) => {
  loading.value = true;

  const formData = new FormData();
  formData.append('file', options.file);

  // 选择时是否使用base64预览
  if (props.isPreview) {
    let base64Img = await fileFormBase64(options.file);
    emit('update:modelValue', base64Img);
  }

  loading.value = false;
};

// 图片是否加载失败
const isError = ref(false);
const onImageError = () => {
  isError.value = true;
};

// 查看
const imageRef = ref(null);
const handleView = () => {
  unref(imageRef).$refs.container.firstElementChild.click();
};

// 删除
const handleDelete = () => {
  emit('update:modelValue', '');
};

// 初始化
const init = () => {
  const uploadImgDom = document.getElementById(uploadImgID);
  uploadImgDom.style.setProperty('--w', props.width);
  uploadImgDom.style.setProperty('--h', props.height);
  if (props.ratio) {
    const ratio_arr = props.ratio.split(':');
    if (ratio_arr.length == 2) {
      const [w, h] = ratio_arr;
      const max = Math.max(w, h);
      const curw = Number((props.width || props.height || '100px').split('px')[0]);
      const part = curw / max;
      uploadImgDom.style.setProperty('--w', `${Math.round(part * w)}px`);
      uploadImgDom.style.setProperty('--h', `${Math.round(part * h)}px`);
    }
  }
};

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
.c-upload-img {
  --w: 100px;
  --h: 100px;
}

.container {
  width: var(--w);
  // height: var(--h);

  & > div,
  :deep(.el-upload) {
    width: 100%;
    height: 100%;
  }

  // 上传框样式
  .uploader {
    width: var(--w);
    height: var(--h);
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

  // 图片预览
  .preview {
    width: var(--w);
    height: var(--h);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    .preview-img {
      width: 100%;
      height: 100%;
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
}

// 描述
.c-upload-img-desc {
  width: 100%;
  display: block;
  font-size: 12px;
  color: #8f959e;
  margin-top: 10px;
  line-height: 1.4;
}
</style>
