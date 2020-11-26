<template>
  <i-card class="menu-management" shadow>
    <i-spin size="large" fix v-if="spinShow" />
    <div class="menu-management__content">
      <div class="menu-management__left">
        <div class="menu-management__menu-tool">
          <i-poptip
            confirm
            transfer
            title="确定删除这个菜单？"
            @on-ok="handRemove({ id: searchValue.parentID })"
            ok-text="确定"
            cancel-text="取消"
          >
            <i-button
              :disabled="!$permission('MenuManagement.del') || !searchValue.parentID"
              size="small"
              icon="md-trash"
              style="margin-left: 5px"
            >
              删除
            </i-button>
          </i-poptip>

          <i-button
            :disabled="!$permission('MenuManagement.edit') || !searchValue.parentID"
            size="small"
            icon="md-create"
            style="margin-left: 5px"
            @click="handEdit({ id: searchValue.parentID, name: searchValue.parentName })"
          >
            编辑
          </i-button>
          <i-button
            :disabled="!$permission('MenuManagement.add')"
            size="small"
            icon="md-add"
            type="primary"
            style="margin-left: 5px"
            @click="handAdd({})"
          >
            新增
          </i-button>
        </div>
        <i-tree :data="menusTree" @on-select-change="onTreeSelectChange" />
      </div>
      <div class="menu-management__right">
        <i-form
          class="menu-management__search"
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
          <i-form-item label="" prop="showStatus" :label-width="30">
            <i-select
              clearable
              v-model="searchValue.showStatus"
              placeholder="请选择显示状态"
              style="width: 250px"
            >
              <Option :value="1">显示</Option>
              <Option :value="2">隐藏</Option>
            </i-select>
          </i-form-item>
          <i-form-item :label-width="10">
            <i-button @click="handleSearch" type="primary">查询</i-button>
          </i-form-item>
          <i-form-item :label-width="10">
            <i-button @click="handleReset">重置</i-button>
          </i-form-item>
        </i-form>
        <i-table
          ref="table"
          class="menu-management__table"
          :loading="tableLoading"
          :columns="columns"
          :data="tableData"
        >
          <template slot-scope="{ row }" slot="name">
            <span>{{ row.name }}</span>
          </template>
          <template slot-scope="{ row }" slot="icon">
            <i-icon :type="row.icon" size="18" />
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
              v-permission="'MenuManagement.add'"
              ghost
              type="primary"
              size="small"
              @click="handAdd(row)"
            >
              新增
            </i-button>
            <i-button
              v-permission="'MenuManagement.edit'"
              ghost
              type="info"
              size="small"
              style="margin-left: 5px"
              @click="handEdit(row)"
            >
              编辑
            </i-button>
            <i-poptip
              v-permission="['MenuManagement.disable', 'MenuManagement.enable']"
              confirm
              transfer
              :title="`确认${row.status === 1 ? '禁用' : '启用'}这个菜单？`"
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
              v-permission="'MenuManagement.del'"
              confirm
              transfer
              title="确定删除这个菜单？"
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
          class="menu-management__page"
          show-total
          :total="totalCount"
          :page-size="pageSize"
          @on-change="onPageChange"
        />
      </div>
    </div>
    <MenuEdit
      :edit-type="editMenuType"
      :modal-visible.sync="editMenuVisible"
      :menu="editorMenu"
      :menus-tree="menusTree"
      :loading="editMenuLoading"
      @on-edit-submit="onEditSubmit"
    />
  </i-card>
</template>

<script>
import MenuEdit from './MenuEdit'
import {
  getMenus,
  getMenusTree,
  addMenus,
  editMenus,
  editMenusStatus,
  deleteMenu
} from '@/api/system-management/menu-management'
import { formatMenusTree } from '../helpers'

export default {
  name: 'MenuManagement',

  components: { MenuEdit },

  filters: {},

  props: {},

  data() {
    return {
      spinShow: true,
      searchValue: { queryValue: '', status: null, showStatus: null, parentID: '', parentName: '' },
      menusTree: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      tableLoading: false,
      columns: [
        { title: '菜单名称', key: 'name', minWidth: 100, slot: 'name' },
        { title: '菜单图标', key: 'icon', minWidth: 100, slot: 'icon', align: 'center' },
        { title: '访问地址', key: 'routePath', width: 180 },
        { title: '状态', key: 'status', minWidth: 80, slot: 'status' },
        { title: '可见', key: 'showStatus', minWidth: 80, slot: 'showStatus' },
        { title: '排序值', key: 'sequence', minWidth: 100, sortable: true },
        { title: '创建时间', key: 'createdAt', sortable: true, width: 170 },
        { title: '创建者', key: 'creator', width: 100, ellipsis: true, tooltip: true },
        { title: '备注', key: 'memo', ellipsis: true, tooltip: true },
        { title: '操作', slot: 'action', width: 230, align: 'center' }
      ],
      tableData: [],
      editMenuVisible: false,
      editMenuLoading: false,
      editorMenu: {},
      editMenuType: 'add'
    }
  },

  computed: {},

  watch: {},

  created() {
    this.spinShow = false
    this.getMenusTree()
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
        filename: `系统菜单.csv`,
        original: false
      })
    },

    onTreeSelectChange(_, { id, name, selected }) {
      this.searchValue.parentID = selected ? id : ''
      this.searchValue.parentName = selected ? name : ''
      this.pageIndex = 1
      this.upTableData()
    },

    handAdd() {
      this.editMenuType = 'add'
      this.editMenuVisible = true
    },

    handEdit(row) {
      this.editMenuType = 'edit'
      this.editorMenu = Object.freeze(row)
      this.editMenuVisible = true
    },

    onEditSubmit(data) {
      this.editMenuLoading = true
      const isAddMenu = this.editMenuType === 'add'

      if (isAddMenu) {
        addMenus(data)
          .then(() => {
            this.editMenuVisible = false
            this.$Message.success('添加成功')
            this.upTableData()
            this.getMenusTree()
          })
          .catch(() => {
            this.$Message.error('添加失败')
          })
          .finally(() => (this.editMenuLoading = false))
      } else {
        const { id } = this.editorMenu
        editMenus(id, data)
          .then(() => {
            this.editMenuVisible = false
            this.$Message.success('编辑成功')
            this.upTableData()
            this.getMenusTree()
          })
          .catch(() => {
            this.$Message.error('编辑失败')
          })
          .finally(() => (this.editMenuLoading = false))
      }
    },

    handRemove({ id }) {
      deleteMenu(id)
        .then(() => {
          this.$Message.success('删除成功')
          this.upTableData()
          this.getMenusTree()
        })
        .catch(() => {
          this.$Message.error('删除失败')
        })
    },

    handEditStatus({ id, status }) {
      editMenusStatus(id, status === 1 ? 2 : 1)
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
      return this.getMenuList().then(({ list, total }) => {
        this.tableData = list.map(item =>
          Object.assign(item, { createdAt: this.$utils.getFormatDate(item.createdAt) })
        )
        this.totalCount = total
        this.tableLoading = false
        return { list, total }
      })
    },

    async getMenusTree() {
      try {
        const data = await getMenusTree()
        const { list = [] } = data
        this.menusTree = Object.freeze(formatMenusTree(list, 'name'))
      } catch (err) {
        new Error(err)
      }
    },

    async getMenuList() {
      const params = {
        current: this.pageIndex,
        pageSize: this.pageSize,
        parentID: this.searchValue.parentID || undefined,
        queryValue: this.searchValue.queryValue,
        status: this.searchValue.status,
        showStatus: this.searchValue.showStatus
      }
      try {
        const data = await getMenus(params)
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
.menu-management {
  .ivu-tree-title {
    width: 90%;
  }

  &__menu-tool {
    margin-bottom: 30px;
  }

  &__content {
    display: flex;
  }

  &__left {
    padding: 20px 10px;
    border: 1px solid #4a506621;
    border-radius: 2px;
    margin-right: 30px;
    flex: 0 0 250px;
  }

  &__right {
    padding: 20px;
    border: 1px solid #4a506621;
    border-radius: 2px;
    flex: 1;
    overflow: hidden;
  }

  &__page {
    text-align: right;
    margin: 20px 0 10px;
  }
}
</style>
