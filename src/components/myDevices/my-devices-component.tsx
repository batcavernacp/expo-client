import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { graphql } from 'react-relay'
import { useQuery } from 'relay-hooks'
import { UserFragment } from './user-fragment'

const QUERY_MY_DEVICES = graphql`
  query myDevicesComponentQuery {
    myDevices {
      devices {
        id
        name
        users {
          id
          email
        }
      }
    }
  }
`

export function MyDevices () {
  const { error, props } = useQuery({ query: QUERY_MY_DEVICES, variables: null })

  if (error) return <Text>{error[0] ? error[0].message : error.message}</Text>

  if (!props) return <Text>loading</Text>

  return (
    <FlatList
      data={props.myDevices.devices}
      renderItem={renderDevice}
      keyExtractor={item => item.id} />
  )
}

function renderDevice ({ item }) {
  return (
    <>
      <Text>{item.name}</Text>
      <FlatList
        data={item.users}
        renderItem={renderUser}
        keyExtractor={item => item.id} />
    </>
  )
}

function renderUser ({ item }) {
  return <Text>{item.email}</Text>
}
