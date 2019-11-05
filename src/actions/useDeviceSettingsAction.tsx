import { graphql } from 'react-relay'
import { useMutation } from 'relay-hooks'
import { useState } from 'react'
import { useDispatch } from '~/reducer'

const MUTATION_SEND_INVITE = graphql`
  mutation useDeviceSettingsActionSendInviteMutation($input:  SendInviteInput!) {
  sendInvite(input: $input) {
    success
    user {
      id
      email
    }
  }
}
`

const MUTATION_CANCEL_INVITE = graphql`
  mutation useDeviceSettingsActionCancelInviteMutation($input:  SendInviteInput!) {
  cancelInvite(input: $input) {
    success
  }
}
`

const MUTATION_REMOVE_USER = graphql`
  mutation useDeviceSettingsActionRemoveUserMutation($input:  RemoveUserInput!) {
  removeUser(input: $input) {
    success
  }
}
`

const MUTATION_REGISTER_NEW_DEVICE = graphql`
  mutation useDeviceSettingsActionRegisterNewDeviceMutation($input:  RegisterNewDeviceInput!) {
  registerNewDevice(input: $input) {
    success
    error
    device {
      id
      name
      users: usersInvited {
        id
        email
      }
      pendingInvites
    }
  }
}
`

export function useDeviceSettingsAction () {
  const [mutateSendInvite] = useMutation(MUTATION_SEND_INVITE)
  const [mutateCancelInvite] = useMutation(MUTATION_CANCEL_INVITE)
  const [mutateRemoveUser] = useMutation(MUTATION_REMOVE_USER)
  const [mutateRegisterNewDevice] = useMutation(MUTATION_REGISTER_NEW_DEVICE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { myDevicesDispatch } = useDispatch()

  async function sendInvite (device, email) {
    try {
      setLoading(true)
      setError('')
      const { sendInvite } = await mutateSendInvite({
        variables: {
          input: {
            device,
            email
          }
        }
      })
      if (!sendInvite.user) {
        myDevicesDispatch.sendInvite(device, email)
      } else {
        myDevicesDispatch.addUser(device, sendInvite.user)
      }
      setLoading(false)
      return true
    } catch (err) {
      console.log(err)
      setError(err[0] ? err[0].message : err.message)
      return false
    }
  }

  async function cancelInvite (device, email) {
    try {
      setLoading(true)
      setError('')
      await mutateCancelInvite({
        variables: {
          input: {
            device,
            email
          }
        }
      })
      myDevicesDispatch.cancelInvite(device, email)
      setLoading(false)
      return true
    } catch (err) {
      console.log(err)
      setError(err[0] ? err[0].message : err.message)
      return false
    }
  }

  async function removeUser (device, user) {
    try {
      setLoading(true)
      setError('')
      await mutateRemoveUser({
        variables: {
          input: {
            device,
            user
          }
        }
      })
      myDevicesDispatch.removeUser(device, user)
      setLoading(false)
      return true
    } catch (err) {
      console.log(err)
      setError(err[0] ? err[0].message : err.message)
      return false
    }
  }

  async function registerNewDevice (qrcode, name = 'test') {
    try {
      setLoading(true)
      setError('')
      const { registerNewDevice } = await mutateRegisterNewDevice({
        variables: {
          input: {
            qrcode,
            name
          }
        }
      })
      const { success, error, device } = registerNewDevice

      if (error) throw new Error(error)

      if (!success) throw new Error('Unk')

      myDevicesDispatch.addDevice(device)
      setLoading(false)
      return true
    } catch (err) {
      console.log(err)
      setError(err[0] ? err[0].message : err.message)
      return false
    }
  }

  return {
    sendInvite,

    cancelInvite,

    removeUser,

    registerNewDevice,

    loading,

    error
  }
}
