!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).MediaInfo=t()}(this,(function(){"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function t(t){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?e(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):e(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,u(n.key),n)}}function n(e,t,r){return(t=u(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i,o,s=[],u=!0,l=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(s.push(n.value),s.length!==t);u=!0);}catch(e){l=!0,a=e}finally{try{if(!u&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(l)throw a}}return s}}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function u(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}var l,c=["AudioCount","Audio_Channels_Total","BitDepth_Detected","BitDepth","BitDepth_Stored","Channels","Channels_Original","Chapters_Pos_Begin","Chapters_Pos_End","Comic_Position_Total","Count","DataSize","ElementCount","EPG_Positions_Begin","EPG_Positions_End","FirstPacketOrder","FooterSize","Format_Settings_GMC","Format_Settings_RefFrames","FrameCount","FrameRate_Den","FrameRate_Num","GeneralCount","HeaderSize","Height_CleanAperture","Height","Height_Offset","Height_Original","ImageCount","Matrix_Channels","MenuCount","OtherCount","Part_Position","Part_Position_Total","Played_Count","Reel_Position","Reel_Position_Total","Resolution","Sampled_Height","Sampled_Width","SamplingCount","Season_Position","Season_Position_Total","Source_FrameCount","Source_SamplingCount","Source_StreamSize_Encoded","Source_StreamSize","Status","Stored_Height","Stored_Width","StreamCount","StreamKindID","StreamKindPos","StreamOrder","StreamSize_Demuxed","StreamSize_Encoded","StreamSize","TextCount","Track_Position","Track_Position_Total","Video0_Delay","VideoCount","Width_CleanAperture","Width","Width_Offset","Width_Original"],f=["BitRate_Encoded","BitRate_Maximum","BitRate_Minimum","BitRate","BitRate_Nominal","Bits-Pixel_Frame","BitsPixel_Frame","Compression_Ratio","Delay","Delay_Original","DisplayAspectRatio_CleanAperture","DisplayAspectRatio","DisplayAspectRatio_Original","Duration_End_Command","Duration_End","Duration_FirstFrame","Duration_LastFrame","Duration","Duration_Start2End","Duration_Start_Command","Duration_Start","Events_MinDuration","FrameRate_Maximum","FrameRate_Minimum","FrameRate","FrameRate_Nominal","FrameRate_Original_Den","FrameRate_Original","FrameRate_Original_Num","FrameRate_Real","Interleave_Duration","Interleave_Preload","Interleave_VideoFrames","OverallBitRate_Maximum","OverallBitRate_Minimum","OverallBitRate","OverallBitRate_Nominal","PixelAspectRatio_CleanAperture","PixelAspectRatio","PixelAspectRatio_Original","SamplesPerFrame","SamplingRate","Source_Duration_FirstFrame","Source_Duration_LastFrame","Source_Duration","TimeStamp_FirstFrame","Video_Delay"],d={coverData:!1,chunkSize:262144,format:"object",full:!1},p=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.mediainfoModule=t,this.options=r,this.mediainfoModuleInstance=new t.MediaInfo("object"===r.format?"JSON":r.format,r.coverData,r.full)}var a,s,u;return a=e,(s=[{key:"analyzeData",value:function(e,t,r){var n=this;if(void 0===r)return new Promise((function(r,a){n.analyzeData(e,t,(function(e,t){return t?a(t):r(e)}))}));var a=0,i=function(e){var i=function(t){if(0===t.length||n.openBufferContinue(t,t.length))return!1;var r=n.openBufferContinueGotoGet();return-1===r?a+=t.length:(a=r,n.openBufferInit(e,r)),!0},o=function(){n.openBufferFinalize();var e=n.inform();"object"===n.options.format?r(n.parseResultJson(e)):r(e)};n.openBufferInit(e,a),function s(){var u,l=function(e){i(e)?s():o()};try{var c,f=Math.min(null!==(c=n.options.chunkSize)&&void 0!==c?c:d.chunkSize,e-a);u=t(f,a)}catch(e){if(e instanceof Error)return r("",e);if("string"==typeof e)return r("",new Error(e))}u instanceof Promise?u.then(l).catch((function(e){return r("",e)})):void 0!==u&&l(u)}()},o=e();o instanceof Promise?o.then(i).catch((function(e){return r(null,e)})):i(o)}},{key:"close",value:function(){var e;this.mediainfoModuleInstance&&this.mediainfoModuleInstance.close(),this.mediainfoModule&&"function"==typeof(null===(e=this.mediainfoModule)||void 0===e?void 0:e.destroy)&&this.mediainfoModule.destroy(this.mediainfoModuleInstance)}},{key:"inform",value:function(){return this.mediainfoModuleInstance.inform()}},{key:"openBufferContinue",value:function(e,t){return!!(8&this.mediainfoModuleInstance.open_buffer_continue(e,t))}},{key:"openBufferContinueGotoGet",value:function(){var e=this.mediainfoModuleInstance.open_buffer_continue_goto_get_lower(),t=this.mediainfoModuleInstance.open_buffer_continue_goto_get_upper();return-1==e&&-1==t?-1:e<0?e+4294967296+4294967296*t:e+4294967296*t}},{key:"openBufferFinalize",value:function(){this.mediainfoModuleInstance.open_buffer_finalize()}},{key:"openBufferInit",value:function(e,t){this.mediainfoModuleInstance.open_buffer_init(e,t)}},{key:"parseResultJson",value:function(e){var r=c,a=f,s=JSON.parse(e);if(s.media){var u=t(t({},s.media),{},{track:[]});if(s.media.track&&Array.isArray(s.media.track)){var l,d=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=o(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return s=e.done,e},e:function(e){u=!0,i=e},f:function(){try{s||null==r.return||r.return()}finally{if(u)throw i}}}}(s.media.track);try{for(d.s();!(l=d.n()).done;){for(var p=l.value,h={"@type":p["@type"]},m=0,y=Object.entries(p);m<y.length;m++){var v=i(y[m],2),g=v[0],b=v[1];"@type"!==g&&(h="string"==typeof b&&r.includes(g)?t(t({},h),{},n({},g,parseInt(b,10))):"string"==typeof b&&a.includes(g)?t(t({},h),{},n({},g,parseFloat(b))):t(t({},h),{},n({},g,b)))}u.track.push(h)}}catch(e){d.e(e)}finally{d.f()}}return t(t({},s),{},{media:u})}return s}}])&&r(a.prototype,s),u&&r(a,u),Object.defineProperty(a,"prototype",{writable:!1}),e}(),h=(l="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,function(e={}){var t,r,n=e;n.ready=new Promise(((e,n)=>{t=e,r=n}));var a=Object.assign({},n),i="./this.program",o=!0,s="";"undefined"!=typeof document&&document.currentScript&&(s=document.currentScript.src),l&&(s=l),s=0!==s.indexOf("blob:")?s.substr(0,s.replace(/[?#].*/,"").lastIndexOf("/")+1):"",n.print||console.log.bind(console);var u,c,f,d=n.printErr||console.error.bind(console);Object.assign(n,a),a=null,n.arguments&&n.arguments,n.thisProgram&&(i=n.thisProgram),n.quit&&n.quit,n.wasmBinary&&(u=n.wasmBinary),n.noExitRuntime,"object"!=typeof WebAssembly&&D("no native wasm support detected");var p,h,m,y,v,g,b,_,w,$=!1;function C(){var e=c.buffer;n.HEAP8=p=new Int8Array(e),n.HEAP16=m=new Int16Array(e),n.HEAP32=v=new Int32Array(e),n.HEAPU8=h=new Uint8Array(e),n.HEAPU16=y=new Uint16Array(e),n.HEAPU32=g=new Uint32Array(e),n.HEAPF32=b=new Float32Array(e),n.HEAPF64=_=new Float64Array(e)}var P=[],T=[],S=[],O=0,A=null;function D(e){n.onAbort&&n.onAbort(e),d(e="Aborted("+e+")"),$=!0,e+=". Build with -sASSERTIONS for more info.";var t=new WebAssembly.RuntimeError(e);throw r(t),t}var F,j,E="data:application/octet-stream;base64,";function R(e){return e.startsWith(E)}function M(e){if(e==F&&u)return new Uint8Array(u);throw"both async and sync fetching of the wasm failed"}function k(e,t,r){return function(e){return!u&&o&&"function"==typeof fetch?fetch(e,{credentials:"same-origin"}).then((t=>{if(!t.ok)throw"failed to load wasm binary file at '"+e+"'";return t.arrayBuffer()})).catch((()=>M(e))):Promise.resolve().then((()=>M(e)))}(e).then((e=>WebAssembly.instantiate(e,t))).then((e=>e)).then(r,(e=>{d("failed to asynchronously prepare wasm: "+e),D(e)}))}R(F="MediaInfoModule.wasm")||(j=F,F=n.locateFile?n.locateFile(j,s):s+j);var I=e=>{for(;e.length>0;)e.shift()(n)};function W(e){switch(e){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError(`Unknown type size: ${e}`)}}var x=void 0;function B(e){for(var t="",r=e;h[r];)t+=x[h[r++]];return t}var U={},z={},H={},Y=void 0;function V(e){throw new Y(e)}var N=void 0;function G(e){throw new N(e)}function L(e,t,r){function n(t){var n=r(t);n.length!==e.length&&G("Mismatched type converter count");for(var a=0;a<e.length;++a)J(e[a],n[a])}e.forEach((function(e){H[e]=t}));var a=new Array(t.length),i=[],o=0;t.forEach(((e,t)=>{z.hasOwnProperty(e)?a[t]=z[e]:(i.push(e),U.hasOwnProperty(e)||(U[e]=[]),U[e].push((()=>{a[t]=z[e],++o===i.length&&n(a)})))})),0===i.length&&n(a)}function J(e,t,r={}){if(!("argPackAdvance"in t))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(e,t,r={}){var n=t.name;if(e||V(`type "${n}" must have a positive integer typeid pointer`),z.hasOwnProperty(e)){if(r.ignoreDuplicateRegistrations)return;V(`Cannot register type '${n}' twice`)}if(z[e]=t,delete H[e],U.hasOwnProperty(e)){var a=U[e];delete U[e],a.forEach((e=>e()))}}(e,t,r)}function q(e){if(!(this instanceof ve))return!1;if(!(e instanceof ve))return!1;for(var t=this.$$.ptrType.registeredClass,r=this.$$.ptr,n=e.$$.ptrType.registeredClass,a=e.$$.ptr;t.baseClass;)r=t.upcast(r),t=t.baseClass;for(;n.baseClass;)a=n.upcast(a),n=n.baseClass;return t===n&&r===a}function Z(e){V(e.$$.ptrType.registeredClass.name+" instance already deleted")}var K=!1;function X(e){}function Q(e){e.count.value-=1,0===e.count.value&&function(e){e.smartPtr?e.smartPtrType.rawDestructor(e.smartPtr):e.ptrType.registeredClass.rawDestructor(e.ptr)}(e)}function ee(e,t,r){if(t===r)return e;if(void 0===r.baseClass)return null;var n=ee(e,t,r.baseClass);return null===n?null:r.downcast(n)}var te={};function re(){return Object.keys(ue).length}function ne(){var e=[];for(var t in ue)ue.hasOwnProperty(t)&&e.push(ue[t]);return e}var ae=[];function ie(){for(;ae.length;){var e=ae.pop();e.$$.deleteScheduled=!1,e.delete()}}var oe=void 0;function se(e){oe=e,ae.length&&oe&&oe(ie)}var ue={};function le(e,t){return t=function(e,t){for(void 0===t&&V("ptr should not be undefined");e.baseClass;)t=e.upcast(t),e=e.baseClass;return t}(e,t),ue[t]}function ce(e,t){return t.ptrType&&t.ptr||G("makeClassHandle requires ptr and ptrType"),!!t.smartPtrType!=!!t.smartPtr&&G("Both smartPtrType and smartPtr must be specified"),t.count={value:1},de(Object.create(e,{$$:{value:t}}))}function fe(e){var t=this.getPointee(e);if(!t)return this.destructor(e),null;var r=le(this.registeredClass,t);if(void 0!==r){if(0===r.$$.count.value)return r.$$.ptr=t,r.$$.smartPtr=e,r.clone();var n=r.clone();return this.destructor(e),n}function a(){return this.isSmartPointer?ce(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:t,smartPtrType:this,smartPtr:e}):ce(this.registeredClass.instancePrototype,{ptrType:this,ptr:e})}var i,o=this.registeredClass.getActualType(t),s=te[o];if(!s)return a.call(this);i=this.isConst?s.constPointerType:s.pointerType;var u=ee(t,this.registeredClass,i.registeredClass);return null===u?a.call(this):this.isSmartPointer?ce(i.registeredClass.instancePrototype,{ptrType:i,ptr:u,smartPtrType:this,smartPtr:e}):ce(i.registeredClass.instancePrototype,{ptrType:i,ptr:u})}var de=function(e){return"undefined"==typeof FinalizationRegistry?(de=e=>e,e):(K=new FinalizationRegistry((e=>{Q(e.$$)})),de=e=>{var t=e.$$;if(t.smartPtr){var r={$$:t};K.register(e,r,e)}return e},X=e=>K.unregister(e),de(e))};function pe(){if(this.$$.ptr||Z(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e,t=de(Object.create(Object.getPrototypeOf(this),{$$:{value:(e=this.$$,{count:e.count,deleteScheduled:e.deleteScheduled,preservePointerOnDelete:e.preservePointerOnDelete,ptr:e.ptr,ptrType:e.ptrType,smartPtr:e.smartPtr,smartPtrType:e.smartPtrType})}}));return t.$$.count.value+=1,t.$$.deleteScheduled=!1,t}function he(){this.$$.ptr||Z(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&V("Object already scheduled for deletion"),X(this),Q(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)}function me(){return!this.$$.ptr}function ye(){return this.$$.ptr||Z(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&V("Object already scheduled for deletion"),ae.push(this),1===ae.length&&oe&&oe(ie),this.$$.deleteScheduled=!0,this}function ve(){}var ge=48,be=57;function _e(e){if(void 0===e)return"_unknown";var t=(e=e.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return t>=ge&&t<=be?`_${e}`:e}function we(e,t){return{[e=_e(e)]:function(){return t.apply(this,arguments)}}[e]}function $e(e,t,r){if(void 0===e[t].overloadTable){var n=e[t];e[t]=function(){return e[t].overloadTable.hasOwnProperty(arguments.length)||V(`Function '${r}' called with an invalid number of arguments (${arguments.length}) - expects one of (${e[t].overloadTable})!`),e[t].overloadTable[arguments.length].apply(this,arguments)},e[t].overloadTable=[],e[t].overloadTable[n.argCount]=n}}function Ce(e,t,r,n,a,i,o,s){this.name=e,this.constructor=t,this.instancePrototype=r,this.rawDestructor=n,this.baseClass=a,this.getActualType=i,this.upcast=o,this.downcast=s,this.pureVirtualFunctions=[]}function Pe(e,t,r){for(;t!==r;)t.upcast||V(`Expected null or instance of ${r.name}, got an instance of ${t.name}`),e=t.upcast(e),t=t.baseClass;return e}function Te(e,t){if(null===t)return this.isReference&&V(`null is not a valid ${this.name}`),0;t.$$||V(`Cannot pass "${Le(t)}" as a ${this.name}`),t.$$.ptr||V(`Cannot pass deleted object as a pointer of type ${this.name}`);var r=t.$$.ptrType.registeredClass;return Pe(t.$$.ptr,r,this.registeredClass)}function Se(e,t){var r;if(null===t)return this.isReference&&V(`null is not a valid ${this.name}`),this.isSmartPointer?(r=this.rawConstructor(),null!==e&&e.push(this.rawDestructor,r),r):0;t.$$||V(`Cannot pass "${Le(t)}" as a ${this.name}`),t.$$.ptr||V(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&t.$$.ptrType.isConst&&V(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);var n=t.$$.ptrType.registeredClass;if(r=Pe(t.$$.ptr,n,this.registeredClass),this.isSmartPointer)switch(void 0===t.$$.smartPtr&&V("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:t.$$.smartPtrType===this?r=t.$$.smartPtr:V(`Cannot convert argument of type ${t.$$.smartPtrType?t.$$.smartPtrType.name:t.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:r=t.$$.smartPtr;break;case 2:if(t.$$.smartPtrType===this)r=t.$$.smartPtr;else{var a=t.clone();r=this.rawShare(r,Ge.toHandle((function(){a.delete()}))),null!==e&&e.push(this.rawDestructor,r)}break;default:V("Unsupporting sharing policy")}return r}function Oe(e,t){if(null===t)return this.isReference&&V(`null is not a valid ${this.name}`),0;t.$$||V(`Cannot pass "${Le(t)}" as a ${this.name}`),t.$$.ptr||V(`Cannot pass deleted object as a pointer of type ${this.name}`),t.$$.ptrType.isConst&&V(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);var r=t.$$.ptrType.registeredClass;return Pe(t.$$.ptr,r,this.registeredClass)}function Ae(e){return this.fromWireType(v[e>>2])}function De(e){return this.rawGetPointee&&(e=this.rawGetPointee(e)),e}function Fe(e){this.rawDestructor&&this.rawDestructor(e)}function je(e){null!==e&&e.delete()}function Ee(e,t,r,n,a,i,o,s,u,l,c){this.name=e,this.registeredClass=t,this.isReference=r,this.isConst=n,this.isSmartPointer=a,this.pointeeType=i,this.sharingPolicy=o,this.rawGetPointee=s,this.rawConstructor=u,this.rawShare=l,this.rawDestructor=c,a||void 0!==t.baseClass?this.toWireType=Se:n?(this.toWireType=Te,this.destructorFunction=null):(this.toWireType=Oe,this.destructorFunction=null)}var Re=e=>w.get(e),Me=(e,t,r)=>e.includes("j")?((e,t,r)=>{var a=n["dynCall_"+e];return r&&r.length?a.apply(null,[t].concat(r)):a.call(null,t)})(e,t,r):Re(t).apply(null,r),ke=(e,t)=>{var r=[];return function(){return r.length=0,Object.assign(r,arguments),Me(e,t,r)}};function Ie(e,t){var r=(e=B(e)).includes("j")?ke(e,t):Re(t);return"function"!=typeof r&&V(`unknown function pointer with signature ${e}: ${t}`),r}var We=void 0;function xe(e){var t=Ct(e),r=B(t);return $t(t),r}function Be(e,t){var r=[],n={};throw t.forEach((function e(t){n[t]||z[t]||(H[t]?H[t].forEach(e):(r.push(t),n[t]=!0))})),new We(`${e}: `+r.map(xe).join([", "]))}function Ue(e,t){for(var r=[],n=0;n<e;n++)r.push(g[t+4*n>>2]);return r}function ze(e){for(;e.length;){var t=e.pop();e.pop()(t)}}function He(e,t,r,n,a,i){var o=t.length;o<2&&V("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var s=null!==t[1]&&null!==r,u=!1,l=1;l<t.length;++l)if(null!==t[l]&&void 0===t[l].destructorFunction){u=!0;break}var c="void"!==t[0].name,f="",d="";for(l=0;l<o-2;++l)f+=(0!==l?", ":"")+"arg"+l,d+=(0!==l?", ":"")+"arg"+l+"Wired";var p=`\n        return function ${_e(e)}(${f}) {\n        if (arguments.length !== ${o-2}) {\n          throwBindingError('function ${e} called with ${arguments.length} arguments, expected ${o-2} args!');\n        }`;u&&(p+="var destructors = [];\n");var h=u?"destructors":"null",m=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],y=[V,n,a,ze,t[0],t[1]];for(s&&(p+="var thisWired = classParam.toWireType("+h+", this);\n"),l=0;l<o-2;++l)p+="var arg"+l+"Wired = argType"+l+".toWireType("+h+", arg"+l+"); // "+t[l+2].name+"\n",m.push("argType"+l),y.push(t[l+2]);if(s&&(d="thisWired"+(d.length>0?", ":"")+d),p+=(c||i?"var rv = ":"")+"invoker(fn"+(d.length>0?", ":"")+d+");\n",u)p+="runDestructors(destructors);\n";else for(l=s?1:2;l<t.length;++l){var v=1===l?"thisWired":"arg"+(l-2)+"Wired";null!==t[l].destructorFunction&&(p+=v+"_dtor("+v+"); // "+t[l].name+"\n",m.push(v+"_dtor"),y.push(t[l].destructorFunction))}return c&&(p+="var ret = retType.fromWireType(rv);\nreturn ret;\n"),p+="}\n",m.push(p),function(e,t){if(!(e instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof e} which is not a function`);var r=we(e.name||"unknownFunctionName",(function(){}));r.prototype=e.prototype;var n=new r,a=e.apply(n,t);return a instanceof Object?a:n}(Function,m).apply(null,y)}function Ye(){this.allocated=[void 0],this.freelist=[]}var Ve=new Ye;function Ne(){for(var e=0,t=Ve.reserved;t<Ve.allocated.length;++t)void 0!==Ve.allocated[t]&&++e;return e}var Ge={toValue:e=>(e||V("Cannot use deleted val. handle = "+e),Ve.get(e).value),toHandle:e=>{switch(e){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:return Ve.allocate({refcount:1,value:e})}}};function Le(e){if(null===e)return"null";var t=typeof e;return"object"===t||"array"===t||"function"===t?e.toString():""+e}function Je(e,t){switch(t){case 2:return function(e){return this.fromWireType(b[e>>2])};case 3:return function(e){return this.fromWireType(_[e>>3])};default:throw new TypeError("Unknown float type: "+e)}}function qe(e,t,r){switch(t){case 0:return r?function(e){return p[e]}:function(e){return h[e]};case 1:return r?function(e){return m[e>>1]}:function(e){return y[e>>1]};case 2:return r?function(e){return v[e>>2]}:function(e){return g[e>>2]};default:throw new TypeError("Unknown integer type: "+e)}}var Ze,Ke,Xe,Qe=(e,t,r,n)=>{if(!(n>0))return 0;for(var a=r,i=r+n-1,o=0;o<e.length;++o){var s=e.charCodeAt(o);if(s>=55296&&s<=57343&&(s=65536+((1023&s)<<10)|1023&e.charCodeAt(++o)),s<=127){if(r>=i)break;t[r++]=s}else if(s<=2047){if(r+1>=i)break;t[r++]=192|s>>6,t[r++]=128|63&s}else if(s<=65535){if(r+2>=i)break;t[r++]=224|s>>12,t[r++]=128|s>>6&63,t[r++]=128|63&s}else{if(r+3>=i)break;t[r++]=240|s>>18,t[r++]=128|s>>12&63,t[r++]=128|s>>6&63,t[r++]=128|63&s}}return t[r]=0,r-a},et=(e,t,r)=>Qe(e,h,t,r),tt=e=>{for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);n<=127?t++:n<=2047?t+=2:n>=55296&&n<=57343?(t+=4,++r):t+=3}return t},rt="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,nt=(e,t)=>e?((e,t,r)=>{for(var n=t+r,a=t;e[a]&&!(a>=n);)++a;if(a-t>16&&e.buffer&&rt)return rt.decode(e.subarray(t,a));for(var i="";t<a;){var o=e[t++];if(128&o){var s=63&e[t++];if(192!=(224&o)){var u=63&e[t++];if((o=224==(240&o)?(15&o)<<12|s<<6|u:(7&o)<<18|s<<12|u<<6|63&e[t++])<65536)i+=String.fromCharCode(o);else{var l=o-65536;i+=String.fromCharCode(55296|l>>10,56320|1023&l)}}else i+=String.fromCharCode((31&o)<<6|s)}else i+=String.fromCharCode(o)}return i})(h,e,t):"",at="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0,it=(e,t)=>{for(var r=e,n=r>>1,a=n+t/2;!(n>=a)&&y[n];)++n;if((r=n<<1)-e>32&&at)return at.decode(h.subarray(e,r));for(var i="",o=0;!(o>=t/2);++o){var s=m[e+2*o>>1];if(0==s)break;i+=String.fromCharCode(s)}return i},ot=(e,t,r)=>{if(void 0===r&&(r=2147483647),r<2)return 0;for(var n=t,a=(r-=2)<2*e.length?r/2:e.length,i=0;i<a;++i){var o=e.charCodeAt(i);m[t>>1]=o,t+=2}return m[t>>1]=0,t-n},st=e=>2*e.length,ut=(e,t)=>{for(var r=0,n="";!(r>=t/4);){var a=v[e+4*r>>2];if(0==a)break;if(++r,a>=65536){var i=a-65536;n+=String.fromCharCode(55296|i>>10,56320|1023&i)}else n+=String.fromCharCode(a)}return n},lt=(e,t,r)=>{if(void 0===r&&(r=2147483647),r<4)return 0;for(var n=t,a=n+r-4,i=0;i<e.length;++i){var o=e.charCodeAt(i);if(o>=55296&&o<=57343&&(o=65536+((1023&o)<<10)|1023&e.charCodeAt(++i)),v[t>>2]=o,(t+=4)+4>a)break}return v[t>>2]=0,t-n},ct=e=>{for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);n>=55296&&n<=57343&&++r,t+=4}return t},ft=e=>{var t=tt(e)+1,r=wt(t);return r&&et(e,r,t),r},dt=e=>{var t=e-c.buffer.byteLength+65535>>>16;try{return c.grow(t),C(),1}catch(e){}},pt={},ht=()=>{if(!ht.strings){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:i||"./this.program"};for(var t in pt)void 0===pt[t]?delete e[t]:e[t]=pt[t];var r=[];for(var t in e)r.push(`${t}=${e[t]}`);ht.strings=r}return ht.strings},mt=e=>e%4==0&&(e%100!=0||e%400==0),yt=[31,29,31,30,31,30,31,31,30,31,30,31],vt=[31,28,31,30,31,30,31,31,30,31,30,31],gt=(e,t,r,n)=>{var a=v[n+40>>2],i={tm_sec:v[n>>2],tm_min:v[n+4>>2],tm_hour:v[n+8>>2],tm_mday:v[n+12>>2],tm_mon:v[n+16>>2],tm_year:v[n+20>>2],tm_wday:v[n+24>>2],tm_yday:v[n+28>>2],tm_isdst:v[n+32>>2],tm_gmtoff:v[n+36>>2],tm_zone:a?nt(a):""},o=nt(r),s={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var u in s)o=o.replace(new RegExp(u,"g"),s[u]);var l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],c=["January","February","March","April","May","June","July","August","September","October","November","December"];function f(e,t,r){for(var n="number"==typeof e?e.toString():e||"";n.length<t;)n=r[0]+n;return n}function d(e,t){return f(e,t,"0")}function h(e,t){function r(e){return e<0?-1:e>0?1:0}var n;return 0===(n=r(e.getFullYear()-t.getFullYear()))&&0===(n=r(e.getMonth()-t.getMonth()))&&(n=r(e.getDate()-t.getDate())),n}function m(e){switch(e.getDay()){case 0:return new Date(e.getFullYear()-1,11,29);case 1:return e;case 2:return new Date(e.getFullYear(),0,3);case 3:return new Date(e.getFullYear(),0,2);case 4:return new Date(e.getFullYear(),0,1);case 5:return new Date(e.getFullYear()-1,11,31);case 6:return new Date(e.getFullYear()-1,11,30)}}function y(e){var t=((e,t)=>{for(var r=new Date(e.getTime());t>0;){var n=mt(r.getFullYear()),a=r.getMonth(),i=(n?yt:vt)[a];if(!(t>i-r.getDate()))return r.setDate(r.getDate()+t),r;t-=i-r.getDate()+1,r.setDate(1),a<11?r.setMonth(a+1):(r.setMonth(0),r.setFullYear(r.getFullYear()+1))}return r})(new Date(e.tm_year+1900,0,1),e.tm_yday),r=new Date(t.getFullYear(),0,4),n=new Date(t.getFullYear()+1,0,4),a=m(r),i=m(n);return h(a,t)<=0?h(i,t)<=0?t.getFullYear()+1:t.getFullYear():t.getFullYear()-1}var g={"%a":e=>l[e.tm_wday].substring(0,3),"%A":e=>l[e.tm_wday],"%b":e=>c[e.tm_mon].substring(0,3),"%B":e=>c[e.tm_mon],"%C":e=>d((e.tm_year+1900)/100|0,2),"%d":e=>d(e.tm_mday,2),"%e":e=>f(e.tm_mday,2," "),"%g":e=>y(e).toString().substring(2),"%G":e=>y(e),"%H":e=>d(e.tm_hour,2),"%I":e=>{var t=e.tm_hour;return 0==t?t=12:t>12&&(t-=12),d(t,2)},"%j":e=>d(e.tm_mday+((e,t)=>{for(var r=0,n=0;n<=t;r+=e[n++]);return r})(mt(e.tm_year+1900)?yt:vt,e.tm_mon-1),3),"%m":e=>d(e.tm_mon+1,2),"%M":e=>d(e.tm_min,2),"%n":()=>"\n","%p":e=>e.tm_hour>=0&&e.tm_hour<12?"AM":"PM","%S":e=>d(e.tm_sec,2),"%t":()=>"\t","%u":e=>e.tm_wday||7,"%U":e=>{var t=e.tm_yday+7-e.tm_wday;return d(Math.floor(t/7),2)},"%V":e=>{var t=Math.floor((e.tm_yday+7-(e.tm_wday+6)%7)/7);if((e.tm_wday+371-e.tm_yday-2)%7<=2&&t++,t){if(53==t){var r=(e.tm_wday+371-e.tm_yday)%7;4==r||3==r&&mt(e.tm_year)||(t=1)}}else{t=52;var n=(e.tm_wday+7-e.tm_yday-1)%7;(4==n||5==n&&mt(e.tm_year%400-1))&&t++}return d(t,2)},"%w":e=>e.tm_wday,"%W":e=>{var t=e.tm_yday+7-(e.tm_wday+6)%7;return d(Math.floor(t/7),2)},"%y":e=>(e.tm_year+1900).toString().substring(2),"%Y":e=>e.tm_year+1900,"%z":e=>{var t=e.tm_gmtoff,r=t>=0;return t=(t=Math.abs(t)/60)/60*100+t%60,(r?"+":"-")+String("0000"+t).slice(-4)},"%Z":e=>e.tm_zone,"%%":()=>"%"};for(var u in o=o.replace(/%%/g,"\0\0"),g)o.includes(u)&&(o=o.replace(new RegExp(u,"g"),g[u](i)));o=o.replace(/\0\0/g,"%");var b,_,w,$,C,P,T,S,O=(b=o,_=!1,$=w>0?w:tt(b)+1,C=new Array($),P=Qe(b,C,0,C.length),_&&(C.length=P),C);return O.length>t?0:(T=O,S=e,p.set(T,S),O.length-1)};!function(){for(var e=new Array(256),t=0;t<256;++t)e[t]=String.fromCharCode(t);x=e}(),Y=n.BindingError=class extends Error{constructor(e){super(e),this.name="BindingError"}},N=n.InternalError=class extends Error{constructor(e){super(e),this.name="InternalError"}},ve.prototype.isAliasOf=q,ve.prototype.clone=pe,ve.prototype.delete=he,ve.prototype.isDeleted=me,ve.prototype.deleteLater=ye,n.getInheritedInstanceCount=re,n.getLiveInheritedInstances=ne,n.flushPendingDeletes=ie,n.setDelayFunction=se,Ee.prototype.getPointee=De,Ee.prototype.destructor=Fe,Ee.prototype.argPackAdvance=8,Ee.prototype.readValueFromPointer=Ae,Ee.prototype.deleteObject=je,Ee.prototype.fromWireType=fe,We=n.UnboundTypeError=(Ze=Error,(Xe=we(Ke="UnboundTypeError",(function(e){this.name=Ke,this.message=e;var t=new Error(e).stack;void 0!==t&&(this.stack=this.toString()+"\n"+t.replace(/^Error(:[^\n]*)?\n/,""))}))).prototype=Object.create(Ze.prototype),Xe.prototype.constructor=Xe,Xe.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`},Xe),Object.assign(Ye.prototype,{get(e){return this.allocated[e]},has(e){return void 0!==this.allocated[e]},allocate(e){var t=this.freelist.pop()||this.allocated.length;return this.allocated[t]=e,t},free(e){this.allocated[e]=void 0,this.freelist.push(e)}}),Ve.allocated.push({value:void 0},{value:null},{value:!0},{value:!1}),Ve.reserved=Ve.allocated.length,n.count_emval_handles=Ne;var bt={k:function(e,t,r,n,a){},h:function(e,t,r,n,a){var i=W(r);J(e,{name:t=B(t),fromWireType:function(e){return!!e},toWireType:function(e,t){return t?n:a},argPackAdvance:8,readValueFromPointer:function(e){var n;if(1===r)n=p;else if(2===r)n=m;else{if(4!==r)throw new TypeError("Unknown boolean type size: "+t);n=v}return this.fromWireType(n[e>>i])},destructorFunction:null})},t:function(e,t,r,a,i,o,s,u,l,c,f,d,p){f=B(f),o=Ie(i,o),u&&(u=Ie(s,u)),c&&(c=Ie(l,c)),p=Ie(d,p);var h=_e(f);!function(e,t,r){n.hasOwnProperty(e)?((void 0===r||void 0!==n[e].overloadTable&&void 0!==n[e].overloadTable[r])&&V(`Cannot register public name '${e}' twice`),$e(n,e,e),n.hasOwnProperty(r)&&V(`Cannot register multiple overloads of a function with the same number of arguments (${r})!`),n[e].overloadTable[r]=t):(n[e]=t,void 0!==r&&(n[e].numArguments=r))}(h,(function(){Be(`Cannot construct ${f} due to unbound types`,[a])})),L([e,t,r],a?[a]:[],(function(t){var r,i;t=t[0],i=a?(r=t.registeredClass).instancePrototype:ve.prototype;var s=we(h,(function(){if(Object.getPrototypeOf(this)!==l)throw new Y("Use 'new' to construct "+f);if(void 0===d.constructor_body)throw new Y(f+" has no accessible constructor");var e=d.constructor_body[arguments.length];if(void 0===e)throw new Y(`Tried to invoke ctor of ${f} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(d.constructor_body).toString()}) parameters instead!`);return e.apply(this,arguments)})),l=Object.create(i,{constructor:{value:s}});s.prototype=l;var d=new Ce(f,s,l,p,r,o,u,c);d.baseClass&&(void 0===d.baseClass.__derivedClasses&&(d.baseClass.__derivedClasses=[]),d.baseClass.__derivedClasses.push(d));var m=new Ee(f,d,!0,!1,!1),y=new Ee(f+"*",d,!1,!1,!1),v=new Ee(f+" const*",d,!1,!0,!1);return te[e]={pointerType:y,constPointerType:v},function(e,t,r){n.hasOwnProperty(e)||G("Replacing nonexistant public symbol"),void 0!==n[e].overloadTable&&void 0!==r?n[e].overloadTable[r]=t:(n[e]=t,n[e].argCount=r)}(h,s),[m,y,v]}))},s:function(e,t,r,n,a,i){var o=Ue(t,r);a=Ie(n,a),L([],[e],(function(e){var r=`constructor ${(e=e[0]).name}`;if(void 0===e.registeredClass.constructor_body&&(e.registeredClass.constructor_body=[]),void 0!==e.registeredClass.constructor_body[t-1])throw new Y(`Cannot register multiple constructors with identical number of parameters (${t-1}) for class '${e.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return e.registeredClass.constructor_body[t-1]=()=>{Be(`Cannot construct ${e.name} due to unbound types`,o)},L([],o,(function(n){return n.splice(1,0,null),e.registeredClass.constructor_body[t-1]=He(r,n,null,a,i),[]})),[]}))},d:function(e,t,r,n,a,i,o,s,u){var l=Ue(r,n);t=B(t),i=Ie(a,i),L([],[e],(function(e){var n=`${(e=e[0]).name}.${t}`;function a(){Be(`Cannot call ${n} due to unbound types`,l)}t.startsWith("@@")&&(t=Symbol[t.substring(2)]),s&&e.registeredClass.pureVirtualFunctions.push(t);var c=e.registeredClass.instancePrototype,f=c[t];return void 0===f||void 0===f.overloadTable&&f.className!==e.name&&f.argCount===r-2?(a.argCount=r-2,a.className=e.name,c[t]=a):($e(c,t,n),c[t].overloadTable[r-2]=a),L([],l,(function(a){var s=He(n,a,e,i,o,u);return void 0===c[t].overloadTable?(s.argCount=r-2,c[t]=s):c[t].overloadTable[r-2]=s,[]})),[]}))},r:function(e,t){J(e,{name:t=B(t),fromWireType:function(e){var t=Ge.toValue(e);return function(e){e>=Ve.reserved&&0==--Ve.get(e).refcount&&Ve.free(e)}(e),t},toWireType:function(e,t){return Ge.toHandle(t)},argPackAdvance:8,readValueFromPointer:Ae,destructorFunction:null})},g:function(e,t,r){var n=W(r);J(e,{name:t=B(t),fromWireType:function(e){return e},toWireType:function(e,t){return t},argPackAdvance:8,readValueFromPointer:Je(t,n),destructorFunction:null})},c:function(e,t,r,n,a){t=B(t);var i=W(r),o=e=>e;if(0===n){var s=32-8*r;o=e=>e<<s>>>s}var u=t.includes("unsigned");J(e,{name:t,fromWireType:o,toWireType:u?function(e,t){return this.name,t>>>0}:function(e,t){return this.name,t},argPackAdvance:8,readValueFromPointer:qe(t,i,0!==n),destructorFunction:null})},b:function(e,t,r){var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][t];function a(e){var t=g,r=t[e>>=2],a=t[e+1];return new n(t.buffer,a,r)}J(e,{name:r=B(r),fromWireType:a,argPackAdvance:8,readValueFromPointer:a},{ignoreDuplicateRegistrations:!0})},f:function(e,t){var r="std::string"===(t=B(t));J(e,{name:t,fromWireType:function(e){var t,n=g[e>>2],a=e+4;if(r)for(var i=a,o=0;o<=n;++o){var s=a+o;if(o==n||0==h[s]){var u=nt(i,s-i);void 0===t?t=u:(t+=String.fromCharCode(0),t+=u),i=s+1}}else{var l=new Array(n);for(o=0;o<n;++o)l[o]=String.fromCharCode(h[a+o]);t=l.join("")}return $t(e),t},toWireType:function(e,t){var n;t instanceof ArrayBuffer&&(t=new Uint8Array(t));var a="string"==typeof t;a||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int8Array||V("Cannot pass non-string to std::string"),n=r&&a?tt(t):t.length;var i=wt(4+n+1),o=i+4;if(g[i>>2]=n,r&&a)et(t,o,n+1);else if(a)for(var s=0;s<n;++s){var u=t.charCodeAt(s);u>255&&($t(o),V("String has UTF-16 code units that do not fit in 8 bits")),h[o+s]=u}else for(s=0;s<n;++s)h[o+s]=t[s];return null!==e&&e.push($t,i),i},argPackAdvance:8,readValueFromPointer:Ae,destructorFunction:function(e){$t(e)}})},e:function(e,t,r){var n,a,i,o,s;r=B(r),2===t?(n=it,a=ot,o=st,i=()=>y,s=1):4===t&&(n=ut,a=lt,o=ct,i=()=>g,s=2),J(e,{name:r,fromWireType:function(e){for(var r,a=g[e>>2],o=i(),u=e+4,l=0;l<=a;++l){var c=e+4+l*t;if(l==a||0==o[c>>s]){var f=n(u,c-u);void 0===r?r=f:(r+=String.fromCharCode(0),r+=f),u=c+t}}return $t(e),r},toWireType:function(e,n){"string"!=typeof n&&V(`Cannot pass non-string to C++ string type ${r}`);var i=o(n),u=wt(4+i+t);return g[u>>2]=i>>s,a(n,u+4,i+t),null!==e&&e.push($t,u),u},argPackAdvance:8,readValueFromPointer:Ae,destructorFunction:function(e){$t(e)}})},i:function(e,t){J(e,{isVoid:!0,name:t=B(t),argPackAdvance:0,fromWireType:function(){},toWireType:function(e,t){}})},j:function(e,t,r){var n,a,i=(a=t)+2097152>>>0<4194305-!!(n=e)?(n>>>0)+4294967296*a:NaN,o=new Date(1e3*i);v[r>>2]=o.getUTCSeconds(),v[r+4>>2]=o.getUTCMinutes(),v[r+8>>2]=o.getUTCHours(),v[r+12>>2]=o.getUTCDate(),v[r+16>>2]=o.getUTCMonth(),v[r+20>>2]=o.getUTCFullYear()-1900,v[r+24>>2]=o.getUTCDay();var s=Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0),u=(o.getTime()-s)/864e5|0;v[r+28>>2]=u},p:(e,t,r)=>{var n=(new Date).getFullYear(),a=new Date(n,0,1),i=new Date(n,6,1),o=a.getTimezoneOffset(),s=i.getTimezoneOffset(),u=Math.max(o,s);function l(e){var t=e.toTimeString().match(/\(([A-Za-z ]+)\)$/);return t?t[1]:"GMT"}g[e>>2]=60*u,v[t>>2]=Number(o!=s);var c=l(a),f=l(i),d=ft(c),p=ft(f);s<o?(g[r>>2]=d,g[r+4>>2]=p):(g[r>>2]=p,g[r+4>>2]=d)},a:()=>{D("")},q:function(){return Date.now()},o:e=>{var t=h.length,r=2147483648;if((e>>>=0)>r)return!1;for(var n,a,i=1;i<=4;i*=2){var o=t*(1+.2/i);o=Math.min(o,e+100663296);var s=Math.min(r,(n=Math.max(e,o))+((a=65536)-n%a)%a);if(dt(s))return!0}return!1},m:(e,t)=>{var r=0;return ht().forEach((function(n,a){var i=t+r;g[e+4*a>>2]=i,((e,t)=>{for(var r=0;r<e.length;++r)p[t++>>0]=e.charCodeAt(r);p[t>>0]=0})(n,i),r+=n.length+1})),0},n:(e,t)=>{var r=ht();g[e>>2]=r.length;var n=0;return r.forEach((function(e){n+=e.length+1})),g[t>>2]=n,0},l:(e,t,r,n,a)=>gt(e,t,r,n)};!function(){var e,t,a,i,o={a:bt};function s(e,t){var r,a=e.exports;return c=(f=a).u,C(),w=f.x,r=f.v,T.unshift(r),function(e){if(O--,n.monitorRunDependencies&&n.monitorRunDependencies(O),0==O&&A){var t=A;A=null,t()}}(),a}if(O++,n.monitorRunDependencies&&n.monitorRunDependencies(O),n.instantiateWasm)try{return n.instantiateWasm(o,s)}catch(e){d("Module.instantiateWasm callback failed with error: "+e),r(e)}(e=u,t=F,a=o,i=function(e){s(e.instance)},e||"function"!=typeof WebAssembly.instantiateStreaming||R(t)||"function"!=typeof fetch?k(t,a,i):fetch(t,{credentials:"same-origin"}).then((e=>WebAssembly.instantiateStreaming(e,a).then(i,(function(e){return d("wasm streaming compile failed: "+e),d("falling back to ArrayBuffer instantiation"),k(t,a,i)}))))).catch(r)}();var _t,wt=e=>(wt=f.w)(e),$t=e=>($t=f.y)(e),Ct=e=>(Ct=f.z)(e);function Pt(){function e(){_t||(_t=!0,n.calledRun=!0,$||(I(T),t(n),n.onRuntimeInitialized&&n.onRuntimeInitialized(),function(){if(n.postRun)for("function"==typeof n.postRun&&(n.postRun=[n.postRun]);n.postRun.length;)e=n.postRun.shift(),S.unshift(e);var e;I(S)}()))}O>0||(function(){if(n.preRun)for("function"==typeof n.preRun&&(n.preRun=[n.preRun]);n.preRun.length;)e=n.preRun.shift(),P.unshift(e);var e;I(P)}(),O>0||(n.setStatus?(n.setStatus("Running..."),setTimeout((function(){setTimeout((function(){n.setStatus("")}),1),e()}),1)):e()))}if(n.__embind_initialize_bindings=()=>(n.__embind_initialize_bindings=f.A)(),n.dynCall_iiijj=(e,t,r,a,i,o,s)=>(n.dynCall_iiijj=f.B)(e,t,r,a,i,o,s),n.dynCall_viijii=(e,t,r,a,i,o,s)=>(n.dynCall_viijii=f.C)(e,t,r,a,i,o,s),n.dynCall_iiiiij=(e,t,r,a,i,o,s)=>(n.dynCall_iiiiij=f.D)(e,t,r,a,i,o,s),n.dynCall_iiiiijj=(e,t,r,a,i,o,s,u,l)=>(n.dynCall_iiiiijj=f.E)(e,t,r,a,i,o,s,u,l),n.dynCall_iiiiiijj=(e,t,r,a,i,o,s,u,l,c)=>(n.dynCall_iiiiiijj=f.F)(e,t,r,a,i,o,s,u,l,c),A=function e(){_t||Pt(),_t||(A=e)},n.preInit)for("function"==typeof n.preInit&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.pop()();return Pt(),e.ready}),m=["locateFile"],y=function(){};function v(e,t){try{if("/"===new URL(t).pathname)return"".concat(t,"mediainfo.js/dist/").concat(e)}catch(e){}return"".concat(t,"../").concat(e)}return function e(){var r,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1?arguments[1]:void 0,o=arguments.length>2?arguments[2]:void 0;if(void 0===i)return new Promise((function(t,r){return e(n,t,r)}));var s=t(t(t({},d),n),{},{format:null!==(r=n.format)&&void 0!==r?r:d.format}),u=s.locateFile,l=a(s,m);h({print:y,printErr:y,locateFile:u||v,onAbort:function(e){o&&o(e)}}).then((function(e){return i(new p(e,l))})).catch((function(e){o&&o(e)}))}}));

//# sourceMappingURL=index.min.js.map