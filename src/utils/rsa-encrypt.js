import JSEncrypt from 'jsencrypt'
/**
 * Encrypt with the public key...
 * @param {String} text
 * @param {String} publicKey
 * @returns ciphertext
 */
export const rsaEncrypt = (text, publicKey) => {
  const _publicKey = '-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----'
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(_publicKey)
  const encrypted = encrypt.encrypt(text)
  return encrypted
}
/**
 * Decrypt with the private key...
 * @param {String} ciphertext
 * @param {String} privateKey
 * @returns text
 */
export const rsaDecrypt = (ciphertext, privateKey) => {
  const _privateKey =
    '-----BEGIN RSA PRIVATE KEY-----' + privateKey + '-----END RSA PRIVATE KEY-----'
  const decrypt = new JSEncrypt()
  decrypt.setPrivateKey(_privateKey)
  const uncrypted = decrypt.decrypt(ciphertext)
  return uncrypted
}
