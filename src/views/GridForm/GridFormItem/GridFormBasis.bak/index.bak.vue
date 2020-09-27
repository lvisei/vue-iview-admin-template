<template>
  <div class="grid-form-basis" type="flex">
    <div
      class="grid-form-basis__label grid-form-basis__label_bg"
      :style="{
        width: '150px',
        justifyContent: 'center',
        textAlign: 'center',
        ...(schema.labelStyle ? schema.labelStyle : {})
      }"
    >
      <span
        v-if="!preview"
        v-show="schema.validate.find(({ required }) => required === true)"
        class="grid-form-basis__label_required"
      >
        *
      </span>

      <i-tooltip v-if="schema.tooltip" :content="schema.tooltip" max-width="250" transfer>
        <span v-html="schema.label"></span>
      </i-tooltip>
      <span v-else v-html="schema.label"></span>
    </div>
    <div class="grid-form-basis__value">
      <div class="grid-form-basis__value-enter">
        <template v-if="preview">
          <AnnexList
            v-if="schema.type === 'annex'"
            :file="model[schema.field]"
            v-bind="schema.props"
          />
          <UploadGeoRange
            v-else-if="schema.type === 'geoRange' && model[schema.field]"
            v-model="model[schema.field]"
            :preview="preview"
            v-bind="schema.props"
          />
          <p v-else-if="schema.type === 'select' && model[schema.field]">
            {{
              schema.options.length
                ? schema.options.find(({ value }) => value === model[schema.field]).label
                : model[schema.field]
            }}
          </p>
          <p v-else>{{ model[schema.field] }}</p>
        </template>
        <i-form-item
          v-else
          class="grid-form-basis__form-item"
          :prop="schema.field"
          :rules="getValidateRules(schema.type, schema.validate)"
          :show-message="true"
        >
          <UploadAnnex
            v-if="schema.type === 'annex'"
            :file="model[schema.field]"
            v-bind="schema.props"
            @on-delete="onItemAnnexDelete"
            @on-upload="onItemAnnexUpload"
          />
          <UploadGeoRange
            v-else-if="schema.type === 'geoRange'"
            v-model="model[schema.field]"
            v-bind="schema.props"
            @on-upload="validateField(schema.field)"
          />
        </i-form-item>
      </div>
      <div v-if="schema.suffix" class="grid-form-basis__value-suffix">{{ schema.suffix }}</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from './helper'

export default {
  name: 'GridFormBasis',

  inject: ['validateField'],

  components: {},

  props: {
    model: Object,
    schema: Object,
    preview: Boolean
  },

  data() {
    return {
      selectLoading: false
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {
    // console.log('updated: ', this.model[this.schema.field])
  },

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    getValidateRules(type, rules) {
      if (!rules) return null
      if (type === 'annex') {
        const isRequired = rules.find(({ required }) => required === true)
        const _rule = rules.map(rule => {
          const { customize, ..._rule } = rule
          if (!customize) return rule
          return {
            ..._rule,
            validator(rule, value, callback, source, options) {
              const { format, 'max-size': maxSize, message } = customize
              if (format || maxSize) {
                const isFile = Object.prototype.toString.call(value) === '[object File]'
                if (!isRequired && !isFile) return callback()
                const file = Array.isArray(value) ? value[0] : value
                const { name } = file
                const fileFormat = name.substr(name.lastIndexOf('.') + 1)
                const isFormat = format && !format.includes(fileFormat)
                const isOverSize = maxSize && maxSize * 1024 < file.size
                if (isFormat) {
                  callback(message ? message : `上传文件”${name}“格式不正确`)
                } else if (isOverSize) {
                  callback(message ? message : `上传文件”${name}“过大`)
                } else {
                  callback()
                }
              } else {
                callback()
              }
            }
          }
        })
        return _rule
      } else {
        const hasValidator = rules.find(({ validator }) => validator)
        if (hasValidator) {
          return rules.map(rule => {
            const { validator, ..._rule } = rule
            if (!validator) return rule
            const looseFunctionParse = Function('"use strict";return (' + validator + ')')()
            return {
              ..._rule,
              validator: looseFunctionParse
            }
          })
        } else {
          return rules
        }
      }
    },

    onItemAnnexUpload(file) {
      this.model[this.schema.field] = file
      const validateField = this.validateField
      validateField(this.schema.field)
    },

    onItemAnnexDelete() {
      const file = this.model[this.schema.field]
      const isExistFile = Boolean(file.url)
      const callback = () => {
        this.model[this.schema.field] = null
        const validateField = this.validateField
        validateField(this.schema.field)
      }
      if (isExistFile) {
        this.$emit('on-annex-delete', { file, callback })
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="less">
.grid-form-basis {
  display: flex;
  height: 100%;

  &__label {
    // width: 150px;
    min-height: 40px;
    padding: 6px 8px;
    font-size: 14px;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    // justify-content: center;

    &_required {
      color: red;
      font-size: 16px;
      padding-right: 3px;
      align-self: flex-start;
    }

    &_required-hide {
      visibility: hidden;
    }

    &_bg {
      background-color: #f8f8f9;
    }
  }

  &__value {
    flex: 1;
    border-left: 1px solid #e2e2e2;
    text-align: center;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  &__value-enter {
    flex: 1;
  }

  &__value-suffix {
    font-size: 13px;
    padding-left: 8px;
  }

  &__form-item {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
</style>
