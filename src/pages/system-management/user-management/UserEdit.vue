<template>
  <i-modal
    class="user-edit"
    :value="modalVisible"
    width="800"
    :title="`${isEditUser ? `编辑用户：${user.userName}` : '新增用户'}`"
    @on-cancel="onCancel"
  >
    <i-form
      ref="form"
      :model="formData"
      :rules="formRule"
      :label-width="100"
      @keydown.enter.native="onSubmit"
    >
      <i-form-item label="登录名称" prop="userName">
        <i-input v-model.trim="formData.userName" placeholder="请输入登录名称"></i-input>
      </i-form-item>
      <i-form-item label="真实姓名" prop="realName">
        <i-input v-model.trim="formData.realName" placeholder="请输入真实姓名"></i-input>
      </i-form-item>
      <i-form-item label="所属角色" prop="userRoles">
        <i-select
          v-model="formData.userRoles"
          clearable
          filterable
          multiple
          remote
          :remote-method="remoteSearchRoles"
          :loading="searchRolesLoading"
          placeholder="请选择角色"
          @hook:mounted="remoteSearchRoles('')"
        >
          <i-option v-for="(option, index) in roleList" :value="option.id" :key="index">
            {{ option.name }}
          </i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="用户状态" prop="status">
        <i-radio-group v-model="formData.status">
          <i-radio :label="1">启用</i-radio>
          <i-radio :label="2">禁用</i-radio>
        </i-radio-group>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model.trim="formData.email" placeholder="请输入邮箱"></i-input>
      </i-form-item>
      <i-form-item label="电话号码" prop="phone">
        <i-input v-model.trim="formData.phone" placeholder="请输入电话号码"></i-input>
      </i-form-item>
      <template v-if="!isEditUser">
        <i-form-item label="登录密码" prop="password">
          <i-input
            type="password"
            v-model="formData.password"
            placeholder="请输入登录密码"
          ></i-input>
        </i-form-item>
        <i-form-item label="确认密码" prop="passwdCheck">
          <i-input
            type="password"
            v-model="formData.passwdCheck"
            placeholder="请再次输入登录密码"
          ></i-input>
        </i-form-item>
      </template>
    </i-form>
    <div slot="footer">
      <i-button type="text" @click="onCancel">取消</i-button>
      <i-button type="primary" @click="onSubmit" :loading="loading">提交</i-button>
    </div>
  </i-modal>
</template>

<script>
import { getAllRoles } from '@/api/system-management/role-management'
import { getUser } from '@/api/system-management/user-management'

export default {
  name: 'UserEdit',

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
    user: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      formRule: {
        userName: [{ required: true, message: '请输入登录名称', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        status: [{ required: true, type: 'number', message: '请选择用户状态', trigger: 'change' }],
        userRoles: [{ required: true, type: 'array', message: '请选择所属角色' }],
        email: [{ type: 'email', message: '输入的邮箱格式不正确' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            message: '密码不能小于六位多余十八未',
            min: 6,
            max: 18,
            trigger: 'blur'
          },
          { validator: this.validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            message: '密码不能小于六位多余十八未',
            min: 6,
            max: 18,
            trigger: 'blur'
          },
          { validator: this.validatePassCheck, trigger: 'blur' }
        ]
      },
      formData: {
        userName: '',
        realName: '',
        status: '',
        userRoles: [],
        email: '',
        phone: '',
        password: '',
        passwdCheck: ''
      },
      roleList: [],
      searchRolesLoading: false
    }
  },

  computed: {
    isEditUser() {
      return this.editType === 'edit'
    }
  },

  watch: {
    modalVisible(value) {
      if (value) {
        const { id } = this.user
        this.isEditUser && this.getUserData(id)
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
    validatePass(rule, value, callback) {
      if (this.formData.passwdCheck !== '') this.$refs.form.validateField('passwdCheck')
      callback()
    },

    validatePassCheck(rule, value, callback) {
      if (value !== this.formData.password) {
        callback(new Error('两次输入不一致！'))
      } else {
        callback()
      }
    },

    getUserData(id) {
      getUser(id)
        .then(data => {
          const formData = {
            userName: data.userName,
            realName: data.realName,
            status: data.status,
            memo: data.memo,
            email: data.email,
            phone: data.phone,
            userRoles: data.userRoles.map(({ roleId }) => roleId)
          }
          this.formData = formData
        })
        .catch(() => {
          this.$Message.error('获取用户数据失败')
        })
    },

    remoteSearchRoles(query) {
      if (query.trim() !== '') {
        this.searchRolesLoading = true
        getAllRoles(query)
          .then(({ list }) => (this.roleList = list))
          .finally(() => (this.searchRolesLoading = false))
      } else {
        getAllRoles()
          .then(({ list }) => (this.roleList = list))
          .finally(() => (this.searchRolesLoading = false))
      }
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = this.formData
          const data = {
            userName: formData.userName,
            realName: formData.realName,
            status: formData.status,
            memo: formData.memo,
            email: formData.email,
            phone: formData.phone,
            userRoles: formData.userRoles.map(roleId => ({ roleId })),
            password: this.isEditUser ? '' : formData.password
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
// .user-edit {}
</style>
