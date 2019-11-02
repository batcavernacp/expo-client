import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { SafeAreaView } from 'react-navigation'
import { Buttonperson } from '~/components/Button'
import { colors } from '~/style/cores'
import { MyDevices } from '~/components/myDevices/my-devices-component'

export function Settings () {
  const { logout } = useAuthAction()

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      {/* <Buttonperson onPress={logout} styleButton={styles.botao}> Sair </Buttonperson> */}
      <MyDevices />
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
