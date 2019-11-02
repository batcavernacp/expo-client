import React from 'react'
import { StyleSheet, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { useAutomationAction } from '~/actions/useAutomationAction'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'

export function Home ({ navigation }: PageProps) {
  const { switchRelay, state, error } = useAutomationAction()

  function navigate (route) {
    return () => navigation.navigate(route)
  }

  function switchOn (relay) {
    return () => switchRelay('ON', relay)
  }

  function switchOff (relay) {
    return () => switchRelay('OFF', relay)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <View style={{ flex: 1 }} />
      <Text style={styles.error}>{error}</Text>
      <Buttonperson
        onPressOut={switchOff(1)}
        onPressIn={switchOn(1)}
        styleButton={styles.botao}
      >
        Portão
      </Buttonperson>
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
  }
})
