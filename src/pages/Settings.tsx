import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { SafeAreaView } from 'react-navigation'
import { Buttonperson } from '~/components/Button'
import { Me } from '~/components/me'
import { colors } from '~/style/cores'

export function Settings () {
  const { logout } = useAuthAction()

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      <Me />
      <Buttonperson onPress={logout} styleButton={styles.botao}> Sair </Buttonperson>
      <View style={{ flex: 1 }}/>
    </SafeAreaView>
  )
}

export function navigationOptionsSettings ({ navigation }) {
  return {
    headerTitle: 'Meus dispositivos'
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.vrdesc,
    flex: 1
  },
  botao: {
    padding: 20
  }
})
