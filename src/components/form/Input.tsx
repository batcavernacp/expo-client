import { useField } from 'formik'
import React, { MutableRefObject } from 'react'
import { StyleSheet, TextInput, TextInputProps, View, Animated } from 'react-native'
import { colors } from '~/style/cores'
import { useAnimation } from 'react-native-animation-hooks'

interface InputProps extends TextInputProps {
  name: string;
  inputRef?: MutableRefObject<TextInput>;
}

export function TextInputFormik (props: InputProps) {
  const [field, meta] = useField(props.name)

  const animatedOpacity = bool => useAnimation({
    type: 'timing',
    useNativeDriver: true,
    toValue: bool ? 1 : 0,
    initialValue: 0,
    duration: bool ? 75 : 0
  })

  function _onBlur (e) {
    if (props.onBlur) props.onBlur(e)
    field.onBlur(props.name)(e)
  }

  const error = () => meta.touched && meta.error

  const { inputRef } = props
  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.placeholder, { opacity: animatedOpacity(!!field.value) }]}>{props.placeholder || field.name}</Animated.Text>
      <TextInput
        placeholderTextColor= {colors.vrdclr}
        ref={inputRef}
        value={field.value}
        onChangeText={field.onChange(props.name)}
        {...props}
        onBlur={_onBlur}
        style={[styles.input, error() && styles.inputError, meta.touched && !meta.error && styles.inputSuccess]}
        // placeholder=""
      />
      <Animated.Text style={[styles.error, { opacity: animatedOpacity(error()) }]}>{error()}</Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  error: {
    color: '#f00'
  },
  input: {
    borderBottomColor: colors.claro,
    borderBottomWidth: 1,
    borderRadius: 2,
    fontSize: 15,
    padding: 5,
    color: colors.claro
  },
  inputError: {
    borderBottomColor: '#f00'
  },
  inputSuccess: {
    borderBottomColor: colors.fl
  },
  placeholder: {
    color: colors.vrdclr
  }
})
