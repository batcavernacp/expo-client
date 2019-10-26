import React from 'react'
import { Button, StyleSheet, StatusBar, Switch, Text } from 'react-native'
import { Me } from '../components/me'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { useAutomationAction } from '~/actions/useAutomationAction'
import { colors } from '~/style/cores';
import { Buttonperson } from '~/components/Button';
import { useAuthAction } from '~/actions/useAuthAction';
import { useQrcodeScanner } from '~/device/useQrcodeScanner';


export function Home ({ navigation }: PageProps) {
  const { switchRelay, state, error } = useAutomationAction()
  const { logout } = useAuthAction()
//  const [Qrcode, ler, codigo]= useQrcodeScanner()
  
  
  function navigate (route) {
    return () => navigation.navigate(route)
  }

  function switchOn (relay) {
    return () => switchRelay('ON', relay)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={colors.vrdesc} />
      {/* <Text>{error}{codigo}</Text> */}
      <Me />
      {/* <Qrcode/> */}
      <Buttonperson onPress={switchOn(1)} styleButton={styles.botao}>Portão</Buttonperson>

      <Buttonperson onPress={logout} styleButton={styles.botao}> Sair </Buttonperson>

      {/* <Buttonperson onPress={ler} styleButton={styles.botao}>Configurar</Buttonperson> */}
    </SafeAreaView>
  )
}

export function navigationOptionsHome ({ navigation }) {
  return {
    title: 'BATCAVERNA'
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.escr,
    flex: 1
  },
  botao:{
    padding: 20
  }
})


