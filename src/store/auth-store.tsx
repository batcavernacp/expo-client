export interface Auth extends LoginPayload {
  logged: boolean;
}

export const initialState: Auth = {
  email: null,
  emailVerified: null,
  logged: false,
  username: null
}

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export function authReducer (state: Auth, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...action.payload,
        logged: true
      }

    case types.LOGOUT:
      return initialState

    default:
      return state
  }
}

interface LoginPayload {
  emailVerified: boolean;
  username: string;
  email: string;
}

export function useAuthDispatch (dispatch) {
  function login (payload: LoginPayload) {
    dispatch({ type: types.LOGIN, payload })
  }

  function logout () {
    dispatch({ type: types.LOGOUT })
  }

  return {
    login,
    logout
  }
}
