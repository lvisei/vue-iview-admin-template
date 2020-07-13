<template>
  <i-modal
    class="role-edit"
    :value="modalVisible"
    width="800"
    :title="`${isEditRole ? `编辑角色:${role.name}` : '新增角色'}`"
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
      <i-form-item label="备注" prop="memo">
        <i-input
          v-model.trim="formData.memo"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="请输入角色备注"
        ></i-input>
      </i-form-item>
      <i-form-item label="菜单权限">
        <i-table size="small" row-key="id" :columns="roleColumns" :data="menusTree">
          <template slot-scope="{ row }" slot="actions">
            <i-checkbox-group
              :value="formData.roleMenus.map(({ actionId }) => actionId)"
              @on-change="actionIds => onCheckGroupChange(row.id, actionIds)"
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
        sequence: [{ required: true, type: 'number', message: '请输入排序值', trigger: 'blur' }]
      },
      formData: {
        name: '',
        sequence: null,
        memo: '',
        roleMenus: []
      },
      menusTree: [],
      roleColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
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
    onCheckGroupChange(menuId, actionIds) {
      console.log('actionIds: ', actionIds)

      const checkedList = actionIds.map(actionId => ({ actionId, menuId }))
      const checkedOtherList = this.formData.roleMenus.filter(({ menuId }) => menuId !== menuId)
      this.formData.roleMenus = checkedOtherList.concat(checkedList)
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

    getRoleData(id) {
      getRole(id)
        .then(data => {
          const formData = {
            name: data.name,
            sequence: data.sequence,
            memo: data.memo,
            roleMenus: data.roleMenus
          }
          this.formData = formData
        })
        .catch(_ => {
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

<style lang="less" scoped></style>
