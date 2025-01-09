<template>
  <div class="loading">
    <div class="dot" v-for="item in 36" :key="item"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
$ballSize: 10px; // 小球尺寸
$containerSize: 150px; // 容器尺寸
$n: 36; // 小球数量
$pDeg: 15deg; // 每个小球的角度

.loading {
  width: $containerSize;
  height: $containerSize;
  border-radius: 50%;
  position: relative;
  background-color: transparent;

  .dot {
    position: absolute;
    left: 50%;
    top: 0;
    width: $ballSize;
    height: $ballSize;
    margin-left: -#{calc($ballSize / 2)};
    margin-top: -#{calc($ballSize / 2)};
    perspective: 70px;
    transform-style: preserve-3d;
    background-color: transparent;
    transform-origin: calc($ballSize / 2) calc($containerSize / 2 + $ballSize / 2);

    @for $i from 1 through $n {
      &:nth-child(#{$i}) {
        transform: rotate($pDeg * ($i - 1));

        &::before,
        &::after {
          animation-delay: #{$i}s;
        }
      }
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    &::before {
      background: #000;
      top: -100%;
      animation: rotation-black 1s linear infinite;
      @keyframes rotation-black {
        0% {
          animation-timing-function: ease-in;
        }

        25% {
          transform: translate3d(0, 100%, $ballSize);
          animation-timing-function: ease-out;
        }

        50% {
          transform: translate3d(0, 200%, 0);
          animation-timing-function: ease-in;
        }

        75% {
          transform: translate3d(0, 200%, -$ballSize);
          animation-timing-function: ease-in-out;
        }
      }
    }

    &::after {
      background: red;
      top: 100%;
      animation: rotation-white 1s linear infinite;
      @keyframes rotation-white {
        0% {
          animation-timing-function: ease-in;
        }

        25% {
          transform: translate3d(0, -100%, -$ballSize);
          animation-timing-function: ease-out;
        }

        50% {
          transform: translate3d(0, -200%, 0);
          animation-timing-function: ease-in;
        }

        75% {
          transform: translate3d(0, -200%, $ballSize);
          animation-timing-function: ease-in-out;
        }
      }
    }
  }
}
</style>
