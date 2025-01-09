import Dexie from 'dexie';

const db = new Dexie('myDatabase');

db.version(1).stores({
  // 错误表
  error: '++id,code,msg,router,file,createTime',
  // 性能表
  performance:
    '++id,loadTime,FP,FCP,LCP,TTI,TCP,DNS,TTFB,domReady,dom,resources,redirect,createTime',
});

export { db };
