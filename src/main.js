import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// pinia
import { store } from './pinia';
app.use(store);

// router
import router from './router';
app.use(router);

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);

// vue-lazyload
import VueLazyload from 'vue-lazyload';
app.use(VueLazyload);

// 二次封装全局element-plus组件
import CustomGlobalElement from './components/custom-global-element/index.js';
app.use(CustomGlobalElement);

// 全局注册指令
import directives from './directives/index.js';
directives(app);

// map 全局引入
// import * as globalMap from './config/global-variable.js';
// app.config.globalProperties.$globalMap = globalMap;

// 自定义样式
import './styles/common.scss';
import './styles/color.css';
import './styles/atom.css';
// import './styles/reset.css';
import './styles/normalize.css';

// nprogress样式
import 'element-plus/dist/index.css';
import 'nprogress/nprogress.css';

// element暗黑
import 'element-plus/theme-chalk/dark/css-vars.css';

// 使用svg 需要引入svg-icons-register 配置
import 'virtual:svg-icons-register';

// 错误监控
// import { errorLog } from '@/utils/monitor-error.js';
// errorLog(app);

// // 性能监控
// import { performanceLog } from '@/utils/monitor-performance.js';
// performanceLog(app);

app.mount('#app');
