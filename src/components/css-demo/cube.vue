<template>
  <div class="cube-warp">
    <div class="cube">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cube-warp {
  position: relative;
  min-width: 360px;
  min-height: 360px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cube {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  perspective: 200;
  transform-style: preserve-3d;
  transform-origin: 50% 50% 50%;
  transform: rotateX(30deg) rotateY(30deg) rotateZ(0) translate3d(0, 0, 0);
  animation: roll 10s infinite;
}

.cube div:nth-child(1),
.cube div:nth-child(2),
.cube div:nth-child(3),
.cube div:nth-child(4),
.cube div:nth-child(5),
.cube div:nth-child(6),
.recen {
  position: absolute;
  font-size: 30px;
  line-height: 200px;
  text-align: center;
  width: 200px;
  height: 200px;
}

.cube div:nth-child(1) {
  background: rgba(255, 0, 0, 0.6);
  transform-origin: 0 0;
  transform: translate3d(0, 0, -100px) rotateX(0) rotateY(0) rotateZ(0);
  z-index: 6;
}

.cube div:nth-child(2) {
  background: rgba(0, 255, 0, 0.6);
  transform-origin: 100% 50%;
  transform: translate3d(0, 0, -100px) rotateX(0) rotateY(90deg) rotateZ(0);
  z-index: 5;
}

.cube div:nth-child(3) {
  background: rgba(0, 0, 255, 0.6);
  transform-origin: 0 0;
  transform: translate3d(0, 0, 100px) rotateX(0) rotateY(0) rotateZ(0);
  z-index: 4;
}

.cube div:nth-child(4) {
  background: rgba(253, 153, 235, 0.6);
  transform-origin: 0 50%;
  transform: translate3d(0, 0, -100px) rotateX(0) rotateY(-90deg) rotateZ(0);
  z-index: 3;
}

.cube div:nth-child(5) {
  background: rgba(255, 141, 0, 0.6);
  transform-origin: 50% 0;
  transform: translate3d(0, 0, -100px) rotateX(90deg) rotateY(0) rotateZ(0);
  z-index: 2;
}

.cube div:nth-child(6) {
  background: rgba(255, 224, 0, 0.6);
  transform-origin: 50% 100%;
  transform: translate3d(0, 0, -100px) rotateX(-90deg) rotateY(0) rotateZ(0);
  z-index: 1;
}

@keyframes roll {
  0% {
    transform: rotateX(30deg) rotateY(10deg) rotateZ(0deg);
  }
  15% {
    transform: rotateX(30deg) rotateY(-30deg) rotateZ(0deg);
  }
  30% {
    transform: rotateX(30deg) rotateY(90deg) rotateZ(10deg);
  }
  45% {
    transform: rotateX(30deg) rotateY(180deg) rotateZ(10deg);
  }
  60% {
    transform: rotateX(30deg) rotateY(270deg) rotateZ(15deg);
  }
  75% {
    transform: rotateX(-90deg) rotateY(10deg) rotateZ(15deg);
  }
  90% {
    transform: rotateX(90deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg);
  }
}
</style>
