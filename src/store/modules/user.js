import { loginApi, logoutApi, getUserInfoApi } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  auths: []
}

const getters = {}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTHS: (state, auths) => {
    state.auths = auths
  }
}

const actions = {
  login: async ({ commit }, { username, password }) => {
    try {
      let response = await loginApi(username, password)
      let { data } = response
      if (!data) return false
      let { token } = data
      setToken(token)
      commit('SET_TOKEN', token)
      return token
    } catch (err) {
      console.log(err)
      return err
    }
  },

  getUserInfo: async ({ commit, state }) => {
    try {
      let token = state.token
      let response = await getUserInfoApi(token)
      let { data } = response
      if (!data) return false
      let { auths, name, avatar } = data
      commit('SET_AUTHS', auths)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return data
    } catch (err) {
      console.log(err)
      return err
    }
  },

  logOut: async ({ commit, state }) => {
    try {
      let token = state.token
      let response = await logoutApi(token)
      let { success } = response
      if (!success) return false
      commit('SET_TOKEN', '')
      commit('SET_AUTHS', [])
      removeToken()
      return true
    } catch (err) {
      console.log(err)
      return err
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
