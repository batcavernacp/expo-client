import { graphql } from 'react-relay'
import { useMutation } from 'relay-hooks'
import { useSubscription } from '~/useSubscription'
import { useState } from 'react'

const MUTATION_SWITCH = graphql`
  mutation useAutomationActionSwitchMutation($input: SwitchInput!) {
    switch(input: $input)
  }
`

const SUBSCRIPTION_SWITCHED = graphql`
  subscription useAutomationActionSwitchedSubscription {
    switched {
      turned
      relay
    }
  }
`

export function useAutomationAction () {
  const [mutateSwitch] = useMutation(MUTATION_SWITCH)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [state, setState] = useState({ turned: 'OFF' })

  useSubscription(SUBSCRIPTION_SWITCHED, {
    onNext: ({ switched }) => {
      console.log({ switched })
      setState(switched)
    }
  })

  async function switchRelay (action, relay) {
    try {
      setLoading(true)
      setError('')
      setState({ turned: action })
      await mutateSwitch({
        variables: {
          input: {
            turn: action,
            relay
          }
        }
      })
      if (action == 'ON') {
        setTimeout(() => {
          switchRelay('OFF', relay)
        }, 25)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setState({ turned: action === 'ON' ? 'OFF' : 'ON' })
      setError(err[0] ? err[0].message : err.message)
    }
  }

  return {
    switchRelay,

    loading,

    error,

    state
  }
}
