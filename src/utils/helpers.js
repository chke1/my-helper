import { USER_AUTH_SETTING_INFO, VERSION_NUMBER } from '@/config/storage-variable.js';

// 加载script
const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'module';
    script.async = true;

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

// 获取版本号
export const getVersion = () => {
  let url = new URL('/public/version.js', import.meta.url).href;
  loadScript(`${url}?${Date.now()}`).then(() => {
    const version = localStorage.getItem(VERSION_NUMBER);
    const winVersion = window.version;

    if (!version) localStorage.setItem(VERSION_NUMBER, winVersion);

    if (version && version !== winVersion) {
      console.log(winVersion, '版本号改变');

      localStorage.setItem(VERSION_NUMBER, winVersion);
      localStorage.removeItem(USER_AUTH_SETTING_INFO);

      window.location.reload();
    }

    console.log(`version:${version}`, `winVersion:${winVersion}`, '获取版本号成功');
  });
};
