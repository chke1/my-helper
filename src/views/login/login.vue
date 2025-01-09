<template>
  <div class="login">
    <stars-bg class="stars-bg"></stars-bg>

    <div class="login-form">
      <h2 class="login-form-title">登录</h2>
      <el-form size="large" :model="userData" :rules="rules" label-width="0" ref="formRef">
        <el-form-item prop="username">
          <el-input size="large" placeholder="请输入名称" v-model="userData.username">
            <template #prepend>
              <c-select
                style="width: 90px"
                v-model="userData.accountId"
                placeholder="账号"
                size="large"
                :optionList="accountList"
                :optionProps="{ label: 'username', value: 'id', imageUrl: 'avatarUrl' }"
                @change="handleSelectAccount"
              ></c-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" placeholder="请输入密码" show-password v-model="userData.password">
          </el-input>
        </el-form-item>
        <div class="login-form-handle">
          <el-checkbox
            v-model="rememberPassword"
            label="记住密码"
            true-label="1"
            false-label="0"
            @change="onRememberPasswordChange"
          />
          <span class="forgot-password">忘记密码</span>
        </div>
        <el-button
          class="button"
          type="primary"
          size="large"
          :loading="submitLoading"
          @click="handleEnd"
        >
          登 录
        </el-button>
        <el-button class="button" size="large"> 注 册 </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup name="login">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import starsBg from '@/components/canvas-demo/stars-bg.vue';

// variable
import { USER_INFO, REMEMBER_PASSWORD } from '@/config/storage-variable.js';

// global
import { useGlobalStore } from '@/pinia/modules/global.js';
const globalStore = useGlobalStore();

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// api
import { login } from '@/apis/setting.js';

const accountList = [
  {
    id: 1,
    username: 'root',
    password: '123456',
    avatarUrl: import.meta.env.BASE_URL + 'account-list/ic-account-avatar1.jpg',
  },
  {
    id: 2,
    username: 'admin',
    password: '123456',
    avatarUrl: import.meta.env.BASE_URL + 'account-list/ic-account-avatar2.jpg',
  },
  {
    id: 3,
    username: '部门',
    password: '123456',
    avatarUrl: import.meta.env.BASE_URL + 'account-list/ic-account-avatar3.jpg',
  },
  {
    id: 4,
    username: '员工',
    password: '123456',
    avatarUrl: import.meta.env.BASE_URL + 'account-list/ic-account-avatar4.jpg',
  },
];

// 账号&密码
const userData = reactive({
  accountId: '',
  username: '',
  password: '',
  avatarUrl: '',
});

const rememberPassword = ref('0');

// 跳转
const toSkip = () => {
  let path = globalStore.lastPagePath;
  router.push(!['', '/', 'login'].includes(path) ? path : '/index');
  ElMessage.success('登录成功');
};

const rules = reactive({
  username: [{ required: true, message: '请输入名称', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
});

const handleSelectAccount = () => {
  let item = accountList.find((v) => v.id == userData.accountId) || {};
  console.log(item, 'item');
  userData.username = item.username;
  userData.password = item.password;
  userData.avatarUrl = item.avatarUrl;
};

const onRememberPasswordChange = () => {
  localStorage.setItem(REMEMBER_PASSWORD, rememberPassword.value);
};

const formRef = ref();
const submitLoading = ref(false);
const handleEnd = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    await login(userData);
    toSkip();
  });
};

const init = () => {
  // 检查是否存在账号&密码
  const _userInfo = localStorage.getItem(USER_INFO);
  // 检查是否记住密码
  const _rememberPassword = localStorage.getItem(REMEMBER_PASSWORD);
  console.log(_rememberPassword, '_rememberPassword');
  if (_userInfo) {
    const { accountId, username, password, avatarUrl } = JSON.parse(_userInfo);
    userData.accountId = accountId;
    userData.username = username;
    userData.password = password;
    userData.avatarUrl = avatarUrl;
    toSkip();
  }

  rememberPassword.value = _rememberPassword || '0';
};

init();
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .stars-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .login-form {
    z-index: 1;
    padding: 40px 20px;
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    // opacity: 0.9;
    // background-color: rgb(255, 255, 255, 0.15);
    border-radius: 12px;
    box-shadow: var(--el-box-shadow-lighter);
    transition: var(--el-transition-duration);

    :deep(.el-form) {
      width: 360px;
    }

    :deep(.el-form-item) {
      margin-bottom: 20px;
      &:nth-of-type(2) {
        margin-bottom: 0px;
      }
    }

    // :deep(.el-button),
    // :deep(.el-checkbox__inner),
    // :deep(.el-input-group__prepend),
    // :deep(.el-input__wrapper) {
    //   background-color: rgba(255, 255, 255, 0.15);
    //   box-shadow: none !important;
    // }

    // :deep(.el-checkbox__input .el-checkbox__inner),
    // :deep(.el-button) {
    //   border: 1px solid rgba(255, 255, 255, 0.15);
    // }

    // :deep(.el-button) {
    //   color: #fff;
    // }

    // :deep(.el-button--primary) {
    //   background-color: rgb(64, 158, 255, 0.6);
    // }

    // :deep(.el-input__inner) {
    //   color: #fff;
    // }
  }

  .login-form-title {
    font-size: 18px;
    color: var(--color-primary);
    margin-bottom: 26px;
    margin-top: 0;
    font-weight: 400;
  }

  .login-form-handle {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  .forgot-password {
    cursor: pointer;
    color: var(--color-primary);
    font-size: 14px;
    user-select: none;
  }

  .button {
    text-align: center;
    width: 100%;
    margin: 16px 0 0 0;
    font-weight: 800;
  }
}
</style>
