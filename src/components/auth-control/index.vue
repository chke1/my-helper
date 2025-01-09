<template>
  <c-form
    label-width="120px"
    :isFooter="false"
    :model="formData"
    :rows="formRows"
    :loading="loading"
  >
    <!-- 路由菜单控制 -->
    <template #auth>
      <el-tree
        ref="treeRef"
        class="auth"
        node-key="path"
        show-checkbox
        default-expand-all
        check-on-click-node
        :expand-on-click-node="false"
        :data="treeData"
        :props="defaultProps"
        @check="onTreeCheck"
      >
        <template #default="{ node, data }">
          <span class="auth-node">
            <span>
              <span :class="[data.meta.menu == false && 'auth-grey']">{{ node.label }}</span>
              <span class="auth-node__keep-alive" v-if="data.meta.keepAlive">缓存</span>
            </span>
            <span v-if="getIsAutoExpand(data)" @click.stop>
              <el-checkbox size="small" v-model="data.meta.autoExpand" @change="onAutoExpandChange">
                展开
              </el-checkbox>
            </span>
          </span>
        </template>
      </el-tree>
    </template>

    <!-- 当前已缓存页面/组件 -->
    <template #keepAliveInclude>
      <div class="keep-alive-include" v-if="getKeepAliveInclude.length">
        <el-tag
          class="keep-alive-include__tag"
          type="info"
          effect="plain"
          v-for="item in getKeepAliveInclude"
          :key="item.fullPath"
        >
          {{ item.label }}
        </el-tag>
      </div>
      <span v-else class="is-info-text f-14">暂无缓存页面</span>
    </template>
  </c-form>
</template>

<script setup>
import { ref, unref, onMounted, computed } from 'vue';

import { routes } from '@/router/routes';

import { getSetting, setSetting } from '@/apis/setting.js';

import { useRouterStore } from '@/pinia/modules/router.js';
const routerStore = useRouterStore();

import { useGlobalStore } from '@/pinia/modules/global';
const globalStore = useGlobalStore();

import { useRoute } from 'vue-router';
const route = useRoute();

// 表单数据
const formData = ref({
  authData: [],
  menuExpandData: [],
  keepAliveIncludeMax: 10,
  isTableBorder: 0,
  isTableStripe: 0,
  isMenuExpand: 0,
  isTabs: 1,
  isBreadcrumb: 1,
  transitionSlide: 'default',
});

// 表单项
const formRows = ref([
  { formType: 'title', label: '权限/菜单设置' },
  { formType: 'slot', slot: 'auth', prop: 'authData', label: '权限设置：' },
  { formType: 'title', label: '页面状态设置' },
  {
    formType: 'switch',
    prop: 'isTableBorder',
    label: '表格边框：',
    activeValue: 1,
    inactiveValue: 0,
    activeText: '是',
    inactiveText: '否',
    inlinePrompt: true,
    onChange: () => updateGlobal(),
  },
  {
    formType: 'switch',
    prop: 'isTableStripe',
    label: '表格斑马纹：',
    activeValue: 1,
    inactiveValue: 0,
    activeText: '是',
    inactiveText: '否',
    inlinePrompt: true,
    onChange: () => updateGlobal(),
  },
  {
    formType: 'switch',
    prop: 'isMenuExpand',
    label: '菜单折叠：',
    activeValue: 1,
    inactiveValue: 0,
    activeText: '是',
    inactiveText: '否',
    inlinePrompt: true,
    onChange: () => updateGlobal(),
  },
  {
    formType: 'switch',
    prop: 'isTabs',
    label: '标签页：',
    activeValue: 1,
    inactiveValue: 0,
    activeText: '是',
    inactiveText: '否',
    inlinePrompt: true,
    onChange: () => updateGlobal(),
  },
  {
    formType: 'switch',
    prop: 'isBreadcrumb',
    label: '面包屑：',
    activeValue: 1,
    inactiveValue: 0,
    activeText: '是',
    inactiveText: '否',
    inlinePrompt: true,
    onChange: () => updateGlobal(),
  },
  {
    formType: 'radio-group',
    prop: 'transitionSlide',
    label: '切换效果：',
    optionList: [
      { value: 'default', label: '默认' },
      { value: 'left', label: '从左切入' },
      { value: 'right', label: '从右切入' },
    ],
    onChange: () => updateGlobal(),
  },
  { formType: 'title', label: '页面/组件缓存设置' },
  {
    formType: 'input-number',
    prop: 'keepAliveIncludeMax',
    labelWidth: '140px',
    label: '最大缓存数量：',
    onChange: () => updateGlobal(),
  },
  {
    formType: 'slot',
    slot: 'keepAliveInclude',
    labelWidth: '140px',
    label: '当前已缓存：',
  },
]);

// 当前缓存页面/组件
const getKeepAliveInclude = computed(() => globalStore.keepAliveInclude.filter((v) => v.keepAlive));

// tree 数据
const treeData = ref([]);

// tree dom
const treeRef = ref(null);

// loading
const loading = ref(false);

// tree props
const defaultProps = {
  label: (data) => data?.meta?.title || '-',
};

// 获取tree选中的属性path组
const allSelectPath = () => {
  let allPaths = []; // 所有路径数据
  let allExpandPaths = []; // 所有存在下级可折叠的路径数据
  let getKeyFn = (data) => {
    for (let item of data) {
      allPaths.push(item.path);
      if (item.children) {
        allExpandPaths.push(item.path);
        getKeyFn(item.children);
      }
    }
  };
  getKeyFn(treeData.value);

  return { allPaths, allExpandPaths };
};

// 获取自动展开数据组
const getMenuAutoExpand = () => {
  let menuAutoExpand = [];
  let getExpandFn = (data) => {
    for (let item of data) {
      if (item.meta.autoExpand) menuAutoExpand.push(item.path);
      if (item.children) getExpandFn(item.children);
    }
  };
  getExpandFn(treeData.value);
  menuAutoExpand = menuAutoExpand.concat(route.meta.currentCrumb.map((v) => v.path));
  return menuAutoExpand;
};

// 格式化routes数据
const formatTreeData = () => {
  const formatRoutes = (menuData) => {
    return menuData.map((item) => {
      if (item.children) item['children'] = formatRoutes(item.children);
      item.meta.autoExpand = unref(formData).menuExpandData.includes(item.path);
      return item;
    });
  };
  treeData.value = formatRoutes(routes);
};

// 菜单折叠显示change
const onAutoExpandChange = () => {
  formData.value.menuExpandData = getMenuAutoExpand();

  updateSetting();

  // routerStore.setMenuRouter();

  updateGlobal();
};

// 判断是否显示展开控制
const getIsAutoExpand = (data) => {
  let _children = data.children || [];
  return _children.length && _children.some((v) => v.meta.menu !== false);
};

// 获取配置，缓存 > state > 本身
const getSettingData = async () => {
  loading.value = true;

  let res = await getSetting().catch((err) => err);

  loading.value = false;

  // 没有缓存默认使用state
  for (let key in formData.value) {
    if (globalStore[key]) {
      formData.value[key] = globalStore[key] || 0;
    }
  }

  // getSetting数据
  for (let key in res.data) {
    if (!!res.data[key]) {
      formData.value[key] = res.data[key] || 0;
    }
  }

  const { authData, menuExpandData } = formData.value;

  // 路由/菜单，state为空或存在all勾选所有
  if (authData.length == 0 || authData.includes('all')) {
    formData.value.authData = allSelectPath().allPaths;
  }

  // 菜单自动展开，state为空展开routes设置的数据
  if (menuExpandData.length == 0) {
    formData.value.menuExpandData = getMenuAutoExpand();
  }

  // 存在all展开所有
  if (menuExpandData.includes('all')) {
    formData.value.menuExpandData = allSelectPath().allExpandPaths;
  }

  formatTreeData();

  unref(treeRef).setCheckedKeys(formData.value.authData);

  console.log(formData.value, 'formData.value');
};

// 修改配置项
const updateSetting = () => {
  for (let key in formData.value) {
    setSetting(key, formData.value[key]).catch((err) => err);
  }
};

// tree 点击节点复选框之后触发
const onTreeCheck = async (data, node) => {
  formData.value.authData = node.checkedKeys || [];

  updateSetting();

  routerStore.setMenuRouter();
};

// 更新全局配置
const updateGlobal = async () => {
  // loading.value = true;

  updateSetting();

  await globalStore.setGlobalState();

  // loading.value = false;
};

// 初始化数据
const initData = async () => {
  treeData.value = routes;

  await getSettingData();
};

onMounted(() => {
  initData();
});
</script>

<style lang="scss" scoped>
.auth {
  width: 360px;

  &-grey {
    color: var(--el-text-color-disabled);
  }

  &-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    &__keep-alive {
      font-size: 12px;
      color: var(--el-color-white);
      background-color: var(--el-color-warning);
      margin-left: 4px;
      padding: 0px 8px 1px;
      line-height: 1;
      box-sizing: border-box;
      border-radius: 6px;
    }
  }
}

.keep-alive-include {
  border: 1px solid var(--el-border-color);
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;

  &__tag {
    margin: 4px;
  }
}
</style>
