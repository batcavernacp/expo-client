import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { SafeAreaView, FlatList } from 'react-navigation'
import { Buttonperson } from '~/components/Button'
import { colors } from '~/style/cores'
import { MyDevices } from '~/components/myDevices/my-devices-component'
import { useStore } from '~/reducer'

export function Settings () {
  const { logout } = useAuthAction()
  const { myDevices } = useStore()

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      <Buttonperson onPress={logout} styleButton={styles.botao}> Sair </Buttonperson>
      {myDevices.loading && <Text>loading</Text>}
      <FlatList
        data={myDevices.owned}
        renderItem={renderDevice}
        keyExtractor={item => item.id} />
      <View style={{ flex: 1 }}/>
    </SafeAreaView>
  )
}

function renderDevice ({ item }) {
  return (
    <>
      <Text>{item.name}</Text>
      <FlatList
        data={item.users}
        renderItem={renderUser}
        keyExtractor={item => item.id} />
    </>
  )
}

function renderUser ({ item }) {
  return <Text>{item.email}</Text>
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
