import React from 'react'
import { Text } from 'react-native'
import { graphql } from 'react-relay'
import { useFragment } from 'relay-hooks'

export const userFragmentUser = graphql`
  fragment userFragment_user on User {
    email
  }
`

export function UserFragment (props) {
  const { email } = useFragment(userFragmentUser, props.users)
  console.log({ email })
  return <Text>{email}</Text>
}
