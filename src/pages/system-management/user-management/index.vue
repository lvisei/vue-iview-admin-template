<template>
  <i-card class="user-management" shadow>
    <i-spin size="large" fix v-if="spinShow" />
    <i-form
      class="user-management__search"
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
      <i-form-item label="" prop="roleIDs" :label-width="30">
        <i-select
          v-model="searchValue.roleIDs"
          clearable
          filterable
          multiple
          remote
          :remote-method="remoteSearchRoles"
          :loading="searchRolesLoading"
          placeholder="请选择用户"
          @hook:mounted="remoteSearchRoles('')"
          style="width: 300px"
        >
          <Option v-for="(option, index) in roleList" :value="option.id" :key="index">
            {{ option.name }}
          </Option>
        </i-select>
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
    <div class="user-management__batch">
      <i-button class="user-management__batch-btn" type="primary" icon="md-add" @click="handAdd">
        添加用户
      </i-button>
      <!-- <i-button
        class="user-management__batch-btn"
        type="primary"
        icon="md-trash"
        :disabled="!canBatch"
        @click="onBatch('remove')"
      >
        批量删除
      </i-button>
      <i-button
        class="user-management__batch-btn"
        type="primary"
        icon="md-remove-circle"
        :disabled="!canBatch"
        @click="onBatch('disble')"
      >
        批量禁用
      </i-button> -->
      <i-button
        class="user-management__export-btn"
        type="primary"
        icon="md-cloud-download"
        @click="exportExcel"
      >
        导出为CSV
      </i-button>
    </div>
    <i-table
      ref="table"
      class="user-management__table"
      :loading="tableLoading"
      :columns="columns"
      :data="tableData"
    >
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
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
        <i-button type="primary" size="small" @click="handAdd(row)">
          新增
        </i-button>
        <i-button type="info" size="small" style="margin-left: 5px" @click="handEdit(row)">
          编辑
        </i-button>
        <i-poptip
          confirm
          transfer
          :title="`确认${row.status === 1 ? '禁用' : '启用'}这个用户？`"
          @on-ok="handEditStatus(row)"
        >
          <i-button
            :type="row.status === 1 ? 'warning' : 'success'"
            size="small"
            style="margin-left: 5px"
          >
            {{ row.status === 1 ? '禁用' : '启用' }}
          </i-button>
        </i-poptip>

        <i-poptip
          confirm
          transfer
          title="确定删除这个用户？"
          @on-ok="handRemove(row)"
          ok-text="确定"
          cancel-text="取消"
        >
          <i-button type="error" size="small" style="margin-left: 5px">
            删除
          </i-button>
        </i-poptip>
      </template>
    </i-table>
    <i-page
      class="user-management__page"
      show-total
      :total="totalCount"
      :page-size="pageSize"
      @on-change="onPageChange"
    />

    <UserEdit
      :edit-type="editUserType"
      :modal-visible.sync="editUserVisible"
      :user="editorUser"
      :loading="editUserLoading"
      @on-edit-submit="onUserSubmit"
    />
  </i-card>
</template>

<script>
import UserEdit from './UserEdit'
import { getAllRoles } from '@/api/system-management/role-management'
import {
  getUsers,
  addUsers,
  editUsers,
  editUsersStatus,
  deleteUser
} from '@/api/system-management/user-management'

export default {
  name: 'UserManagement',

  components: { UserEdit },

  filters: {},

  props: {},

  data() {
    return {
      spinShow: true,
      searchValue: { queryValue: '', roleIDs: [], status: null },
      searchRolesLoading: false,
      roleList: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      tableLoading: false,
      columns: [
        { title: '登录名称', key: 'userName', slot: 'name' },
        { title: '真实姓名', key: 'realName', slot: 'name' },
        { title: '用户状态', key: 'status', slot: 'status' },
        { title: '邮箱', key: 'email', slot: 'status' },
        { title: '电话号码', key: 'phone', slot: 'status' },
        { title: '创建时间', key: 'createdAt', sortable: true },
        { title: '创建者', key: 'creator' },
        { title: '操作', slot: 'action', width: 250, align: 'center' }
      ],
      tableData: [],
      editUserVisible: false,
      editUserLoading: false,
      editorUser: {},
      editUserType: 'add'
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
    remoteSearchRoles(query) {
      if (query.trim() !== '') {
        this.searchRolesLoading = true
        getAllRoles(query)
          .then(({ list }) => (this.roleList = list))
          .finally(_ => (this.searchRolesLoading = false))
      } else {
        console.log('query: ', query)
        getAllRoles()
          .then(({ list }) => (this.roleList = list))
          .finally(_ => (this.searchRolesLoading = false))
      }
    },

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
        filename: `系统用户.csv`,
        original: false
      })
    },

    handAdd() {
      this.editUserType = 'add'
      this.editUserVisible = true
    },

    handEdit(row) {
      this.editUserType = 'edit'
      this.editorUser = Object.freeze(row)
      this.editUserVisible = true
    },

    onUserSubmit(data) {
      this.editUserLoading = true
      const isAddUser = this.editUserType === 'add'

      if (isAddUser) {
        addUsers(data)
          .then(_ => {
            this.editUserVisible = false
            this.$Message.success('添加成功')
            this.upTableData()
          })
          .catch(_ => {
            this.$Message.error('添加失败')
          })
          .finally(_ => (this.editUserLoading = false))
      } else {
        const { id } = this.editorUser
        editUsers(id, data)
          .then(_ => {
            this.editUserVisible = false
            this.$Message.success('编辑成功')
            this.upTableData()
          })
          .catch(_ => {
            this.$Message.error('编辑失败')
          })
          .finally(_ => (this.editUserLoading = false))
      }
    },

    handRemove({ id }) {
      deleteUser(id)
        .then(_ => {
          this.$Message.success('删除成功')
          this.upTableData()
        })
        .catch(_ => {
          this.$Message.error('删除失败')
        })
    },

    handEditStatus({ id, status }) {
      editUsersStatus(id, status === 1 ? 2 : 1)
        .then(_ => {
          this.$Message.success('编辑成功')
          this.upTableData()
        })
        .catch(_ => {
          this.$Message.error('编辑失败')
        })
    },

    upTableData() {
      this.tableLoading = !this.spinShow
      return this.getUserList().then(({ list, count }) => {
        this.tableData = list
        this.totalCount = count
        this.tableLoading = false
        return { list, count }
      })
    },

    async getUserList() {
      const params = {
        current: this.pageIndex,
        pageSize: this.pageSize,
        queryValue: this.searchValue.queryValue,
        roleIDs: this.searchValue.roleIDs.join(),
        status: this.searchValue.status
      }
      try {
        const data = await getUsers(params)
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
.user-management {
  &__batch {
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
