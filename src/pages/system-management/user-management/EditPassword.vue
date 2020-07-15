<template>
  <i-modal
    class="edit-password"
    :title="`重置用户：${user.userName} 密码`"
    :value="modalVisible"
    @on-cancel="onCancel"
  >
    <i-form
      ref="form"
      :model="formData"
      :rules="ruleFrom"
      :label-width="80"
      @keydown.enter.native="onSubmit"
    >
      <i-form-item label="新密码" prop="password">
        <i-input type="password" v-model="formData.password" placeholder="请输入新密码"></i-input>
      </i-form-item>
      <i-form-item label="确认密码" prop="passwdCheck">
        <i-input
          type="password"
          v-model="formData.passwdCheck"
          placeholder="请再次输入新密码"
        ></i-input>
      </i-form-item>
    </i-form>
    <div slot="footer">
      <i-button type="text" @click="onCancel">取消</i-button>
      <i-button type="primary" @click="onSubmit" :loading="loading">提交</i-button>
    </div>
  </i-modal>
</template>

<script>
export default {
  name: 'UserPassword',

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
    user: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      formData: {
        password: '',
        passwdCheck: ''
      },
      ruleFrom: {
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
      }
    }
  },

  computed: {},

  watch: {
    modalVisible(val) {
      if (!val) {
        this.$refs.form.resetFields()
      }
    }
  },

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

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

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('on-edit-submit', this.formData.passwdCheck)
        }
      })
    },

    onCancel() {
      this.$emit('update:modalVisible', false)
    }
  }
}
</script>

<style lang="less"></style>
