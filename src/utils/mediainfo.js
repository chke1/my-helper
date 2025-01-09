const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    // script.type = 'module';
    // script.async = true;

    script.onload = () => {
      script.remove();
      resolve();
    };
    script.onerror = () => {
      script.remove();
      reject(new Error(`Failed to load script: ${url}`));
      console.log(`Failed to load script: ${url}`);
    };
    document.head.appendChild(script);
  });
};

const getUrlToFile = (url, fileName) => {
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

const checkMediaFile = (file) => {
  const readChunk = (chunkSize, offset) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target.error) {
          reject(event.target.error);
        }
        resolve(new Uint8Array(event.target.result));
      };
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
    });
  };

  return new Promise(async (resolve, reject) => {
    const getSize = () => file.size;
    let media = await window.MediaInfo().catch(reject);
    let result = await media.analyzeData(getSize, readChunk).catch(reject);
    resolve(result);
  });
};

/**
 * 获取视频信息
 * @param {File|String} val
 * @returns
 */
export const getMediaInfo = async (val) => {
  let valType = Object.prototype.toString.call(val);
  if (!['[object File]', '[object String]'].includes(valType)) {
    return;
  }

  // 教程链接 https://blog.csdn.net/weixin_61079989/article/details/134034771
  // wasm文件 https://unpkg.com/mediainfo.js@0.2.1/dist/MediaInfoModule.wasm
  // let mediaUrl = import.meta.env.BASE_URL + 'mediainfo/mediainfo/index.js';
  let mediaUrl = 'https://unpkg.com/mediainfo.js@0.2.1/dist/umd/index.min.js';

  await loadScript(mediaUrl).then(() => {});

  let fileRes = '';
  if (valType == '[object String]') {
    fileRes = await getUrlToFile(val, Date.now()).catch((err) => err);
  }

  if (valType == '[object File]') {
    fileRes = val;
  }

  let res = await checkMediaFile(fileRes).catch((err) => err);
  console.log(res, 'res');
  return res;
};
