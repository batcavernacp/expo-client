import React, { createContext, useContext, useReducer } from 'react'
import { useAuthDispatch } from './store/auth-store'
import { State } from './store/store'

const StoreContext = createContext([])

export function StoreProvider (props) {
  return (
    <StoreContext.Provider
      value={useReducer(props.store.reducer, props.store.initialState)}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore (): State {
  const [state] = useContext(StoreContext)
  return state
}

export function useDispatch () {
  const [, dispatch] = useContext(StoreContext)
  const authDispatch = useAuthDispatch(dispatch)
  return {
    authDispatch
  }
}
