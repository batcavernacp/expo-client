import React from 'react'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import { StyleSheet, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { object, string } from 'yup'
import { useFocus } from '~/useFocus'
import { useAuthAction } from '../actions/useAuthAction'
import { TextInputFormik } from '../components/form/Input'
import { useBackButton } from '../device/useBackButton'
import { SafeAreaView } from 'react-navigation'
import { PageProps } from './interface'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'

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
    .email('Email inválido')
    .required('Email inválido'),
  password: string()
    .min(6, 'Senha deve conter no minimo 6 caracteres')
    .required('Senha deve conter no minimo 6 caracteres')
})

export function Login ({ navigation }: PageProps) {
  const [passwordRef, setPasswordFocus] = useFocus<TextInput>()

  useBackButton(() => navigation.goBack(null))

  function LoginForm (props: FormikProps<Values>) {
    const handleSubmit = ev => props.handleSubmit(ev)
    if (loading) {
      return <SafeAreaView style={styles.loading}><ActivityIndicator size="large" color={colors.fl} /></SafeAreaView>
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.view}>
          <View style={{ flex: 1 }} />
          <TextInputFormik
            autoFocus={false}
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
          <Buttonperson onPress={handleSubmit} styleButton={styles.botao}> Login </Buttonperson>
          <Buttonperson onPress={() => navigation.goBack(null)} styleButton={styles.botao}> Voltar </Buttonperson>
          <Text style={styles.error}>{error}</Text>
          <View style={{ flex: 1 }} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }

  const { loginEmailPassword, error, loading } = useAuthAction()

  function submit (values: Values, props: FormikHelpers<Values>) {
    return loginEmailPassword(values.email, values.password)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={submit}
        render={LoginForm}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  botao: {
    padding: 12
  },
  error: {
    color: colors.claro,
    alignSelf: 'center',
    paddingHorizontal: 30
  },
  view: {
    flex: 1,
    backgroundColor: colors.escr,
    justifyContent: 'flex-end'
  },
  loading: {
    flex: 1,
    backgroundColor: colors.escr,
    justifyContent: 'center'
  }
})
