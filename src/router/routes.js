/**
 * @description: 路由、菜单数据
 * name: 路由名称，可选项，默认path路径使用'.'拼接
 * meta.title: 路由标题
 * meta.menu: 是否在菜单栏中展示，默认展示
 * meta.autoExpand: 是否在菜单栏中展开，默认折叠
 * meta.keepAlive: 是否使用keep-alive缓存，默认不缓存
 * meta.icon: 是否显示图标，默认不显示
 * @return {*}
 */
export const routes = [
  {
    path: '/index',
    meta: { title: '首页', icon: true },
    component: 'views/home/index.vue',
  },
  {
    path: '/el-encap',
    meta: { title: '常见El封装', autoExpand: true, icon: true },
    children: [
      {
        path: '/el-encap/table-template',
        component: 'views/el-encap/table-template/index.vue',
        meta: { title: '表格封装', keepAlive: true },
        children: [
          {
            path: '/el-encap/table-template/details-page',
            component: 'views/el-encap/table-template/details-page.vue',
            meta: { title: '表格详情页', menu: false, keepAlive: true },
          },
        ],
      },
      {
        path: '/el-encap/form-template',
        component: 'views/el-encap/form-template/index.vue',
        meta: { title: '表单封装', keepAlive: true },
      },
    ],
  },
  {
    path: '/feature',
    meta: { title: '功能模版', autoExpand: true, icon: true },
    children: [
      {
        path: '/feature/familiar',
        meta: { title: '常见模板', autoExpand: true, icon: false },
        children: [
          {
            path: '/feature/familiar/component',
            component: 'views/feature/familiar/component/index.vue',
            meta: { title: '组件' },
          },
          {
            path: '/feature/familiar/function',
            component: 'views/feature/familiar/function/index.vue',
            meta: { title: '函数' },
          },
          {
            path: '/feature/familiar/api',
            component: 'views/feature/familiar/api/index.vue',
            meta: { title: 'api' },
          },
        ],
      },
      {
        path: '/feature/directives',
        component: 'views/feature/directives/index.vue',
        meta: { title: '自定义指令', icon: false },
      },
      {
        path: '/text-label',
        component: 'views/feature/text-label/index.vue',
        meta: { title: '文字标注' },
      },
      {
        path: '/feature/concurrence-task',
        component: 'views/feature/concurrence-task/index.vue',
        meta: { title: '并发任务' },
      },
      {
        path: '/feature/emojis',
        component: 'views/feature/emojis/index.vue',
        meta: { title: 'emojis表情' },
      },
      // {
      //   path: '/feature/markdown',
      //   component: 'views/feature/markdown/index.vue',
      //   meta: { title: 'markdown文档' },
      // },
      // {
      //   path: '/feature/real-time-rreview-html',
      //   component: 'views/feature/realTimeRreviewHtml/index.vue',
      //   meta: { title: '实时预览网页' },
      // },
      // {
      //   path: '/feature/worker',
      //   component: 'views/feature/worker/index.vue',
      //   meta: { title: 'worker多线程' },
      // },
      {
        path: '/feature/mqtt-server',
        component: 'views/feature/mqtt-server/index.vue',
        meta: { title: 'mqtt通信' },
      },
      {
        path: '/feature/video-fps',
        component: 'views/feature/video-fps/index.vue',
        meta: { title: '视频相关' },
      },
      {
        path: '/feature/observer',
        component: 'views/feature/observer/index.vue',
        meta: { title: '元素观察者' },
      },
      {
        path: '/feature/directory-picker',
        component: 'views/feature/directory-picker/index.vue',
        meta: { title: '文件选择器' },
      },
    ],
  },
  {
    path: '/third-party',
    meta: { title: '第三方插件', icon: true, autoExpand: true },
    children: [
      {
        path: '/third-party/draggable',
        component: 'views/third-party/draggable/index.vue',
        meta: { title: '拖拽排序' },
      },
      {
        path: '/third-party/virtual-scroller',
        component: 'views/third-party/virtual-scroller/index.vue',
        meta: { title: '虚拟滚动' },
      },
      {
        path: '/third-party/img-lazy',
        component: 'views/third-party/img-lazy/index.vue',
        meta: { title: '图片懒加载' },
      },
      {
        path: '/third-party/vueuse',
        component: 'views/third-party/vueuse/index.vue',
        meta: { title: 'vueuse函数集合' },
      },
      {
        path: '/third-party/echarts',
        component: 'views/third-party/echarts/index.vue',
        meta: { title: 'echart图表' },
      },
      {
        path: '/third-party/cropper',
        component: 'views/third-party/cropper/index.vue',
        meta: { title: '图片裁剪' },
      },
    ],
  },
  {
    path: '/render-optimize',
    meta: { title: '渲染优化', icon: true },
    children: [
      {
        path: '/render-optimize/task-execution',
        component: 'views/render-optimize/task-execution/index.vue',
        meta: { title: '大量任务优化' },
      },
      {
        path: '/render-optimize/visible-win-render',
        component: 'views/render-optimize/visible-win-render/index.vue',
        meta: { title: '大量dom优化' },
      },
    ],
  },
  {
    path: '/css-vfx',
    meta: { title: 'css相关', icon: true },
    children: [
      {
        path: '/css-vfx/sass',
        component: 'views/css-vfx/sass/index.vue',
        meta: { title: 'sass属性' },
      },
      {
        path: '/css-vfx/css',
        component: 'views/css-vfx/css/index.vue',
        meta: { title: 'css属性' },
      },
      {
        path: '/css-vfx/css-demo',
        component: 'views/css-vfx/css-demo/index.vue',
        meta: { title: '常见效果' },
      },
      {
        path: '/css-vfx/animation-api',
        component: 'views/css-vfx/animation-api/index.vue',
        meta: { title: 'animationApi' },
      },
    ],
  },
  {
    path: '/canvas',
    meta: { title: 'canvas', icon: true },
    children: [
      {
        path: '/canvas/watermark',
        component: 'views/canvas/watermark/index.vue',
        meta: { title: '水印背景' },
      },
      {
        path: '/canvas/fireworks',
        component: 'views/canvas/fireworks/index.vue',
        meta: { title: '烟花效果' },
      },
      {
        path: '/canvas/drag',
        component: 'views/canvas/drag/index.vue',
        meta: { title: '绘制和拖动' },
      },
      {
        path: '/canvas/stars',
        component: 'views/canvas/stars/index.vue',
        meta: { title: '星星背景' },
      },
      {
        path: '/canvas/signature-board',
        component: 'views/canvas/signature-board/index.vue',
        meta: { title: '签字板' },
      },
      {
        path: '/canvas/lottery',
        component: 'views/canvas/lottery/index.vue',
        meta: { title: '抽奖特效' },
      },
    ],
  },
  {
    path: '/system',
    meta: { title: '系统管理', icon: true },
    children: [
      {
        path: '/system/setting',
        component: 'views/system/setting/index.vue',
        meta: { title: '系统设置', keepAlive: true },
      },
      {
        path: '/system/user',
        component: 'views/system/user/index.vue',
        meta: { title: '个人中心', keepAlive: true },
      },
    ],
  },
  {
    path: '/logs',
    meta: { title: '监控日志', icon: true },
    children: [
      {
        path: '/logs/monitor-performance',
        component: 'views/logs/monitor-performance/index.vue',
        meta: { title: '性能日志' },
      },
      {
        path: '/logs/console',
        component: 'views/logs/monitor-error/index.vue',
        meta: { title: '错误日志' },
      },
    ],
  },
  {
    path: '/test',
    meta: { title: '测试', icon: true },
    children: [
      {
        path: '/test/test1',
        component: 'views/test/test1/index.vue',
        meta: { title: '测试1', keepAlive: true },
      },
    ],
  },
  {
    path: '/not-popular-label',
    component: 'views/not-popular-label/index.vue',
    meta: { title: '不常用标签', icon: true },
  },
];
