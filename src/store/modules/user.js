import {
  userLoginApi,
  userLogOutApi,
  getUserInfoApi,
  getUserMenutreeApi
} from '@/api/personal-center/user'
import { getToken, setToken, removeToken } from '@/helpers/auth'

const defaultUser = { userId: '', userName: '', realName: '', avatar: '', roles: [] }

const state = {
  token: getToken(),
  user: { ...defaultUser },
  rights: [],
  roles: []
}

const getters = {}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_RIGHTS: (state, rights) => {
    state.rights = rights
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  userLogin: async ({ commit }, { username, password, captchaCode, captchaId }) => {
    try {
      const data = await userLoginApi(username, password, captchaCode, captchaId)
      const { access_token, token_type, expires_at } = data

      const token = `${token_type} ${access_token}`
      setToken(token)
      commit('SET_TOKEN', token)

      return data
    } catch (err) {
      console.log(err) // eslint-disable-line
      return Promise.reject(err)
    }
  },

  getUserInfo: async ({ commit, state }) => {
    try {
      const data = await getUserInfoApi()
      const { user_id, user_name, real_name, roles } = data

      const user = {
        userId: user_id,
        userName: user_name,
        realName: real_name,
        roles: roles || []
      }
      commit('SET_USER', data)
      commit('SET_ROLES', roles || [])

      return data
    } catch (err) {
      console.log(err) // eslint-disable-line
      return Promise.reject(err)
    }
  },

  getUserMenutree: async ({ commit, state }) => {
    try {
      const response = await getUserMenutreeApi()
      const { code, data } = response
      if (code !== 20000) return false
      // const { rights, roles, user } = data

      // commit('SET_RIGHTS', rights)
      // commit('SET_ROLES', roles)
      commit('SET_ROLES', ['super_admin', 'admin'])
      commit('SET_USER', data)

      return data
    } catch (err) {
      console.log(err) // eslint-disable-line
      return Promise.reject(err)
    }
  },

  userLogOut: async ({ commit, state }) => {
    try {
      const data = await userLogOutApi()

      commit('SET_TOKEN', '')
      commit('SET_RIGHTS', [])
      commit('SET_ROLES', [])
      commit('SET_USER', { ...defaultUser })
      removeToken()

      return data
    } catch (err) {
      console.log(err) // eslint-disable-line
      return Promise.reject(err)
    }
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_RIGHTS', [])
      commit('SET_ROLES', [])
      commit('SET_USER', { ...defaultUser })
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
