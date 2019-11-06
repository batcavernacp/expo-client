import { useEffect } from 'react'
import { graphql } from 'react-relay'
import { useQuery } from 'relay-hooks'
import { useDispatch } from '~/reducer'

const QUERY_MY_DEVICES = graphql`
  query myDevicesComponentQuery {
    myDevices {
      owned {
        id
        name
        users: usersInvited {
          id
          email
        }
        pendingInvites
      }
      guest {
        id
        name
      }
    }
  }
`

export function MyDevices () {
  const { error, props } = useQuery({ query: QUERY_MY_DEVICES, variables: null })
  const { myDevicesDispatch } = useDispatch()

  useEffect(() => {
    if (error) {
      myDevicesDispatch.fetchDevicesFailure(error[0] ? error[0].message : error.message)
    } else if (!props) {
      myDevicesDispatch.fetchDevicesRequest()
    } else {
      myDevicesDispatch.fetchDevicesSuccess(props.myDevices)
    }
  }, [props, error])
}
