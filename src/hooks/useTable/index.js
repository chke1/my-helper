import { reactive, toRefs } from 'vue';
import { MessageBox } from '@/utils/message-box';
import { ElMessage } from 'element-plus';

/**
 * 页面表格操作方法封装
 * @param {Promise} param.api 表格列表api
 * @param {Object} param.params 表格请求参数
 * @param {Object} param.options 配置项
 * @param {Function} param.callBack 回调处理返回数据
 * @returns
 */
export function useTable({ api, params = {}, lazy = true, callBack } = {}) {
  if (!api) return;

  // 状态
  const state = reactive({
    // 分页数据
    paging: {
      page: 1,
      size: 30,
      total: 60,
    },
    // 是否加载中
    loading: false,
    // 表格数据
    tableData: [],
    // 初始查询参数
    initParams: {},
    // 查询参数
    searchParams: params,
  });

  // 查询表格
  const queryTableData = async () => {
    state.loading = true;

    let paramsData = {
      ...state.paging,
      ...state.initParams,
      ...state.searchParams,
    };
    console.log(paramsData, 'paramsData');

    let res = await api(paramsData).catch((err) => err);

    state.loading = false;

    if (res?.code !== 0) return;

    // 处理返回数据
    if (callBack) {
      let call = callBack(res);
      call && (res = call);
    }

    state.tableData = res.data?.data || [];
    state.paging.total = res.data?.total;
    console.log(res, 'tableData', paramsData, 'paramsData');
    return res;
  };

  // 初始化表格
  const initTableData = () => {
    state.paging.page = 1;
    queryTableData();
  };

  /**
   * 删除表格某一项
   * @param {Promise} param.api 删除api
   * @param {Object} param.options 配置项
   * @param {Function} param.callBack 回调处理返回数据
   * @returns
   */
  const delTableRow = ({ api, params = {}, options = {}, callBack } = {}) => {
    if (!api) return;

    MessageBox({
      title: '确定删除该数据？',
      message: '操作不可逆，请谨慎操作',
      ...options,
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;

          let res = await api(params).catch((err) => err);

          instance.confirmButtonLoading = false;

          if (res?.code !== 0) return;

          // page大于1的且当前只有一条数据需要减1
          if (state.paging.page > 1 && state.tableData.length == 1) {
            state.paging.page--;
          }

          // 删除成功的回调
          if (callBack) {
            callBack(res);
            return;
          }

          ElMessage.success('删除成功');
          queryTableData();
        }
        done();
      },
    });
  };

  if (lazy) initTableData();

  return { ...toRefs(state), queryTableData, initTableData, delTableRow };
}
