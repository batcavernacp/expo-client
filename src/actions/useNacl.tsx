import nacl from 'tweet-nacl-react-native-expo'
import * as SecureStore from 'expo-secure-store'

async function prepareMessage (message, contactPublicKey) {
  const strDecoded = new Uint8Array(nacl.util.decodeUTF8(message))
  const nonce = await nacl.randomBytes(24)
  const bobEncryptedStr = nacl.box.after(strDecoded, nonce, await createSharedKey(contactPublicKey))
  return [nonce, nacl.util.encodeBase64(bobEncryptedStr)]
}

async function decryptMessage (encryptedMessage, nonce, contactPublicKey): Promise<string> {
  const messageFromBobDecoded = nacl.util.decodeBase64(encryptedMessage) // same as bobEncryptedStr
  const messageFromBobDecrypted = nacl.box.open.after(messageFromBobDecoded, nonce, await createSharedKey(contactPublicKey)) // same as strDecoded
  return nacl.util.encodeUTF8(messageFromBobDecrypted) // same as str
}

async function createSharedKey (publicKey) {
  return nacl.box.before(publicKey, await SecureStore.getItemAsync('secretKey'))
}

async function generateKeyPair () {
  const keyPair = await nacl.box.keyPair()
  await SecureStore.setItemAsync('secretKey', keyPair.secretKey)
  await SecureStore.setItemAsync('publicKey', keyPair.publicKey)
}
