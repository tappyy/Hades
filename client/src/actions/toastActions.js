import { ADD_TOAST, REMOVE_TOAST } from './types'
import createToast from '../factories/createToast'

export const addToast = (options) => {
  return {
    type: ADD_TOAST,
    payload: createToast(options)
  }
}

export const removeToast = (id) => {
  return {
    type: REMOVE_TOAST,
    payload: id
  }
}