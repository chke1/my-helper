import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';

const modeMap = {
  a: { port: 2000, proxy: 'http://' },
  b: { port: 2001, proxy: 'http://' },
  c: { port: 2002, proxy: 'http://' },
  development: { port: 8080, proxy: 'http://' },
  production: { port: 9000, proxy: 'http://' },
};

// https://vitejs.dev/config/
export default defineConfig((event) => {
  const { command, mode } = event;
  console.log(command, mode, ' command, mode, event---', event);

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      // 配置svg
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // viteCompression({
      //   verbose: true, // 默认即可
      //   disable: false, //开启压缩(不禁用)，默认即可
      //   deleteOriginFile: true, //删除源文件
      //   threshold: 1024000, //压缩前最小文件大小
      //   algorithm: 'gzip', //压缩算法
      // }),
    ],
    base: process.env.NODE_ENV == 'production' ? '/my-helper/' : './',
    server: {
      host: '0.0.0.0',
      port: modeMap[mode]?.port || 3000,
      proxy: {
        '/api': modeMap[mode]?.proxy || 'http://',
      },
    },

    preview: {
      host: '0.0.0.0',
      port: 4567,
      proxy: {
        '/api': 'http://',
      },
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },

    build: {
      outDir: 'docs',
      minify: 'esbuild', // terser, esbuild
      terserOptions: {
        // terser时去除日志
        compress: { drop_console: true, drop_debugger: true },
      },
      rollupOptions: {
        input: {
          index: resolve(__dirname, `index.html`),
        },
        output: {
          // 将稍微大且长时间不会改变的进行分包缓存区分，无需每次都拉去服务端的数据
          manualChunks: {
            'main/chunk-vue': ['vue'],
            'main/chunk-vue-router': ['vue-router'],
            'main/chunk-echarts': ['echarts'],
            'main/chunk-lodash-es': ['lodash-es'],
            'main/chunk-element-plus': ['element-plus'],
            'main/chunk-vue-virtual-scroller': ['vue-virtual-scroller'],
            'main/chunk-dexie': ['dexie'],
            'main/chunk-fingerprintjs': ['@fingerprintjs/fingerprintjs'],
            'main/chunk-sortablejs': ['sortablejs'],
            'main/chunk-vuedraggable': ['vuedraggable'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },

    // esbuild时去除日志
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/mixin.scss";',
        },
      },
    },
  };
});
