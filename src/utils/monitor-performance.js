import dayjs from 'dayjs';
import { db } from '@/utils/db.js';

const getPerformanceInfo = () => {
  return new Promise((resolve, reject) => {
    // 监听页面加载事件
    window.addEventListener('load', function () {
      // W3C Level2  PerformanceNavigationTiming
      // 使用了High-Resolution Time，时间精度可以达毫秒的小数点好几位。
      // performance.timing  (目前兼容性高，仍然可使用，未来可能被废弃)。
      let len = performance.getEntriesByType('navigation').length;
      const navigation = len ? performance.getEntriesByType('navigation')[0] : performance.timing;

      // 首次绘制时间 白屏时间
      const FP =
        performance.getEntriesByType('paint').filter((entry) => entry.name == 'first-paint')[0]
          ?.startTime || 0;

      // 首次内容绘制时间 首屏时间
      const FCP =
        performance
          .getEntriesByType('paint')
          .filter((entry) => entry.name == 'first-contentful-paint')[0]?.startTime || 0;

      // 最大内容绘制时间 暂时返回为[]
      let LCP = 0;
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      const lcpLen = lcpEntries.length;
      if (lcpLen > 0) {
        LCP = lcpEntries[lcpLen - 1].renderTime || lcpEntries[lcpLen - 1]?.loadTime || 0;
      }

      // 首次可交互时间
      const TTI = navigation.domInteractive - navigation.fetchStart;

      // 计算TCP连接时间
      const TCP = navigation.connectEnd - navigation.connectStart;

      // 计算DNS查询时间
      const DNS = navigation.domainLookupEnd - navigation.domainLookupStart;

      // 计算请求到响应的第一个字节时间跨度
      const TTFB = navigation.responseStart - navigation.requestStart;

      // DOM渲染耗时
      const domReady = navigation.domContentLoadedEventEnd - navigation.fetchStart;

      // DOM解析耗时
      const dom = navigation.domInteractive - navigation.responseEnd;

      // 资源加载耗时
      const resources = navigation.domComplete - navigation.domContentLoadedEventEnd;

      // 重定向耗时
      const redirect = navigation.redirectEnd - navigation.redirectStart;

      // 页面中依赖的所有资源加载完 页面完全加载时间
      const loadTime = navigation.loadEventStart - navigation.fetchStart;

      resolve({
        loadTime,
        FP,
        FCP,
        LCP,
        TTI,
        TCP,
        DNS,
        TTFB,
        domReady,
        dom,
        resources,
        redirect,
      });
    });
  });
};

export const performanceLog = async () => {
  console.log(window.location.href, 'document');
  const res = await getPerformanceInfo();
  console.log(res, 'navigation');

  let item = {
    ...res,
    router: window.location.href,
    userAgent: navigator.userAgent,
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  db.table('performance').add(item);
};

/**
 * 获取数据
 */
export const getPerformance = async (params) => {
  let performance = await db.table('performance').toArray();

  console.log(performance, 'error==');

  return { code: 0, data: { data: performance, page: 1, total: performance.length } };
};
