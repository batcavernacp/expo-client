import React, { useState } from 'react'
import { Button, Text, View, StyleSheet, TextInput } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { useBackButton } from '../device/useBackButton'
import { object, string } from 'yup'
import { FormikProps, Formik, FormikHelpers } from 'formik'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { TextInputFormik } from '~/components/form/Input'
import { useFocus } from '~/useFocus'

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const initialValues: RegisterForm = {
  confirmPassword: '',
  email: '',
  password: '',
  username: ''
}

const validation = object().shape({
  email: string()
    .email('Invalid Email')
    .required('Invalid Email'),

  username: string()
    .required('username required'),

  password: string()
    .min(6, 'minimum 6 length')
    .required('minimum 6 length'),

  confirmPassword: string()
    .required('password dont match')
    .test('compare', 'passwords dont match',
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

    return <>
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
      <Button title="Signup" onPress={handleSubmit} />
      <Button title="Back" onPress={() => navigation.goBack(null)} />
      <Text>{error}</Text></>
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
    justifyContent: 'center'
  }
})
