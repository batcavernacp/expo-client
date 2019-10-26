import React from 'react'
import { Button, StyleSheet, StatusBar, Switch, Text } from 'react-native'
import { Me } from '../components/me'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { useAutomationAction } from '~/actions/useAutomationAction'
import nacl from 'tweet-nacl-react-native-expo'

export function Home ({ navigation }: PageProps) {
  const { switchRelay, state, error } = useAutomationAction()
  function navigate (route) {
    return () => navigation.navigate(route)
  }

  function switchOn (relay) {
    return action => switchRelay('ON', relay)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="#6a51ae" />
      {/* <Text>{error}</Text>
      <Me /> */}

      <Button title="Portão" onPress={switchOn(1)}/>

      {/* <Button title="Settings" onPress={navigate('Settings')} /> */}
    </SafeAreaView>
  )
}

export function navigationOptionsHome ({ navigation }) {
  return {
    title: 'BATCAVERNA'
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#6a51ae',
    flex: 1
  }
})

const exampleEncryptDecrypt = async () => {
  // simple encrypt decrypt example
  // uses self secretKey together with others publicKey to derive a sharedKey (Diffie–Hellman logic)
  // sharedKey is used to encrypt and decrypt the messages between the two (symmetric encryption)

  const bobKeyPair = await nacl.box.keyPair()
  const aliceKeyPair = await nacl.box.keyPair()

  // Alice and Bob will derive the same shared key
  const bobSharedKey = nacl.box.before(aliceKeyPair.publicKey, bobKeyPair.secretKey)
  const aliceSharedKey = nacl.box.before(bobKeyPair.publicKey, aliceKeyPair.secretKey)

  // Bob decodes the message he wants to send
  // (for messages we will use UTF8 encoding/decoding)
  // Bob generates a random nonce value
  // Bob encrypts the decoded message using the nonce and the sharedKey
  // Bob encodes the encrypted message (Uint8Array) into a string (base64)
  // Note that Bob will send the encrypted message together
  //  with nonce (plain text) to Alice in order for her to decrypt
  const str = "Hello Alice , this is Bob! ;'[]{} bla bla"
  const [nonce, bobBase64EncryptedStr] = await prepareMessage(str, bobSharedKey)

  // Alice decodes the string (base64) to Uint8Array (this gives her bobEncryptedStr)
  // Alice decrypts the message using the nonce and the sharedKey (this gives her strDecoded)
  // Alice then encodes the result to get the final message in plain text
  const messageFromBobEncoded = decryptMessage(bobBase64EncryptedStr, nonce)

  console.log({
    bob: {
      keypair: {
        publicKey: nacl.util.encodeBase64(bobKeyPair.publicKey),
        secretKey: nacl.util.encodeBase64(bobKeyPair.secretKey)
      },
      sharedKey: nacl.util.encodeBase64(bobSharedKey),
      messagePlain: str,
      messageEncrypted: bobBase64EncryptedStr
    },
    alice: {
      keypair: {
        publicKey: nacl.util.encodeBase64(aliceKeyPair.publicKey),
        secretKey: nacl.util.encodeBase64(aliceKeyPair.secretKey)
      },
      sharedKey: nacl.util.encodeBase64(aliceSharedKey),
      messageDecrypted: messageFromBobEncoded
    }
  })
}

async function prepareMessage (message, sharedKey) {
  const strDecoded = new Uint8Array(nacl.util.decodeUTF8(message))
  const nonce = await nacl.randomBytes(24)
  const bobEncryptedStr = nacl.box.after(strDecoded, nonce, sharedKey)
  return [nonce, nacl.util.encodeBase64(bobEncryptedStr)]
}

async function decryptMessage (encryptedMessage, nonce) {
  const messageFromBobDecoded = nacl.util.decodeBase64(encryptedMessage) // same as bobEncryptedStr
  const messageFromBobDecrypted = nacl.box.open.after(messageFromBobDecoded, nonce, aliceSharedKey) // same as strDecoded
  return nacl.util.encodeUTF8(messageFromBobDecrypted) // same as str
}
