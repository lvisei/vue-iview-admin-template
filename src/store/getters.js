const getters = {
  // user
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.user && state.user.user.avatar,
  userName: state => state.user.user && state.user.user.userName,
  realName: state => state.user.user && state.user.user.realName,
  userId: state => state.user.user && state.user.user.userId,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  routes: state => state.routes.routes
}

export default getters
