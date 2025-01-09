<template>
  <c-card isAffix>
    <div class="canvas-handle">
      <el-button @click="handleSaveImg">保存图片</el-button>
      <el-button @click="handleClear">清空签名</el-button>
    </div>
    <canvas
      class="canvas"
      id="signatureID"
      @mousedown="onEventStart"
      @mousemove.stop.prevent="onEventMove"
      @mouseup="onEventEnd"
      @touchstart="onEventStart"
      @touchmove.stop.prevent="onEventMove"
      @touchend="onEventEnd"
    ></canvas>
  </c-card>
</template>

<script setup>
import { onMounted } from 'vue';
import { download } from '@/utils/tools.js';

let canvas = {};
let ctx = {};
let dpr = devicePixelRatio * 1 || 1;
// 正在绘制中，用来控制 move 和 end 事件
let painting = false;
// 绘制起点
let startX = 0;
let startY = 0;

// 获取触发点相对被触发dom的左、上角距离
const getOffset = (event) => {
  let offset = 0;
  if (event.offsetX) {
    // pc端
    const { offsetX, offsetY } = event;
    offset = [offsetX, offsetY];
  } else {
    // 移动端
    const { top, left } = canvas.value.getBoundingClientRect();
    const offsetX = event.touches[0].clientX - left;
    const offsetY = event.touches[0].clientY - top;
    offset = [offsetX, offsetY];
  }

  return offset;
};

// canvas 画图
function paint(startX, startY, endX, endY, ctx) {
  ctx.beginPath();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.closePath();
  ctx.stroke();
}

// 鼠标/触摸 按下时，保存 触发点相对被触发dom的左、上 距离
const onEventStart = (event) => {
  [startX, startY] = getOffset(event);
  painting = true;
};

const onEventMove = (event) => {
  if (painting) {
    // 鼠标/触摸 移动时，保存 移动点相对 被触发dom的左、上 距离
    const [endX, endY] = getOffset(event);
    paint(startX, startY, endX, endY, ctx);

    // 每次绘制 或 清除结束后，起点要重置为上次的终点
    startX = endX;
    startY = endY;
  }
};

const onEventEnd = () => {
  if (painting) {
    painting = false; // 停止绘制
  }
};

const init = () => {
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // 初始化背景
  ctx.fillStyle = '#fff';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const handleSaveImg = () => {
  const url = canvas.toDataURL();
  download(url, '签名');
};

const handleClear = () => {
  init();
};

onMounted(() => {
  canvas = document.getElementById('signatureID');
  ctx = canvas.getContext('2d');
  init();
});
</script>

<style lang="scss" scoped>
.canvas-handle {
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.canvas {
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #333;
  background-color: #fff;
}
</style>
