import { execute } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { parse } from 'graphql'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import firebase from './services/firebase'

let userFire: firebase.User

firebase.auth().onAuthStateChanged(user => {
  userFire = user
})

const authLink = setContext(async (_, { headers }) =>
  userFire
    ? {
      headers: {
        ...headers,
        token: await userFire.getIdToken(true)
      }
    }
    : {
      headers: {
        ...headers
      }
    }
)

const httpLink = new HttpLink({
  uri: __DEV__
    ? 'http://192.168.100.13:3000/graphql'
    : 'https://automation-batcaverna.herokuapp.com/graphql'
})

const subscriptionLink = () => new WebSocketLink({
  options: {
    connectionParams: async () => (userFire ? { token: await userFire.getIdToken(true) } : {}),
    reconnect: true
  },
  uri: __DEV__
    ? 'ws://192.168.100.13:3000/graphql'
    : 'wss://automation-batcaverna.herokuapp.com/graphql'
})

function fetchFunction (operation, variables, cacheConfig, uploadables): any {
  return execute(authLink.concat(httpLink), {
    query: parse(operation.text),
    variables
  })
}

function subscriptionFunction (operation, variables, cacheConfig, observer) {
  return subscriptionLink().request({
    query: parse(operation.text),
    variables
  })
}

const network = Network.create(fetchFunction, subscriptionFunction)
const store = new Store(new RecordSource())

export const environment = new Environment({
  network,
  store
})
