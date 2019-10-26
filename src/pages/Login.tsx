import React from 'react'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import { Button, StyleSheet, Text, TextInput } from 'react-native'
import { object, string } from 'yup'
import { useFocus } from '~/useFocus'
import { useAuthAction } from '../actions/useAuthAction'
import { TextInputFormik } from '../components/form/Input'
import { useBackButton } from '../device/useBackButton'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: '',
  password: ''
}

const validation = object().shape({
  email: string()
    .email('Invalid Email')
    .required('Invalid Email'),
  password: string()
    .min(6, 'minimum 6 length')
    .required('minimum 6 length')
})

export function Login ({ navigation }: PageProps) {
  const [passwordRef, setPasswordFocus] = useFocus<TextInput>()

  useBackButton(() => navigation.goBack(null))

  function LoginForm (props: FormikProps<Values>) {
    const handleSubmit = ev => props.handleSubmit(ev)
    if (loading) {
      return <Text>Loading</Text>
    }
    return (
      <>
        <TextInputFormik
          autoFocus={true}
          textContentType="emailAddress"
          placeholder="email"
          name="email"
          onSubmitEditing={setPasswordFocus}
          blurOnSubmit={false}
          returnKeyType="next"
        />
        <TextInputFormik
          inputRef={passwordRef}
          textContentType="password"
          secureTextEntry={true}
          placeholder="password"
          name="password"
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          blurOnSubmit={props.isValid}
        />
        <Button title="Login" onPress={handleSubmit} />
        <Button title="Voltar" onPress={() => navigation.goBack(null)} />
        <Text>{error}</Text>
      </>
    )
  }

  const { loginEmailPassword, error, loading } = useAuthAction()

  function submit (values: Values, props: FormikHelpers<Values>) {
    return loginEmailPassword(values.email, values.password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={submit}
        render={LoginForm}
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
