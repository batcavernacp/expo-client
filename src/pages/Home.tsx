import React from 'react'
import { Button, StyleSheet, StatusBar, Switch, Text, View } from 'react-native'
import { Me } from '../components/me'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { useAutomationAction } from '~/actions/useAutomationAction'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'
import { useAuthAction } from '~/actions/useAuthAction'

export function Home ({ navigation }: PageProps) {
  const { switchRelay, state, error } = useAutomationAction()

  function navigate (route) {
    return () => navigation.navigate(route)
  }

  function switchOn (relay) {
    return () => switchRelay('ON', relay)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={colors.vrdesc} />
      <Text style={styles.error}>{error}</Text>
      <Buttonperson onPress={switchOn(1)} styleButton={styles.botao}>Portão</Buttonperson>
      <View style={{ flex: 1 }}/>
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
