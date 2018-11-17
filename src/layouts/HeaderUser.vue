<template>
  <div class="header-user">
    <i-dropdown @on-click="handleClick">
      <i-avatar :src="avatar"/>
      <span class="text">{{name}}</span>
      <i-dropdown-menu slot="list">
        <i-dropdown-item name="user">
          <i-icon class="icon" size="16" type="ios-person-outline"/>
          <span>个人中心</span>
        </i-dropdown-item>
        <i-dropdown-item name="setting">
          <i-icon class="icon" size="16" type="ios-settings-outline"/>
          <span>设置</span>
        </i-dropdown-item>
        <i-dropdown-item name="logout" divided>
          <i-icon class="icon" size="16" type="ios-power-outline"/>
          <span>退出登录</span>
        </i-dropdown-item>
      </i-dropdown-menu>
    </i-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HeaderUser',

  components: {},

  data() {
    return {}
  },

  computed: {
    ...mapState('user', ['name', 'avatar'])
  },

  methods: {
    ...mapActions('user', ['logOut']),

    handleClick(name) {
      switch (name) {
        case 'user':
          this.$router.push({ name: 'AdminLog' })
          break
        case 'setting':
          this.$router.push({ name: 'AdminCenter' })
          break
        case 'logout':
          this.logOut().then(res => {
            if (res) {
              this.$Message.success({
                content: '退出登陆成功~',
                onClose: () => {
                  this.$router.push({ name: 'login' })
                }
              })
            }
          })
          break
      }
    }
  }
}
</script>
<style lang="less">
.header-user {
  cursor: pointer;
  display: inline-block;
  height: 64px;
  vertical-align: middle;
  line-height: 64px;

  .text {
    font-size: 14px;
    padding-left: 5px;
    color: rgba(0, 0, 0, 0.65);
  }

  .icon {
    margin-right: 8px;
    vertical-align: middle;
  }
}
</style>
