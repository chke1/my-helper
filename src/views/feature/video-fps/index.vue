<template>
  <c-card isAffix>
    <div class="video-fps">
      <div class="video-fps-left">
        <c-form label-width="100px" :model="formData" :rows="formRows" :isFooter="false">
          <template #videoCoverSlot>
            <div style="margin-bottom: 10px">
              <el-button @click="getCurrentFrame">捕获当前帧画面</el-button>
            </div>
            <upload-imgs v-model="formData.videoCover" :desc="false"></upload-imgs>
          </template>
        </c-form>
      </div>
      <div class="video-fps-right">
        <template v-if="formData.uploadVideo?.temporarilyUrl">
          <video
            ref="myVideo"
            class="video-ele"
            autoplay
            controls
            :src="formData.uploadVideo?.temporarilyUrl"
          ></video>
          <div>视频帧率：{{ videoInfo.fps }} fps</div>
        </template>
        <div class="video-info" v-loading="videoInfo.loading">
          <template v-for="item in videoInfo.data" :key="item">
            <p class="video-info-title">{{ typeMap[item['@type']] }}</p>
            <pre class="video-info-pre" v-text="JSON.stringify(item, null, 2)"></pre>
          </template>
        </div>
      </div>
    </div>
  </c-card>
</template>

<script setup>
import { computed, ref, reactive, nextTick } from 'vue';
import { getMediaInfo } from '@/utils/mediainfo.js';
import { drawVideo } from '@/utils/tools.js';
import uploadImgs from '@/components/upload/upload-imgs.vue';
import { fileFormUrl, getVideoFps } from '@/utils/tools.js';

// map
const typeMap = {
  General: '视频封装格式信息',
  Video: '视频编码相关信息',
  Audio: '音频编码相关信息',
};

const myVideo = ref();

const formData = ref({
  uploadType: 1,
  videoUrl: '',
  uploadVideo: {
    name: '',
    url: '',
  },
  videoCover: [],
});

const videoInfo = reactive({
  loading: false,
  fps: 0,
  data: [],
});

const formRows = ref([
  { formType: 'title', label: '配置信息' },
  {
    formType: 'select',
    prop: 'uploadType',
    label: '上传类型:',
    optionList: [
      { label: '本地选择', value: 1 },
      { label: '视频链接', value: 2 },
    ],
    optionProps: { label: 'label', value: 'value' },
    onChange: (e) => {},
  },
  {
    layout: 'flex',
    tips: '网络视频加载时间较长，不建议加载',
    children: [
      {
        formType: 'input',
        prop: 'videoUrl',
        label: '视频链接:',
        style: { width: '200px' },
        isShow: computed(() => formData.value.uploadType == 2),
      },
      {
        formType: 'button',
        label: '',
        buttonText: '加载视频',
        labelWidth: '10px',
        isShow: computed(() => formData.value.uploadType == 2),
        disabled: computed(() => !formData.value.videoUrl),
        onClick: () => analyzeVideoInfo(formData.value.videoUrl, formData.value.videoUrl),
      },
    ],
  },
  {
    formType: 'upload-file',
    prop: 'uploadVideo',
    label: '本地上传:',
    desc: false,
    multiple: false,
    isShow: computed(() => formData.value.uploadType == 1),
    onEnd: (e) => {
      const url = fileFormUrl(e.file);
      analyzeVideoInfo(url, e.file);
      nextTick(() => {
        getVideoFps(myVideo.value, (v) => {
          videoInfo.fps = v;
        });
      });
    },
  },
  {
    formType: 'slot',
    slot: 'videoCoverSlot',
    prop: 'videoCover',
    ratio: '5:4',
    label: '封面:',
    desc: false,
  },
]);

const analyzeVideoInfo = async (url, val) => {
  videoInfo.loading = true;
  formData.value.uploadVideo['temporarilyUrl'] = url;
  let res = await getMediaInfo(val);
  videoInfo.data = res?.media?.track || [];
  videoInfo.loading = false;
};

const getCurrentFrame = () => {
  if (!myVideo.value) {
    return;
  }
  let imageUrl = drawVideo(myVideo.value);
  formData.value.videoCover.push({ imageUrl });
};
</script>

<style lang="scss" scoped>
.video-fps {
  width: 100%;
  height: 100%;
  display: flex;
}

.video-fps-left {
  flex: 1;
  overflow: auto;
}

.video-fps-right {
  height: 100%;
  flex: 1;
  border: 1px solid #eee;
  margin-left: 20px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 6px;
  overflow: auto;
}

.video-ele {
  width: 100%;
  max-height: 45%;
  background-color: rgba(0, 0, 0, 0.02);
}

.video-info {
  overflow: auto;
  min-height: 300px;
}

.video-info-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 0px;
  margin-top: 20px;
}

.video-info-pre {
  font-size: 14px;
  font-family: sans-serif;
  line-height: 20px;
}

.upload-video-handle {
  width: 100%;
  display: flex;
}

.upload-video-item {
  margin: 10px;
}
</style>
