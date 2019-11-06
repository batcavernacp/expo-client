import { authReducer, initialState as auth, Auth } from './auth-store'
import { myDevicesReducer, initialState as myDevices, DeviceStore } from './my-devices-store'

import { loadingReducer, initialState as loading } from './loading-store'
import { errorReducer, initialState as error } from './error-store'
export interface State {
  auth: Auth;
  myDevices: DeviceStore;
  loading: any;
  error: any;
}

const initialState: State = {
  auth,
  myDevices,
  loading,
  error
}

const reducer = (state: State, action): State => {
  return {
    auth: authReducer(state.auth, action),
    myDevices: myDevicesReducer(state.myDevices, action),
    loading: loadingReducer(state.loading, action),
    error: errorReducer(state.error, action)
  }
}

export const store = { initialState, reducer }
