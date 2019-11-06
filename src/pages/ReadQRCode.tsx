import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'
import { useAuthAction } from '~/actions/useAuthAction'
import { useQrcodeScanner } from '~/device/useQrcodeScanner'
import { useDeviceSettingsAction } from '~/actions/useDeviceSettingsAction'
import { useStore } from '~/reducer'

const screenWidth = Dimensions.get('window').width

export function ReadQRCode ({ navigation }: PageProps) {
  const isNewDevice = navigation.getParam('newDevice', false)

  const [Qrcode, codigo] = useQrcodeScanner()
  const { checkQRCode } = useAuthAction()
  const { registerNewDevice } = useDeviceSettingsAction()
  const { loading, error } = useStore()

  function navigate (route) {
    return () => navigation.navigate(route)
  }

  useEffect(() => {
    if (!codigo) return
    if (isNewDevice) {
      registerNewDevice({ qrcode: codigo, name: 'test' }).then(success => {
        if (!success) {
          return
        }

        navigation.navigate('Settings')
        return true
      }).catch(err => {
        console.log(err)
        return false
      })
    } else {
      checkQRCode(codigo).then(success => {
        if (!success) {
          return
        }

        navigation.navigate('Register', { codigo })
        return true
      }).catch(err => {
        console.log(err)
        return false
      })
    }
  }, [codigo])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}/>
      <Text style={styles.text}>{loading.ADD_DEVICE && 'Carregando'}{error.ADD_DEVICE}</Text>
      <View style={styles.qrcodescanner}>
        <Qrcode/>
      </View>
      {!isNewDevice && <Buttonperson onPress={navigate('Invite')} styleButton={styles.botao}> Possuo um convite </Buttonperson>}
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
