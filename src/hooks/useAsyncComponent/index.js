import { h, defineAsyncComponent } from 'vue';

export const useAsyncComponent = (loader) => {
  return defineAsyncComponent({
    loader,
    loadingComponent: h('div', {}, 'loading...'),
    delay: '200ms',
    errorComponent: h('div', {}, 'error'),
    timeout: 3000,
  });
};
