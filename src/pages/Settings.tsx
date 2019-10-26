import React from 'react'
import { Button, StyleSheet, Text } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { SafeAreaView } from 'react-navigation'
import { useStore } from '~/reducer'

export function Settings () {
  const { logout } = useAuthAction()
  const { auth } = useStore()

  return (
    <SafeAreaView style={styles.container}>
      <Text>{auth.emailVerified ? '' : 'Verifique seu email!'}</Text>
      <Text>{auth.email}</Text>
      <Text>{auth.username}</Text>
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  )
}

export function navigationOptionsSettings ({ navigation }) {
  return {
    title: 'Settings'
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#6a51ae',
    flex: 1
  }
})
