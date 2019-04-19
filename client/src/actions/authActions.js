import axios from 'axios';
import { GET_ERRORS, LOGIN, LOGOUT } from './types'
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// login user
export const loginUser = userData => dispatch => {
  axios.post(process.env.REACT_APP_API_URL + '/users/login', userData)
    .then(res => {
      // get token
      const { token } = res.data
      // set to local storage
      localStorage.setItem('jwtToken', token)

      // set axios header
      setAuthToken(token)
      // decode token
      const decoded = jwt_decode(token)

      // update redux current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch(
        {
          type: GET_ERRORS,
          payload: err
        }
      )
    )
}

// log out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(unsetCurrentUser())
}

// set current user
export const setCurrentUser = decoded => {
  console.log(decoded)
  return {
    type: LOGIN,
    payload: decoded
  }
}

export const unsetCurrentUser = () => {
  return {
    type: LOGOUT,
    payload: {}
  }
}
