import{u as m}from"./index-bf586a57.js";import"./main/chunk-element-plus-b8cc1db0.js";import{d}from"./db-8eb27b6e.js";import{d as i,ag as r,v as b,P as _,Q as t,W as e,u as l}from"./main/chunk-vue-32374f64.js";import"./message-box-4866a89d.js";import"./main/chunk-lodash-es-21c98b27.js";import"./main/chunk-dexie-7a5662ba.js";const u=async p=>{let a=await d.table("performance").toArray();return{code:0,data:{data:a,page:1,total:a.length}}},f=i({name:"logs.monitor-performance"}),k=Object.assign(f,{setup(p){const{loading:a,tableData:n}=m({api:u,params:{},options:{},callBack:()=>{}});return(g,T)=>{const o=r("el-table-column"),c=r("c-table"),s=r("c-card");return b(),_(s,null,{default:t(()=>[e(c,{loading:l(a),data:l(n),"show-overflow-tooltip":""},{table:t(()=>[e(o,{prop:"id",label:"ID",width:"60"}),e(o,{prop:"createTime",label:"创建时间"}),e(o,{prop:"router",label:"页面"}),e(o,{prop:"userAgent",label:"浏览器信息"}),e(o,{prop:"FP",label:"FP(白屏时间)"}),e(o,{prop:"FCP",label:"FCP(首屏时间)"}),e(o,{prop:"TTI",label:"TTI(首次可交互)"}),e(o,{prop:"TTFB",label:"TTFB(请求到响应)","min-width":"90"}),e(o,{prop:"domReady",label:"DOM渲染"}),e(o,{prop:"dom",label:"DOM解析"}),e(o,{prop:"resources",label:"资源加载"}),e(o,{prop:"redirect",label:"重定向"}),e(o,{prop:"loadTime",label:"所有资源加载"})]),_:1},8,["loading","data"])]),_:1})}}});export{k as default};