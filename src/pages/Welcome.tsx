import React from 'react'
import { Button, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { PageProps } from './interface'

export function Welcome ({ navigation }: PageProps) {
  function navigate (route) {
    return () => navigation.navigate(route)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} backgroundColor="white" />
      <Button title="Go to Login" onPress={navigate('Login')} />
      <Button title="Go to Register" onPress={navigate('Register')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
