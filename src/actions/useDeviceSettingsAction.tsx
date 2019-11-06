import { graphql } from 'react-relay'
import { useMutation } from 'relay-hooks'
import { useDispatch } from '~/reducer'
import { SendInviteInput, RemoveUserInput, RegisterNewDeviceInput, SendInvitePayload } from '~/generated/graphql'
import { Payload } from '~/pages/interface'

const MUTATION_SEND_INVITE = graphql`
  mutation useDeviceSettingsActionSendInviteMutation($input:  SendInviteInput!) {
  payload: sendInvite(input: $input) {
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
    error
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
  const { myDevicesDispatch } = useDispatch()

  async function sendInvite (input: SendInviteInput) {
    try {
      myDevicesDispatch.sendInviteRequest()
      const { payload }: Payload<SendInvitePayload> = await mutateSendInvite({
        variables: {
          input
        }
      })
      if (!payload.user) {
        myDevicesDispatch.sendInviteSuccess(input.device, input.email)
      } else {
        myDevicesDispatch.addUser(input.device, payload.user)
      }
      return true
    } catch (err) {
      myDevicesDispatch.sendInviteFailure(err[0] ? err[0].message : err.message)
      return false
    }
  }

  async function cancelInvite (input: SendInviteInput) {
    try {
      myDevicesDispatch.cancelInviteRequest()
      await mutateCancelInvite({
        variables: {
          input
        }
      })
      myDevicesDispatch.cancelInviteSuccess(input.device, input.email)
      return true
    } catch (err) {
      myDevicesDispatch.cancelInviteFailure(err[0] ? err[0].message : err.message)
      return false
    }
  }

  async function removeUser (input: RemoveUserInput) {
    try {
      myDevicesDispatch.removeUserRequest()
      await mutateRemoveUser({
        variables: {
          input
        }
      })
      myDevicesDispatch.removeUserSuccess(input.device, input.user)
      return true
    } catch (err) {
      myDevicesDispatch.removeUserFailure(err[0] ? err[0].message : err.message)
      return false
    }
  }

  async function registerNewDevice (input: RegisterNewDeviceInput) {
    try {
      myDevicesDispatch.addDeviceRequest()
      const { registerNewDevice } = await mutateRegisterNewDevice({
        variables: {
          input
        }
      })
      const { error, device } = registerNewDevice

      if (error) throw new Error(error)

      myDevicesDispatch.addDeviceSuccess(device)
      return true
    } catch (err) {
      myDevicesDispatch.addDeviceFailure(err[0] ? err[0].message : err.message)
      return false
    }
  }

  return {
    sendInvite,

    cancelInvite,

    removeUser,

    registerNewDevice
  }
}
