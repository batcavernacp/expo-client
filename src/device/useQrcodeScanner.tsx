import React from 'react'
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export function useQrcodeScanner() {

    const [scanned, setScanned]= useState(false)
    useEffect(()=>{
        getPermissionsAsync();
    }, [])

    const [codigo, setCodigo]= useState()

    const getPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
      };

     const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        setCodigo(data)
        alert(data)

      };

      const Qrcode= ()=><BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}/>

      function lerQrcode(){
          setScanned(false)
      }

      return [Qrcode, lerQrcode, codigo]
}