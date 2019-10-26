import React from 'react'
import { Text } from 'react-native'

export class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // this.props.navigation.navigate('')
    // You can also log the error to an error reporting service
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Something went wrong.</Text>
    }
    return this.props.children
  }
}
