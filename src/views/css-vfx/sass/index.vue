<template>
  <c-card>
    <example-container name="sass">
      <div class="extend">继承和占位符</div>
      <div class="mixin">混入和传值</div>
      <div class="each">
        <div>循环和运算</div>
        <div>
          <div v-for="item in 12" :key="item">{{ item }}</div>
        </div>
      </div>
    </example-container>
  </c-card>
</template>

<script setup>
// components
import exampleContainer from '@/components/example-container/index.vue';
</script>

<style lang="scss" scoped>
%common-class {
  font-weight: 600;
  line-height: 22px;
  padding: 10px;
  box-sizing: border-box;
}

%extend-class {
  font-size: 18px;
  background-color: var(--el-fill-color-dark);
  color: #333;
}

/* 继承和占位符 */
.extend {
  @extend %common-class;
  @extend %extend-class;
  margin: 10px 0;
}

/* 混入和传值 */
@mixin mixin-class($color: #333) {
  color: $color;
}

.mixin {
  @extend %common-class;
  @extend %extend-class;
  @include mixin-class(#666);
  margin: 10px 0;
}

/* 循环和运算 */
$eachFontSize: 14;
.each {
  @extend %common-class;
  @extend %extend-class;
  margin: 10px 0;

  line-height: 1;

  & > div:nth-child(1) {
    margin-bottom: 10px;
  }

  & > div:nth-child(2) {
    display: flex;
    align-items: flex-start;

    @for $var from 0 to 13 {
      $eachFontSize: ($eachFontSize + $var) !global;

      div:nth-child(#{$var}) {
        font-size: #{$eachFontSize}px;
        margin: 0 4px;
        background-color: rgb(255, 216, 216);
      }
    }
  }
}
</style>
