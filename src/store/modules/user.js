import {
  userLoginApi,
  refreshTokenApi,
  userLogOutApi,
  getUserInfoApi
} from '@/api/personal-center/user'
import { getToken, setToken, removeToken } from '@/helpers/auth'
import { resetRouter } from '@/router'

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
      const { accessToken, tokenType, expiresAt } = data

      const token = `${tokenType} ${accessToken}`
      setToken(token)
      commit('SET_TOKEN', token)

      return data
    } catch (err) {
      console.log(err) // eslint-disable-line
      return Promise.reject(err)
    }
  },

  getUserInfo: async ({ commit }) => {
    try {
      const data = await getUserInfoApi()
      const { userId, userName, realName, roles } = data

      const user = { userId, userName, realName, roles: roles || [] }
      commit('SET_USER', data)
      commit('SET_ROLES', roles || [])

      return data
    } catch (err) {
      console.log(err) // eslint-disable-line
      return Promise.reject(err)
    }
  },

  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      refreshTokenApi()
        .then(data => {
          const { accessToken, tokenType, expiresAt } = data
          const token = `${tokenType} ${accessToken}`
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        })
        .catch(err => {
          console.log(err) // eslint-disable-line
          reject(err)
        })
    })
  },

  userLogOut: async ({ commit, dispatch }) => {
    try {
      const data = await userLogOutApi()

      dispatch('resetToken')

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
      resetRouter()
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
