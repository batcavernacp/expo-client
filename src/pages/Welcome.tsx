import React from 'react'
import { Button, StyleSheet, StatusBar, SafeAreaView, ImageBackground } from 'react-native'
import { PageProps } from './interface'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'

export function Welcome ({ navigation }: PageProps) {
  function navigate (route) {
    return () => navigation.navigate(route)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={false} backgroundColor={colors.escr} />
      <Buttonperson onPress={navigate('Login')} styleButton={styles.botao}> Fazer Login </Buttonperson>
      <Buttonperson onPress={navigate('ReadQRCode')} styleButton={styles.botao}> Criar Usuário </Buttonperson>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.escr
  },
  botao: {
    padding: 20
  }
})
