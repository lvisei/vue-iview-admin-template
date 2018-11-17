import { setLocalstorage, getLocalstorage, removeLocalstorage } from './index'

const TokenKey = 'Admin-Token'

export function getToken() {
  return getLocalstorage(TokenKey)
}

export function setToken(token) {
  return setLocalstorage(TokenKey, token)
}

export function removeToken() {
  return removeLocalstorage(TokenKey)
}
