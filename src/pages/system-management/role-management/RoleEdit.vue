<template>
  <i-modal
    class="role-edit"
    :value="modalVisible"
    width="800"
    :title="`${isEditRole ? `编辑角色：${role.name}` : '新增角色'}`"
    @on-cancel="onCancel"
  >
    <i-form
      ref="form"
      :model="formData"
      :rules="formRule"
      :label-width="100"
      @keydown.enter.native="onSubmit"
    >
      <i-form-item label="角色名称" prop="name">
        <i-input v-model.trim="formData.name" placeholder="请输入角色名称"></i-input>
      </i-form-item>
      <i-form-item label="显示排序" prop="sequence">
        <i-input-number
          :min="1"
          v-model="formData.sequence"
          placeholder="请输入显示排序"
          style="width: 100%"
        />
      </i-form-item>
      <i-form-item label="角色状态" prop="status">
        <i-radio-group v-model="formData.status">
          <i-radio :label="1">启用</i-radio>
          <i-radio :label="2">禁用</i-radio>
        </i-radio-group>
      </i-form-item>
      <i-form-item label="备注" prop="memo">
        <i-input
          v-model.trim="formData.memo"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="请输入角色备注"
        ></i-input>
      </i-form-item>
      <i-form-item class="role-edit__menus" label="菜单权限" prop="roleMenus">
        <i-table
          border
          size="small"
          row-key="id"
          :indent-size="10"
          :columns="roleColumns"
          :data="menusTree"
        >
          <template slot-scope="{ row }" slot="selection">
            <i-checkbox
              :value="checkedMenuIds.includes(row.id)"
              @on-change="check => onCheckMenuChange(check, row)"
            />
          </template>
          <template slot-scope="{ row }" slot="actions">
            <i-checkbox-group
              v-if="row.actions"
              :value="
                checkedActions.filter(
                  actionId => row.actions.findIndex(({ id }) => id === actionId) !== -1
                )
              "
              @on-change="actionIds => onCheckActionChange(row, actionIds)"
            >
              <i-checkbox :label="item.id" v-for="item in row.actions" :key="item.id">
                {{ item.name }}
              </i-checkbox>
            </i-checkbox-group>
          </template>
        </i-table>
      </i-form-item>
    </i-form>
    <div slot="footer">
      <i-button type="text" @click="onCancel">取消</i-button>
      <i-button type="primary" @click="onSubmit" :loading="loading">提交</i-button>
    </div>
  </i-modal>
</template>

<script>
import { getMenusTree } from '@/api/system-management/menu-management'
import { getRole } from '@/api/system-management/role-management'
import { getChildrenRoleMenus } from './helper'
import { formatMenusTree } from '../helpers'

export default {
  name: 'RoleEdit',

  components: {},

  filters: {},

  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    editType: {
      type: String,
      required: true,
      validator: value => ['edit', 'add'].indexOf(value) !== -1
    },
    role: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      formRule: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        sequence: [{ required: true, type: 'number', message: '请输入排序值', trigger: 'blur' }],
        status: [{ required: true, type: 'number', message: '请选择角色状态', trigger: 'change' }],
        roleMenus: [{ required: true, type: 'array', message: '请选择菜单权限' }]
      },
      formData: {
        name: '',
        sequence: null,
        status: '',
        memo: '',
        roleMenus: []
      },
      menusTree: [],
      roleColumns: [
        {
          width: 60,
          slot: 'selection'
        },
        {
          title: '菜单名称',
          key: 'name',
          tree: true
        },
        {
          title: '按钮权限',
          key: 'actions',
          slot: 'actions'
        }
      ]
    }
  },

  computed: {
    isEditRole() {
      return this.editType === 'edit'
    },

    checkedMenuIds() {
      return this.formData.roleMenus.map(({ menuId }) => menuId)
    },

    checkedActions() {
      return this.formData.roleMenus.map(({ actionId }) => actionId)
    }
  },

  watch: {
    modalVisible(value) {
      if (value) {
        const { id } = this.role
        this.isEditRole && this.getRoleData(id)
        this.menusTree.length || this.getMenusTree()
      } else {
        this.$refs.form.resetFields()
      }
    }
  },

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    onCheckMenuChange(check, { id: menuId, actions, children }) {
      if (check) {
        const checkedList = actions
          ? actions.map(({ id: actionId }) => ({ actionId, menuId }))
          : [{ menuId }]
        const checkedOtherList = this.formData.roleMenus.filter(({ menuId: id }) => id !== menuId)
        const checkedChildrenList = children ? getChildrenRoleMenus(children) : []

        this.formData.roleMenus = [...checkedOtherList, ...checkedChildrenList, ...checkedList]
      } else {
        const childrenMenus = (children ? getChildrenRoleMenus(children) : []).map(
          ({ menuId }) => menuId
        )
        const checkedOtherList = this.formData.roleMenus
          .filter(({ menuId: id }) => id !== menuId)
          .filter(({ menuId: id }) => !childrenMenus.includes(id))
        this.formData.roleMenus = checkedOtherList
      }
    },

    onCheckActionChange({ id: menuId }, actionIds) {
      const checkedList = actionIds.length
        ? actionIds.map(actionId => ({ actionId, menuId }))
        : [{ menuId }]
      const checkedOtherList = this.formData.roleMenus.filter(({ menuId: id }) => id !== menuId)
      this.formData.roleMenus = checkedOtherList.concat(checkedList)
    },

    async getMenusTree() {
      try {
        const data = await getMenusTree()
        const { list = [] } = data
        this.menusTree = Object.freeze(formatMenusTree(list, 'name', { _showChildren: true }))
      } catch (err) {
        new Error(err)
      }
    },

    getRoleData(id) {
      getRole(id)
        .then(data => {
          const formData = {
            name: data.name,
            sequence: data.sequence,
            status: data.status,
            memo: data.memo,
            roleMenus: data.roleMenus
          }
          this.formData = formData
        })
        .catch(() => {
          this.$Message.error('获取角色数据失败')
        })
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = this.formData
          const data = {
            name: formData.name,
            sequence: formData.sequence,
            status: formData.status,
            memo: formData.memo,
            roleMenus: formData.roleMenus
          }
          this.$emit('on-edit-submit', data)
        }
      })
    },

    onCancel() {
      this.$emit('update:modalVisible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.role-edit {
  &__menus {
    /deep/ .ivu-form-item-label {
      float: none;
      display: inline-block;
      padding: 0 0 10px;
    }

    /deep/ .ivu-form-item-content {
      margin-left: 30px !important;
    }
  }
}
</style>
