<div align="center">
	<h1>my helper</h1>
	<span>日常学习记录使用，所使用到的图片素材均为学习使用, 请勿用于商业用途, 由此产生的任何法律纠纷概不负责<span>
</div>

## 简介

基于 Vue3、Vite、ElementPlus、Pinia、VueUse 等的中后台模版，包括平常开发中常使用的功能函数和hooks以及实现思路，它使用了最新的前端技术栈，有着对应的代码规范和提交规范，开箱即用的模板，也可用于学习参考。

## 预览

<a href="https://ch-ke.gitee.io/my-helper" target="_blank">my helper 预览地址</a>

## 特性

- 基于vue3、vite、pnpm 进行构建

- 内置了暗黑主题切换

- 颗粒化的动态权限，动态菜单，全局页面状态管理等

- 对该系统做了性能监控和日志监控，也可用做数据埋点和用户行为监控等

- 对常用的组件进行了封装，包括有动态表单，动态表格，虚拟选择器，数据预览，树形分组等

- 封装常见hooks，包括有网络请求、表格、表单、定时轮询、并发任务、事件监听、socket通信等

- 使用keep-alive缓存配合组件name，记录回退时的页面状态，并动态控制

- 对element-puls二次封装并全局自动导入

- 对常用的第三方插件做了演示示例

- 提供了一些功能点的解决思路和方案

- 使用 mediainfo.js 读取视频的格式信息，video.js兼容m3u8播放

- 使用 dexie 做 indexDB数据库 本地存储日志，批量上报

- 使用 eslint + prettier 做风格校验

- 使用 husky + lint-staged + cz-git 做提交校验


## 项目示例图

<img src="https://chke1.github.io/my-helper/helper-preview/login.jpg" />

<img src="https://chke1.github.io/my-helper/helper-preview/home.jpg" />

<img src="https://chke1.github.io/my-helper/helper-preview/table.jpg" />

<img src="https://chke1.github.io/my-helper/helper-preview/setting1.jpg" />

<img src="https://chke1.github.io/my-helper/helper-preview/setting2.jpg" />

<img src="https://chke1.github.io/my-helper/helper-preview/performance.jpg" />

<img src="https://chke1.github.io/my-helper/helper-preview/error.jpg" />


## 暗黑主题

<img src="https://chke1.github.io/my-helper/helper-preview/home-dark.jpg" />

## 性能和细节处理

- 纯前端版本更新通知，发生版本更新后，自动刷新页面获取最新资源

- 长表单、长列表使用帧渲染提升页面显示效率

- 去除生成环境的打印日志，减少打包体积

```bash
build: {
  minify: 'esbuild', // terser, esbuild
  terserOptions: {
    // terser时去除日志
    compress: { drop_console: true, drop_debugger: true },
  },
},
// esbuild时去除日志
esbuild: {
  drop: mode === 'production' ? ['console', 'debugger'] : [],
},
```

- 配置静态资源和第三方插件打包的输出配置

```bash
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
}
```

- 常量枚举，封装取值操作

```bash
// enums.js
export class EnumArray extends Array {
  getLabel(value) {
    return this.find((item) => item?.value === value)?.label || '';
  }

  getValue(label) {
    return this.find((item) => item?.label === label)?.value || '';
  }

  getValues() {
    return this.map((item) => item.value);
  }

  getLabels() {
    return this.map((item) => item.label);
  }

  getItem(value) {
    return this.find((item) => item?.value === value) || {};
  }
}

// 使用
const RoleType = new EnumArray(
  { label: '创建者', value: 1 },
  { label: '超级管理员', value: 2 },
  { label: '普通管理员', value: 3 },
);

```

## 安装使用

需要先安装pnpm

```bash
根据官方规定，使用vite3、vite4，node版本必须是14.18.0以上，指定版本依赖项报错，推荐重装vite。
```

- vite安装

```bash
pnpm create vite@latest
```

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
pnpm run dev
```

- 打包 (会自动更新版本号)

```bash
pnpm run build
```

## vs code 插件安装

```bash
1. Prettier - Code formatter
2. Vue Language Features (Volar)
3. Vue 3 Snippets
4. ESLint
```

## 代码规范

eslint + prettier + stylelint

- 校验并修复代码
  
```bash
pnpm run lint
```

- 校验并修复暂存区的代码
  
```bash
pnpm run lint:lint-staged
```

## 提交规范

husky + lint-staged + cz-git + commitizen

- 代码推送时对代码进行校验，该命令包含了git add . 和 git commit
  
```bash
pnpm run commit
git push origin dev
```

## 使用到的工具以及package.json配置

```bash
{
  "name": "my-helper",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "prepare": "husky install",
    "dev": "vite",
    "build": "node updateVersion.js && vite build",
    "preview": "vite preview --host --mode development",
    "lint": "eslint --ext .js,.vue src",
    "lint:lint-staged": "lint-staged",
    "commit": "git add . && git-cz"
  },
  "dependencies": {
    "@amap/amap-jsapi-loader": "^1.0.1",
    "@element-plus/icons-vue": "^2.1.0",
    "@fingerprintjs/fingerprintjs": "^4.1.0",
    "@videojs-player/vue": "^1.0.0",
    "@vueuse/components": "^10.7.0",
    "@vueuse/core": "^10.1.2",
    "axios": "^1.4.0",
    "dayjs": "^1.11.9",
    "dexie": "^3.2.4",
    "echarts": "^5.4.3",
    "echarts-gl": "^2.0.9",
    "element-plus": "^2.4.3",
    "install": "^0.13.0",
    "lodash": "^4.17.21",
    "mediainfo.js": "^0.2.1",
    "mqtt": "^5.1.3",
    "nprogress": "^0.2.0",
    "pinia": "^2.0.36",
    "pnpm": "^8.5.0",
    "sortablejs": "^1.15.0",
    "terser": "^5.18.0",
    "video.js": "^8.6.1",
    "vue": "^3.2.47",
    "vue-draggable-plus": "^0.3.2",
    "vue-lazyload": "^3.0.0",
    "vue-router": "^4.1.6",
    "vue-virtual-scroller": "2.0.0-beta.8",
    "vuedraggable": "^4.1.0"
  },
  "devDependencies": {
    "@iconify-json/ep": "^1.1.12",
    "@vitejs/plugin-vue": "^4.1.0",
    "@vitejs/plugin-vue-jsx": "^3.0.1",
    "babel-eslint": "^10.1.0",
    "commitizen": "^4.3.0",
    "cz-git": "^1.7.1",
    "eslint": "^8.36.0",
    "eslint-config-prettier": "^8.7.0",
    "eslint-plugin-json": "^3.1.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-vue": "^9.9.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "prettier": "^2.8.8",
    "sass": "^1.62.1",
    "vite": "^4.3.2",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-vue-setup-extend": "^0.4.0"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,ts,vue}": [
      "pnpm run lint",
      "prettier --write"
    ]
  }
}
```

## 目录结构

```
my-helper
├─ .commitlintrc.js
├─ .eslintignore
├─ .eslintrc.js
├─ .husky
│  ├─ pre-commit
│  └─ _
│     └─ husky.sh
├─ .prettierignore
├─ .prettierrc.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  ├─ account-list
│  │  ├─ ic-account-avatar-default.jpg
│  │  ├─ ic-account-avatar1.jpg
│  │  ├─ ic-account-avatar2.jpg
│  │  ├─ ic-account-avatar3.jpg
│  │  └─ ic-account-avatar4.jpg
│  ├─ first-screen-loading
│  │  └─ index.css
│  ├─ mediainfo
│  │  ├─ mediainfo
│  │  │  └─ index.js
│  │  └─ MediaInfoModule.wasm
│  ├─ menu-icon
│  │  ├─ canvas.png
│  │  ├─ css-vfx.png
│  │  ├─ directives.png
│  │  ├─ el-encap.png
│  │  ├─ familiar-api.png
│  │  ├─ familiar-function.png
│  │  ├─ feature.familiar.png
│  │  ├─ feature.png
│  │  ├─ index.png
│  │  ├─ logs.png
│  │  ├─ not-popular-label.png
│  │  ├─ note.png
│  │  ├─ render-optimize.png
│  │  ├─ system.png
│  │  ├─ test.png
│  │  └─ third-party.png
│  ├─ note
│  │  ├─ jsknowledge.html
│  │  ├─ note.css
│  │  └─ software.html
│  ├─ avatar.jpg
│  ├─ version.js
│  └─ vite.svg
├─ README.md
├─ rules
│  └─ eslint.js
├─ src
│  ├─ apis
│  │  └─ setting.js
│  ├─ App.vue
│  ├─ assets
│  │  ├─ common
│  │  │  ├─ drag.svg
│  │  │  ├─ ic-emoji.png
│  │  │  └─ ic-user-avatar.jpg
│  │  ├─ emojis
│  │  │  ├─ ic-ios-emoji.png
│  │  │  └─ ic-wx-emoji.png
│  │  ├─ img-lazy.jpg
│  │  └─ vue.svg
│  ├─ components
│  │  ├─ auth-control
│  │  │  └─ index.vue
│  │  ├─ c-form
│  │  │  ├─ form-item copy.vue
│  │  │  ├─ form-item.vue
│  │  │  ├─ form.console.warn.js
│  │  │  └─ index.vue
│  │  ├─ canvas-demo
│  │  │  └─ stars-bg.vue
│  │  ├─ cropper
│  │  │  └─ index.vue
│  │  ├─ css-demo
│  │  │  ├─ ball-rolling.vue
│  │  │  ├─ clock.vue
│  │  │  ├─ cube.vue
│  │  │  ├─ mosquito.vue
│  │  │  ├─ prize copy.vue
│  │  │  └─ prize.vue
│  │  ├─ custom-global-element
│  │  │  ├─ c-card
│  │  │  │  └─ index.vue
│  │  │  ├─ c-date-picker
│  │  │  │  └─ index.vue
│  │  │  ├─ c-dialog
│  │  │  │  └─ index.vue
│  │  │  ├─ c-drawer
│  │  │  │  └─ index.vue
│  │  │  ├─ c-empty
│  │  │  │  └─ index.vue
│  │  │  ├─ c-form
│  │  │  │  ├─ form-item.vue
│  │  │  │  └─ index.vue
│  │  │  ├─ c-handle
│  │  │  │  └─ index.vue
│  │  │  ├─ c-input
│  │  │  │  └─ index.vue
│  │  │  ├─ c-pagination
│  │  │  │  └─ index.vue
│  │  │  ├─ c-popover
│  │  │  │  └─ index.vue
│  │  │  ├─ c-select
│  │  │  │  └─ index.vue
│  │  │  ├─ c-switch
│  │  │  │  └─ index.vue
│  │  │  ├─ c-table
│  │  │  │  └─ index.vue
│  │  │  └─ index.js
│  │  ├─ echarts-demo
│  │  │  ├─ echart-bar.vue
│  │  │  ├─ echart-line.vue
│  │  │  └─ echart-pie.vue
│  │  ├─ emoji-picker
│  │  │  ├─ emoji-ios.js
│  │  │  ├─ emoji-wx.js
│  │  │  ├─ emoji.css
│  │  │  └─ index.vue
│  │  ├─ example-container
│  │  │  └─ index.vue
│  │  ├─ group-menus
│  │  │  └─ table-group.vue
│  │  ├─ loading
│  │  │  └─ spiral-loading.vue
│  │  ├─ picker-view
│  │  │  └─ index.vue
│  │  ├─ popover
│  │  │  └─ emoji-popover.vue
│  │  ├─ show-card
│  │  │  └─ index.vue
│  │  ├─ upload
│  │  │  ├─ upload-file.vue
│  │  │  ├─ upload-img.vue
│  │  │  └─ upload-imgs.vue
│  │  ├─ video-player
│  │  │  └─ index.vue
│  │  ├─ virtual-scroll
│  │  │  ├─ virtual-scroll-checkout.vue
│  │  │  ├─ virtual-scroll-radio.vue
│  │  │  └─ virtual-scroll-show.vue
│  │  └─ virtual-scroll-modal
│  │     ├─ more-modal.vue
│  │     ├─ show-drawer.vue
│  │     └─ single-modal.vue
│  ├─ config
│  │  ├─ config.js
│  │  ├─ global-variable.js
│  │  ├─ storage-variable.js
│  │  └─ variable-map.js
│  ├─ directives
│  │  ├─ click-outside
│  │  │  └─ index.js
│  │  ├─ focus
│  │  │  └─ index.js
│  │  ├─ index.js
│  │  ├─ resize
│  │  │  └─ index.js
│  │  └─ watermark
│  │     └─ index.js
│  ├─ hooks
│  │  ├─ useAsyncComponent
│  │  │  └─ index.js
│  │  ├─ useDefer
│  │  │  └─ index.js
│  │  ├─ useDynamicTime
│  │  │  └─ index.js
│  │  ├─ useEventListener
│  │  │  └─ index.js
│  │  ├─ useFetch
│  │  │  └─ index.js
│  │  ├─ useForm
│  │  │  └─ index.js
│  │  ├─ useMqtt
│  │  │  └─ index.js
│  │  ├─ usePolling
│  │  │  └─ index.js
│  │  ├─ useSuperTask
│  │  │  └─ index.js
│  │  ├─ useTable
│  │  │  └─ index.js
│  │  └─ useWatermark
│  │     └─ index.js
│  ├─ layout
│  │  ├─ components
│  │  │  ├─ aside
│  │  │  │  ├─ aside-item.vue
│  │  │  │  └─ index.vue
│  │  │  ├─ breadcrumb
│  │  │  │  └─ index.vue
│  │  │  ├─ footer
│  │  │  │  └─ index.vue
│  │  │  ├─ header
│  │  │  │  └─ index.vue
│  │  │  ├─ menu
│  │  │  │  ├─ index.vue
│  │  │  │  └─ menu-item.vue
│  │  │  └─ tabs
│  │  │     └─ index.vue
│  │  └─ index.vue
│  ├─ main.js
│  ├─ pinia
│  │  ├─ index.js
│  │  └─ modules
│  │     ├─ example.js
│  │     ├─ global.js
│  │     ├─ modal.js
│  │     ├─ router.js
│  │     └─ user.js
│  ├─ router
│  │  ├─ index.js
│  │  └─ routes.js
│  ├─ styles
│  │  ├─ atom.css
│  │  ├─ color.css
│  │  ├─ common.scss
│  │  ├─ mixin.scss
│  │  ├─ normalize.css
│  │  └─ reset.css
│  ├─ utils
│  │  ├─ chainedMode.js
│  │  ├─ day.js
│  │  ├─ db.js
│  │  ├─ echarts.js
│  │  ├─ enums.js
│  │  ├─ fetch.js
│  │  ├─ fingerprint.js
│  │  ├─ helpers.js
│  │  ├─ mediainfo.js
│  │  ├─ message-box.js
│  │  ├─ monitor-error.js
│  │  ├─ monitor-performance.js
│  │  ├─ mqtt-server.js
│  │  ├─ super-task.js
│  │  └─ tools.js
│  └─ views
│     ├─ canvas
│     │  ├─ drag
│     │  │  └─ index.vue
│     │  ├─ fireworks
│     │  │  └─ index.vue
│     │  ├─ signature-board
│     │  │  └─ index.vue
│     │  ├─ stars
│     │  │  └─ index.vue
│     │  └─ watermark
│     │     └─ index.vue
│     ├─ css-vfx
│     │  ├─ animation-api
│     │  │  └─ index.vue
│     │  ├─ css
│     │  │  └─ index.vue
│     │  ├─ css-demo
│     │  │  └─ index.vue
│     │  ├─ loading
│     │  │  └─ index.vue
│     │  └─ sass
│     │     └─ index.vue
│     ├─ el-encap
│     │  ├─ form-template
│     │  │  └─ index.vue
│     │  └─ table-template
│     │     ├─ components
│     │     │  ├─ append-popup.vue
│     │     │  └─ popup.vue
│     │     ├─ details-page.vue
│     │     └─ index.vue
│     ├─ error
│     │  ├─ 404.vue
│     │  └─ tip.vue
│     ├─ feature
│     │  ├─ concurrence-task
│     │  │  └─ index.vue
│     │  ├─ directives
│     │  │  └─ index.vue
│     │  ├─ emojis
│     │  │  └─ index.vue
│     │  ├─ familiar
│     │  │  ├─ api
│     │  │  │  └─ index.vue
│     │  │  ├─ component
│     │  │  │  └─ index.vue
│     │  │  └─ function
│     │  │     └─ index.vue
│     │  ├─ markdown
│     │  │  └─ index.vue
│     │  ├─ mqtt-server
│     │  │  └─ index.vue
│     │  ├─ realTimeRreviewHtml
│     │  │  └─ index.vue
│     │  ├─ text-label
│     │  │  └─ index.vue
│     │  ├─ video-fps
│     │  │  └─ index.vue
│     │  └─ worker
│     │     ├─ index.vue
│     │     └─ worker.js
│     ├─ home
│     │  └─ index.vue
│     ├─ login
│     │  └─ login.vue
│     ├─ logs
│     │  ├─ monitor-error
│     │  │  └─ index.vue
│     │  └─ monitor-performance
│     │     └─ index.vue
│     ├─ not-popular-label
│     │  └─ index.vue
│     ├─ note
│     │  └─ index.vue
│     ├─ render-optimize
│     │  ├─ task-execution
│     │  │  ├─ index.vue
│     │  │  └─ worker.js
│     │  └─ visible-win-render
│     │     └─ index.vue
│     ├─ system
│     │  ├─ setting
│     │  │  └─ index.vue
│     │  └─ user
│     │     └─ index.vue
│     ├─ test
│     │  ├─ software
│     │  │  └─ index.vue
│     │  └─ test1
│     │     ├─ index.vue
│     │     └─ worker.js
│     └─ third-party
│        ├─ cropper
│        │  └─ index.vue
│        ├─ draggable
│        │  └─ index.vue
│        ├─ echarts
│        │  └─ index.vue
│        ├─ img-lazy
│        │  └─ index.vue
│        ├─ virtual-scroller
│        │  └─ index.vue
│        └─ vueuse
│           └─ index.vue
├─ updateVersion.js
└─ vite.config.js

```