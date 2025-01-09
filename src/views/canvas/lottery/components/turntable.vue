<template>
  <canvas width="300" height="300" id="turntableID"></canvas>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { generateRandomNum } from '@/utils/tools.js';

const emit = defineEmits(['on-start']);

const props = defineProps({
  /**
   * 扇形数据
   * @type Array
   */
  sectorData: {
    type: Array,
    default: () => [],
  },
  /**
   * id
   * @type string, number
   */
  id: {
    type: [String, Number],
    default: '',
  },
});

let sector = props.sectorData;

let canvas = {};
let context = {};

const dpr = window.devicePixelRatio;
const deg = Math.PI / 180; // 圆周率
const roundX = 150; // 圆的中心x
const roundY = 150; // 圆的中心y
const roundR = 130; // 圆的半径
const angle = 360 / sector.length; // 每个展示所占大小
const padding = 15; // 扇形上方边距
const maxWidth = Math.sin((deg * angle) / 2) * (roundR - padding) * 2; // 文字的最大宽度

let rotateDeg = 0; // 初始角度大小
let timeoutId = null; // 回调id
let incrementNum = 0; // 增量 控制速度快慢

// 扇形的初始角度
const startAngleDeg = Math.ceil((0 - angle / 2 - 90) * deg * 100) / 100;
const endAngleDeg = Math.ceil((angle - angle / 2 - 90) * deg * 100) / 100;

const isImgCoord = true; // 图片是否动态位置

// 动画回调
const animationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

// 获取旋转角度
const getPointerDeg = computed(() => {
  if (props.id) {
    const { range } = sector.find((v) => v.id == props.id) || {};
    const num = generateRandomNum(range[0], range[1]);
    const randomNum = generateRandomNum(3 * 360, 6 * 360);
    const remainder = randomNum % 360; // 剩余角度
    let pointerDeg = 0; // 指定停止角度
    if (remainder >= num) {
      pointerDeg = ((randomNum - (remainder - num)) % 360) + randomNum;
    } else {
      pointerDeg = ((randomNum + (num - remainder)) % 360) + randomNum;
    }
    return pointerDeg;
  } else {
    return 1;
  }
});

// 加载图片
const onLoadImg = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      resolve(img);
    };
  });
};

// 计算不同半径的对边长度
const getTextWidth = (radius) => {
  return Math.sin((deg * angle) / 2) * (radius - padding) * 2;
};

// 文字换行
const getTextList = (text, fontSize) => {
  const textList = text.split('');
  const lineList = [];
  let lineText = '';
  let lineNum = 1;
  let lineWidth = maxWidth; // 文字换行时，不同半径下的最大文字长度
  for (let index = 0; index < textList.length; index++) {
    const { width } = context.measureText(lineText);
    if (width >= lineWidth - 2 * padding) {
      lineList.push(lineText);
      lineText = '';
      lineWidth = getTextWidth(roundR - fontSize * lineNum);
      lineNum++;
    }
    lineText += textList[index];
  }
  lineList.push(lineText);
  return lineList;
};

// 等待
const awit = (time = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// 计算停止时的位置
const stopPointer = () => {
  if (!timeoutId) {
    const r = 360 - (rotateDeg % 360);
    const item = sector.find((v) => v.range[0] < r && v.range[1] >= r);
    console.log(r, item, '当前扇区');
    emit('on-change', item, r);
  }
};

const draw = (callback) => {
  context.clearRect(0, 0, context.width, context.height);

  context.save();
  context.beginPath();
  context.strokeStyle = '#6e3f00';
  context.lineWidth = '10';
  context.arc(roundX, roundY, roundR, deg * 0, deg * 360);
  context.closePath();
  context.stroke();
  context.restore();

  sector.forEach((item, idx) => {
    context.save();
    context.beginPath();
    context.moveTo(roundX, roundY);

    // 旋转
    context.translate(roundX, roundY);
    context.rotate(Math.round(deg * (angle * idx + rotateDeg) * 100) / 100);

    // 扇区
    context.arc(0, 0, roundR, startAngleDeg, endAngleDeg);
    context.closePath();
    context.fillStyle = item.color;
    context.fill();

    // 文字
    const fontSize = 14;
    const lineHeight = 2;
    const textY = -(roundR - fontSize - padding);
    context.fillStyle = '#fff';
    context.font = `${fontSize}px Georgia`;
    context.textAlign = 'center';

    // 获取不同半径的文字最大长度
    const textList = getTextList(item.text, fontSize);
    textList.forEach((text, i) => {
      context.fillText(text, 0, textY + i * (fontSize + lineHeight));
    });

    // 图片
    const imgSize = 32;
    const imgTop = (textList.length - 1) * (fontSize + lineHeight); // 动态y坐标
    const imgY = -(roundR - imgSize - fontSize - (isImgCoord ? imgTop : padding / 2));
    context.drawImage(item.image, -imgSize / 2, imgY, imgSize, imgSize);

    context.restore();
  });

  // 绘制指针
  context.save();
  context.beginPath();
  context.fillStyle = '#FF0000';
  context.arc(roundX, roundY, roundR / 4.5, deg * 0, deg * 360);
  context.closePath();
  callback && callback();
  context.fill();

  // 抽奖字样
  const fontSize = 14;
  context.fillStyle = '#fff';
  context.font = `${fontSize}px Georgia`;
  context.textAlign = 'center';
  context.fillText('抽奖', roundX, roundY + fontSize / 2);

  // 绘制箭头
  context.beginPath();
  context.fillStyle = '#FF0000';
  context.moveTo(140, 125);
  context.lineTo(150, 100);
  context.lineTo(160, 125);
  context.closePath();
  context.fill();

  context.restore();
};

// 开始
const start = () => {
  // render();
  random();
};

// 停止
const stop = () => {
  window.cancelAnimationFrame(timeoutId);
  clearTimeout(timeoutId);
  timeoutId = null;
  stopPointer();
  rotateDeg = 0;
  incrementNum = 0;
};

// 减速
const down = () => {
  incrementNum -= 0.2;
};

// 加速
const up = () => {
  incrementNum += 0.2;
};

// 随机中奖
const random = () => {
  if (timeoutId) {
    return;
  }
  render();
  let status = false;
  const randomNum = generateRandomNum(3 * 360, 6 * 360); // 随机圈数角度
  const fn = async () => {
    await awit(100);
    console.log(rotateDeg, incrementNum, 'rotateDegTime', randomNum);
    if (rotateDeg >= randomNum) status = true;
    status ? down() : up();
    incrementNum >= 0 ? fn() : stop();
  };
  fn();
};

// 内定中奖
const lottery = () => {
  const { range } = sector.find((v) => v.id == props.id) || {};
  const num = generateRandomNum(range[0], range[1]);
  const randomNum = generateRandomNum(3 * 360, 6 * 360);
  const remainder = randomNum % 360; // 剩余角度
  let pointerDeg = 0; // 指定停止角度
  if (remainder >= num) {
    pointerDeg = ((randomNum - (remainder - num)) % 360) + randomNum;
  } else {
    pointerDeg = ((randomNum + (num - remainder)) % 360) + randomNum;
  }
  console.log(pointerDeg, 'pointerDeg');

  render();

  // let status = false;
  // const fn = async () => {
  //   await awit(100);
  //   // console.log(rotateDeg, incrementNum, 'rotateDegTime', pointerDeg);
  //   if (rotateDeg >= pointerDeg / 2) status = true;

  //   if (status) {
  //     let diff = pointerDeg - rotateDeg;
  //     let isSize = remainder <= diff;

  //     // console.log(
  //     //   isSize,
  //     //   remainder,
  //     //   diff,
  //     //   diff / remainder,
  //     //   incrementNum,
  //     //   'diff',
  //     //   rotateDeg,
  //     //   pointerDeg,
  //     // );

  //     if (isSize) {
  //       down();
  //     } else {
  //       console.log(isSize, incrementNum, '----', rotateDeg, pointerDeg, diff, incrementNum / diff);
  //       // incrementNum *= remainder / remainder - diff;
  //       // incrementNum *= diff / remainder;
  //       if (incrementNum - 0.2 * 0.9 < 0) {
  //         incrementNum *= 0.9;
  //       } else {
  //         incrementNum -= 0.2 * 0.96;
  //       }
  //     }
  //     if (diff <= 1) {
  //       incrementNum = 0;
  //     }
  //   } else {
  //     up();
  //   }

  //   incrementNum > 0 ? fn() : stop();
  // };
  // fn();
};

const init = async () => {
  canvas = document.getElementById('turntableID');
  context = canvas.getContext('2d');
  const { width, height } = canvas;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  // canvas.style.zoom = 0.5;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  // context.scale(dpr, dpr);

  let imgs = await Promise.all(sector.map((v) => onLoadImg(v.url)));
  sector = sector.map((v, i) => {
    return {
      ...v,
      image: imgs[i],
      range: [i * angle, (i + 1) * angle],
    };
  });
  console.log(sector, 'sector');

  // 点击事件
  canvas.onclick = function (e) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    draw(() => {
      console.log(context.isPointInPath(x, y), x, y, 'isPointInPath');
      if (context.isPointInPath(x, y)) {
        emit('on-start', x, y);
      }
    });
  };

  draw();
};

const render = () => {
  rotateDeg = rotateDeg + incrementNum;
  console.log(rotateDeg, incrementNum, '==');
  draw();
  if (rotateDeg > 1000) {
    incrementNum -= 0.1;
  } else {
    incrementNum += 0.1;
  }
  // if (rotateDeg <= 0) {
  //   incrementNum = 0;
  //   stop();
  // }
  timeoutId = animationFrame(render);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  stop();
});

defineExpose({ start, stop, down, up, random, lottery });
</script>

<style lang="scss" scoped></style>
