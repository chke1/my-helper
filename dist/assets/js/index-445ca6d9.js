import{_ as v}from"./index-62cef2e0.js";import{a as r,ag as x,v as s,P as y,Q as b,y as e,x as n,F as c,a8 as d,V as a,aw as P,ax as S}from"./main/chunk-vue-32374f64.js";import"./main/chunk-element-plus-b8cc1db0.js";import"./main/chunk-lodash-es-21c98b27.js";import"./main/chunk-vue-router-c3f0a4ff.js";import"./main/chunk-fingerprintjs-cb838e3e.js";import"./main/chunk-sortablejs-be94e56d.js";const i=o=>(P("data-v-f78ddbd7"),o=o(),S(),o),k=i(()=>e("p",null,"重点事件属性",-1)),I=i(()=>e("p",null,"查找",-1)),D=i(()=>e("p",null,"点",-1)),E=i(()=>e("p",null,"点",-1)),T={__name:"index",setup(o){const m=r([{name:"Promise",desc:`
      使异步变得可控，配合async，await优化回调地狱，回调函数控制权；
      三种状态：分别是 Pending (进行中)、Resolved (已完成)、Rejected (已失败)；
      两个参数：分别是 resolve (操作结果)、reject(错误信息)；
      三个回调：.then()、.catch()、.finally()；

      Promise.all()：参数所有的promise 都 为完成状态，就返回响应；
      Promise.race()：参数所有的promise 其中任意一个为 完成状态，就返回响应；
      Promise.any()：参数所有的promise 只要有了一个为 完成状态，就返回响应；
      Promise.resolve：此方法将传入的参数作为成功结果，通过 Promise.resolve.then()可以拿到。
      Promise.allSettled()：执行每个promise并返回结果，无论其结果是resolve或reject。
    `},{name:"闭包",desc:`
      在一个作用域中可以访问另一个函数内部的局部变量的函数。
    `},{name:"作用域和作用域链",desc:""},{name:"this指向",desc:""},{name:"上下文环境",desc:""},{name:"原型和原型链",desc:""},{name:"事件循环机制",desc:`
      第一步: 先执行script宏任务；
      第二步: 再依次取出微队列中的所有微任务执行 ==> UI线程更新界面；
      第三步: 再取出宏队列中第一个宏任务执行；
      第四步: 再依次取出微队列中的所有微任务执行 ==> UI线程更新界面；
      后面重复三，四步；

      微任务是指在当前任务执行结束后立即执行的任务；
      宏任务是指需要排队等待 JavaScript 引擎空闲时才能执行的任务；

      常见的微任务包括 Promise回调函数、process.nextTick、MutationObserver；
      常见的宏任务包括 setTimeout、setInterval、I/O 操作、DOM 事件、UI 渲染等；
    `},{name:"bind、call、apply",desc:`
      call: 调用fn.call时会将fn中的this指向修改为传入的第一个参数；将后面的参数传入给fn,并立即执行函数fn。
      apply: 和call相同，区别在于传参形式不同，apply接受两个参数，第一个参数是要指向的this对象，第二个参数是一个数组，数组里面的元素会被展开传入fn,作为fn的参数。
      bind: 修改this指向，但不会立即执行fn；会返回一个修改了this指向后的fn。需要调用才会执行。
    `},{name:"js设计模式",desc:""},{name:"Set和Map",desc:""},{name:"常见的对象和数组的拓展方法",desc:""},{name:"html渲染原理（dom树和css树），以及加载顺序",desc:""},{name:"flex-shrink: 0;",desc:""},{name:"flex",desc:`
      flex 属性是 flex-grow、flex-shrink 和 flex-basis 三个属性的简写。
      flex-grow：扩展比率
      flex-shrink：收缩比率
      flex-basis：伸缩基准值
    `},{name:"CSS 容器尺寸单位",desc:`
      cqw
      cqh
      cqi
      cqb
      cqmin
      cqmax
    `},{name:"生成器 (Generator) 和 迭代器 (iterators)",desc:""},{name:"阅读文档，阅读项目源码",desc:""}]),u=r([{name:'v-bind="{}" 传递属性',desc:"透传 Attributes 使用，子组件为一个根节无意触发了Vue3透传Attributes机制没有出现报错，可当你的子组件中有多个根节点时，Vue使用透传Attributes机制也没有办法确定要在哪一个根节点继承属性时，就报出警告"},{name:"Prop 透传 ",desc:"provide inject"},{name:"reduce",desc:""},{name:"hooks",desc:""}]),p=r([{name:"http和https的区别",desc:""},{name:"DNS",desc:""},{name:"TCP/UDP",desc:`
      一、从下往上依次是：物理层，数据链路层，网络层，传输层，会话层，表示层，应用层。
        1. 物理层：二进制数据传输，物理链路和物理特性相关。
        2. 数据链路层：将数据封装成帧进行传输，准确传送至局域网内的物理主机上。
        3. 网络层：数据分组传输和路由选择，能准确的将数据传输到互联网的主机上。
        4. 传输层：端到端的链接，传送数据至主机端口上。
        5. 会话层：管理主机之间的会话，提供会话管理服务。
        6. 表示层：提供解释所交换数据的含义的服务，包括数据之间的格式转换，压缩，加密等操作，对数据进行处理。
        7. 应用层：实现具体的应用功能，直接进程间的通信。
    `},{name:"http请求不同方法的区别",desc:`
      GET: 
      POST: 
      OPTIONS: 
      HEAD: 
      DELETE: 
      TRACE: 
      CONNECT: 
    `},{name:"vue路由hash和history的区别",desc:`
      一、hash: 是一种URL的哈希模式，也被称为锚点模式，监听URL中哈希部分的变化，并根据哈希值来匹配对应的路由，从而展示相应的组件内容；通过改变URL中的哈希值来实现前端路由的导航
      URL不美观、无法处理服务器请求、SEO不友好

      二、history: History模式使用真实的URL路径；通过修改浏览器的历史记录来实现前端路由的导航
      后端服务器需要进行相应的配置，以确保在任何路径下都返回前端应用的入口页面
    `}]),_=r([{name:"纯前端新版本通知",desc:""},{name:"大文件切片上传",desc:""},{name:"前端日志监控",desc:""}]),h=r([{name:"视频播放器",desc:"DPlayer"}]);return(U,g)=>{const f=x("c-card");return s(),y(f,null,{default:b(()=>[k,e("table",null,[(s(!0),n(c,null,d(m.value,(t,l)=>(s(),n("tr",{key:l},[e("td",null,a(t.name),1),e("td",null,a(t.desc),1)]))),128))]),e("table",null,[(s(!0),n(c,null,d(u.value,(t,l)=>(s(),n("tr",{key:l},[e("td",null,a(t.name),1),e("td",null,a(t.desc),1)]))),128))]),I,e("table",null,[(s(!0),n(c,null,d(p.value,(t,l)=>(s(),n("tr",{key:l},[e("td",null,a(t.name),1),e("td",null,a(t.desc),1)]))),128))]),D,e("table",null,[(s(!0),n(c,null,d(_.value,(t,l)=>(s(),n("tr",{key:l},[e("td",null,a(t.name),1),e("td",null,a(t.desc),1)]))),128))]),E,e("table",null,[(s(!0),n(c,null,d(h.value,(t,l)=>(s(),n("tr",{key:l},[e("td",null,a(t.name),1),e("td",null,a(t.desc),1)]))),128))])]),_:1})}}},j=v(T,[["__scopeId","data-v-f78ddbd7"]]);export{j as default};
