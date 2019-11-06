import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useAuthAction } from '~/actions/useAuthAction'
import { SafeAreaView, FlatList } from 'react-navigation'
import { Buttonperson } from '~/components/Button'
import { colors } from '~/style/cores'
import { useStore } from '~/reducer'
import { PageProps, Item } from './interface'
import { useDeviceSettingsAction } from '~/actions/useDeviceSettingsAction'
import { User } from '~/generated/graphql'

export function Settings ({ navigation }: PageProps) {
  const { logout } = useAuthAction()
  const { myDevices } = useStore()
  const { cancelInvite, removeUser } = useDeviceSettingsAction()

  function navigate (route, params) {
    return () => navigation.navigate(route, params)
  }

  function renderDevice (device) {
    function cancel (email) {
      return () => cancelInvite({ device: device.item.id, email })
    }

    function remove (user) {
      return () => removeUser({ device: device.item.id, user })
    }

    function renderUser ({ item }: Item<User>) {
      return <>
        <TextPadrao>{item.email}</TextPadrao>
        <Buttonperson onPress={remove(item.id)} styleButton={styles.botao}>Remover</Buttonperson>
      </>
    }
    function renderPending ({ item }: Item<string>) {
      return <>
        <TextPadrao>{item}</TextPadrao>
        <Buttonperson onPress={cancel(item)} styleButton={styles.botao}>Cancelar convite</Buttonperson>
      </>
    }
    return (
      <>
        <TextPadrao>{device.item.name}</TextPadrao>
        <TextPadrao>Convidados</TextPadrao>
        <FlatList
          listKey={device.item.id + 'users'}
          data={device.item.users}
          renderItem={renderUser}
          keyExtractor={item => device.item.id + item.id} />
        <TextPadrao>Convites pendentes</TextPadrao>
        <FlatList
          listKey={device.item.id + 'pendingInvites'}
          data={device.item.pendingInvites}
          renderItem={renderPending}
          keyExtractor={item => device.item.id + item} />
        <Buttonperson onPress={navigate('SendInvite', { device: device.item })} styleButton={styles.botao}> Convidar usuário </Buttonperson>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Buttonperson onPress={navigate('AddNewDevice', { newDevice: true })} styleButton={styles.botao}> Novo dispositivo </Buttonperson>
      <View style={{ flex: 1 }}/>
      {myDevices.loading && <TextPadrao>loading</TextPadrao>}
      <FlatList
        listKey='devicesSettings'
        data={myDevices.owned}
        renderItem={renderDevice}
        keyExtractor={item => item.id} />
      <View style={{ flex: 1 }}/>
      <Buttonperson onPress={logout} styleButton={styles.botao}> Sair </Buttonperson>
    </SafeAreaView>
  )
}

function TextPadrao ({ children }) {
  return <Text style={styles.textoPadrao}>{children}</Text>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.vrdesc,
    flex: 1
  },
  botao: {
    padding: 20
  },
  textoPadrao: {
    color: colors.claro
  }
})
