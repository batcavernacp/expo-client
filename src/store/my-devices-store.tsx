/* eslint-disable no-case-declarations */
export const initialState: DeviceStore = {
  owned: null,
  guest: null
}

const types = {
  FETCH_MY_DEVICES_REQUEST: 'FETCH_MY_DEVICES_REQUEST',
  FETCH_MY_DEVICES_SUCCESS: 'FETCH_MY_DEVICES_SUCCESS',
  FETCH_MY_DEVICES_FAILURE: 'FETCH_MY_DEVICES_FAILURE',

  SEND_INVITE_REQUEST: 'SEND_INVITE_REQUEST',
  SEND_INVITE_SUCCESS: 'SEND_INVITE_SUCCESS',
  SEND_INVITE_FAILURE: 'SEND_INVITE_FAILURE',

  REMOVE_USER_REQUEST: 'REMOVE_USER_REQUEST',
  REMOVE_USER_SUCCESS: 'REMOVE_USER_SUCCESS',
  REMOVE_USER_FAILURE: 'REMOVE_USER_FAILURE',

  CANCEL_INVITE_REQUEST: 'CANCEL_INVITE_REQUEST',
  CANCEL_INVITE_SUCCESS: 'CANCEL_INVITE_SUCCESS',
  CANCEL_INVITE_FAILURE: 'CANCEL_INVITE_FAILURE',

  ADD_DEVICE_REQUEST: 'ADD_DEVICE_REQUEST',
  ADD_DEVICE_SUCCESS: 'ADD_DEVICE_SUCCESS',
  ADD_DEVICE_FAILURE: 'ADD_DEVICE_FAILURE',

  // TODO: REQUEST, SUCCESS, FAILURE
  ADD_USER: 'ADD_USER',

  SWITCHED: 'SWITCHED',
  LOGOUT: 'LOGOUT'
}

export function myDevicesReducer (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MY_DEVICES_SUCCESS:
      return {
        ...action.payload
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

    case types.SEND_INVITE_SUCCESS:
      return {
        ...state,
        owned: state.owned.map(device =>
          device.id === action.payload.id
            ? { ...device, pendingInvites: [...device.pendingInvites, action.payload.email] }
            : device
        )
      }

    case types.ADD_USER:
      return {
        ...state,
        owned: state.owned.map(device =>
          device.id === action.payload.id
            ? { ...device, users: [...device.users, action.payload.user] }
            : device
        )
      }

    case types.ADD_DEVICE_SUCCESS:
      return {
        ...state,
        owned: [...state.owned, action.payload.device]
      }

    case types.CANCEL_INVITE_SUCCESS:
      return {
        ...state,
        owned: state.owned.map(device =>
          device.id === action.payload.id
            ? { ...device, pendingInvites: device.pendingInvites.filter(invite => invite !== action.payload.email) }
            : device
        )
      }

    case types.REMOVE_USER_SUCCESS:
      return {
        ...state,
        owned: state.owned.map(device =>
          device.id === action.payload.id
            ? { ...device, users: device.users.filter(user => user.id !== action.payload.user) }
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
  function fetchDevicesSuccess (payload: SetDevicePayload) {
    dispatch({ type: types.FETCH_MY_DEVICES_SUCCESS, payload })
  }

  function fetchDevicesRequest () {
    dispatch({ type: types.FETCH_MY_DEVICES_REQUEST })
  }

  function sendInviteRequest () {
    dispatch({ type: types.SEND_INVITE_REQUEST })
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

  function fetchDevicesFailure (error: string) {
    dispatch({
      type: types.FETCH_MY_DEVICES_FAILURE,
      payload: {
        error
      }
    })
  }

  function sendInviteFailure (error: string) {
    dispatch({
      type: types.SEND_INVITE_FAILURE,
      payload: {
        error
      }
    })
  }

  function removeUserRequest () {
    dispatch({
      type: types.REMOVE_USER_REQUEST
    })
  }

  function removeUserFailure (error: string) {
    dispatch({
      type: types.REMOVE_USER_FAILURE,
      payload: {
        error
      }
    })
  }

  function sendInviteSuccess (id, email) {
    dispatch({
      type: types.SEND_INVITE_SUCCESS,
      payload: {
        id,
        email
      }
    })
  }

  function cancelInviteFailure (error: string) {
    dispatch({
      type: types.CANCEL_INVITE_FAILURE,
      payload: {
        error
      }
    })
  }

  function cancelInviteRequest () {
    dispatch({
      type: types.CANCEL_INVITE_REQUEST
    })
  }

  function addDeviceFailure (error: string) {
    dispatch({
      type: types.ADD_DEVICE_FAILURE,
      payload: {
        error
      }
    })
  }

  function addDeviceRequest () {
    dispatch({
      type: types.ADD_DEVICE_REQUEST
    })
  }

  function removeUserSuccess (id, user) {
    dispatch({
      type: types.REMOVE_USER_SUCCESS,
      payload: {
        id,
        user
      }
    })
  }

  function cancelInviteSuccess (id, email) {
    dispatch({
      type: types.CANCEL_INVITE_SUCCESS,
      payload: {
        id,
        email
      }
    })
  }

  function addUser (id, user) {
    dispatch({
      type: types.ADD_USER,
      payload: {
        id,
        user
      }
    })
  }

  function addDeviceSuccess (device: DeviceOwned) {
    dispatch({
      type: types.ADD_DEVICE_SUCCESS,
      payload: {
        device
      }

    })
  }

  function logout () {
    dispatch({ type: types.LOGOUT })
  }

  return {
    fetchDevicesSuccess,
    fetchDevicesRequest,
    fetchDevicesFailure,
    cancelInviteSuccess,
    cancelInviteFailure,
    cancelInviteRequest,
    logout,
    switched,
    sendInviteRequest,
    sendInviteSuccess,
    sendInviteFailure,
    removeUserSuccess,
    removeUserRequest,
    removeUserFailure,
    addUser,
    addDeviceSuccess,
    addDeviceFailure,
    addDeviceRequest
  }
}
