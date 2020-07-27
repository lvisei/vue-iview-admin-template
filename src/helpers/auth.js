import { setLocalstorage, getLocalstorage, removeLocalstorage } from '@/utils/index'

const TokenKey = 'vue-iview-admin-template:authenticate-token'

export function getToken() {
  return getLocalstorage(TokenKey)
}

export function setToken(token) {
  return setLocalstorage(TokenKey, token)
}

export function removeToken() {
  return removeLocalstorage(TokenKey)
}
