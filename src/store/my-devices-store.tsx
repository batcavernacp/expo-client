export const initialState: DeviceStore = {
  owned: [{
    id: null,
    name: null,
    users: [{ email: null, id: null }]
  }],
  guest: [{
    id: null,
    name: null
  }],
  loading: false,
  error: null
}

const types = {
  SET_MY_DEVICES: 'SET_MY_DEVICES',
  LOADING_MY_DEVICES: 'LOADING_DEVICES',
  ERROR_MY_DEVICES: 'ERROR_MY_DEVICES',
  LOGOUT: 'LOGOUT'
}

export function myDevicesReducer (state: DeviceStore, action) {
  switch (action.type) {
    case types.SET_MY_DEVICES:
      return {
        loading: false,
        error: null,
        ...action.payload
      }

    case types.LOADING_MY_DEVICES:
      return {
        ...state,
        loading: true
      }

    case types.ERROR_MY_DEVICES:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case types.LOGOUT:
      return initialState

    default:
      return initialState
  }
}

export interface DeviceStore {
  owned: [DeviceOwned];
  guest: [DeviceGuest];
  loading: boolean;
  error: string;
}

export interface DeviceOwned {
  id: string;
  name: string;
  users: [User];
}

export interface DeviceGuest {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
}

interface SetDevicePayload {
  owned: [DeviceOwned];
  guest: [DeviceGuest];
}

export function useMyDevicesDispatch (dispatch) {
  function setMyDevices (payload: SetDevicePayload) {
    dispatch({ type: types.SET_MY_DEVICES, payload })
  }

  function loadingDevices () {
    dispatch({ type: types.LOADING_MY_DEVICES })
  }

  function setError (payload: string) {
    dispatch({ type: types.ERROR_MY_DEVICES, payload })
  }

  function logout () {
    dispatch({ type: types.LOGOUT })
  }

  return {
    setMyDevices,
    loadingDevices,
    setError,
    logout
  }
}
