import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import firebase from '../services/firebase'
import { PageProps } from './interface'

export function SplashScreen ({ navigation }: PageProps) {
  const { login } = useAuthAction()

  function navigate (route) {
    navigation.navigate(route)
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        login().then(success => success ? navigate('App') : navigate('Auth'))
      } else {
        navigation.navigate('Auth')
      }
    })
  }, [])

  return <Text>Loading</Text>
}
