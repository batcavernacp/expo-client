import React from 'react'
import { View, StyleSheet, Text, ButtonProps, TouchableOpacityProps } from 'react-native'
import { colors } from '~/style/cores'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ButtonpersonProps extends TouchableOpacityProps {
    styleButton: any;
    children: any;
}

export function Buttonperson (props: ButtonpersonProps) {
  return (
    <TouchableOpacity onPressIn={props.onPressIn} onPressOut={props.onPressOut} onPress={props.onPress}>
      <View style={[styles.container, props.styleButton]}>
        <Text style={styles.texto}> {props.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.vrdmed,
    borderRadius: 10,
    margin: 7
  },
  texto: {
    color: colors.vrdclr,
    fontSize: 25
  }
})
