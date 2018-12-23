import JSEncrypt from 'jsencrypt'
/**
 * Encrypt with the public key...
 * @param {String} text
 * @param {String} publicKey
 * @returns ciphertext
 */
export const rsaEncrypt = (text, publicKey) => {
  let _publicKey = '-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----'
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(_publicKey)
  let encrypted = encrypt.encrypt(text)
  return encrypted
}
/**
 * Decrypt with the private key...
 * @param {String} ciphertext
 * @param {String} privateKey
 * @returns text
 */
export const rsaDecrypt = (ciphertext, privateKey) => {
  let _privateKey = '-----BEGIN RSA PRIVATE KEY-----' + privateKey + '-----END RSA PRIVATE KEY-----'
  let decrypt = new JSEncrypt()
  decrypt.setPrivateKey(_privateKey)
  let uncrypted = decrypt.decrypt(ciphertext)
  return uncrypted
}
