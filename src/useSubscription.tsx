import { requestSubscription } from 'react-relay'
import { useEffect, useContext } from 'react'
import { ReactRelayContext } from 'relay-hooks'

export function useSubscription (subscription, { variables = null, onNext = data => {} }) {
  const { environment } = useContext(ReactRelayContext)

  useEffect(() => {
    const sub = requestSubscription(
      environment,
      {
        subscription,
        variables,
        onNext,
        // optional but recommended:
        onCompleted: () => { /* server closed the subscription */ },
        onError: error => console.error(error)
      }
    )

    return sub.dispose
  }, [])
}
