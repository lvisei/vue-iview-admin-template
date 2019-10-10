<template>
  <div class="editing-tools">
    <ul class="editing-tools__control">
      <li class="editing-tools__control_item" @click="showKeyDialog = true">
        <svg class="icon" viewBox="0 0 1024 1024" width="20" height="20">
          <path
            d="M928.67 206.44H95.33A83.42 83.42 0 0 0 12 289.78v444.44a83.42 83.42 0 0 0 83.33 83.33h833.34a83.42 83.42 0 0 0 83.33-83.33V289.78a83.42 83.42 0 0 0-83.33-83.34z m27.78 527.78A27.8 27.8 0 0 1 928.67 762H95.33a27.8 27.8 0 0 1-27.78-27.78V289.78A27.8 27.8 0 0 1 95.33 262h833.34a27.8 27.8 0 0 1 27.78 27.78z"
            p-id="2263"
          ></path>
          <path
            d="M845.33 623.11H178.67a27.78 27.78 0 0 0 0 55.56h666.66a27.78 27.78 0 0 0 0-55.56zM178.67 539.78H262a27.78 27.78 0 1 0 0-55.56h-83.33a27.78 27.78 0 0 0 0 55.56zM373.11 539.78h83.33a27.78 27.78 0 0 0 0-55.56h-83.33a27.78 27.78 0 0 0 0 55.56zM567.56 539.78h83.33a27.78 27.78 0 0 0 0-55.56h-83.33a27.78 27.78 0 0 0 0 55.56zM845.33 484.22H762a27.78 27.78 0 1 0 0 55.56h83.33a27.78 27.78 0 0 0 0-55.56zM178.67 400.89H262a27.78 27.78 0 1 0 0-55.56h-83.33a27.78 27.78 0 0 0 0 55.56zM373.11 400.89h83.33a27.78 27.78 0 0 0 0-55.56h-83.33a27.78 27.78 0 0 0 0 55.56zM567.56 400.89h83.33a27.78 27.78 0 0 0 0-55.56h-83.33a27.78 27.78 0 0 0 0 55.56zM845.33 345.33H762a27.78 27.78 0 1 0 0 55.56h83.33a27.78 27.78 0 0 0 0-55.56z"
            p-id="2264"
          ></path>
        </svg>
      </li>
      <!-- <li class="editing-tools__control_item">
        <svg class="icon" viewBox="0 0 1024 1024" width="20" height="20">
          <path
            d="M460.8 940.8h-320l262.4-262.4c12.8-12.8 12.8-38.4 0-51.2-12.8-19.2-38.4-19.2-57.6 0l-262.4 262.4v-345.6c0-19.2-19.2-38.4-38.4-38.4s-38.4 19.2-38.4 38.4v364.8c0 51.2 38.4 115.2 96 115.2h358.4c19.2 0 38.4-19.2 38.4-38.4 0-25.6-19.2-44.8-38.4-44.8zM940.8 6.4h-377.6c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h320l-268.8 262.4c-12.8 12.8-12.8 38.4 0 57.6 19.2 12.8 44.8 12.8 57.6 0l262.4-262.4v320c0 19.2 19.2 38.4 38.4 38.4s38.4-19.2 38.4-38.4v-352c6.4-64-25.6-102.4-70.4-102.4z"
            p-id="3277"
          ></path>
        </svg>
      </li> -->
    </ul>
    <div
      :class="[
        'editing-tools__keybindings-dialog',
        showKeyDialog ? 'editing-tools__keybindings-dialog_open' : ''
      ]"
      @click="showKeyDialog = false"
    >
      <div class="editing-tools__keybindings-dialog_content">
        <h1>Keyboard Shortcuts</h1>
        <table>
          <tbody>
            <tr>
              <td>Undo</td>
              <td class="binding">⌘ + Z</td>
            </tr>
            <tr>
              <td>Redo</td>
              <td class="binding">⌘ + ⇧ + Z</td>
            </tr>
            <tr>
              <td>Select All</td>
              <td class="binding">⌘ + A</td>
            </tr>
            <tr>
              <td>Scrolling (Vertical)</td>
              <td class="binding">⌥ + Scrolling</td>
            </tr>
            <tr>
              <td>Scrolling (Horizontal)</td>
              <td class="binding">⌥ + ⇧ + Scrolling</td>
            </tr>
            <tr>
              <td>Direct Editing</td>
              <td class="binding">E</td>
            </tr>
            <tr>
              <td>Hand Tool</td>
              <td class="binding">H</td>
            </tr>
            <tr>
              <td>Lasso Tool</td>
              <td class="binding">L</td>
            </tr>
            <tr>
              <td>Space Tool</td>
              <td class="binding">S</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditingTools',

  components: {},

  filters: {},

  props: {},

  data() {
    return {
      showKeyDialog: false
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {}
}
</script>

<style scoped lang="less">
.editing-tools {
  z-index: 1;

  &__control {
    list-style: none;

    &_item {
      display: inline-block;
      margin-left: 10px;
      background: #fff;
      border-radius: 2px;
      border: solid 1px #e0e0e0;
      padding: 5px;
      cursor: pointer;

      .icon {
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }

  &__keybindings-dialog {
    display: none;

    &_open {
      display: block;

      &:before {
        content: '';
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: #666;
        opacity: 0.2;
        z-index: 1001;
      }
    }

    &_content {
      position: fixed;
      left: 50%;
      width: 450px;
      margin-left: -225px;
      top: 200px;
      background: white;
      padding: 10px 30px 20px 30px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      height: auto;
      z-index: 1001;
    }
  }
}
</style>
