import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { SafeAreaView, FlatList } from 'react-navigation'
import { Buttonperson } from '~/components/Button'
import { colors } from '~/style/cores'
import { useStore } from '~/reducer'
import { Formik } from 'formik'
import { PageProps } from './interface'
import { useDeviceSettingsAction } from '~/actions/useDeviceSettingsAction'

export function Settings ({ navigation }: PageProps) {
  const { logout } = useAuthAction()
  const { myDevices } = useStore()
  const { cancelInvite } = useDeviceSettingsAction()

  function navigate (route, params) {
    return () => navigation.navigate(route, params)
  }

  function cancel (id, email) {
    return () => cancelInvite(id, email)
  }

  function renderDevice ({ item }) {
    return (
      <>
        <TextPadrao>{item.name}</TextPadrao>
        <TextPadrao>Convidados</TextPadrao>
        <FlatList
          data={item.users}
          renderItem={renderUser}
          keyExtractor={item => item.id} />
        <TextPadrao>Convites pendentes</TextPadrao>
        {renderPending(item.pendingInvites, item.id)}
        <Buttonperson onPress={navigate('SendInvite', { device: item })} styleButton={styles.botao}> Convidar usuário </Buttonperson>
      </>
    )
  }

  function renderUser ({ item }) {
    return <TextPadrao>{item.email}</TextPadrao>
  }

  function renderPending (pending, device) {
    return pending.map((item) => (
      <View key={item}>
        <TextPadrao >{item}</TextPadrao>
        <Buttonperson onPress={cancel(device, item)} styleButton={styles.botao}>Cancelar convite</Buttonperson>
      </View>
    ))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      <Buttonperson onPress={logout} styleButton={styles.botao}> Sair </Buttonperson>
      {myDevices.loading && <TextPadrao>loading</TextPadrao>}
      <FlatList
        data={myDevices.owned}
        renderItem={renderDevice}
        keyExtractor={item => item.id} />
      <View style={{ flex: 1 }}/>
    </SafeAreaView>
  )
}

export function navigationOptionsSettings ({ navigation }) {
  return {
    headerTitle: 'Meus dispositivos'
  }
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
