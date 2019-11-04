/* eslint-disable no-case-declarations */
export const initialState: DeviceStore = {
  owned: null,
  guest: null,
  loading: false,
  error: null
}

const types = {
  SET_MY_DEVICES: 'SET_MY_DEVICES',
  LOADING_MY_DEVICES: 'LOADING_DEVICES',
  ERROR_MY_DEVICES: 'ERROR_MY_DEVICES',
  SWITCHED: 'SWITCHED',
  SEND_INVITE: 'SEND_INVITE',
  CANCEL_INVITE: 'CANCEL_INVITE',
  LOGOUT: 'LOGOUT'
}

export function myDevicesReducer (state = initialState, action) {
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

    case types.SWITCHED:
      return {
        ...state,
        guest: state.guest.map(device =>
          device.id === action.payload.id
            ? { ...device, status: action.payload.status }
            : device
        ),
        owned: state.owned.map(device =>
          device.id === action.payload.id
            ? { ...device, status: action.payload.status }
            : device
        )
      }

    case types.SEND_INVITE:
      return {
        ...state,
        owned: state.owned.map(device =>
          device.id === action.payload.id
            ? { ...device, pendingInvites: [...device.pendingInvites, action.payload.email] }
            : device
        )
      }

    case types.CANCEL_INVITE:
      return {
        ...state,
        owned: state.owned.map(device =>
          device.id === action.payload.id
            ? { ...device, pendingInvites: device.pendingInvites.filter(invite => invite !== action.payload.email) }
            : device
        )
      }

    case types.LOGOUT:
      return initialState

    default:
      return state
  }
}

export interface DeviceStore {
  owned: [DeviceOwned];
  guest: [DeviceGuest];
  loading: boolean;
  error: string;
}

export interface DeviceOwned extends DeviceGuest {
  id: string;
  name: string;
  users: [User];
  pendingInvites: [string];
}

export interface DeviceGuest {
  id: string;
  name: string;
  status: boolean;
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

  function switched (id: string, status: boolean) {
    dispatch({
      type: types.SWITCHED,
      payload: {
        id,
        status
      }
    })
  }

  function setError (payload: string) {
    dispatch({ type: types.ERROR_MY_DEVICES, payload })
  }

  function sendInvite (id, email) {
    dispatch({
      type: types.SEND_INVITE,
      payload: {
        id,
        email
      }
    })
  }

  function cancelInvite (id, email) {
    dispatch({
      type: types.CANCEL_INVITE,
      payload: {
        id,
        email
      }
    })
  }

  function logout () {
    dispatch({ type: types.LOGOUT })
  }

  return {
    setMyDevices,
    loadingDevices,
    cancelInvite,
    setError,
    logout,
    switched,
    sendInvite
  }
}
