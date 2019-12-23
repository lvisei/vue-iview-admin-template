<template>
  <i-modal
    class="lp-user-edit"
    :value="modalVisible"
    width="800"
    :title="`编辑用户:${user.username}`"
    @on-cancel="onCancel"
  >
    <i-form
      ref="form"
      :model="formData"
      :rules="ruleValidate"
      :label-width="100"
      @keydown.enter.native="onOk"
      inline
    >
      <i-form-item label="登录名" prop="username">
        <i-input v-model.trim="formData.username" disabled></i-input>
      </i-form-item>
      <i-form-item label="部门" prop="department">
        <i-input v-model.trim="formData.department"></i-input>
      </i-form-item>
      <i-form-item label="用户名" prop="name">
        <i-input v-model.trim="formData.name" placeholder="请输入用户名"></i-input>
      </i-form-item>
      <i-form-item label="年龄" prop="age">
        <i-input-number v-model="formData.age"></i-input-number>
      </i-form-item>
      <i-form-item label="地区" prop="areacode">
        <i-cascader
          :data="areaData"
          v-model="formData.areacode"
          :load-data="loadArea"
          :render-format="cascaderFormat"
          @on-change="onCascaderChange"
          change-on-select
        ></i-cascader>
      </i-form-item>
      <i-form-item label="性别" prop="sex">
        <i-radio-group v-model="formData.sex">
          <i-radio :label="1">男</i-radio>
          <i-radio :label="2">女</i-radio>
        </i-radio-group>
      </i-form-item>
      <i-form-item label="电话" prop="phone">
        <i-input type="tel" v-model.trim="formData.phone" placeholder="请输入电话号码"></i-input>
      </i-form-item>
      <i-form-item label="用户状态" prop="state">
        <i-radio-group v-model="formData.state">
          <i-radio :label="0">可以</i-radio>
          <i-radio :label="1">禁用</i-radio>
        </i-radio-group>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input type="email" v-model.trim="formData.email" placeholder="请输入邮箱"></i-input>
      </i-form-item>
    </i-form>
    <div slot="footer">
      <i-button type="text" @click="onCancel">取消</i-button>
      <i-button type="primary" @click="onOk" :loading="loading">提交</i-button>
    </div>
  </i-modal>
</template>

<script>
export default {
  name: 'UserEdit',

  components: {},

  filters: {},

  props: {
    user: {
      type: Object,
      required: true
    },
    modalVisible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      areaData: [
        {
          value: 'beijing',
          label: '北京',
          children: [],
          loading: false
        },
        {
          value: 'hangzhou',
          label: '杭州',
          children: [],
          loading: false
        }
      ],
      ruleValidate: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        username: [{ required: true }],
        email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
        department: [{ required: true, message: '请输入部门', trigger: 'change' }],
        areacode: [{ required: true, type: 'array', message: '请输入行政区域' }],
        state: [{ required: true, type: 'number', message: '请选择用户状态', trigger: 'change' }]
      }
    }
  },

  computed: {
    formData() {
      return {
        name: this.user.name,
        username: this.user.username,
        department: this.user.department,
        age: this.user.age || null,
        email: this.user.email,
        phone: this.user.phone,
        areacode: this.user.areacode || [],
        areaname: this.user.areaname,
        sex: this.user.sex,
        state: this.user.state
      }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    loadArea(item, callback) {
      item.loading = true
      setTimeout(() => {
        if (item.value === 'beijing') {
          item.children = [
            {
              value: 'talkingdata',
              label: 'TalkingData'
            },
            {
              value: 'baidu',
              label: '百度'
            },
            {
              value: 'sina',
              label: '新浪'
            }
          ]
        } else if (item.value === 'hangzhou') {
          item.children = [
            {
              value: 'ali',
              label: '阿里巴巴'
            },
            {
              value: '163',
              label: '网易'
            }
          ]
        }
        item.loading = false
        callback()
      }, 1000)
    },

    cascaderFormat(label) {
      return label.join('')
    },

    onCascaderChange(value, selectedData) {
      this.formData.areaname = selectedData.map(item => item.label).join('')
    },

    onOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('on-edit-submit', {
            name: this.formData.name,
            username: this.formData.username,
            age: this.formData.age,
            areacode: this.formData.areacode[this.formData.areacode.length - 1],
            areaname: this.formData.areaname,
            email: this.formData.email,
            department: this.formData.department,
            state: this.formData.state,
            phone: this.formData.phone,
            sex: this.formData.sex
          })
        }
      })
    },

    onCancel() {
      this.$emit('update:modalVisible', false)
    }
  }
}
</script>

<style lang="less">
.lp-user-edit {
  .ivu-form.ivu-form-inline {
    .ivu-form-item {
      margin-right: 0;
      padding-right: 20px;
      width: 50%;
    }
  }
}
</style>
