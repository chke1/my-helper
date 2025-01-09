import { reactive, toRefs } from 'vue';
import vueRouter from '@/router';
import { ElMessage } from 'element-plus';
import { getValues, setKeys, getDataType } from '@/utils/tools.js';
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

/**
 * @description useForm 页面表单
 * @param {*} params 表单自定义数据
 * @param {*} routeQuery 路由查询字段
 * @returns
 */
export function useForm({ initParams = {}, routeQuery = {}, setMaps = {}, getMaps = {} } = {}) {
  // 路由数据
  const router = vueRouter;
  const route = vueRouter.currentRoute.value;

  // 自定义参数字段名
  const { id = 'id', copy = 'copy', copyKey = 'name' } = routeQuery;

  // 当前路径id参数
  let currentId = route.query[id];

  // 是否为复制添加
  let isCopy = route.query[copy];

  // state
  const state = reactive({
    loading: false,
    formData: initParams,
    [id]: currentId,
  });

  // 路由操作
  const routerHandle = () => {
    return {
      push: (params) => router.push(params),
      replace: (params) => router.replace(params),
    };
  };

  /**
   * @description fillForm 比对填充表单数据
   * @param {*} fillTemp 被填充的模版
   * @param {*} fillData 填充数据
   * @returns
   */
  const fillForm = (fillTemp = {}, fillData = {}, fillMaps = {}) => {
    // 迭代填充
    let iteraFill = (citeTemp = fillTemp, citeData = fillData) => {
      // 判断数据类型为object
      if (!getDataType(citeTemp, 'Object') || !getDataType(citeData, 'Object')) {
        console.warn('类型错误，不是对象类型');
        return;
      }

      // 填充数据keys
      let dataKeys = Object.keys(citeData);

      // 必须存在数据才执行
      if (!Object.keys(citeTemp).length || !dataKeys.length) return;

      // 定义缓存填充数据
      let cacheData = {};

      // 映射已有属性值
      for (const key in citeTemp) {
        // fillData数据存在缺失
        if (!dataKeys.includes(key)) {
          console.warn(citeData, `缺少${key}字段数据`);
          cacheData[key] = citeTemp[key];
          continue;
        }

        // 深层级对象类型迭代
        let isObject = getDataType(citeTemp[key], 'Object');
        cacheData[key] = isObject ? iteraFill(citeTemp[key], citeData[key]) : citeData[key];
      }

      // 根据fillMaps映射fillData创建新属性值
      for (let key in fillMaps) {
        setKeys(cacheData, key, getValues(fillData, fillMaps[key]));
      }

      console.log('cacheData', cacheData);
      return cacheData;
    };

    return iteraFill();
  };

  /**
   * @description queryDetailsData 请求表单详情数据
   * @param {*} api 详情api
   * @param {*} params 表格请求参数
   * @param {*} callBack 回调处理返回数据
   * @returns
   */
  const queryDetailsData = async ({ api, params = {}, fillMaps = getMaps, callBack }) => {
    if (!api) return;

    if (['', undefined, null].includes(currentId)) return;

    state.loading = true;

    let res = await api({ [id]: currentId, ...params }).catch((err) => err);

    state.loading = false;

    if (res?.code == 0) {
      // 处理返回数据
      if (callBack) {
        let call = callBack(res);

        call && (res = call);
      }

      // 复制操作添加标识
      if (isCopy) {
        res.data[copyKey] += '--复制';
      }

      state.formData = fillForm(state.formData, res.data || {}, fillMaps);
    }
  };

  /**
   * @description queryModalData 获取弹窗表单详情数据
   * @param {*} params 请求参数
   * @param {*} callBack 回调处理返回数据
   * @returns
   */
  const queryModalData = ({ fillParams = {}, callBack }) => {
    let res = modalStore.getModal();

    // 处理返回数据
    if (callBack) {
      let call = callBack(res);

      call && (res = call);
    }

    // 复制操作添加标识
    if (isCopy) {
      res[copyKey] += '--复制';
    }

    state.formData = fillForm(state.formData, res || {}, getMaps);
  };

  /**
   * @description submitForm 表单提交
   * @param {*} createApi 创建api
   * @param {*} updateApi 更新api
   * @param {*} params 表格请求参数
   * @param {*} callBack 回调处理返回数据
   * @returns
   */
  const submitForm = async ({
    createApi,
    updateApi,
    params = {},
    fillMaps = setMaps,
    callBack,
  } = {}) => {
    let isCreate = ['', undefined, null].includes(currentId);

    state.loading = true;

    let paramData = fillForm(initParams, { ...state.formData, ...params }, fillMaps);

    console.log(paramData, 'paramData');

    let res;

    if (isCreate) {
      // 新增
      res = await createApi(paramData).catch((err) => err);
    } else {
      // 更新
      res = await updateApi({ [id]: currentId, ...paramData }).catch((err) => err);
    }

    state.loading = false;

    if (res?.code == 0) {
      // 处理返回数据
      if (callBack) {
        callBack(res);
        return;
      }

      ElMessage.success('操作成功');

      router.back();
    }
  };

  return { ...toRefs(state), routerHandle, fillForm, queryDetailsData, queryModalData, submitForm };
}
