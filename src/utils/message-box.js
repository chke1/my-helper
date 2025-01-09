import { ElMessageBox } from 'element-plus';

export const MessageBox = (options = {}) => {
  return new Promise((resolve, reject) => {
    ElMessageBox({
      title: '提示',
      message: '操作不可逆，请谨慎操作',
      showCancelButton: true,
      showConfirmButton: true,
      closeOnClickModal: false,
      draggable: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      ...options,
    })
      .then(resolve)
      .catch(() => {});
  });
};
