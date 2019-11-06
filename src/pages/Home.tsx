import React, { useEffect } from 'react'
import { StyleSheet, StatusBar, Text, View } from 'react-native'
import { SafeAreaView, FlatList } from 'react-navigation'
import { PageProps } from './interface'
import { useAutomationAction } from '~/actions/useAutomationAction'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'
import { MyDevices } from '~/components/myDevices/my-devices-component'
import { useStore } from '~/reducer'
import { Switch } from '~/generated/graphql'

export function Home ({ navigation }: PageProps) {
  const { switchRelay } = useAutomationAction()
  const { myDevices } = useStore()

  MyDevices()

  function navigate (route) {
    return () => navigation.navigate(route)
  }

  function renderDevice ({ item }) {
    if (!item.id) return <></>

    function switchDevice (action: Switch) {
      return () => switchRelay({ device: item.id, turn: action })
    }

    return (
      <>
        <View style={[styles.led, item.status && styles.active]} />
        <Buttonperson
          onPressOut={switchDevice(Switch.Off)}
          onPressIn={switchDevice(Switch.On)}
          styleButton={styles.botao}
        >
          {item.name}
        </Buttonperson>

      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <View style={{ flex: 1 }} />
      {/* <Text style={styles.error}>{error}</Text> */}
      <FlatList
        listKey='guestDevices'
        data={myDevices.guest}
        renderItem={renderDevice}
        keyExtractor={item => item.id} />
      <FlatList
        listKey='ownedDevices'
        data={myDevices.owned}
        renderItem={renderDevice}
        keyExtractor={item => item.id} />
      <View style={{ flex: 1 }} />
    </SafeAreaView>
  )
}

export function navigationOptionsHome ({ navigation }) {
  return {
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.escr,
    flex: 1
  },
  botao: {
    padding: 20
  },
  error: {
    color: colors.fl
  },
  active: {
    backgroundColor: colors.fl
  },
  led: {
    height: 10,
    width: 10,
    borderRadius: 100
  }
})
