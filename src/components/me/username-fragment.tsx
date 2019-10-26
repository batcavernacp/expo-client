import React from 'react'
import { Text } from 'react-native'
import { graphql } from 'react-relay'
import { useFragment } from 'relay-hooks'

export const usernameFragmentUser = graphql`
  fragment usernameFragment_user on User {
    username
  }
`

export function UsernameFragment (props) {
  const { username } = useFragment(usernameFragmentUser, props.me.user)

  return <Text>{username}</Text>
}
