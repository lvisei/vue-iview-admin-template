import AES from 'crypto-js/aes'
import { Mode } from 'crypto-js'
import EncUtf8 from 'crypto-js/enc-utf8'
import PadPkcs7 from 'crypto-js/pad-pkcs7'
import { rsaEncrypt, rsaDecrypt } from './rsa-encrypt'

/**
 * 生成随机 AES 密钥的函数
 * @returns String
 */
const getRandomAESKey = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 10) +
    Math.random()
      .toString(36)
      .substring(2, 10)
  )
}

/**
 * AES 加密
 * @param {String} key
 * @param {String} iv
 * @param {String} content
 * @returns
 */
const aesEncrypt = (key, iv, content) => {
  let text = EncUtf8.parse(JSON.stringify(content))
  let encrypted = AES.encrypt(text, key, {
    iv: iv,
    mode: Mode.CBC,
    padding: PadPkcs7
  })
  return encrypted.toString()
}

/**
 * AES 解密
 * @param {String} key
 * @param {String} iv
 * @param {String} content
 * @returns
 */
const aesDecrypt = (key, iv, content) => {
  let decrypt = AES.decrypt(content, key, {
    iv: iv,
    mode: Mode.CBC,
    padding: PadPkcs7
  })
  return decrypt.toString(EncUtf8)
}

/**
 * 混合加密
 * @param {String} text
 * @param {String} publicKey
 * @returns
 */
export const hybirdEncrypt = (text, publicKey) => {
  const iv = getRandomAESKey()
  const key = getRandomAESKey()
  const encryptedData = aesEncrypt(key, iv, text)
  const encryptedIv = rsaEncrypt(iv, publicKey)
  const encryptedKey = rsaEncrypt(key, publicKey)
  return {
    iv: encryptedIv,
    key: encryptedKey,
    data: encryptedData
  }
}

/**
 * 混合解密
 * @param {String} encryptedIv
 * @param {String} encryptedKey
 * @param {String} encryptedText
 * @param {String} privateKey
 * @returns
 */
export const hybirdDecrypt = (encryptedIv, encryptedKey, encryptedText, privateKey) => {
  const iv = rsaDecrypt(encryptedIv, privateKey)
  const key = rsaDecrypt(encryptedKey, privateKey)
  return aesDecrypt(key, iv, encryptedText)
}
