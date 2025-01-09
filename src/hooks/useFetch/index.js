import { reactive, toRefs } from 'vue';

/**
 * 请求hooks
 * @param {Promise} param.api 接口api
 * @param {Object} param.lazy 是否立即加载
 * @param {Object} param.params 接口参数
 * @param {Object} param.options 是否首次触发请求
 * @param {Function} param.callBack 请求结果回调函数
 * @returns
 */
export function useFetch(event) {
  const { api, params = {}, lazy = true, callBack, onSuccess, onError, onFinally } = event || {};

  const state = reactive({
    loading: false, // 是否加载中
    error: null,
    params: params, // 参数
    data: [], // 数据
  });

  const queryData = async () => {
    state.loading = true;

    try {
      let res = await api(state.params).catch((err) => {
        state.error = err;
        onError && onError(err);
        return err;
      });

      onSuccess && onSuccess(res);
      onFinally && onFinally(res);

      state.loading = false;

      if (res?.code !== 0) return;

      if (callBack) {
        let call = callBack(res);
        call && (state.data = call);
      } else {
        state.data = res?.data || [];
      }

      return res;
    } catch (err) {
      state.error = err;
      state.loading = false;
    }
  };

  if (lazy) queryData();

  return { ...toRefs(state), queryData };
}
