<template>
  <c-card isAffix bodyClass="animation-api">
    <div id="animationID" class="animation">
      <div class="ball" id="ballID"></div>
    </div>
  </c-card>
</template>

<script setup>
import { onMounted } from 'vue';

let aniRect = {};
let animationDom = {};
let ballDom = {};

const pointerInit = (e) => {
  const pointerDom = document.createElement('div');
  pointerDom.classList.add('pointer');
  pointerDom.style.left = `${e.offsetX - 50}px`;
  pointerDom.style.top = `${e.offsetY - 50}px`;
  animationDom.appendChild(pointerDom);
  pointerDom.addEventListener('animationend', () => {
    pointerDom.remove();
  });
};

const init = () => {
  console.log(animationDom, 'animationDom');

  aniRect = animationDom.getBoundingClientRect();

  animationDom.addEventListener('click', (e) => {
    console.log(e, 'ee');
    pointerInit(e);
    ballMove(e.offsetX, e.offsetY);
  });
};

const ballMove = (x, y) => {
  const rect = ballDom.getBoundingClientRect();
  const ballX = rect.left - aniRect.left;
  const ballY = rect.top - aniRect.top;
  const clickX = x - rect.width / 2;
  const clickY = y - rect.height / 2;

  ballDom.getAnimations().forEach((animation) => animation.cancel());

  const rad = Math.atan2(y - ballY, x - ballX);
  const deg = Math.round((rad * 180) / Math.PI);
  console.log(aniRect, rect, 'rect');
  console.log(ballX, ballY);
  console.log(clickX, clickY);
  console.log(ballDom.getAnimations(), deg, 'getAnimations');

  ballDom.animate(
    [
      {
        transform: `translate(${ballX}px, ${ballY}px)`,
      },
      // {
      //   transform: `translate(${ballX}px, ${ballY}px) scale(1.2)`,
      //   offset: 0.6,
      // },
      // {
      //   transform: `translate(${ballX}px, ${ballY}px)`,
      //   offset: 0.8,
      // },
      {
        transform: `translate(${clickX}px, ${clickY}px)`,
      },
    ],

    {
      duration: 1000,
      fill: 'forwards',
    },
  );
};

onMounted(() => {
  animationDom = document.getElementById('animationID');
  ballDom = document.getElementById('ballID');
  init();
});
</script>

<style lang="scss" scoped>
.animation {
  width: 100%;
  height: 100%;
  background-color: var(--el-color-info-light-5);
  position: relative;
}

.ball {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  transform: translate(0px, 0px);
  transform-origin: 50% 50%;
}
</style>

<style lang="scss">
.animation-api .pointer {
  width: 100px;
  height: 100px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  animation: pointerAnim 0.5s linear;
  animation-fill-mode: forwards;
}

@keyframes pointerAnim {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
</style>
