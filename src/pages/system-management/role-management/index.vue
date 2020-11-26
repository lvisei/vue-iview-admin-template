<template>
  <i-card class="role-management" shadow>
    <i-spin size="large" fix v-if="spinShow" />
    <i-form
      class="role-management__search"
      ref="searchForm"
      label-position="right"
      :model="searchValue"
      @keydown.enter.native="handleSearch"
      inline
    >
      <i-form-item label="" prop="queryValue">
        <i-input
          type="text"
          v-model="searchValue.queryValue"
          style="width: 300px"
          placeholder="请输入关键字"
        />
      </i-form-item>
      <i-form-item label="" prop="status" :label-width="30">
        <i-select
          clearable
          v-model="searchValue.status"
          placeholder="请选择状态"
          style="width: 250px"
        >
          <Option :value="1">启用</Option>
          <Option :value="2">禁用</Option>
        </i-select>
      </i-form-item>
      <i-form-item :label-width="10">
        <i-button @click="handleSearch" type="primary">查询</i-button>
      </i-form-item>
      <i-form-item :label-width="10">
        <i-button @click="handleReset">重置</i-button>
      </i-form-item>
    </i-form>
    <div class="role-management__batch">
      <i-button
        v-permission="'RoleManagement.add'"
        class="role-management__batch-btn"
        type="primary"
        icon="md-add"
        @click="handAdd"
      >
        添加角色
      </i-button>
      <!-- <i-button
        class="role-management__batch-btn"
        type="primary"
        icon="md-trash"
        :disabled="!canBatch"
        @click="onBatch('remove')"
      >
        批量删除
      </i-button>
      <i-button
        class="role-management__batch-btn"
        type="primary"
        icon="md-remove-circle"
        :disabled="!canBatch"
        @click="onBatch('disble')"
      >
        批量禁用
      </i-button> -->
      <i-button
        class="role-management__export-btn"
        type="primary"
        icon="md-cloud-download"
        @click="exportExcel"
      >
        导出为CSV
      </i-button>
    </div>
    <i-table
      ref="table"
      class="role-management__table"
      :loading="tableLoading"
      :columns="columns"
      :data="tableData"
    >
      <template slot-scope="{ row }" slot="name">
        <span>{{ row.name }}</span>
      </template>
      <template slot-scope="{ row }" slot="status">
        <i-badge
          :status="row.status === 1 ? 'success' : 'warning'"
          :text="row.status === 1 ? '启用' : '禁用'"
        />
      </template>
      <template slot-scope="{ row }" slot="showStatus">
        <p :style="{ color: row.showStatus === 1 ? 'green' : 'red' }">
          {{ row.showStatus === 1 ? '显示' : '隐藏' }}
        </p>
      </template>
      <template slot-scope="{ row }" slot="action">
        <i-button
          v-permission="'RoleManagement.edit'"
          ghost
          type="info"
          size="small"
          style="margin-left: 5px"
          @click="handEdit(row)"
        >
          编辑
        </i-button>
        <i-poptip
          v-permission="['RoleManagement.disable', 'RoleManagement.enable']"
          confirm
          transfer
          :title="`确认${row.status === 1 ? '禁用' : '启用'}这个角色？`"
          @on-ok="handEditStatus(row)"
        >
          <i-button
            ghost
            :type="row.status === 1 ? 'warning' : 'success'"
            size="small"
            style="margin-left: 5px"
          >
            {{ row.status === 1 ? '禁用' : '启用' }}
          </i-button>
        </i-poptip>

        <i-poptip
          v-permission="'RoleManagement.del'"
          confirm
          transfer
          title="确定删除这个角色？"
          @on-ok="handRemove(row)"
          ok-text="确定"
          cancel-text="取消"
        >
          <i-button ghost type="error" size="small" style="margin-left: 5px">
            删除
          </i-button>
        </i-poptip>
      </template>
    </i-table>
    <i-page
      class="role-management__page"
      show-total
      :total="totalCount"
      :page-size="pageSize"
      @on-change="onPageChange"
    />

    <RoleEdit
      :edit-type="editRoleType"
      :modal-visible.sync="editRoleVisible"
      :role="editorRole"
      :loading="editRoleLoading"
      @on-edit-submit="onRoleSubmit"
    />
  </i-card>
</template>

<script>
import RoleEdit from './RoleEdit'
import {
  getRoles,
  addRoles,
  editRoles,
  editRolesStatus,
  deleteRole
} from '@/api/system-management/role-management'

export default {
  name: 'RoleManagement',

  components: { RoleEdit },

  filters: {},

  props: {},

  data() {
    return {
      spinShow: true,
      searchValue: { queryValue: '', status: null },
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      tableLoading: false,
      columns: [
        { title: '角色名称', key: 'name', minWidth: 100, slot: 'name' },
        { title: '状态', key: 'status', minWidth: 80, slot: 'status' },
        { title: '排序值', key: 'sequence', minWidth: 100, sortable: true },
        { title: '创建时间', key: 'createdAt', sortable: true, width: 170 },
        { title: '创建者', key: 'creator', minWidth: 100 },
        { title: '备注', key: 'memo', minWidth: 100 },
        { title: '操作', slot: 'action', width: 250, align: 'center' }
      ],
      tableData: [],
      editRoleVisible: false,
      editRoleLoading: false,
      editorRole: {},
      editRoleType: 'add'
    }
  },

  computed: {},

  watch: {},

  created() {
    this.spinShow = false
    this.upTableData().then(() => {
      this.spinShow = false
    })
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    handleSearch() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.pageIndex = 1
          this.upTableData()
        }
      })
    },

    handleReset() {
      this.$refs.searchForm.resetFields()
      this.upTableData()
    },

    onPageChange(page) {
      this.pageIndex = page
      this.upTableData()
    },

    exportExcel() {
      if (this.tableLoading) return false
      this.$refs.table.exportCsv({
        filename: `系统角色.csv`,
        original: false
      })
    },

    handAdd() {
      this.editRoleType = 'add'
      this.editRoleVisible = true
    },

    handEdit(row) {
      this.editRoleType = 'edit'
      this.editorRole = Object.freeze(row)
      this.editRoleVisible = true
    },

    onRoleSubmit(data) {
      this.editRoleLoading = true
      const isAddRole = this.editRoleType === 'add'

      if (isAddRole) {
        addRoles(data)
          .then(() => {
            this.editRoleVisible = false
            this.$Message.success('添加成功')
            this.upTableData()
          })
          .catch(() => {
            this.$Message.error('添加失败')
          })
          .finally(() => (this.editRoleLoading = false))
      } else {
        const { id } = this.editorRole
        editRoles(id, data)
          .then(() => {
            this.editRoleVisible = false
            this.$Message.success('编辑成功')
            this.upTableData()
          })
          .catch(() => {
            this.$Message.error('编辑失败')
          })
          .finally(() => (this.editRoleLoading = false))
      }
    },

    handRemove({ id }) {
      deleteRole(id)
        .then(() => {
          this.$Message.success('删除成功')
          this.upTableData()
        })
        .catch(() => {
          this.$Message.error('删除失败')
        })
    },

    handEditStatus({ id, status }) {
      editRolesStatus(id, status === 1 ? 2 : 1)
        .then(() => {
          this.$Message.success('编辑成功')
          this.upTableData()
        })
        .catch(() => {
          this.$Message.error('编辑失败')
        })
    },

    upTableData() {
      this.tableLoading = !this.spinShow
      return this.getRoleList().then(({ list, total }) => {
        this.tableData = list.map(item =>
          Object.assign(item, { createdAt: this.$utils.getFormatDate(item.createdAt) })
        )
        this.totalCount = total
        this.tableLoading = false
        return { list, total }
      })
    },

    async getRoleList() {
      const params = {
        current: this.pageIndex,
        pageSize: this.pageSize,
        queryValue: this.searchValue.queryValue,
        status: this.searchValue.status
      }
      try {
        const data = await getRoles(params)
        const {
          list = [],
          pagination: { total }
        } = data
        return { list, total }
      } catch (err) {
        new Error(err)
      }
    }
  }
}
</script>

<style lang="less">
.role-management {
  &__batch {
    overflow: auto;
    padding: 10px 0 25px;
  }

  &__batch-btn {
    margin-right: 10px;
  }

  &__export-btn {
    float: right;
  }

  &__page {
    text-align: right;
    margin: 20px 0 10px;
  }
}
</style>
