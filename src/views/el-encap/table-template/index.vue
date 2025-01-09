<template>
  <div class="wrap-page table-template">
    <el-tabs v-model="activeName" class="table-tabs">
      <el-tab-pane label="分组表格" name="group"></el-tab-pane>
      <el-tab-pane label="基础表格" name="basics"></el-tab-pane>
      <el-tab-pane label="常规表格" name="practice"></el-tab-pane>
    </el-tabs>

    <keep-alive>
      <c-card isNone isAffix v-if="activeName == 'group'">
        <div class="table-group">
          <table-group
            v-model="searchParams.activeId"
            :loading="groupLoading"
            :list="groupData.data"
            :options="{ label: 'groupName' }"
          ></table-group>
          <div class="table-group__content">
            <c-table
              row-key="id"
              class="table-template__table"
              :loading="loading"
              :data="tableData"
              v-model:search="searchParams"
              v-model:paging="paging"
              @refresh="queryTableData"
            >
              <!-- 搜索栏 -->
              <template #search>
                <c-input v-model="searchParams.input" placeholder="请输入关键字" />
                <c-select
                  v-model="searchParams.select"
                  prefixText="测试："
                  :loading="statusLoading"
                  :optionList="statusData.data"
                ></c-select>
                <c-select
                  v-model="searchParams.role"
                  prefixText="角色："
                  :optionList="RoleType"
                ></c-select>
                <c-date-picker
                  prefixText="创建日期："
                  type="daterange"
                  v-model="getCreateDate"
                ></c-date-picker>
              </template>

              <!-- 操作栏 -->
              <template #handle="{ selectionLength }">
                <el-button type="primary" :disabled="!selectionLength">勾选控制</el-button>
                <el-button type="primary" @click="hanleModal">弹窗</el-button>
              </template>

              <!-- 表格 -->
              <template #table>
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="排序" width="60" align="center">
                  <template #default>
                    <img class="table-drag-img" src="@/assets/common/drag.svg" />
                  </template>
                </el-table-column>
                <el-table-column prop="id" label="栏目一" />
                <el-table-column prop="id" label="栏目二" />
                <el-table-column prop="id" label="栏目三" />
                <el-table-column prop="id" label="栏目四" />
                <el-table-column prop="id" label="栏目五" />
                <el-table-column prop="id" label="栏目六">
                  <template #default>
                    {{ RoleType.getLabel(1) }}
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                  <template #default="{ row }">
                    <c-switch
                      v-model="row.status"
                      :before-change="switchBeforeChange"
                      @refresh="queryTableData"
                    ></c-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="240" fixed="right" align="center">
                  <template #default="{ row }">
                    <el-button type="primary" text @click="handleDesc(row)">详情</el-button>
                    <el-button type="primary" text @click="hanleModalEdit(row)">编辑</el-button>
                    <el-button type="danger" text @click="handleDelete(row)">删除</el-button>
                  </template>
                </el-table-column>
              </template>
            </c-table>
          </div>
        </div>
      </c-card>
      <c-card isAffix v-else-if="activeName == 'basics'">
        <template #header>提示：封装表格hooks统一操作表格页，封装枚举类简化变量的使用维护</template>
        <c-table
          row-key="id"
          class="table-template__table"
          :loading="loading"
          :data="tableData"
          v-model:search="searchParams"
          v-model:paging="paging"
          @refresh="queryTableData"
        >
          <!-- 搜索栏 -->
          <template #search>
            <c-input v-model="searchParams.input" placeholder="请输入关键字" />
            <c-select
              v-model="searchParams.select"
              prefixText="测试："
              :loading="statusLoading"
              :optionList="statusData.data"
            ></c-select>
            <c-select
              v-model="searchParams.role"
              prefixText="角色："
              :optionList="RoleType"
            ></c-select>
            <c-date-picker
              prefixText="创建日期："
              type="daterange"
              v-model="getCreateDate"
            ></c-date-picker>
          </template>

          <!-- 操作栏 -->
          <template #handle="{ selectionLength }">
            <el-button type="primary" :disabled="!selectionLength">勾选控制</el-button>
            <el-button type="primary" @click="hanleModal">弹窗</el-button>
          </template>

          <!-- 表格 -->
          <template #table>
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column label="排序" width="60" align="center">
              <template #default>
                <img class="table-drag-img" src="@/assets/common/drag.svg" />
              </template>
            </el-table-column>
            <el-table-column prop="id" label="栏目一" />
            <el-table-column prop="id" label="栏目二" />
            <el-table-column prop="id" label="栏目三" />
            <el-table-column prop="id" label="栏目四" />
            <el-table-column prop="id" label="栏目五" />
            <el-table-column prop="id" label="栏目六">
              <template #default>
                {{ RoleType.getLabel(1) }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <c-switch
                  v-model="row.status"
                  :before-change="switchBeforeChange"
                  @refresh="queryTableData"
                ></c-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right" align="center">
              <template #default="{ row }">
                <el-button type="primary" text @click="handleDesc(row)">详情</el-button>
                <el-button type="primary" text @click="hanleModalEdit(row)">编辑</el-button>
                <el-button type="danger" text @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </c-table>
      </c-card>
      <c-card v-else-if="activeName == 'practice'">
        <template #header>提示：自动撑满高度</template>
        <c-table
          row-key="id"
          class="table-template__table"
          :loading="loading"
          :data="tableData"
          v-model:search="searchParams"
          v-model:paging="paging"
          @refresh="queryTableData"
        >
          <!-- 搜索栏 -->
          <template #search>
            <c-input v-model="searchParams.input" placeholder="请输入关键字" />
            <c-select
              v-model="searchParams.select"
              prefixText="测试："
              :loading="statusLoading"
              :optionList="statusData.data"
            ></c-select>
            <c-select
              v-model="searchParams.role"
              prefixText="角色："
              :optionList="RoleType"
            ></c-select>
            <c-date-picker
              prefixText="创建日期："
              type="daterange"
              v-model="getCreateDate"
            ></c-date-picker>
          </template>

          <!-- 操作栏 -->
          <template #handle="{ selectionLength }">
            <el-button type="primary" :disabled="!selectionLength">勾选控制</el-button>
            <el-button type="primary" @click="hanleModal">弹窗</el-button>
          </template>

          <!-- 表格 -->
          <template #table>
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column label="排序" width="60" align="center">
              <template #default>
                <img class="table-drag-img" src="@/assets/common/drag.svg" />
              </template>
            </el-table-column>
            <el-table-column prop="id" label="栏目一" />
            <el-table-column prop="id" label="栏目二" />
            <el-table-column prop="id" label="栏目三" />
            <el-table-column prop="id" label="栏目四" />
            <el-table-column prop="id" label="栏目五" />
            <el-table-column prop="id" label="栏目六">
              <template #default>
                {{ RoleType.getLabel(1) }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <c-switch
                  v-model="row.status"
                  :before-change="switchBeforeChange"
                  @refresh="queryTableData"
                ></c-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right" align="center">
              <template #default="{ row }">
                <el-button type="primary" text @click="handleDesc(row)">详情</el-button>
                <el-button type="primary" text @click="hanleModalEdit(row)">编辑</el-button>
                <el-button type="danger" text @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </c-table>
      </c-card>
      <div v-else></div>
    </keep-alive>

    <!-- 弹窗 -->
    <c-dialog title="弹窗标题" :width="600" name="popup">
      <popup></popup>
    </c-dialog>

    <!-- 抽屉 -->
    <c-drawer title="抽屉标题" :width="500" name="drawer"></c-drawer>
  </div>
</template>

<script setup name="el-encap.table-template">
import { ref, computed, onMounted } from 'vue';

// hooks
import { useTable } from '@/hooks/useTable/index.js';
import { useFetch } from '@/hooks/useFetch/index.js';

// components
import Sortable from 'sortablejs';
import Popup from './components/popup.vue';
import TableGroup from '@/components/group-menus/table-group.vue';

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// store modal
import { useModalStore } from '@/pinia/modules/modal';
const modalStore = useModalStore();

// api
import { getApi } from '@/utils/tools';

// variable
import { RoleType } from '@/config/global-variable.js';

const activeName = ref('group');

// 筛选列表
const { loading: statusLoading, data: statusData } = useFetch({
  api: getApi,
  params: { id: '123' },
});

// 分组列表
const { loading: groupLoading, data: groupData } = useFetch({
  api: getApi,
  params: { id: '123' },
});

// 表格相关
const { loading, paging, searchParams, tableData, queryTableData, delTableRow } = useTable({
  api: getApi,
  params: {
    input: '',
    select: '',
    role: '',
    startDate: '',
    endDate: '',
    activeId: '',
  },
  options: {},
  callBack: () => {},
});

// 时间筛选转换格式
const getCreateDate = computed({
  get() {
    const { startDate = '', endDate = '' } = searchParams.value;
    return [startDate, endDate];
  },
  set(value) {
    searchParams.value.startDate = value[0] || '';
    searchParams.value.endDate = value[1] || '';
    return;
  },
});

// 状态开关
const switchBeforeChange = async () => {
  return await getApi({}).catch((err) => err);
};

// 详情页
const handleDesc = (row) => {
  router.push({
    path: '/el-encap/table-template/details-page',
    query: {
      id: row.id,
    },
  });
};

// 添加
const hanleModal = () => {
  modalStore.openModal('popup', { type: 'edit', data: [] });
};

// 编辑
const hanleModalEdit = () => {
  modalStore.openModal('popup', { type: 'add', data: [] });
};

// 删除
const handleDelete = (row) => {
  delTableRow({ api: getApi, params: row, options: {}, callBack: () => {} });
};

// 行拖拽
const rowDrop = () => {
  const tbody = document.querySelector('.table-template__table tbody');
  Sortable.create(tbody, {
    group: {
      name: 'shared',
      pull: true,
      put: true,
    },
    handle: '.table-drag-img',
    animation: 150,
    onEnd({ newIndex, oldIndex }) {
      console.log(newIndex, oldIndex, 'newIndex, oldIndex');

      const currRow = tableData.value.splice(oldIndex, 1)[0];

      tableData.value.splice(newIndex, 0, currRow);
    },
  });
};

// 列拖拽
const columnDrop = () => {
  const tr = document.querySelector('.table-template__table tr');
  Sortable.create(tr, {
    animation: 150,
    onEnd: ({ newIndex, oldIndex }) => {
      console.log(newIndex, oldIndex, 'newIndex, oldIndex');
    },
  });
};

onMounted(() => {
  rowDrop();
  columnDrop();
});
</script>

<style lang="scss" scoped>
.table-template {
  display: flex;
  flex-direction: column;
}

.table-group {
  height: 100%;
  display: flex;

  &__content {
    width: 100%;
    overflow: hidden;
    margin-left: 6px;
    padding: 20px;
    box-sizing: border-box;
    @include card-box;
  }
}

.table-drag-img {
  font-size: 20px;
  vertical-align: middle;
  cursor: grab;
  margin: 0;
  padding: 0;
}
</style>
