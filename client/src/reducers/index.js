import { combineReducers } from 'redux'
import authReducer from './authReducer'
import toastReducer from './toastReducer'
import alertReducer from './alertReducer'

export default combineReducers({
  auth: authReducer,
  toasts: toastReducer,
  alerts: alertReducer
})