import React from 'react'
import { Button, StyleSheet, Text, StatusBar, View } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { SafeAreaView } from 'react-navigation'
import { useStore } from '~/reducer'
import { Buttonperson } from '~/components/Button'
import { Me } from '~/components/me'
import { colors } from '~/style/cores'

export function Settings () {
  const { logout } = useAuthAction()
  const { auth } = useStore()

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      <Me />
      <Text>{auth.emailVerified ? '' : 'Verifique seu email!'}</Text>
      <Buttonperson onPress={logout} styleButton={styles.botao}> Sair </Buttonperson>
      <View style={{ flex: 1 }}/>
    </SafeAreaView>
  )
}

export function navigationOptionsSettings ({ navigation }) {
  return {
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#6a51ae',
    flex: 1
  },
  botao: {
    padding: 20
  }
})
