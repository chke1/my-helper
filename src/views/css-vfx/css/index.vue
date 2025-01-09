<template>
  <c-card>
    <div class="css-warp">
      <div class="css-item">
        <p class="css-title">grayscale() 函数</p>
        <div class="css-grayscale">
          <img src="@/assets/img-lazy.jpg" :style="grayscaleStyle" />
        </div>
        <el-slider v-model="grayscaleSlider" />
      </div>

      <div class="css-item">
        <p class="css-title">毛玻璃效果</p>
        <div class="css-glass">
          <img src="@/assets/img-lazy.jpg" />
          <span :style="glassStyle"></span>
        </div>
        <el-slider v-model="glassSlider" />
      </div>

      <div class="css-item">
        <p class="css-title">文字间隙</p>
        <div class="css-letter-spacing">
          <span :style="letterSpacingStyle">我是间隙</span>
        </div>
        <el-slider v-model="letterSpacingSlider" />
      </div>

      <div class="css-item">
        <p class="css-title">背景混合</p>
        <div class="css-blend-mode" :style="blendModeBgStyle"></div>
        <el-select popper-class="css-blend-mode-popper" v-model="blendModeBg" placeholder="请选择">
          <el-option v-for="item in blendModeList" :key="item.value" :value="item.value">
            <div class="css-blend-mode--option">
              <span>属性：{{ item.value }}&nbsp;&nbsp;&nbsp;名称：{{ item.label }}</span>
              <span>描述：{{ item.desc }}</span>
            </div>
          </el-option>
        </el-select>
      </div>

      <div class="css-item">
        <p class="css-title">文字混合</p>
        <div class="css-text-blend-mode">
          <p :style="blendModeTextStyle">文字混合</p>
        </div>
        <el-select
          popper-class="css-blend-mode-popper"
          v-model="blendModeText"
          placeholder="请选择"
        >
          <el-option v-for="item in blendModeList" :key="item.value" :value="item.value">
            <div class="css-blend-mode--option">
              <span>属性：{{ item.value }}&nbsp;&nbsp;&nbsp;名称：{{ item.label }}</span>
              <span>描述：{{ item.desc }}</span>
            </div>
          </el-option>
        </el-select>
      </div>
    </div>
  </c-card>
</template>

<script setup>
import { computed, ref } from 'vue';

const grayscaleSlider = ref(50);
const grayscaleStyle = computed(() => {
  return {
    filter: `grayscale(${grayscaleSlider.value}%)`,
  };
});

const glassSlider = ref(5.2);
const glassStyle = computed(() => {
  return {
    '-webkit-backdrop-filter': ` blur(${glassSlider.value}px)`,
    'backdrop-filter': ` blur(${glassSlider.value}px)`,
  };
});

const letterSpacingSlider = ref(1);
const letterSpacingStyle = computed(() => {
  return {
    'letter-spacing': `${letterSpacingSlider.value}px`,
  };
});

const blendModeList = ref([
  { value: 'normal', label: '默认', desc: '使用正常的颜色混合模式。' },
  {
    value: 'multiply',
    label: '正片叠底',
    desc: '将两个颜色的值相乘，得到一个更暗的颜色。这通常用于创建阴影效果。',
  },
  {
    value: 'screen',
    label: '滤色',
    desc: '将两个颜色的值相加，然后减去相乘的值，得到一个更亮的颜色。这通常用于创建高光效果。',
  },
  {
    value: 'overlay',
    label: '叠加',
    desc: '根据背景颜色的亮度来选择颜色混合模式。如果背景颜色较暗，则使用 multiply 模式；如果背景颜色较亮，则使用 screen 模式。',
  },
  {
    value: 'darken',
    label: '变暗',
    desc: '将两个颜色的值比较，使用较暗的那个颜色。',
  },
  {
    value: 'lighten',
    label: '变亮',
    desc: '将两个颜色的值比较，使用较亮的那个颜色。',
  },
  {
    value: 'color-dodge',
    label: '颜色减淡',
    desc: '将前景色分解为 RGB 分量，并将每个分量分别除以（1 减去背景色的对应分量）。然后将每个分量限制在 0 到 1 之间，并使用限制后的前景色作为混合色。',
  },
  {
    value: 'color-burn',
    label: '颜色加深',
    desc: '将前景色分解为 RGB 分量，并将每个分量分别除以背景色的对应分量。然后将每个分量限制在 0 到 1 之间，并使用限制后的前景色作为混合色。',
  },
  {
    value: 'difference',
    label: '差值',
    desc: '将前景色减去背景色的值，并取绝对值。这会导致一个反相的效果。',
  },
  {
    value: 'exclusion',
    label: '排除',
    desc: '将前景色和背景色的值相加，然后减去相乘的值的两倍。这通常用于创建反相效果。',
  },
  {
    value: 'hue',
    label: '色相',
    desc: '将前景色的色相（Hue）与背景色的饱和度（Saturation）和亮度（Lightness）混合。这可以用于在不改变亮度和饱和度的情况下改变颜色。',
  },
  {
    value: 'saturation',
    label: '饱和度',
    desc: '将前景色的饱和度与背景色的色相和亮度混合。这可以用于在不改变颜色的情况下改变饱和度。',
  },
  {
    value: 'color',
    label: '颜色',
    desc: '将前景色的色相、饱和度和亮度与背景色混合。这可以用于在改变所有颜色属性的情况下改变前景色的颜色。',
  },
  {
    value: 'luminosity',
    label: '亮度',
    desc: '将前景色的亮度与背景色的色相和饱和度混合。这可以用于在不改变颜色的情况下改变亮度。',
  },
]);

const blendModeBg = ref('normal');
const blendModeBgStyle = computed(() => {
  return {
    'background-blend-mode': `${blendModeBg.value}`,
  };
});

const blendModeText = ref('normal');
const blendModeTextStyle = computed(() => {
  return {
    'mix-blend-mode': `${blendModeText.value}`,
  };
});
</script>

<style lang="scss" scoped>
.css-warp {
  display: flex;
  flex-wrap: wrap;
}
.css-title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 10px;
}

.css-item {
  min-width: 360px;
  margin: 0 20px 20px 0;
}

.css-grayscale {
  width: 360px;

  & > img {
    width: 360px;
    aspect-ratio: 16/9;
    filter: grayscale(50%);
  }
}

.css-glass {
  position: relative;
  & > img {
    width: 360px;
    aspect-ratio: 16/9;
  }

  & > span {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
    width: 260px;
    height: 120px;
    -webkit-backdrop-filter: blur(5.2px);
    backdrop-filter: blur(5.2px);
    border-radius: 6px;
    border: 1px solid var(--el-border-color);
    background: rgba(255, 255, 255, 0.4);
  }
}

.css-letter-spacing {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--el-fill-color-dark);

  // 首字母大写
  text-transform: capitalize;
  text-align: center;
  line-height: 1.6;
  // 文字间隙
  letter-spacing: 6px;
}

.css-blend-mode {
  width: 360px;
  aspect-ratio: 16/9;
  margin-bottom: 20px;

  background-repeat: no-repeat, repeat;
  background-position: center;
  background-size: 100%;
  background-image: url('@/assets/img-lazy.jpg'), url('@/assets/common/ic-user-avatar.jpg');
  background-blend-mode: normal;
}

.css-text-blend-mode {
  width: 360px;
  aspect-ratio: 16/9;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-repeat: no-repeat, repeat;
  background-position: center;
  background-size: 100%;
  background-image: url('@/assets/img-lazy.jpg');
  // mix-blend-mode: normal;

  & > p {
    color: var(--el-color-primary);
    font-size: 56px;
    font-weight: 600;
    -webkit-text-stroke: 1px #000;
  }
}
</style>

<style lang="scss">
.css-blend-mode-popper .el-select-dropdown__item {
  height: auto;
}

.css-blend-mode-popper .css-blend-mode--option {
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 4px 0;

  & > span {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
