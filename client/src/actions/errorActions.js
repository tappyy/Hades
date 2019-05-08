import { GET_ERRORS, CLEAR_ERRORS } from './types'

export const addError = error => {
  return {
    type: GET_ERRORS,
    payload: error
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}