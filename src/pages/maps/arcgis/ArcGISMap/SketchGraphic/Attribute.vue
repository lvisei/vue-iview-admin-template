<template>
  <div class="sketch-graphic-attribute">
    <div class="sketch-graphic-attribute__header">图斑属性编辑</div>
    <div class="sketch-graphic-attribute__content">
      <i-form ref="form" :model="formData">
        <i-row v-for="(item, index) in formData.attributeList" :key="index">
          <i-col span="10">
            <i-form-item
              :prop="`attributeList.${index}.fieldName`"
              :rules="[{ required: true, message: '属性名不能为空', trigger: 'blur' }]"
            >
              <i-input
                v-model.trim="item.fieldName"
                size="default"
                placeholder="请输入属性名"
              ></i-input>
            </i-form-item>
            <!-- <i-input v-model="item.fieldName" size="small" placeholder="属性名" /> -->
          </i-col>
          <i-col span="10" offset="1">
            <i-form-item
              :prop="`attributeList.${index}.value`"
              :rules="[{ required: true, message: '属性值不能为空', trigger: 'blur' }]"
            >
              <i-input
                v-model.trim="item.value"
                size="default"
                placeholder="请输入属性值"
              ></i-input>
            </i-form-item>
            <!-- <i-input v-model="item.value" size="small" placeholder="属性值" /> -->
          </i-col>
          <i-col span="1" offset="1">
            <i-form-item>
              <i-button
                v-if="index === 0"
                type="dashed"
                size="small"
                icon="md-add"
                style="margin-left: 0px"
                @click="formData.attributeList.push({ fieldName: '', value: '' })"
              ></i-button>
              <i-button
                v-else
                type="dashed"
                size="small"
                icon="md-close"
                @click="formData.attributeList.splice(index, 1)"
              ></i-button>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </div>
    <div class="sketch-graphic-attribute__controls">
      <button class="sketch-graphic-attribute__controls-btn" @click="handSave">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SketchGraphicAttribute',

  inject: ['view'],

  components: {},

  filters: {},

  props: {
    attributes: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {}
  },

  computed: {
    formData() {
      const attributes = this.attributes
      return { attributeList: attributes }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    handSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const attributeList = this.formData.attributeList.filter(
            ({ fieldName, value }) => fieldName && value
          )
          this.$emit('on-save', attributeList)
        }
      })
    }
  }
}
</script>

<style lang="less">
.sketch-graphic-attribute {
  width: 330px;
  position: absolute;
  top: 110px;
  right: 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  color: #323232;
  font-size: 14px;
  background-color: #fff;

  &__header {
    padding: 0 11px;
    font-size: 15px;
    border-bottom: 1px solid rgba(110, 110, 110, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }

  &__content {
    max-height: 270px;
    overflow-y: auto;
    padding: 6px 7px 12px;
    background-color: #f5f5f5;
  }

  &__controls {
    border-top: 1px solid rgba(110, 110, 110, 0.3);
    padding: 12px 15px;
  }

  &__controls-btn {
    align-items: center;
    background-color: #0079c1;
    border: 1px solid #0079c1;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-family: inherit;
    font-size: 14px;
    min-height: 28px;
    justify-content: center;
    overflow: hidden;
    padding: 4px 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    transition: background-color 125ms ease-in-out, border 125ms ease-in-out;
    outline: none;

    &:hover {
      background-color: #2183bd;
    }
  }
}
</style>
