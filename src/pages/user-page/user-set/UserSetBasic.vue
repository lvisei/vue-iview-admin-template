<template>
  <div class="us-basic">
    <div class="us-basic__title">基本设置</div>
    <i-form
      class="us-basic__form"
      ref="form"
      :model="formData"
      :rules="ruleValidate"
      @keydown.enter.native="onOk"
    >
      <i-form-item label="中文名" prop="name">
        <i-input v-model="formData.name" placeholder="请输入中文名"></i-input>
      </i-form-item>

      <i-form-item label="部门" prop="department">
        <i-input v-model="formData.department"></i-input>
      </i-form-item>

      <i-form-item label="省市" prop="areaValue">
        <i-cascader
          :data="areaData"
          v-model="formData.areaValue"
          :load-data="loadData"
        ></i-cascader>
      </i-form-item>

      <i-form-item label="电话" prop="phone">
        <i-input v-model="formData.phone" placeholder="请输入电话号码"></i-input>
      </i-form-item>

      <i-form-item label="邮箱" prop="email">
        <i-input v-model="formData.email" placeholder="请输入邮箱"></i-input>
      </i-form-item>

      <i-form-item label="年龄" prop="age">
        <i-input-number v-model="formData.age"></i-input-number>
      </i-form-item>

      <i-form-item label="性别" prop="sex">
        <i-radio-group v-model="formData.sex">
          <i-radio label="1">男</i-radio>
          <i-radio label="2">女</i-radio>
        </i-radio-group>
      </i-form-item>
    </i-form>

    <i-button type="primary" @click="onOk" :loading="editSubmit">更新基本信息</i-button>
  </div>
</template>

<script>
export default {
  name: 'UserSetBasic',

  components: {},

  filters: {},

  props: {},

  data() {
    return {
      editSubmit: false,
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
        name: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
        email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
        department: [{ required: true, message: '请输入部门', trigger: 'change' }],
        areaValue: [{ required: true, type: 'array', message: '请输入省市' }]
      },
      formData: {
        name: 'admin',
        department: '研发部',
        age: 23,
        email: 'antdesign@alipay.com',
        phone: '268222222',
        areaValue: ['hangzhou', 'ali'],
        sex: 1
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    loadData(item, callback) {
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

    onOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = {
            ...this.formData
          }
          this.editSubmit = true
          this.editPane = false
          this.$emit('on-submit', params)
          this.$Message.success('信息更新成功~')
          this.editSubmit = false
        }
      })
    }
  }
}
</script>

<style lang="less">
.us-basic {
  &__title {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__form {
    width: 350px;
    .ivu-form-item-label {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;

      &::before {
        content: '';
      }
    }
  }
}
</style>
