import { useState } from 'react'
import { graphql } from 'react-relay'
import { useMutation } from 'relay-hooks'
import { useDispatch } from '../reducer'
import firebase from '../services/firebase'
import useNavigation from '~/useNavigation'

const MUTATION_REGISTER = graphql`
  mutation useAuthActionRegisterWithDeviceMutation($input: RegisterWithDeviceInput!) {
    registerWithDevice(input: $input) {
      success
    }
  }
`

const MUTATION_LOGIN = graphql`
  mutation useAuthActionLoginMutation {
    login {
      user {
        id
        email
      }
    }
  }
`

const MUTATION_CHECK = graphql`
  mutation useAuthActionCheckQRCodeMutation($input: RegisterWithDeviceInput!) {
    checkQRCode(input: $input) {
      success
    }
  }
`

export function useAuthAction () {
  const { authDispatch } = useDispatch()
  const [mutateRegister] = useMutation(MUTATION_REGISTER)
  const [mutateLogin] = useMutation(MUTATION_LOGIN)
  const [mutateCheck] = useMutation(MUTATION_CHECK)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const navigation = useNavigation()

  async function logout () {
    await firebase.auth().signOut()
    authDispatch.logout()
    navigation.navigate('Auth')
  }

  async function checkQRCode (qrcode: string) {
    try {
      setLoading(true)
      const { checkQRCode } = await mutateCheck({
        variables: { input: { qrcode } }
      })
      setLoading(false)
      return checkQRCode.success
    } catch (err) {
      setLoading(false)
      setError(err.message)
      return false
    }
  }

  async function login () {
    try {
      setLoading(true)
      const { emailVerified, email } = firebase.auth().currentUser
      const data = await mutateLogin({ variables: {} })
      setLoading(false)
      if (!data.login.user) {
        await logout()
        return false
      }
      authDispatch.login({ email, emailVerified, ...data.login.user })
      return true
    } catch (err) {
      setLoading(false)
      setError(err.message)
      return false
    }
  }

  async function loginEmailPassword (email: string, password: string) {
    try {
      setLoading(true)
      setError('')
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      const data = await mutateLogin({ variables: {} })
      authDispatch.login({
        email,
        emailVerified: user.emailVerified,
        ...data.login.user
      })
      setLoading(false)
      navigation.navigate('App')
      return true
    } catch (err) {
      setLoading(false)
      setError(err.message)
      return false
    }
  }

  async function registerWithDevice (email: string, password: string, qrcode: string) {
    try {
      setLoading(true)
      setError('')
      if (!await checkQRCode(qrcode)) throw new Error('')

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      const { registerWithDevice } = await mutateRegister({
        variables: { input: { qrcode } }
      })
      authDispatch.login({
        email,
        emailVerified: user.emailVerified
      })
      setLoading(false)
      if (registerWithDevice.success) navigation.navigate('App')
      return true
    } catch (err) {
      setLoading(false)
      setError(err.message)
      return false
    }
  }

  return {
    error,
    loading,
    login,
    loginEmailPassword,
    logout,
    registerWithDevice,
    checkQRCode
  }
}
