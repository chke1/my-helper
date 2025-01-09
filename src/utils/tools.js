import { ElMessage } from 'element-plus';

/**
 * @description: 下载图片
 * @param {string} url
 * @param {string} name
 */
const download = (url, name) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * @description: 下载图片 不打开图片
 * @param {string} url
 * @param {string} name
 */
const downLoadImg = (url, name) => {
  const x = new XMLHttpRequest();
  // 禁止浏览器缓存；否则会报跨域的错误
  x.open('GET', `${url}?t=${new Date().getTime()}`, true);
  x.responseType = 'blob';
  x.onload = function (e) {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.download = name || Date.now();
    a.click();
  };
  x.send();
};

/**
 * @description: 链接转文件类型
 * @param {string} url
 * @param {string} fileName
 */
const getUrlToFile = (url, fileName = Date.now()) => {
  return new Promise((resolve, reject) => {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      blob = xhr.response;
      let file = new File([blob], fileName, { type: blob.type });
      resolve(file);
    };

    xhr.onerror = (e) => {
      reject(e);
      console.log(e, 'onerror');
    };

    xhr.onloadend = (e) => {
      console.log(e, 'onloadend');
    };

    xhr.onloadstart = (e) => {
      console.log(e, 'onloadstart');
    };

    xhr.onprogress = (e) => {
      console.log(e, 'onprogress');
    };

    xhr.onreadystatechange = (e) => {
      console.log(e, 'onreadystatechange');
    };

    xhr.send();
  });
};

/**
 * @description: 复制文字
 * @param {string} text
 * @param {string} toast
 * @returns
 */
const copyText = (text, toast) => {
  if (!text) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  }
  ElMessage.success(toast || '复制成功！');
};

/**
 * @description: 格式化字节大小
 * @param {number} bytes
 * @returns
 */
const formatBytes = (bytes) => {
  if (['', undefined, null].includes(bytes)) return;
  let size = Number(bytes);
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  while (size > 1024 && index < units.length) {
    size = size / 1024;
    index++;
  }
  return Math.round(size * 100) / 100 + units[index];
};

/**
 * @description: 格式化字节精确大小
 * @param {number} bytes
 * @returns
 */
const formatBytesDetails = (bytes) => {
  if (['', undefined, null].includes(bytes)) return;
  let size = Number(bytes);
  const units = ['秒', '分钟', '小时', '天'];

  const d = [60, 60, 24, 30];

  let index = 0;
  console.log('index,==-====');

  while (size > 1024 && index < units.length) {
    size = size / 1024;
    index++;
  }

  return Math.round(size * 100) / 100 + units[index];
};

console.log(formatBytesDetails(1000 * 60 * 60 * 24 * 30), '==');

/**
 * 将文件大小从一个单位转换为另一个单位。
 *
 * @param {number} size 文件大小。
 * @param {string} fromUnit 初始单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {string} toUnit 目标单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {number} [decimalPoint=2] 结果保留的小数位数，默认为2。
 * @return {string} 转换后的文件大小，带单位。
 */
function convertFileSize(size, fromUnit, toUnit, decimalPoint = 2) {
  // 定义单位与字节之间的转换关系
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  // 获取初始单位和目标单位的索引
  const fromIndex = units.indexOf(fromUnit);
  const toIndex = units.indexOf(toUnit);

  // 如果单位不在列表中，抛出错误
  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('Invalid units');
  }

  // 计算初始单位与目标单位之间的转换系数
  const exponent = toIndex - fromIndex;
  // 计算结果大小
  const resultSize = size / Math.pow(1024, exponent);

  // 返回格式化后的结果
  return parseFloat(resultSize.toFixed(decimalPoint)) + ' ' + toUnit;
}

/**
 * @description: 富文本特殊字符转译
 * @param {string} value
 * @returns
 */
const richExistText = (value) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#39;');
  // .replace(/ /g, '&nbsp;');
};

/**
 * @description: 生成随机数
 * @param {number} min
 * @param {number} max
 * @returns
 */
const generateRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description: file 转 base64
 * @param {File} file
 * @returns
 */
const fileFormBase64 = (file) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

/**
 * @description: file 转 临时url
 * @param {File} file
 * @returns
 */
const fileFormUrl = (file) => {
  if (!file) return;
  return window.URL.createObjectURL(file);
};

/**
 * @description: 获取图片的宽和高
 * @param {File} file
 * @returns
 */
const calculateImageSize = async (file) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const imageReader = new FileReader();
    imageReader.readAsDataURL(file);
    imageReader.onerror = reject;
    imageReader.onload = (e) => {
      let image = document.createElement('img');
      image.src = e.target.result;
      image.onload = () => resolve({ width: image.width, height: image.height });
      image.onerror = reject;
    };
  });
};

/**
 * @description: 获取静态图片资源路径
 * @param {string} url
 * @returns
 */
const getAssetURL = (url) => {
  return new URL(`../assets${url}`, import.meta.url).href;
};

/**
 * @description: 一维数组转二维数组
 * @param {array} array
 * @param {number} num
 * @returns
 */
const setTwoDimArray = (array, num) => {
  let data = [];
  let relay = [];
  for (const item of array) {
    relay.push(item);
    if (relay.length == num) {
      data.push(relay);
      relay = [];
    }
  }
  if (relay.length > 0) data.push(relay);
  return data;
};

/**
 * @description: 柯里化函数
 * @param {*} fn
 * @returns
 */
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};

/**
 * {{}} simpleTemplateEngine(template, {name: 'John'})
 * @description: 字符串模板替换
 * @param {string} template
 * @param {object} data
 * @returns
 */
const simpleTemplateEngine = (template, data) => {
  const variableRegex = /{{\s*(\/?[\w\s]+\/?)\s*}}/g;

  let match;
  let lastIndex = 0;
  let result = '';

  while ((match = variableRegex.exec(template)) !== null) {
    console.log(match, 'match==');
    result += template.slice(lastIndex, match.index);
    result += data[match[1]] ? data[match[1]] : match[0];

    lastIndex = match.index + match[0].length;
  }

  result += template.slice(lastIndex);
  return result;
};

/**
 * @description: 随机生成颜色
 * @returns
 */
const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
};

/**
 * @description: 补零填充
 * @param {*} num 数值
 * @param {*} type 类型
 * @param {*} len 长度
 * @param {*} zero 填充值
 * @returns
 */
const getPad = (num, type = 'start', len, zero = 0) => {
  if (type == 'start') {
    return num.toString().padStart(len, zero);
  }
  if (type == 'end') {
    return num.toString().padEnd(len, zero);
  }
};

/**
 * @description: 异步函数判断
 * @param {Function} fn 需要判断的函数
 * @returns
 */
const isAsyncFunction = (fn) => {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
};

/**
 * @description: 去除文本中html的标签
 * @param {string} html 文本
 * @returns
 */
const stripHtml = (html) => {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
};

/**
 * @description: 判断数据类型
 * @param {any} val 值
 * @param {string} type 类型
 * @returns
 */
const getDataType = (val, type) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
};

/**
 * @description: 判断url后缀名
 * @param {string} fileName
 * @param {string} fileType
 * @returns
 */
const isFileType = (fileName, fileType) => {
  const regex = new RegExp(`\.${fileType}$`, 'i');
  return regex.test(fileName);
};

/**
 * @description: 获取对象值（深层级）
 * @param {object} modal 数据源
 * @param {array|string} prop 属性源
 * @returns
 */
const getValues = (modal, prop) => {
  if (!Array.isArray(prop)) prop = prop.split('.');
  let i = 0;
  let fn = (event) => {
    if (event[prop[i]] === undefined) {
      console.warn(prop, prop[i], 'get找不到该属性');
      return null;
    }
    if (prop.length - 1 == i) return event[prop[i]];
    i++;
    return fn(event[prop[i - 1]]);
  };
  return fn(modal);
};

/**
 * @description: 设置对象属性（深层级）
 * @param {object} modal 数据源
 * @param {array|string} prop 属性源
 * @param {Any} value 设置值
 */
const setKeys = (modal, prop, value = '') => {
  if (!Array.isArray(prop)) prop = prop.split('.');
  let i = 0;
  let fn = (event) => {
    if (event[prop[i]] === undefined) {
      event[prop[i]] = {};
      console.warn(prop, prop[i], 'set找不到该属性');
    }
    if (prop.length - 1 == i) return (event[prop[i]] = value);
    i++;
    fn(event[prop[i - 1]]);
  };
  fn(modal);
};

/**
 * 绘制video当前帧
 * @param {Element} video // 视频元素
 * @returns
 */
const drawVideo = (video) => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth * window.devicePixelRatio;
  canvas.height = video.videoHeight * window.devicePixelRatio;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  return canvas.toDataURL();
};

/**
 * 绘制video文件指定时间帧
 * @param {file} videoFile // 视频文件
 * @returns
 */
const captureVideoFrame = (videoFile, time = 1) => {
  const video = document.createElement('video');
  video.currentTime = time;
  video.muted = true;
  video.autoplay = true;
};

/**
 * 获取视频帧率
 * @param {Element} video // 视频元素
 * @returns
 */
const getVideoFps = (video, callBack) => {
  console.log(video, 'video');
  let c = 0;
  let len = 1;
  const polling = (t, m) => {
    const diff = Math.abs(m.mediaTime - c);
    if (diff && diff < len) {
      len = diff;
      callBack && callBack(Math.round(1 / len));
    }
    c = m.mediaTime;
    video && video.requestVideoFrameCallback(polling);
  };
  video && video.requestVideoFrameCallback(polling);
};

/**
 * 检测数据是否为空数据
 * @param {any} data
 * @returns
 */
const isEmpty = (data) => {
  if (['', 'undefined', 'null', undefined, null].includes(data)) {
    return true;
  }
  if (['{}', '[]', '[{}]'].includes(JSON.stringify(data))) {
    return true;
  }
  return false;
};

/**
 * 去除空白字符串
 * @param {字符串} str
 * @param {修剪位置} pos
 * @returns
 */
const trimBlank = (str, pos = 'both') => {
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  } else if (pos == 'left') {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  } else if (pos == 'all') {
    return str.replace(/\s+/g, '');
  } else {
    return str;
  }
};

/**
 * 根据数字获取对应的汉字
 * @param {number} num 数字(0-10)
 * @returns
 */
const getHanByNumber = (num) => {
  const str = '零一二三四五六七八九十';
  return str.charAt(num);
};

/**
 * 格式化电话号码
 * @demo xxx-xxxx-xxxx
 * @param {number} mobile 手机号
 * @param {string} formatStr 填充字符
 * @returns
 */
const formatPhone = (mobile, formatStr = '-') => {
  return mobile.toString().replace(/(?=(\d{4})+$)/g, formatStr);
};

/**
 * 手机号脱敏
 * @demo 176****0000
 * @param {*} phone 手机号
 * @returns
 */
const hidePhone = (phone) => {
  return phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
};

/**
 * 大小写转换
 * @param {*} str 待转换的字符串
 * @param {*} type 1:全大写 2:全小写 3:首字母大写
 * @returns
 */
const toCase = (str, type) => {
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    default:
      return str;
  }
};

/**
 * 移动终端浏览器版本信息
 * @returns
 */
const getUserAgent = () => {
  const u = navigator.userAgent;
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    qq: u.match(/\sQQ/i) == ' qq', // 是否QQ
  };
};

/**
 * 阻塞等待
 * @param {number} time
 * @param {function} callback
 * @returns
 */
const awit = (time = 500, callback) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callback && callback();
      resolve();
    }, time);
  });
};

/**
 * 模仿请求
 * @param {*} e
 * @returns
 */
const getApi = (e) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = Array.from(Array(30), (v, i) => {
        return { id: i, status: 1, label: `标题${i}`, groupName: `分组${i}`, value: i };
      });
      resolve({ code: 0, data: { data, page: 1, total: 60 } });
    }, 0);
  });
};

export {
  download,
  downLoadImg,
  getUrlToFile,
  copyText,
  formatBytes,
  convertFileSize,
  richExistText,
  generateRandomNum,
  fileFormBase64,
  fileFormUrl,
  calculateImageSize,
  getAssetURL,
  setTwoDimArray,
  curry,
  simpleTemplateEngine,
  getRandomColor,
  getPad,
  isAsyncFunction,
  stripHtml,
  getDataType,
  isFileType,
  getValues,
  setKeys,
  drawVideo,
  captureVideoFrame,
  getVideoFps,
  isEmpty,
  trimBlank,
  getHanByNumber,
  formatPhone,
  hidePhone,
  toCase,
  getUserAgent,
  awit,
  getApi,
};
