<template>
  <c-card isAffix>
    <div class="canvas-handle">
      <input type="color" :value="drawColor" @change="onColorChange" />
    </div>
    <canvas id="canvas"></canvas>
  </c-card>
</template>

<script setup>
import { onMounted } from 'vue';

let ctx;
let cvs;
let drawColor = '#ff0000';
let cvsBouding;
let dpr = devicePixelRatio * 1 || 1;
let shapes = [];

const onColorChange = (e) => {
  drawColor = e.target.value;
};

const init = () => {
  const { width, height } = cvsBouding;
  cvs.width = width * dpr;
  cvs.height = height * dpr;
  cvs.style.width = width + 'px';
  cvs.style.height = height + 'px';
};

class Rectangle {
  constructor(color, startX, startY) {
    this.color = color;
    this.startX = startX;
    this.startY = startY;
    this.endX = startX;
    this.endY = startY;
  }

  get minX() {
    return Math.min(this.startX, this.endX);
  }

  get minY() {
    return Math.min(this.startY, this.endY);
  }

  get maxX() {
    return Math.max(this.startX, this.endX);
  }

  get maxY() {
    return Math.max(this.startY, this.endY);
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.minX * dpr, this.minY * dpr);
    ctx.lineTo(this.maxX * dpr, this.minY * dpr);
    ctx.lineTo(this.maxX * dpr, this.maxY * dpr);
    ctx.lineTo(this.minX * dpr, this.maxY * dpr);
    ctx.lineTo(this.minX * dpr, this.minY * dpr);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineCap = 'square';
    ctx.lineWidth = 3 * dpr;
    ctx.stroke();
  }
}

const draw = () => {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (const shape of shapes) {
    shape.draw();
  }
};

const getShape = (x, y) => {
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (x >= shapes[i].minX && x <= shapes[i].maxX && y >= shapes[i].minY && y <= shapes[i].maxY) {
      return shapes[i];
    }
  }
};

const onmousedownCvs = () => {
  cvs.onmousedown = (e) => {
    const rect = new Rectangle(drawColor, e.offsetX, e.offsetY);
    const shape = getShape(e.offsetX, e.offsetY);
    if (shape) {
      const { startX, startY, endX, endY } = shape;
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      window.onmousemove = (e) => {
        const disX = e.clientX - cvsBouding.left - mouseX;
        const disY = e.clientY - cvsBouding.top - mouseY;
        shape.startX = startX + disX;
        shape.startY = startY + disY;
        shape.endX = endX + disX;
        shape.endY = endY + disY;
      };
    } else {
      shapes.push(rect);
      window.onmousemove = (e) => {
        rect.endX = e.clientX - cvsBouding.left;
        rect.endY = e.clientY - cvsBouding.top;
      };
    }
    window.onmouseup = () => {
      window.onmousemove = null;
      window.onmouseup = null;
    };
  };
};

onMounted(() => {
  console.log(dpr, 'dpr');
  cvs = document.getElementById('canvas');
  ctx = cvs.getContext('2d');
  cvsBouding = cvs.getBoundingClientRect();

  init();
  draw();
  onmousedownCvs();
});
</script>

<style lang="scss" scoped>
.canvas-handle {
  padding-bottom: 10px;
  box-sizing: border-box;
}

#canvas {
  width: 100%;
  height: 100%;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box;
}
</style>
