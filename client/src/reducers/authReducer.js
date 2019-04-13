import { LOGIN, LOGOUT } from '../actions/types';
import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      }
    default:
      return state
  }
}