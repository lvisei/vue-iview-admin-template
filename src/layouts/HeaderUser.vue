<template>
  <div class="header-user">
    <i-dropdown @on-click="handleClick">
      <i-avatar :src="avatar" />
      <span class="header-user__text">{{ userName }}</span>
      <i-dropdown-menu slot="list">
        <i-dropdown-item name="user">
          <i-icon class="header-user__icon" size="16" type="ios-person-outline" />
          <span>个人中心</span>
        </i-dropdown-item>
        <i-dropdown-item name="setting">
          <i-icon class="header-user__icon" size="16" type="ios-settings-outline" />
          <span>个人设置</span>
        </i-dropdown-item>
        <i-dropdown-item name="logout" divided>
          <i-icon class="header-user__icon" size="16" type="ios-power-outline" />
          <span>退出登录</span>
        </i-dropdown-item>
      </i-dropdown-menu>
    </i-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HeaderUser',

  components: {},

  data() {
    return {}
  },

  computed: {
    ...mapGetters(['userName', 'accountName', 'avatar'])
  },

  methods: {
    ...mapActions('user', ['userLogOut']),

    handleClick(name) {
      switch (name) {
        case 'user':
          this.$router.push({ name: 'UserCenter' })
          break
        case 'setting':
          this.$router.push({ name: 'UserSet' })
          break
        case 'logout':
          this.userLogOut().then(({ code }) => {
            if (code === 20000) {
              this.$Message.success({
                content: '退出登陆成功~',
                onClose: () => {
                  this.$router.push({ name: 'Login' })
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
  height: 100%;
  vertical-align: middle;

  &__text {
    font-size: 14px;
    padding-left: 5px;
    color: rgba(0, 0, 0, 0.65);
  }

  &__icon {
    margin-right: 8px;
    vertical-align: middle;
  }
}
</style>
