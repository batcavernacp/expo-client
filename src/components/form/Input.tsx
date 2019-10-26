import { useField } from 'formik'
import React, { MutableRefObject } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { colors } from '~/style/cores';

interface InputProps extends TextInputProps {
  name: string;
  inputRef?: MutableRefObject<TextInput>;
}

export function TextInputFormik (props: InputProps) {
  const [field, meta] = useField(props.name)

  function _onBlur (e) {
    if (props.onBlur) props.onBlur(e)
    field.onBlur(props.name)(e)
  }

  const error = () => meta.touched && meta.error
  const { inputRef } = props
  return (
    <View style={styles.container}>
      {!!field.value && <Text style={styles.placeholder}>{props.placeholder || field.name}</Text>}
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
      {error() && <Text style={styles.error}>{error()}</Text>}
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
    borderBottomColor: '#aaa',
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
    borderBottomColor: '#0f0'
  },
  placeholder: {
    color: '#aaa'
  }
})
