import { authReducer, initialState as auth, Auth } from './auth-store'

export interface State {
  auth: Auth;
}

const initialState: State = {
  auth
}

const reducer = (state: State, action): State => {
  return {
    auth: authReducer(state.auth, action)
  }
}

export const store = { initialState, reducer }
