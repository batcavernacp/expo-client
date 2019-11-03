import React, { useEffect, useState } from 'react'
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
  const { checkQRCode } = useAuthAction()
  const [message, setMessage] = useState('Leia o QR Code')

  function navigate (route) {
    return () => navigation.navigate(route)
  }

  useEffect(() => {
    if (!codigo) return
    setMessage('Checando codigo')
    checkQRCode(codigo).then(success => {
      if (!success) {
        setMessage('Codigo inválido, leia outro codigo')
        return
      }

      navigation.navigate('Register', { codigo })
      return true
    }).catch(err => {
      console.log(err)
      setMessage('Codigo inválido, leia outro codigo')
      return false
    })

    // checar codigo no backend
  }, [codigo])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.qrcodescanner}>
        <Qrcode/>
      </View>
      <Buttonperson onPress={navigate('Invite')} styleButton={styles.botao}> Possuo um convite </Buttonperson>
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
  text: {
    color: colors.claro
  }
})
