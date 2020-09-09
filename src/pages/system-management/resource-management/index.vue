<template>
  <div class="resource-management">
    <i-card class="resource-management" shadow>
      <i-spin size="large" fix v-if="spinShow" />
      <div class="resource-management__content">
        <i-form
          class="resource-management__search"
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
          <i-form-item :label-width="10">
            <i-button @click="handleSearch" type="primary">查询</i-button>
          </i-form-item>
          <i-form-item :label-width="10">
            <i-button @click="handleReset">重置</i-button>
          </i-form-item>
        </i-form>
        <div class="resource-management__batch">
          <i-button
            v-permission="'ResourceManagement.add'"
            class="resource-management__batch-btn"
            type="primary"
            icon="md-add"
            @click="handAdd"
          >
            添加资源组
          </i-button>
          <i-button
            class="resource-management__export-btn"
            type="primary"
            icon="md-cloud-download"
            @click="exportExcel"
          >
            导出为CSV
          </i-button>
        </div>
        <i-table
          ref="table"
          class="resource-management__table"
          row-key="id"
          :loading="tableLoading"
          :columns="columns"
          :data="tableData"
        >
          <template slot-scope="{ row }" slot="icon">
            <i-icon :type="row.icon" size="18" />
          </template>
          <template slot-scope="{ row }" slot="action">
            <i-button
              v-if="row.children"
              v-permission="'ResourceManagement.add'"
              ghost
              type="primary"
              size="small"
              @click="handAdd(row)"
            >
              新增
            </i-button>
            <template v-else>
              <i-button
                v-permission="'ResourceManagement.edit'"
                ghost
                type="info"
                size="small"
                style="margin-left: 5px"
                @click="handEdit(row)"
              >
                编辑
              </i-button>
              <i-poptip
                v-permission="'ResourceManagement.del'"
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
          </template>
        </i-table>
        <i-page
          class="resource-management__page"
          show-total
          :total="totalCount"
          :page-size="pageSize"
          @on-change="onPageChange"
        />
      </div>

      <ResourceEdit
        :edit-type="editResourceType"
        :modal-visible.sync="editResourceVisible"
        :resource="editorResource"
        :loading="editResourceLoading"
        @on-edit-submit="onEditSubmit"
      />
    </i-card>
  </div>
</template>

<script>
import ResourceEdit from './ResourceEdit'
import {
  getResources,
  getAllResources,
  addResource,
  editResource,
  deleteResource
} from '@/api/system-management/resource-management'
import { formatResourcesTree } from './helper'

export default {
  name: 'ResourceManagement',

  components: { ResourceEdit },

  filters: {},

  data() {
    return {
      spinShow: true,
      searchValue: { queryValue: '' },
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      tableLoading: false,
      columns: [
        { title: '资源组', key: 'group', tree: true },
        { title: '请求方式', key: 'method', width: 150 },
        { title: '请求路径', key: 'path' },
        { title: '资源描述', key: 'description', ellipsis: true },
        { title: '创建时间', key: 'createdAt', sortable: true, width: 170 },
        { title: '操作', slot: 'action', width: 150, align: 'center' }
      ],
      tableData: [],
      editResourceVisible: false,
      editResourceLoading: false,
      editorResource: {},
      editResourceType: 'add'
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

  beforeDestroy() {},

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
        filename: `系统资源.csv`,
        original: false
      })
    },

    handAdd({ group }) {
      this.editResourceType = 'add'
      this.editorResource = Object.freeze({ group })
      this.editResourceVisible = true
    },

    handEdit(row) {
      this.editResourceType = 'edit'
      this.editorResource = Object.freeze(row)
      this.editResourceVisible = true
    },

    onEditSubmit(data) {
      this.editResourceLoading = true
      const isAddResource = this.editResourceType === 'add'

      if (isAddResource) {
        addResource(data)
          .then(() => {
            this.editResourceVisible = false
            this.$Message.success('添加成功')
            this.upTableData()
          })
          .catch(({ message = '添加失败' }) => {
            this.$Message.error(message)
          })
          .finally(() => (this.editResourceLoading = false))
      } else {
        const { id } = this.editorResource
        editResource(id, data)
          .then(() => {
            this.editResourceVisible = false
            this.$Message.success('编辑成功')
            this.upTableData()
          })
          .catch(({ message = '编辑失败' }) => {
            this.$Message.error(message)
          })
          .finally(() => (this.editResourceLoading = false))
      }
    },

    handRemove({ id }) {
      deleteResource(id)
        .then(() => {
          this.$Message.success('删除成功')
          this.upTableData()
        })
        .catch(() => {
          this.$Message.error('删除失败')
        })
    },

    upTableData() {
      this.tableLoading = !this.spinShow
      return this.getResourcesTree().then(resourceTree => {
        resourceTree.length && (resourceTree[0]._showChildren = true)
        this.tableData = resourceTree
        this.tableLoading = false
        return resourceTree
      })
      // return this.getResourceList().then(({ list, total }) => {
      //   this.tableData = list.map(item =>
      //     Object.assign(item, { createdAt: this.$utils.getFormatDate(item.createdAt) })
      //   )
      //   this.totalCount = total
      //   this.tableLoading = false
      //   return { list, total }
      // })
    },

    async getResourcesTree() {
      const queryValue = this.searchValue.queryValue
      try {
        const data = await getAllResources(queryValue)
        const { list = [] } = data
        const resourceTree = Object.freeze(
          formatResourcesTree(
            list.map(item =>
              Object.assign(item, { createdAt: this.$utils.getFormatDate(item.createdAt) })
            )
          )
        )
        return resourceTree
      } catch (err) {
        new Error(err)
      }
    },

    async getResourceList() {
      const params = {
        current: this.pageIndex,
        pageSize: this.pageSize,
        parentID: this.searchValue.parentID || undefined,
        queryValue: this.searchValue.queryValue,
        status: this.searchValue.status,
        showStatus: this.searchValue.showStatus
      }
      try {
        const data = await getResources(params)
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
.resource-management {
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
