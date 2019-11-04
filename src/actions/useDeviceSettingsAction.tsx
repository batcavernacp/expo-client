import { graphql } from 'react-relay'
import { useMutation } from 'relay-hooks'
import { useState } from 'react'
import { useDispatch } from '~/reducer'

const MUTATION_SEND_INVITE = graphql`
  mutation useDeviceSettingsActionSendInviteMutation($input:  SendInviteInput!) {
  sendInvite(input: $input) {
    success
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

export function useDeviceSettingsAction () {
  const [mutateSendInvite] = useMutation(MUTATION_SEND_INVITE)
  const [mutateCancelInvite] = useMutation(MUTATION_CANCEL_INVITE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { myDevicesDispatch } = useDispatch()

  async function sendInvite (device, email) {
    try {
      setLoading(true)
      setError('')
      await mutateSendInvite({
        variables: {
          input: {
            device,
            email
          }
        }
      })
      myDevicesDispatch.sendInvite(device, email)
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

  return {
    sendInvite,

    cancelInvite,

    loading,

    error
  }
}
