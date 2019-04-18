import { combineReducers } from 'redux'
import authReducer from './authReducer'
import toastReducer from './toastReducer'

export default combineReducers({
  auth: authReducer,
  toasts: toastReducer
})