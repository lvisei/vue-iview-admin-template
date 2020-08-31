<template>
  <i-card class="query-list" shadow>
    <i-spin size="large" fix v-if="spinShow" />
    <i-form
      class="query-list__search"
      ref="searchForm"
      label-position="right"
      :model="searchValue"
      :rules="searchRule"
      @keydown.enter.native="handleSearch"
      inline
    >
      <i-form-item label="用户名：" :label-width="70" prop="userName">
        <i-input type="text" v-model="searchValue.userName" placeholder="请输入关键字" />
      </i-form-item>
      <i-form-item label="部门：" :label-width="80" prop="department">
        <i-input type="text" v-model="searchValue.department" placeholder="请输入关键字" />
      </i-form-item>
      <i-form-item label="地址：" :label-width="70" prop="areaname">
        <i-input type="text" v-model="searchValue.areaname" placeholder="请输入关键字" />
      </i-form-item>
      <i-form-item class="search-btn" :label-width="20">
        <i-button @click="handleSearch" type="primary">查询</i-button>
      </i-form-item>
      <i-form-item class="search-btn" :label-width="10">
        <i-button @click="handleReset">重置</i-button>
      </i-form-item>
    </i-form>
    <div class="query-list__batch">
      <i-button class="batch-btn" type="primary" icon="md-add" @click="addPaneVisible = true">
        添加用户
      </i-button>
      <i-button
        class="batch-btn"
        type="primary"
        icon="md-trash"
        :disabled="!canBatch"
        @click="onBatch('remove')"
      >
        批量删除
      </i-button>
      <i-button
        class="batch-btn"
        type="primary"
        icon="md-remove-circle"
        :disabled="!canBatch"
        @click="onBatch('disble')"
      >
        批量禁用
      </i-button>
      <i-button class="export-btn" type="primary" icon="md-cloud-download" @click="exportExcel">
        导出为CSV
      </i-button>
    </div>
    <i-table
      ref="table"
      class="query-list__table"
      :loading="tableLoading"
      :columns="columns"
      :data="tableData"
      @on-selection-change="onTableSelectionChange"
    />
    <i-page
      class="query-list__page"
      show-total
      :total="totalCount"
      :page-size="pageSize"
      @on-change="onPageChange"
    />
    <UserAdd
      :modal-visible.sync="addPaneVisible"
      :loading="addSubmitLoading"
      @on-add-submit="onAddSubmit"
    />
    <UserEdit
      :modal-visible.sync="editPaneVisible"
      :user="editorUserData"
      :loading="editSubmitLoading"
      @on-edit-submit="onEditSubmit"
    />
    <UserPassword
      :modal-visible.sync="passwordPaneVisible"
      :name="passwordUsernameData"
      :loading="passwordSubmitLoading"
      @on-edit-submit="onPasswordSubmit"
    />
  </i-card>
</template>

<script>
import tableMixin from './tableMixin'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import UserPassword from './UserPassword'
import {
  getUserListApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
  disbleUserApi
} from '@/api/list-page/queryList'

export default {
  name: 'QueryList',

  mixins: [tableMixin],

  components: {
    UserAdd,
    UserEdit,
    UserPassword
  },

  filters: {},

  props: {},

  data() {
    return {
      spinShow: true,
      searchValue: { userName: '', department: '', areaname: '' },
      searchRule: {
        userName: [{ type: 'string', message: '请输入关键字', trigger: 'blur' }],
        department: [{ type: 'string', message: '请输入关键字', trigger: 'blur' }],
        areaname: [{ type: 'string', message: '请输入关键字', trigger: 'blur' }]
      },
      canBatch: false,
      tableLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      tableData: [],
      tableSelection: [],
      addPaneVisible: false,
      addSubmitLoading: false,
      editPaneVisible: false,
      editSubmitLoading: false,
      editorUserData: {},
      passwordPaneVisible: false,
      passwordSubmitLoading: false,
      passwordUsernameData: ''
    }
  },

  computed: {},

  watch: {},

  created() {
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
    },

    onPageChange(page) {
      this.pageIndex = page
      this.upTableData()
    },

    onTableSelectionChange(selection) {
      this.canBatch = Boolean(selection.length)
      this.tableSelection = selection
    },

    onBatch(type) {
      const usernames = this.tableSelection.map(item => item.username)
      type === 'remove'
        ? this.removeUser(usernames)
        : type === 'disble'
        ? this.disbleUser(usernames)
        : false
    },

    exportExcel() {
      if (this.tableLoading) return false
      this.$refs.table.exportCsv({
        filename: `用户信息.csv`,
        original: false
      })
    },

    onAddSubmit(userInfo) {
      this.addSubmitLoading = true
      addUserApi(userInfo)
        .then(() => {
          this.addPaneVisible = false
          this.$Message.success('添加用户成功~')
          this.upTableData()
        })
        .catch(({ message }) => {
          this.$Message.error(message)
        })
        .finally(() => (this.addSubmitLoading = false))
    },

    editUser(row) {
      this.editorUserData = row
      this.editPaneVisible = true
    },

    onEditSubmit(newUserInfo) {
      this.editSubmitLoading = true
      updateUserApi(newUserInfo)
        .then(() => {
          this.editPaneVisible = false
          this.$Message.success('修改用户信息成功~')
          this.upTableData()

          this.editSubmitLoading = false
        })
        .catch(({ message }) => {
          this.$Message.error(message)
        })
        .finally(() => (this.editSubmitLoading = false))
    },

    changeUserPassword(row) {
      this.passwordUsernameData = row.username
      this.passwordPaneVisible = true
    },

    onPasswordSubmit({ username, oldPassword, newPassword }) {
      this.passwordSubmitLoading = true
      updateUserApi({
        username,
        passwordold: oldPassword,
        password: newPassword
      })
        .then(() => {
          this.$Message.success('修改密码成功~')
          this.passwordPaneVisible = false
        })
        .catch(({ message }) => {
          this.$Message.error(message)
        })
        .finally(() => (this.passwordSubmitLoading = false))
    },

    disbleUser(usernames) {
      this.$Modal.confirm({
        title: `确定禁用用户${usernames}`,
        onOk: () => {
          disbleUserApi({ usernames: [...usernames] })
            .then(res => {
              this.canBatch = false
              this.$Message.success('禁用用户成功~')
              this.upTableData()
            })
            .catch(({ message }) => {
              this.$Message.error(message)
            })
        }
      })
    },

    removeUser(usernames) {
      this.$Modal.confirm({
        title: `确定删除用户${usernames}`,
        onOk: () => {
          deleteUserApi({ usernames: [...usernames] })
            .then(res => {
              this.canBatch = false
              this.$Message.success('删除用户成功~')
              this.upTableData()
            })
            .catch(({ message }) => {
              this.$Message.error(message)
            })
        }
      })
    },

    upTableData() {
      this.tableLoading = !this.spinShow
      return this.getUserList(this.userListParams()).then(({ list, total }) => {
        this.tableData = list
        this.totalCount = total
        this.tableLoading = false
        return { list, total }
      })
    },

    userListParams() {
      return {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        username: this.searchValue.userName,
        department: this.searchValue.department,
        areaname: this.searchValue.areaname
      }
    },

    async getUserList(params) {
      try {
        const data = await getUserListApi(params)
        const {
          list = [],
          pagination: { total }
        } = data
        return { list, total }
      } catch (err) {
        console.log(err) // eslint-disable-line
        return err
      }
    }
  }
}
</script>

<style lang="less">
.query-list {
  &__search {
    padding-top: 20px;
  }

  &__table {
    border: none;

    .ivu-table:after {
      display: none;
    }
  }

  &__batch {
    padding: 10px 0 25px;

    .batch-btn {
      margin-right: 10px;
    }

    .export-btn {
      float: right;
    }
  }

  &__page {
    text-align: right;
    margin: 20px 0 10px;
  }
}
</style>
