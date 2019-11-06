import React, { useEffect } from 'react'
import { Text, ActivityIndicator, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import firebase from '../services/firebase'
import { PageProps } from './interface'
import { colors } from '~/style/cores'

export function SplashScreen ({ navigation }: PageProps) {
  const { login } = useAuthAction()

  function navigate (route) {
    navigation.navigate(route)
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        return login().then(success => success ? navigate('App') : navigate('Auth'))
      } else {
        navigate('Auth')
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={false} backgroundColor={colors.escr}/>
      <ActivityIndicator size="large" color={colors.fl}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.escr
  }
})
