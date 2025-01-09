<template>
  <c-card>
    <div class="css-vfx">
      <div class="cube-box">
        <cube></cube>
      </div>
      <div class="clock-box">
        <clock></clock>
      </div>
      <div class="mosquito-box">
        <mosquito></mosquito>
      </div>
      <div class="prize-box">
        <prize></prize>
      </div>
      <div class="ball-rolling">
        <ball-rolling></ball-rolling>
      </div>
      <div class="theme-switch-box">
        <theme-switch :size="30"></theme-switch>
      </div>
    </div>
  </c-card>
</template>

<script setup>
import cube from '@/components/css-demo/cube.vue';
import clock from '@/components/css-demo/clock.vue';
import mosquito from '@/components/css-demo/mosquito.vue';
import prize from '@/components/css-demo/prize.vue';
import ballRolling from '@/components/css-demo/ball-rolling.vue';
import ThemeSwitch from '@/components/css-demo/theme-switch.vue';
</script>

<style lang="scss" scoped>
.css-vfx {
  display: flex;
  flex-wrap: wrap;
}

.cube-box,
.clock-box,
.mosquito-box,
.prize-box,
.ball-rolling,
.theme-switch-box {
  width: 360px;
  height: 360px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.mosquito-box {
  background-image: linear-gradient(25deg, #08495b, #447462, #6da266, #94d367);
}
</style>
