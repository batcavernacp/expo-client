import { useState } from 'react'
import { graphql } from 'react-relay'
import { useMutation } from 'relay-hooks'
import { useDispatch } from '../reducer'
import firebase from '../services/firebase'
import useNavigation from '~/useNavigation'
import * as SecureStore from 'expo-secure-store'

const MUTATION_REGISTER = graphql`
  mutation useAuthActionRegisterMutation($newUser: RegisterInput!) {
    register(newUser: $newUser) {
      user {
        id
        username
      }
    }
  }
`

const MUTATION_LOGIN = graphql`
  mutation useAuthActionLoginMutation {
    login {
      user {
        id
        username
      }
    }
  }
`

const MUTATION_CHECK = graphql`
  mutation useAuthActionCheckMutation($check: CheckPreRegister!) {
    checkPreRegister(check: $check) {
      available
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

  async function checkUsername (username) {
    try {
      setLoading(true)
      const { checkPreRegister } = await mutateCheck({
        variables: { check: { username } }
      })
      setLoading(false)
      return checkPreRegister.available
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
      console.log({ data })
      if (!data.login.user) {
        await logout()
        return false
      }
      authDispatch.login({ email, emailVerified, ...data.login.user })
      return true
    } catch (err) {
      console.log(err)
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

  async function register (email: string, password: string, username: string) {
    try {
      setLoading(true)
      setError('')
      const { checkPreRegister } = await mutateCheck({
        variables: { check: { username } }
      })

      if (!checkPreRegister.available) {
        throw new Error('Username already exists')
      }

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      const data = await mutateRegister({
        variables: { newUser: { username } }
      })
      authDispatch.login({
        email,
        emailVerified: user.emailVerified,
        ...data.register.user
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

  return {
    error,
    loading,
    login,
    loginEmailPassword,
    logout,
    register,
    checkUsername
  }
}
