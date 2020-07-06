<template>
  <i-modal
    class="menu-edit"
    :value="modalVisible"
    width="800"
    :title="`${isEditMenu ? `编辑菜单:${menu.name}` : '新增菜单'}`"
    @on-cancel="onCancel"
  >
    <i-form
      ref="form"
      :model="formData"
      :rules="formRule"
      :label-width="100"
      @keydown.enter.native="onSubmit"
    >
      <i-form-item label="菜单名称" prop="name">
        <i-input v-model.trim="formData.name" placeholder="请输入菜单名称"></i-input>
      </i-form-item>
      <i-form-item label="上级菜单" prop="parentId">
        <TreeSelect v-model="formData.parentId" :data="menusTree" placeholder="请选择上级菜单" />
      </i-form-item>
      <i-form-item label="显示排序" prop="sequence">
        <i-input-number
          :min="1"
          v-model="formData.sequence"
          placeholder="请输入显示排序"
          style="width: 100%"
        />
      </i-form-item>
      <i-form-item label="组件路径" prop="router">
        <i-input v-model.trim="formData.router" placeholder="请输入组件路径"></i-input>
      </i-form-item>
      <i-form-item label="菜单图标" prop="icon">
        <i-input v-model.trim="formData.icon" placeholder="请选择菜单图标"></i-input>
      </i-form-item>
      <i-form-item label="菜单状态" prop="status">
        <i-radio-group v-model="formData.status">
          <i-radio :label="1">启用</i-radio>
          <i-radio :label="2">禁用</i-radio>
        </i-radio-group>
      </i-form-item>
      <i-form-item label="是否可见" prop="showStatus">
        <i-radio-group v-model="formData.showStatus">
          <i-radio :label="1">可见</i-radio>
          <i-radio :label="2">隐藏</i-radio>
        </i-radio-group>
      </i-form-item>
      <i-form-item label="备注" prop="memo">
        <i-input
          v-model.trim="formData.memo"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="请输入菜单备注"
        ></i-input>
      </i-form-item>
      <i-form-item label="按钮管理">
        <i-table size="small" :columns="btnColumns" :data="formData.actions">
          <template slot-scope="{ row }" slot="name">
            <i-input v-model="row.name" placeholder="请输入按钮名称" />
          </template>
          <template slot-scope="{ row }" slot="code">
            <i-input v-model="row.code" placeholder="请输入权限编号" />
          </template>
          <template slot-scope="{ index }" slot="action">
            <i-button
              type="text"
              size="small"
              style="margin-left: 5px"
              @click="formData.actions.splice(index, 1)"
            >
              删除
            </i-button>
          </template>
        </i-table>
        <i-button
          long
          type="default"
          size="small"
          @click="formData.actions.push({ name: '', code: '' })"
        >
          新增
        </i-button>
      </i-form-item>
    </i-form>
    <div slot="footer">
      <i-button type="text" @click="onCancel">取消</i-button>
      <i-button type="primary" @click="onSubmit" :loading="loading">提交</i-button>
    </div>
  </i-modal>
</template>

<script>
import TreeSelect from '@/components/TreeSelect'
import { getMenu } from '@/api/system-management/menu-management'

export default {
  name: 'MenuEdit',

  components: { TreeSelect },

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
    menu: {
      type: Object,
      default: () => ({})
    },
    menusTree: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      formRule: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        status: [{ required: true, type: 'number', message: '请选择菜单状态', trigger: 'blur' }],
        showStatus: [
          { required: true, type: 'number', message: '请选择菜单是否可见', trigger: 'blur' }
        ]
      },
      formData: {
        name: '',
        parentId: [],
        sequence: null,
        router: '',
        icon: '',
        status: '',
        showStatus: '',
        memo: '',
        actions: []
      },
      btnColumns: [
        {
          title: '按钮名称',
          key: 'name',
          slot: 'name'
        },
        {
          title: '权限编号',
          key: 'code',
          slot: 'code'
        },
        { title: '操作', slot: 'action', width: 100, align: 'center' }
      ]
    }
  },

  computed: {
    isEditMenu() {
      return this.editType === 'edit'
    }
  },

  watch: {
    modalVisible(value) {
      if (value) {
        const { id } = this.menu
        this.isEditMenu && this.getMenuData(id)
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
    getMenuData(id) {
      getMenu(id)
        .then(data => {
          const formData = {
            name: data.name,
            parentId: [data.parentId],
            sequence: data.sequence,
            router: data.router,
            icon: data.icon,
            status: data.status,
            showStatus: data.showStatus,
            memo: data.memo,
            actions: data.actions || []
          }
          this.formData = formData
        })
        .catch(_ => {
          this.$Message.error('获取菜单数据失败')
        })
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = this.formData
          const data = {
            name: formData.name,
            parentId: formData.parentId.length ? formData.parentId[0] : '',
            sequence: formData.sequence,
            router: formData.router,
            icon: formData.icon,
            status: formData.status,
            showStatus: formData.showStatus,
            memo: formData.memo,
            actions: formData.actions
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
