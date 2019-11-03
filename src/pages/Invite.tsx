import React, { useState } from 'react'
import { Button, Text, View, StyleSheet, TextInput, KeyboardAvoidingView, StatusBar, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import { useAuthAction } from '../actions/useAuthAction'
import { useBackButton } from '../device/useBackButton'
import { object, string } from 'yup'
import { FormikProps, Formik, FormikHelpers } from 'formik'
import { SafeAreaView, ScrollView } from 'react-navigation'
import { PageProps } from './interface'
import { TextInputFormik } from '~/components/form/Input'
import { useFocus } from '~/useFocus'
import { colors } from '~/style/cores'
import { Buttonperson } from '~/components/Button'

interface RegisterForm {
  email: string;
}

const initialValues: RegisterForm = {
  email: ''
}

const validation = object().shape({
  email: string()
    .email('Email inválido')
    .required('Email inválido')
})

export function CheckInviteEmail ({ navigation }: PageProps) {
  useBackButton(() => navigation.goBack(null))

  const { checkEmail, loading, error } = useAuthAction()

  function CheckEmailForm (props: FormikProps<RegisterForm>) {
    const handleSubmit = ev => props.handleSubmit(ev)

    if (loading) return <SafeAreaView style={styles.loading}><ActivityIndicator size="large" color={colors.fl} /></SafeAreaView>

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.inner}>
          <View style={{ flex: 1 }} />
          {/* <StatusBar barStyle="light-content" translucent={true} backgroundColor={colors.vrdesc} /> */}
          <Text style={{ color: colors.claro }}>{error}</Text>
          <TextInputFormik
            autoFocus={false}
            autoCapitalize="none"
            textContentType="emailAddress"
            placeholder="email"
            name="email"
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            blurOnSubmit={props.isValid}
          />

          <Buttonperson onPress={handleSubmit} styleButton={styles.botao}>Checar email</Buttonperson>

          <View style={{ flex: 1 }} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }

  async function submit (values: RegisterForm, props: FormikHelpers<RegisterForm>) {
    if (await checkEmail(values.email)) {
      navigation.navigate('Register', { email: values.email })
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={submit}
        render={CheckEmailForm}
      />
    </KeyboardAvoidingView>
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
  },
  inner: {
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
