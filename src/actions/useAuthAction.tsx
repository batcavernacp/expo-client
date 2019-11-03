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

const MUTATION_REGISTER_INVITE = graphql`
  mutation useAuthActionRegisterWithInviteMutation {
    registerWithInvite {
      success
      error
      user {
        id
      }
    }
  }
`

const MUTATION_CHECK_EMAIL = graphql`
  mutation useAuthActionCheckEmailMutation($input: CheckEmailInput!) {
    checkEmail(input: $input) {
      success
      error
    }
  }
`

const MUTATION_LOGIN = graphql`
  mutation useAuthActionLoginMutation {
    login {
      user {
        id
      }
    }
  }
`

const MUTATION_CHECK_QRCODE = graphql`
  mutation useAuthActionCheckQRCodeMutation($input: RegisterWithDeviceInput!) {
    checkQRCode(input: $input) {
      success
    }
  }
`

export function useAuthAction () {
  const { authDispatch } = useDispatch()
  const [mutateRegister] = useMutation(MUTATION_REGISTER)
  const [mutateRegisterInvite] = useMutation(MUTATION_REGISTER_INVITE)
  const [mutateLogin] = useMutation(MUTATION_LOGIN)
  const [mutateCheckQRCode] = useMutation(MUTATION_CHECK_QRCODE)
  const [mutateCheckEmail] = useMutation(MUTATION_CHECK_EMAIL)
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
      setError('')
      const { checkQRCode } = await mutateCheckQRCode({
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

  async function checkEmail (email: string) {
    try {
      setLoading(true)
      setError('')
      const { checkEmail } = await mutateCheckEmail({
        variables: { input: { email } }
      })
      setLoading(false)
      if (checkEmail.error) setError(checkEmail.error)

      return checkEmail.success
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

      const data = await mutateLogin({ variables: {} })
      authDispatch.login({
        email,
        emailVerified: user.emailVerified,
        ...data.login.user
      })
      setLoading(false)
      return true
    } catch (err) {
      setLoading(false)
      setError(err.message)
      return false
    }
  }

  async function registerWithInvite (email: string, password: string) {
    try {
      setLoading(true)
      setError('')
      if (!await checkEmail(email)) throw new Error('invalid email')

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      const { registerWithInvite } = await mutateRegisterInvite({
        variables: {}
      })

      if (registerWithInvite.error) throw new Error(registerWithInvite.error)

      authDispatch.login({
        email,
        emailVerified: user.emailVerified,
        id: registerWithInvite.user.id
      })

      setLoading(false)
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
    checkQRCode,
    checkEmail,
    registerWithInvite
  }
}
