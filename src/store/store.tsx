import { authReducer, initialState as auth, Auth } from './auth-store'
import { myDevicesReducer, initialState as myDevices, DeviceStore } from './my-devices-store'

export interface State {
  auth: Auth;
  myDevices: DeviceStore;
}

const initialState: State = {
  auth,
  myDevices
}

const reducer = (state: State, action): State => {
  return {
    auth: authReducer(state.auth, action),
    myDevices: myDevicesReducer(state.myDevices, action)
  }
}

export const store = { initialState, reducer }
