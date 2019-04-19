import { NEW_ALERT, DISMISS_ALERT } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case NEW_ALERT: {
      return [action.payload, ...state]
    }
    case DISMISS_ALERT: {
      return state.filter(alert => alert._id !== action.payload);
    }
    default:
      return state
  }
}

