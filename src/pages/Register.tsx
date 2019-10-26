import React, { useState } from 'react'
import { Button, Text, View, StyleSheet, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { useBackButton } from '../device/useBackButton'
import { object, string } from 'yup'
import { FormikProps, Formik, FormikHelpers } from 'formik'
import { SafeAreaView, ScrollView } from 'react-navigation'
import { PageProps } from './interface'
import { TextInputFormik } from '~/components/form/Input'
import { useFocus } from '~/useFocus'
import { colors } from '~/style/cores';
import { Buttonperson } from '~/components/Button';

interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterForm = {
  confirmPassword: '',
  email: '',
  password: '',
  username: ''
}

const validation = object().shape({
  email: string()
    .email('Email inválido')
    .required('Email inválido'),

  username: string()
    .required('Nome de usuário necessário'),

  password: string()
    .min(6, 'Senha deve conter no minimo 6 caracteres')
    .required('Senha deve conter no minimo 6 caracteres'),

  confirmPassword: string()
    .required('senhas não conferem')
    .test('compare', 'senhas não conferem',
      function (confirmPassword) {
        return confirmPassword === this.parent.password
      })
})

export function Register ({ navigation }: PageProps) {
  useBackButton(() => navigation.goBack(null))
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const { register, checkUsername, loading, error } = useAuthAction()

  const [usernameRef, setUsernameFocus] = useFocus<TextInput>()
  const [passwordRef, setPasswordFocus] = useFocus<TextInput>()
  const [password2Ref, setPassword2Focus] = useFocus<TextInput>()

  function RegisterForm (props: FormikProps<RegisterForm>) {
    const handleSubmit = ev => props.handleSubmit(ev)

    const checkUser = async () =>
      setUsernameAvailable(await checkUsername(props.values.username))

    if (loading) return <Text>loading</Text>

    return <ScrollView>
      {/* <StatusBar barStyle="light-content" translucent={true} backgroundColor={colors.vrdesc} /> */}
      <TextInputFormik
        autoFocus={true}
        textContentType="emailAddress"
        placeholder="email"
        name="email"
        onSubmitEditing={setUsernameFocus}
        blurOnSubmit={false}
        returnKeyType="next"
      />
      <TextInputFormik
        inputRef={usernameRef}
        placeholder="username"
        name="username"
        onSubmitEditing={setPasswordFocus && checkUser}
        blurOnSubmit={false}
        returnKeyType="next"
      />
      {usernameAvailable !== null &&
        <Text>{props.values.username && usernameAvailable ? 'available' : 'not available'}</Text>
      }
      <TextInputFormik
        inputRef={passwordRef}
        textContentType="password"
        secureTextEntry={true}
        placeholder="password"
        name="password"
        onSubmitEditing={setPassword2Focus}
        blurOnSubmit={false}
        returnKeyType="next"
      />
      <TextInputFormik
        inputRef={password2Ref}
        textContentType="password"
        secureTextEntry={true}
        placeholder="confirm password"
        name="confirmPassword"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        blurOnSubmit={props.isValid}
      />
      <Buttonperson onPress={handleSubmit} styleButton={styles.botao}> Cadastrar </Buttonperson>

      <Buttonperson onPress={() => navigation.goBack(null)} styleButton={styles.botao}> Voltar </Buttonperson>

      <Text>{error}</Text></ScrollView>
  }

  function submit (values: RegisterForm, props: FormikHelpers<RegisterForm>) {
    return register(values.email, values.password, values.username)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={submit}
        render={RegisterForm}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.escr
  },
  botao: {
  flexShrink: 1
  }
})
