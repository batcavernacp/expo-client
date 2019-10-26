import React from 'react'
import { Text } from 'react-native'
import { graphql } from 'react-relay'
import { useFragment } from 'relay-hooks'

export const emailFragmentUser = graphql`
  fragment emailFragment_user on User {
    email
  }
`

export function EmailFragment (props) {
  const { email } = useFragment(emailFragmentUser, props.me.user)

  return <Text>{email}</Text>
}
