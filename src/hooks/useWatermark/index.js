import { computed } from 'vue';
export function useWatermark(props) {
  const { fontSize = 30, text = '我是水印', gap = 20 } = props || {};

  return computed(() => {
    // 创建一个 canvas
    const canvas = document.createElement('canvas');
    const devicePixelRatio = window.devicePixelRatio || 1;
    // 设置字体大小
    const size = fontSize;
    const font = size * devicePixelRatio + 'px serif';
    const ctx = canvas.getContext('2d');
    // 获取文字宽度
    ctx.font = font;
    const { width } = ctx.measureText(text);
    const canvasSize = Math.max(100, width) + gap * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // 旋转 45 度让文字变倾斜
    ctx.rotate((Math.PI / 180) * -45);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 将文字画出来
    ctx.fillText(text, 0, 0);

    return {
      base64: canvas.toDataURL(),
      size: canvasSize,
      styleSize: canvasSize / devicePixelRatio,
    };
  });
}
