import { NEW_ALERT, DISMISS_ALERT } from './types'

export const addAlert = alert => {
  return {
    type: NEW_ALERT,
    payload: alert
  }
}

export const dismissAlert = id => {
  return {
    type: DISMISS_ALERT,
    payload: id
  }
}