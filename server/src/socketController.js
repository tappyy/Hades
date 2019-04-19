const mongoDb = require('./utils/mongoDb')
const assert = require("assert");
const mongo = require("mongodb");

exports.userConnected = (io, socket, data) => {
  const { userId } = data
  const { id: socketId } = socket
  const usersCollection = mongoDb.get().collection('users')
  usersCollection.findOneAndUpdate(
    { _id: new mongo.ObjectID(userId) },
    { $set: { logged_in: true }, $push: { sockets: socketId } },
    { returnOriginal: true }, (error, result) => {
      if (error) {
        return
      }

      // find user and add to current sockets
      console.log(`Added socket: ${socketId} to user: ${result.value.first_name} ${result.value.last_name} (${result.value._id})`)

      // set nickname of socket so we know what user it belongs to
      socket.nickname = userId
      io.to(`${socketId}`).emit('greeting', 'Just added a socket to you!');
    })
}

exports.userDisconnected = (io, socket) => {
  const { id: socketId, nickname: userId } = socket

  console.info(`${socketId} : ${userId}`)

  console.log('rooms:', socket.rooms)

  const usersCollection = mongoDb.get().collection("users");
  usersCollection.findOneAndUpdate({ _id: new mongo.ObjectID(userId) }, { $set: { logged_in: false }, $pull: { sockets: socketId } }, { returnOriginal: false }, (error, result) => {
    if (error) {
      return
    }

    if (result.value) {
      console.log(`Removed socket: ${socketId} from user: ${result.value.first_name} ${result.value.last_name} (${result.value._id})`)
    }

  })
}