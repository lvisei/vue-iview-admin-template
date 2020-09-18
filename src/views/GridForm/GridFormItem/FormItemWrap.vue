<template>
  <div class="grid-form-item-wrap" type="flex">
    <div
      class="grid-form-item-wrap__label grid-form-item-wrap__label_bg"
      :style="schema.labelStyle"
    >
      <span
        v-if="!preview"
        v-show="schema.validate.find(({ required }) => required === true)"
        class="grid-form-item-wrap__label_required"
      >
        *
      </span>

      <i-tooltip v-if="schema.tooltip" :content="schema.tooltip" max-width="250" transfer>
        <span v-html="schema.label"></span>
      </i-tooltip>
      <span v-else v-html="schema.label"></span>
    </div>
    <div class="grid-form-item-wrap__value">
      <div class="grid-form-item-wrap__value-enter">
        <template v-if="preview">
          <p><slot /></p>
        </template>
        <i-form-item
          v-else
          class="grid-form-item-wrap__form-item"
          :prop="schema.field"
          :rules="getValidateRules(schema.validate)"
        >
          <slot />
        </i-form-item>
      </div>
      <div v-if="schema.suffix" class="grid-form-item-wrap__value-suffix">{{ schema.suffix }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormItemWrap',

  inject: ['validateField'],

  components: {},

  props: {
    schema: Object,
    preview: Boolean
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    getValidateRules(rules) {
      if (!rules) return null

      const hasValidator = rules.find(({ validator }) => validator)
      if (hasValidator) {
        return rules.map(rule => {
          const { validator, ...other } = rule
          if (!validator) return rule
          const looseFunctionParse = Function('"use strict";return (' + validator + ')')()
          return {
            ...other,
            validator: looseFunctionParse
          }
        })
      } else {
        return rules
      }
    }
  }
}
</script>

<style lang="less">
.grid-form-item-wrap {
  display: flex;
  height: 100%;

  &__label {
    width: 150px;
    min-height: 40px;
    padding: 6px 8px;
    font-size: 14px;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    text-align: center;

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
