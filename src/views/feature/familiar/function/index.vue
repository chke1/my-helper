<template>
  <c-card>
    <c-form label-width="120px" width="80%" :model="formData" :rows="formRows" :isFooter="false">
      <!-- 获取图片的宽和高 -->
      <template #imageSizeSlot>
        <upload-img v-model="formData.image.url" :desc="false" @on-change="onUploadChange">
          <el-button>选择图片</el-button>
        </upload-img>
        <div style="margin-left: 20px">
          <span>宽：{{ formData.image.width || '-' }}</span>
          <span style="margin-left: 20px">高：{{ formData.image.height || '-' }}</span>
        </div>
      </template>

      <!-- 模板字符串 -->
      <template #templateEngineSlot>
        <div class="template-engine" v-for="(item, i) in formData.template.engineList" :key="item">
          <el-input v-model="item.value" placeholder="请输入"></el-input>
          <el-input v-model="item.label" placeholder="请输入"></el-input>
          <template v-if="formData.template.engineList.length != i + 1">
            <el-button type="danger" :icon="Delete" circle @click="handleDeleteEngine(i)" />
          </template>
          <template v-if="formData.template.engineList.length == i + 1">
            <el-button type="primary" :icon="Plus" circle @click="handleAddEngine" />
          </template>
        </div>
      </template>
    </c-form>
  </c-card>
</template>

<script setup name="familiar-function">
import { computed, onMounted, ref, watch } from 'vue';
import {
  copyText,
  downLoadImg,
  formatBytes,
  generateRandomNum,
  curry,
  getUrlToFile,
  calculateImageSize,
  getRandomColor,
  simpleTemplateEngine,
} from '@/utils/tools.js';
import uploadImg from '@/components/upload/upload-img.vue';
import { Delete, Plus } from '@element-plus/icons-vue';
import { arrange } from '@/utils/chainedMode.js';
import dayjs from 'dayjs';
import { durationFormat, diffFormat } from '@/utils/day.js';
import { useDuration, useTime } from '@/hooks/useDynamicTime/index.js';
import { usePolling } from '@/hooks/usePolling/index.js';
const { runCompute: runDurationCompute, stopCompute: stopDurationCompute } = useDuration();
const { runCompute: runTimeCompute, stopCompute: stopTimeCompute } = useTime();
const {
  duration,
  run: pollingRun,
  clear: pollingClear,
} = usePolling(() => {
  formData.value.polling.count++;
  const count = formData.value.polling.count;
  formData.value.polling.text[1] = `当前已回调${count}次`;
}, 10);
pollingRun();

const formData = ref({
  byte: {
    size: '',
    text: '',
  },

  resource: {
    url: '',
    text: '',
    loading: false,
  },

  date: {
    time: 1000 * 60 * 60 * 24,
    text: '-',
    format: 1,
    transition: 'seconds',
  },

  random: {
    min: 0,
    max: 10,
    value: '',
  },

  dynamicTime: {
    isDurationStatus: true,
    durationValue: 0,
    durationSectionInc: '',
    durationIntactDec: '',

    isTimeStatus: true,
    timeValue: 0,
    timeSectionInc: '',
    timeSectionDec: '',
  },

  color: {
    text: '',
  },

  image: {
    url: '',
    width: '',
    height: '',
  },

  template: {
    string: '我的名字是{{name}}，我的年龄是{{age}}，我的性别是{{gender}}',
    text: '-',
    engineList: [
      { label: '名称', value: 'name' },
      { label: '24', value: 'age' },
      { label: '男', value: 'gender' },
    ],
  },

  polling: {
    text: ['', ''],
    count: 0,
    status: true,
  },
});

const formRows = ref([
  { formType: 'title', label: '常用函数' },
  {
    formType: 'button',
    label: '下载资源：',
    buttonText: '点击下载',
    plain: true,
    type: 'primary',
    onClick: () => {
      let url = new URL('/public/vite.svg', import.meta.url).href;
      downLoadImg(url);
    },
  },
  {
    formType: 'button',
    label: '复制文字：',
    buttonText: '点击复制',
    plain: true,
    type: 'primary',
    onClick: () => copyText('复制文字'),
  },
  {
    formType: 'button',
    label: '链式调用：',
    buttonText: '点击调用',
    plain: true,
    type: 'primary',
    onClick: () => handleArrange(),
  },
  {
    formType: 'button',
    label: '函数柯里化：',
    buttonText: '点击调用',
    plain: true,
    type: 'primary',
    onClick: () => handleCurry(),
    tips: '提示：将一个接受多个参数的函数转换成一系列使用一个参数的函数',
  },
  {
    layout: 'rows-flex',
    label: '字节转换：',
    tips: '注：将字节转换文字显示',
    children: [
      {
        formType: 'input',
        label: '数值:',
        prop: ['byte', 'size'],
        style: { width: '200px' },
        labelWidth: '50px',
        required: false,
        clearable: false,
      },
      {
        formType: 'button',
        label: '',
        buttonText: '点击转换',
        labelWidth: '20px',
        required: false,
        plain: true,
        type: 'primary',
        onClick: () => {
          formData.value.byte.text = formatBytes(formData.value.byte.size);
        },
      },
      {
        formType: 'text',
        label: '结果:',
        prop: ['byte', 'text'],
        labelWidth: '60px',
        required: false,
      },
    ],
  },
  {
    layout: 'rows-flex',
    label: '链接转文件：',
    tips: '注：将资源的url转为文件',
    children: [
      {
        formType: 'input',
        label: 'url:',
        prop: ['resource', 'url'],
        style: { width: '260px' },
        labelWidth: '50px',
        required: false,
        clearable: false,
      },
      {
        formType: 'button',
        label: '',
        buttonText: '点击转换',
        labelWidth: '20px',
        required: false,
        plain: true,
        type: 'primary',
        loading: computed(() => formData.value.resource.loading),
        onClick: async () => {
          const { url } = formData.value.resource;
          formData.value.resource.loading = true;
          let res = await getUrlToFile(url).catch((err) => err);
          formData.value.resource.loading = false;
          let params = {
            size: res.size,
            type: res.type,
          };
          url && (formData.value.resource.text = JSON.stringify(params));
        },
      },
      {
        formType: 'text',
        label: '结果:',
        prop: ['resource', 'text'],
        labelWidth: '60px',
        required: false,
      },
    ],
  },
  {
    layout: 'rows-flex',
    label: '生成颜色：',
    tips: '注：随机生成一个颜色值',
    children: [
      {
        formType: 'button',
        label: '',
        buttonText: '点击转换',
        labelWidth: '20px',
        required: false,
        plain: true,
        type: 'primary',
        loading: computed(() => formData.value.resource.loading),
        onClick: () => {
          formData.value.color.text = getRandomColor();
        },
      },
      {
        formType: 'text',
        label: '结果:',
        prop: ['color', 'text'],
        labelWidth: '60px',
        required: false,
      },
    ],
  },
  {
    label: '图片宽高：',
    formType: 'slot',
    slot: 'imageSizeSlot',
    prop: ['image', 'url'],
  },
  {
    label: '轮询hooks：',
    tips: '注：hooks，封装轮询usePolling',
    layout: 'rows-flex',
    prop: ['polling'],
    children: [
      {
        formType: 'button',
        label: '',
        buttonText: computed(() => (formData.value.polling.status ? '停止' : '启动')),
        labelWidth: '0px',
        required: false,
        plain: true,
        type: 'primary',
        onClick: () => {
          const { status } = formData.value.polling;
          status ? pollingClear() : pollingRun();
          formData.value.polling.status = !formData.value.polling.status;
        },
      },
      {
        formType: 'text',
        label: '',
        prop: ['polling', 'text'],
        labelWidth: '20px',
        required: false,
      },
    ],
  },
  {
    layout: 'rows-flex',
    label: '时间转换：',
    tips: '注：将时间差转换为具体天，小时，分，秒数',
    children: [
      {
        formType: 'input',
        label: '数值:',
        prop: ['date', 'time'],
        style: { width: '100px' },
        labelWidth: '50px',
        required: false,
        clearable: false,
      },
      {
        formType: 'select',
        label: '格式类型:',
        prop: ['date', 'format'],
        style: { width: '100px' },
        labelWidth: '90px',
        required: false,
        optionList: [
          { label: '部分', value: 1 },
          { label: '完整', value: 2 },
        ],
      },
      {
        formType: 'select',
        label: '单位:',
        prop: ['date', 'transition'],
        style: { width: '100px' },
        labelWidth: '60px',
        required: false,
        optionList: [
          { label: '时', value: 'hours' },
          { label: '分', value: 'minutes' },
          { label: '秒', value: 'seconds' },
          { label: '毫秒', value: 'milliseconds' },
        ],
      },
      {
        formType: 'button',
        label: '',
        buttonText: '点击转换',
        labelWidth: '20px',
        required: false,
        plain: true,
        type: 'primary',
        onClick: () => {
          const { time, format, transition } = formData.value.date;
          if (format == 1) formData.value.date.text = durationFormat(time, transition).text;
          if (format == 2) formData.value.date.text = diffFormat(time, transition);
        },
      },
      {
        formType: 'text',
        label: '结果:',
        prop: ['date', 'text'],
        labelWidth: '60px',
        required: false,
      },
    ],
  },
  {
    layout: 'rows-flex',
    label: '生成随机数：',
    tips: '注：生成范围随机数',
    children: [
      {
        formType: 'input-number',
        label: '最小值:',
        prop: ['random', 'min'],
        labelWidth: '60px',
        required: false,
      },
      {
        formType: 'input-number',
        label: '最大值:',
        prop: ['random', 'max'],
        labelWidth: '80px',
        required: false,
      },
      {
        formType: 'button',
        label: '',
        buttonText: '点击生成',
        labelWidth: '20px',
        required: false,
        plain: true,
        type: 'primary',
        onClick: () => {
          formData.value.random.value = generateRandomNum(
            formData.value.random.min,
            formData.value.random.max,
          );
        },
      },
      {
        formType: 'text',
        label: '结果：',
        prop: ['random', 'value'],
        labelWidth: '80px',
        required: false,
      },
    ],
  },
  {
    layout: 'rows',
    label: '动态时长：',
    tips: '注：一个时长的计时，通过封装hooks，将计时逻辑抽离，推荐时长计算',
    children: [
      {
        formType: 'input-number',
        label: '时长：',
        prop: ['dynamicTime', 'durationValue'],
        controlsPosition: 'right',
        required: false,
        labelWidth: '84px',
        onChange: () => onDurationChange(),
      },
      {
        formType: 'button',
        label: '操作：',
        buttonText: computed(() => (formData.value.dynamicTime.isDurationStatus ? '停止' : '开始')),
        labelWidth: '84px',
        required: false,
        plain: true,
        type: 'primary',
        onClick: () => {
          const { isDurationStatus } = formData.value.dynamicTime;
          isDurationStatus ? stopDurationCompute() : onDurationChange();
          formData.value.dynamicTime.isDurationStatus = !isDurationStatus;
        },
      },
      {
        formType: 'text',
        label: '部分显示：',
        prop: ['dynamicTime', 'durationSectionInc'],
        required: false,
        labelWidth: '84px',
      },
      {
        formType: 'text',
        label: '完整显示：',
        prop: ['dynamicTime', 'durationIntactDec'],
        required: false,
        labelWidth: '84px',
      },
    ],
  },
  {
    layout: 'rows',
    label: '动态时间：',
    tips: '注：一个时间点的计时，通过封装hooks，将计时逻辑抽离',
    children: [
      {
        formType: 'date',
        label: '时长：',
        prop: ['dynamicTime', 'timeValue'],
        required: false,
        labelWidth: '84px',
        type: 'datetime',
        style: { width: '200px' },
        onChange: () => onTimeChange(),
      },
      {
        formType: 'button',
        label: '操作：',
        buttonText: computed(() => (formData.value.dynamicTime.isTimeStatus ? '停止' : '开始')),
        labelWidth: '84px',
        required: false,
        plain: true,
        type: 'primary',
        onClick: () => {
          const { isTimeStatus } = formData.value.dynamicTime;
          isTimeStatus ? stopTimeCompute() : onTimeChange();
          formData.value.dynamicTime.isTimeStatus = !isTimeStatus;
        },
      },
      {
        formType: 'text',
        label: '部分显示：',
        prop: ['dynamicTime', 'timeSectionInc'],
        required: false,
        labelWidth: '84px',
      },
      {
        formType: 'text',
        label: '完整显示：',
        prop: ['dynamicTime', 'timeSectionDec'],
        required: false,
        labelWidth: '84px',
      },
    ],
  },
  {
    layout: 'rows',
    label: '模板字符串：',
    tips: '注：通过通配符{{}}标志替换字符串中的字段',
    children: [
      {
        formType: 'input',
        label: '字符串：',
        prop: ['template', 'string'],
        required: false,
        showWordLimit: true,
        rows: 5,
        labelWidth: '84px',
        type: 'textarea',
        style: { width: '500px' },
      },
      {
        formType: 'slot',
        slot: 'templateEngineSlot',
        labelWidth: '84px',
        label: '替换数据：',
        required: false,
      },
      {
        formType: 'button',
        label: '操作：',
        buttonText: '替换',
        labelWidth: '84px',
        required: false,
        plain: true,
        type: 'primary',
        onClick: () => {
          const { string, engineList } = formData.value.template;
          const engine = engineList.reduce((obj, cur) => {
            obj[cur.value] = cur.label;
            return obj;
          }, {});
          formData.value.template.text = simpleTemplateEngine(string, engine);
        },
      },
      {
        formType: 'text',
        label: '转换结果：',
        prop: ['template', 'text'],
        required: false,
        labelWidth: '84px',
      },
    ],
  },
]);

// 链式调用
const handleArrange = () => {
  arrange().print().sleep(2000).print('2s后打印成功！').wait(1000).execute();
};

// 函数柯里化示例
const handleCurry = () => {
  const sum = (a, b, c) => a + b + c;
  const sumThree = curry(sum)(1)(2);
  console.log(sumThree(10));
  console.log(curry(sum)(1)(2)(3));

  const data = [1, 2, 3, 4, 5];
  const curriedFilter = curry((predicate, arr) => arr.filter(predicate));
  const greaterThanThree = (num) => num > 3;
  const filterGreaterThanThree = curriedFilter(greaterThanThree);
  // 延迟计算：先创建过滤函数，最后传入数据时才执行
  const result = filterGreaterThanThree(data);
  console.log(result); // [4, 5]
};

// 动态时长
const onDurationChange = () => {
  const { durationValue } = formData.value.dynamicTime;
  formData.value.dynamicTime.durationSectionInc = runDurationCompute(durationValue, {
    mode: 'inc',
    option: 'section',
    id: 'section',
  });
  formData.value.dynamicTime.durationIntactDec = runDurationCompute(durationValue, {
    mode: 'dec',
    option: 'intact',
    id: 'intact',
  });
};

// 动态时间
const onTimeChange = () => {
  const { timeValue } = formData.value.dynamicTime;
  formData.value.dynamicTime.timeSectionInc = runTimeCompute(timeValue, {
    option: 'section',
    id: 'section',
  });
  formData.value.dynamicTime.timeSectionDec = runTimeCompute(timeValue, {
    option: 'intact',
    id: 'intact',
  });
};

const onUploadChange = async (flie) => {
  const { width, height } = await calculateImageSize(flie);
  formData.value.image.width = width;
  formData.value.image.height = height;
};

const handleAddEngine = () => {
  formData.value.template.engineList.push({ label: '', value: '' });
};

const handleDeleteEngine = (i) => {
  formData.value.template.engineList.splice(i, 1);
};

watch(
  () => duration.value,
  (newValue) => {
    formData.value.polling.text[0] = `${newValue}s 后回调`;
  },
);

onMounted(() => {
  formData.value.dynamicTime.durationValue = generateRandomNum(100, 100000);
  formData.value.dynamicTime.timeValue = dayjs(
    Date.now() - generateRandomNum(1000 * 60 * 1, 1000 * 60 * 60),
  ).format('YYYY-MM-DD HH:mm:ss');
  onDurationChange();
  onTimeChange();
});
</script>

<style lang="scss" scoped>
.template-engine {
  display: flex;
  align-items: center;
  margin: 4px 0;
  width: 100%;

  :deep(.el-input) {
    width: 200px;
    margin-right: 10px;
  }
}
</style>
