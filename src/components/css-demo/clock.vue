<template>
  <div class="clock">
    <div class="clock-face" id="clockElement">
      <time datetime="12:00">12</time>
      <time datetime="1:00">1</time>
      <time datetime="2:00">2</time>
      <time datetime="3:00">3</time>
      <time datetime="4:00">4</time>
      <time datetime="5:00">5</time>
      <time datetime="6:00">6</time>
      <time datetime="7:00">7</time>
      <time datetime="8:00">8</time>
      <time datetime="9:00">9</time>
      <time datetime="10:00">10</time>
      <time datetime="11:00">11</time>
      <span class="arm seconds"></span>
      <span class="arm minutes"></span>
      <span class="arm hours"></span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const time = new Date();
  const hour = -3600 * (time.getHours() % 12);
  const mins = -60 * time.getMinutes();
  const clock = document.getElementById('clockElement');
  clock.style.setProperty('--_dm', `${mins}s`);
  clock.style.setProperty('--_dh', `${hour + mins}s`);
});
</script>

<style scoped>
.clock {
  --_ow: clamp(5rem, 100%, 40rem);
  --_w: 88cqi;
  --_r: calc((var(--_w) - var(--_sz)) / 2);
  --_sz: 12cqi;
  background-image: linear-gradient(47deg, #5452e9, #7f86cb, #90b9ab, #8eed84);
  block-size: var(--_ow);
  border-radius: 26%;
  container-type: inline-size;
  display: grid;
  font-family: ui-sans-serif, system-ui, sans-serif;
  inline-size: var(--_ow);
  margin-inline: auto;
  place-content: center;
}

.clock-face {
  aspect-ratio: 1;
  background: var(--_bgc, #fff);
  border-radius: 50%;
  block-size: var(--_w);
  font-size: 6.2cqi;
  font-weight: 700;
  list-style-type: none;
  inline-size: var(--_w);
  padding: unset;
  position: relative;
}

.clock-face time {
  --_x: calc(var(--_r) + (var(--_r) * cos(var(--_d))));
  --_y: calc(var(--_r) + (var(--_r) * sin(var(--_d))));
  display: grid;
  height: var(--_sz);
  left: var(--_x);
  place-content: center;
  position: absolute;
  top: var(--_y);
  width: var(--_sz);
  color: #000;
  font-weight: 800;
}

.clock-face time:nth-child(1) {
  --_d: 270deg;
}
.clock-face time:nth-child(2) {
  --_d: 300deg;
}
.clock-face time:nth-child(3) {
  --_d: 330deg;
}
.clock-face time:nth-child(4) {
  --_d: 0deg;
}
.clock-face time:nth-child(5) {
  --_d: 30deg;
}
.clock-face time:nth-child(6) {
  --_d: 60deg;
}
.clock-face time:nth-child(7) {
  --_d: 90deg;
}
.clock-face time:nth-child(8) {
  --_d: 120deg;
}
.clock-face time:nth-child(9) {
  --_d: 150deg;
}
.clock-face time:nth-child(10) {
  --_d: 180deg;
}
.clock-face time:nth-child(11) {
  --_d: 210deg;
}
.clock-face time:nth-child(12) {
  --_d: 240deg;
}

.arm {
  background-color: var(--_abg);
  border-radius: calc(var(--_aw) * 2);
  display: block;
  height: var(--_ah);
  left: calc((var(--_w) - var(--_aw)) / 2);
  position: absolute;
  top: calc((var(--_w) / 2) - var(--_ah));
  transform: rotate(0deg);
  transform-origin: bottom;
  width: var(--_aw);
}
.seconds {
  --_abg: rgb(235, 125, 0);
  --_ah: 40cqi;
  --_aw: 1cqi;
  animation: turn 60s linear infinite;
  animation-delay: var(--_ds, 0ms);
}

.minutes {
  --_abg: #333;
  --_ah: 35cqi;
  --_aw: 2.5cqi;
  animation: turn 3600s steps(60, end) infinite;
  animation-delay: var(--_dm, 0ms);
}

.hours {
  --_abg: #333;
  --_ah: 30cqi;
  --_aw: 2.5cqi;
  animation: turn 43200s linear infinite; /* 60 * 60 * 12 */
  animation-delay: var(--_dh, 0ms);
  position: relative;
}

.hours::before {
  background-color: #fff;
  border: 1cqi solid #666;
  border-radius: 50%;
  content: '';
  display: block;
  height: 4cqi;
  position: absolute;
  bottom: -3cqi;
  left: -1.75cqi;
  width: 4cqi;
}

@keyframes turn {
  to {
    transform: rotate(1turn);
  }
}

@supports not (left: calc(1px * cos(45deg))) {
  time {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) rotate(var(--_d)) translate(var(--_r))
      rotate(calc(-1 * var(--_d)));
  }
  p {
    display: block;
  }
}
</style>
