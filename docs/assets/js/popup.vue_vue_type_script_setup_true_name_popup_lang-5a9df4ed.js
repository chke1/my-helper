import b from"./append-popup-3b1b8986.js";import{c as w,x as g}from"./index-00d4ac3a.js";import{a as r,W as e,U as c,ag as t,v as y,x as h,Q as v,F as C,d as D}from"./main/chunk-vue-32374f64.js";const k=D({name:"popup"}),S=Object.assign(k,{emits:["refresh"],setup(x,{emit:T}){const a=w(),u=r({input:"",inputNumber:0,switch:1,select:1}),i=r([{formType:"input",prop:"input",label:"输入框:"},{formType:"input-number",prop:"inputNumber",label:"数字框:"},{formType:"switch",prop:"switch",label:"开关:",inactiveValue:0,activeValue:1},{formType:"select",prop:"select",label:"下拉选择:",optionList:[{label:"类型1",value:1},{label:"类型2",value:2}],optionProps:{label:"label",value:"value"}},{formType:"slot",prop:"slot",label:"弹窗嵌套:",slot:e(t("el-button"),{onClick:()=>f()},{default:()=>[c("打开嵌套弹窗")]})},{formType:"slot",prop:"slot",label:"弹窗抽屉:",slot:e(t("el-button"),{onClick:()=>_()},{default:()=>[c("打开弹窗抽屉")]})}]);a.getModal().type=="edit";const m=r(null),d=async(s,l,p)=>{l.loading=!0;let o=await g({...s}).catch(n=>n);o!=null&&o.code&&(p(),l.loading=!1)},f=()=>{a.openModal("append-popup")},_=()=>{a.openModal("append-drawer")};return(s,l)=>{const p=t("c-form"),o=t("c-dialog"),n=t("c-drawer");return y(),h(C,null,[e(p,{ref_key:"formRef",ref:m,"label-width":"100px",isDialog:"",model:u.value,rows:i.value,onSubmit:d},null,8,["model","rows"]),e(o,{title:"嵌套标题","append-to-body":"",width:500,name:"append-popup"},{default:v(()=>[e(b)]),_:1}),e(n,{title:"抽屉标题","append-to-body":"",width:500,name:"append-drawer"})],64)}}});export{S as _};