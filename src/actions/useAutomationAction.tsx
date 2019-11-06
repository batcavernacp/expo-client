import { graphql } from 'react-relay'
import { useMutation } from 'relay-hooks'
import { useSubscription } from '~/useSubscription'
import { useState } from 'react'
import { useDispatch } from '~/reducer'
import { SwitchInput } from '~/generated/graphql'

const MUTATION_SWITCH = graphql`
  mutation useAutomationActionSwitchMutation($input: SwitchInput!) {
    switch(input: $input)
  }
`

const SUBSCRIPTION_SWITCHED = graphql`
  subscription useAutomationActionSwitchedSubscription {
    switched {
      turned
      device {
        id
      }
    }
  }
`

export function useAutomationAction () {
  const [mutateSwitch] = useMutation(MUTATION_SWITCH)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { myDevicesDispatch } = useDispatch()

  useSubscription(SUBSCRIPTION_SWITCHED, {
    onNext: ({ switched }) => {
      if (!switched.device) return
      // TODO: improve device response time
      myDevicesDispatch.switched(switched.device.id, switched.turned === 'ON')
    }
  })

  async function switchRelay (input: SwitchInput) {
    try {
      setLoading(true)
      setError('')
      // myDevicesDispatch.switched(device, action === 'ON')
      await mutateSwitch({
        variables: {
          input
        }
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
      // myDevicesDispatch.switched(device, action !== 'ON')
      setError(err[0] ? err[0].message : err.message)
    }
  }

  return {
    switchRelay,

    loading,

    error
  }
}
