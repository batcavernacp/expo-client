import React, { useEffect, useState } from 'react'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { StyleSheet } from 'react-native'

export function useQrcodeScanner () {
  useEffect(() => {
    getPermissionsAsync()
  }, [])

  const [codigo, setCodigo] = useState()

  const getPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setCodigo(data)
  }

  const Qrcode = () =>
    <BarCodeScanner
      onBarCodeScanned={handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />

  return [Qrcode, codigo]
}
