<template>
  <i-modal
    class="menu-edit"
    :value="modalVisible"
    width="800"
    :title="`${isEditMenu ? `编辑菜单：${menu.name}` : '新增菜单'}`"
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
      <i-form-item label="路由名称" prop="routeName">
        <span slot="label">
          路由名称
        </span>
        <i-input v-model.trim="formData.routeName" placeholder="请输入组件名称">
          <i-tooltip
            slot="suffix"
            transfer
            max-width="500"
            content="路由名称应保持唯一值，路由切换与模块权限集成时使用，ExampleDemo"
          >
            <i-icon type="ios-help-circle-outline" />
          </i-tooltip>
        </i-input>
      </i-form-item>
      <i-form-item label="路由地址" prop="routePath">
        <i-input v-model.trim="formData.routePath" placeholder="请输入路由地址">
          <i-tooltip slot="suffix" transfer max-width="500" content="URL子路径，/example">
            <i-icon type="ios-help-circle-outline" />
          </i-tooltip>
        </i-input>
      </i-form-item>
      <i-form-item label="组件路径" prop="component">
        <i-input v-model.trim="formData.component" placeholder="请输入组件路径">
          <i-tooltip slot="suffix" transfer max-width="500" content="路由组件路径，/example-demo">
            <i-icon type="ios-help-circle-outline" />
          </i-tooltip>
        </i-input>
      </i-form-item>
      <i-form-item label="菜单图标" prop="icon">
        <i-select v-model="formData.icon" filterable placeholder="请选择菜单图标">
          <i-icon :type="formData.icon" slot="prefix" size="18" />
          <i-option v-for="item in iconList" :value="item" :key="item">
            <i-icon :type="item" size="20" />
            {{ item }}
          </i-option>
        </i-select>
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
      <i-form-item class="menu-edit__actions" label="按钮管理">
        <i-table border size="small" :columns="btnColumns" :data="formData.actions">
          <template slot-scope="{ index }" slot="name">
            <i-input
              v-model="formData.actions[index].name"
              size="small"
              placeholder="请输入按钮名称"
            />
          </template>
          <template slot-scope="{ index }" slot="code">
            <i-input
              v-model="formData.actions[index].code"
              size="small"
              placeholder="请输入权限编号"
            />
          </template>
          <template slot-scope="{ index }" slot="resources">
            <i-select
              v-model="formData.actions[index].resources"
              multiple
              transfer
              filterable
              :max-tag-count="1"
              size="small"
              placeholder="请选择按钮资源"
            >
              <i-option-group v-for="item in resourceList" :label="item.group" :key="item.group">
                <i-option v-for="resource in item.children" :value="resource.id" :key="resource.id">
                  {{ `${item.group} : ${resource.description || resource.method}` }}
                </i-option>
              </i-option-group>
            </i-select>
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
          @click="formData.actions.push({ name: '', code: '', resources: [] })"
        >
          新增
        </i-button>
      </i-form-item>

      <i-form-item class="menu-edit__resources" label="资源管理">
        <i-select
          v-model="formData.resources"
          multiple
          filterable
          :max-tag-count="3"
          placeholder="请选择菜单资源"
        >
          <i-option-group v-for="item in resourceList" :label="item.group" :key="item.group">
            <i-option v-for="resource in item.children" :value="resource.id" :key="resource.id">
              {{ `${item.group} : ${resource.description || resource.method}` }}
            </i-option>
          </i-option-group>
        </i-select>
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
import { ICONS } from './helper'
import { getMenu } from '@/api/system-management/menu-management'
import { getAllResources } from '@/api/system-management/resource-management'

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
        sequence: [{ required: true, type: 'number', message: '请输入排序值', trigger: 'blur' }],
        status: [{ required: true, type: 'number', message: '请选择菜单状态', trigger: 'blur' }],
        showStatus: [
          { required: true, type: 'number', message: '请选择菜单是否可见', trigger: 'change' }
        ]
      },
      formData: {
        name: '',
        parentId: '',
        sequence: null,
        routeName: '',
        routePath: '',
        component: '',
        icon: '',
        status: '',
        showStatus: '',
        memo: '',
        actions: [],
        resources: []
      },
      btnColumns: [
        {
          title: '按钮名称',
          width: 130,
          key: 'name',
          slot: 'name'
        },
        {
          title: '权限编号',
          width: 110,
          key: 'code',
          slot: 'code'
        },
        {
          title: '资源',
          minWidth: 180,
          key: 'resources',
          slot: 'resources'
        },
        { title: '操作', slot: 'action', width: 100, align: 'center' }
      ],
      iconList: Object.freeze(ICONS),
      resourceList: []
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
        this.getAllResources()
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
            parentId: data.parentId,
            sequence: data.sequence,
            routeName: data.routeName,
            routePath: data.routePath,
            component: data.component,
            icon: data.icon,
            status: data.status,
            showStatus: data.showStatus,
            memo: data.memo,
            actions: data.actions
              ? data.actions.map(item =>
                  Object.assign(item, {
                    resources: item.resources
                      ? item.resources.map(({ resourceId }) => resourceId)
                      : []
                  })
                )
              : [],
            resources: data.resources ? data.resources.map(({ resourceId }) => resourceId) : []
          }
          this.formData = formData
        })
        .catch(() => {
          this.$Message.error('获取菜单数据失败')
        })
    },

    getAllResources() {
      if (this.resourceList.length) return
      getAllResources().then(({ list }) => {
        const groupMap = {}
        list.forEach(item => {
          if (groupMap[item.group]) {
            groupMap[item.group].push(item)
          } else {
            groupMap[item.group] = [item]
          }
        })
        this.resourceList = Object.keys(groupMap).map(group => ({
          group,
          children: groupMap[group]
        }))
      })
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = this.formData
          const data = {
            name: formData.name,
            parentId: formData.parentId,
            sequence: formData.sequence,
            routeName: formData.routeName,
            routePath: formData.routePath,
            component: formData.component,
            icon: formData.icon,
            status: formData.status,
            showStatus: formData.showStatus,
            memo: formData.memo,
            actions: formData.actions.map(item =>
              Object.assign({}, item, {
                resources: item.resources.map(resourceId => ({ resourceId }))
              })
            ),
            resources: formData.resources.map(resourceId => ({ resourceId }))
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
.menu-edit {
  &__actions {
    /deep/ .ivu-form-item-label {
      float: none;
      display: inline-block;
      // padding: 0 0 10px;
    }

    /deep/ .ivu-form-item-content {
      margin-left: 30px !important;
    }
  }
}
</style>
