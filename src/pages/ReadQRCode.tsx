import React, { useEffect } from 'react'
import { Button, StyleSheet, StatusBar, Switch, Text, View, Dimensions } from 'react-native'
import { Me } from '../components/me'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { useAutomationAction } from '~/actions/useAutomationAction'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'
import { useAuthAction } from '~/actions/useAuthAction'
import { useQrcodeScanner } from '~/device/useQrcodeScanner'

const screenWidth = Dimensions.get('window').width

export function ReadQRCode ({ navigation }: PageProps) {
  const [Qrcode, codigo] = useQrcodeScanner()

  function navigate (route) {
    return () => navigation.navigate(route)
  }

  useEffect(() => {
    // checar codigo no backend
    if (codigo) navigation.navigate('Register')
  }, [codigo])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.code}>{codigo}</Text>
      <View style={{ flex: 1 }}/>
      <View style={styles.qrcodescanner}>
        <Qrcode/>
      </View>
      <View style={{ flex: 1 }}/>
    </SafeAreaView>
  )
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
  qrcodescanner: {
    height: screenWidth,
    width: screenWidth
  },
  code: {
    color: colors.claro
  }
})
