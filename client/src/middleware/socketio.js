import SocketIOClient from 'socket.io-client'
import { LOGIN, LOGOUT } from '../actions/types'
import { addAlert } from '../actions/alertActions'

const createSocketMiddleware = store => {
  let socket
  return next => action => {
    switch (action.type) {
      case LOGIN: {
        // init global socket because we logged in
        const socketEndpoint = process.env.REACT_APP_SOCKET_URL
        socket = SocketIOClient(socketEndpoint)
        socket.on('connect', () => {
          // set user-socket relationship
          socket.emit('setupSocket', { userId: action.payload.id })
        });

        // alert socket events
        socket.on('alertTrigger', (alert) => {
          store.dispatch(addAlert(alert))
        })

        break;
      }
      case LOGOUT: {
        if (socket) {
          socket.disconnect()
        }
        break
      }
    }
    return next(action)
  }
}

export default createSocketMiddleware