<template>
  <c-card class="vueuse">
    <example-container name="vueuse">
      <c-form label-width="120px" width="80%" :model="formData" :rows="formRows" :isFooter="false">
        <template #debounceSlot>
          <div class="vueuse-box">
            <p class="vueuse-box-title">防抖函数：</p>
            <el-space wrap class="vueuse-box-item">
              <el-input placeholder="请输入防抖时间" v-model="formData.debounceFn.time"></el-input>
              <el-button @click="onDebounce()">点击</el-button>
              <span>调用事件次数：{{ formData.debounceFn.count }}</span>
            </el-space>

            <p class="vueuse-box-title">引用值防抖：</p>
            <el-space wrap class="vueuse-box-item">
              <div>
                <el-input-number
                  v-model="debounceTime"
                  controls-position="right"
                  :min="0"
                  :value-on-clear="0"
                />
                ms
              </div>
              <el-input v-model="debounceRefValue" placeholder="请输入数值"></el-input>
              <span>显示数值：{{ debounceRefCount }}</span>
            </el-space>
          </div>
        </template>

        <template #throttleSlot>
          <div class="vueuse-box">
            <p class="vueuse-box-title">节流函数：</p>
            <el-space wrap class="vueuse-box-item">
              <el-input placeholder="请输入节流时间" v-model="formData.throttleFn.time"></el-input>
              <el-button @click="onThrottle()">点击</el-button>
              <span>调用事件次数：{{ formData.throttleFn.count }}</span>
            </el-space>

            <p class="vueuse-box-title">引用值节流：</p>
            <el-space wrap class="vueuse-box-item">
              <div>
                <el-input-number
                  v-model="throttleTime"
                  controls-position="right"
                  :min="0"
                  :value-on-clear="0"
                />
                ms
              </div>
              <el-input v-model="throttleRefValue"></el-input>
              <span>显示数值：{{ throttleRefCount }}</span>
            </el-space>
          </div>
        </template>

        <template #currentDateSlot>
          <div class="vueuse-box">
            <el-space wrap class="vueuse-box-item">
              <span>{{ formData.dateCurrent.formatted }}</span>
              <el-input
                style="width: 200px"
                v-model="formData.dateCurrent.format"
                @input="onDateCurrentFormat"
              ></el-input>
            </el-space>
            <p>{{ currentTimeValue }}</p>
            <p>{{ dynamicTimeValue }}</p>
          </div>
        </template>

        <template #transitionSlot>
          <div class="vueuse-box">
            <el-space wrap class="vueuse-box-item">
              <el-input
                v-model="formData.transition.source"
                @change="onTransitionChange"
              ></el-input>
              <span>显示：{{ Math.round(transitionOutput) }}</span>
            </el-space>
          </div>
        </template>

        <template #elementHoverSlot>
          <div class="vueuse-box" ref="myHoverableElement">{{ isHovered ? '悬停' : '未悬停' }}</div>
        </template>

        <template #mouseInElementSlot>
          <div class="vueuse-box" ref="myMouseInElement">
            <p>x：{{ mouseInInfo.x }}</p>
            <p>y：{{ mouseInInfo.y }}</p>
            <p>sourceType：{{ mouseInInfo.sourceType }}</p>
            <p>elementX：{{ mouseInInfo.elementX }}</p>
            <p>elementY：{{ mouseInInfo.elementY }}</p>
            <p>elementPositionX：{{ mouseInInfo.elementPositionX }}</p>
            <p>elementPositionY：{{ mouseInInfo.elementPositionY }}</p>
            <p>elementHeight：{{ mouseInInfo.elementHeight }}</p>
            <p>elementWidth：{{ mouseInInfo.elementWidth }}</p>
            <p>isOutside：{{ mouseInInfo.isOutside }}</p>
          </div>
        </template>

        <template #useScrollSlot>
          <div class="flex">
            <div class="vueuse-box use-scroll" ref="myScrollElement">
              <div v-for="item in 20" :key="item" class="use-scroll-item">{{ item }}</div>
            </div>
            <div class="use-scroll-show" v-text="myScrollState"></div>
          </div>
        </template>
      </c-form>
    </example-container>
  </c-card>
</template>

<script setup>
import { ref } from 'vue';

// components
import exampleContainer from '@/components/example-container/index.vue';

// @vueuse/core
import {
  useDebounceFn,
  refDebounced,
  useThrottleFn,
  refThrottled,
  useNow,
  useDateFormat,
  useTransition,
  TransitionPresets,
  useTimestamp,
  useElementHover,
  useMouseInElement,
  useScroll,
} from '@vueuse/core';

const formData = ref({
  debounceFn: {
    time: 1000,
    count: 0,
  },

  throttleFn: {
    time: 1000,
    count: 0,
  },

  DateCurrent: {
    value: '',
    time: 1000,
    count: 0,
  },

  dateCurrent: {
    formatted: '',
    format: 'YYYY-MM-DD HH:mm:ss',
  },

  transition: {
    source: 0,
  },
});

// 当前动态时间值
const currentTimeValue = useNow();
const dynamicTimeValue = useTimestamp();

// 引用值防抖
const debounceTime = ref(1000);
const debounceRefValue = ref('');
const debounceRefCount = refDebounced(debounceRefValue, debounceTime.value);

// 引用值节流
const throttleTime = ref(1000);
const throttleRefValue = ref('');
const throttleRefCount = refThrottled(throttleRefValue, throttleTime.value);

// 文字过渡
const transitionSource = ref(0);
const transitionOutput = useTransition(transitionSource, {
  duration: 1500,
  transition: TransitionPresets.easeOutExpo,
});

// 鼠标悬停
const myHoverableElement = ref();
const isHovered = useElementHover(myHoverableElement);

// 鼠标元素
const myMouseInElement = ref();
const mouseInInfo = useMouseInElement(myMouseInElement);

// 使用滚动
const myScrollElement = ref();
const myScrollState = useScroll(myScrollElement);

const formRows = ref([
  { formType: 'slot', slot: 'debounceSlot', label: '防抖：' },
  { formType: 'slot', slot: 'throttleSlot', label: '节流：' },
  { formType: 'slot', slot: 'currentDateSlot', label: '当前时间：' },
  { formType: 'slot', slot: 'transitionSlot', label: '文字过渡：' },
  { formType: 'slot', slot: 'elementHoverSlot', label: '鼠标悬停：' },
  { formType: 'slot', slot: 'mouseInElementSlot', label: '鼠标元素：' },
  { formType: 'slot', slot: 'useScrollSlot', label: '使用滚动：' },
]);

// 防抖
const onDebounce = useDebounceFn(() => {
  formData.value.debounceFn.count++;
}, formData.value.debounceFn.time);

// 节流
const onThrottle = useThrottleFn(() => {
  formData.value.throttleFn.count++;
}, formData.value.throttleFn.time);

// 当前时间
const onDateCurrentFormat = () => {
  const { format } = formData.value.dateCurrent;
  console.log(useNow(), Date.now(), 'useNow()');
  formData.value.dateCurrent.formatted = useDateFormat(currentTimeValue, format);
};
onDateCurrentFormat();

// 文字过渡
const onTransitionChange = (e) => {
  formData.value.transition.source = e;
  transitionSource.value = Number(e);
};
onTransitionChange('1000');
</script>

<style lang="scss" scoped>
.vueuse-box {
  padding: 12px 20px;
  box-sizing: border-box;
  background-color: var(--el-fill-color-dark);
  border-radius: 4px;

  & > p {
    line-height: 32px;
    margin: 0;
  }
}

.vueuse-box-title {
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }
}

.use-scroll {
  width: 300px;
  height: 220px;
  overflow: auto;

  &-item {
    padding: 10px;
    box-sizing: border-box;
  }

  &-show {
    width: 300px;
    margin-left: 20px;
  }
}
</style>
