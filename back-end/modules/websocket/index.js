// product/index.js
var websocket = require('./websocket')


module.exports = {
  startServer: websocket.startServer,
  broadcastWS: websocket.broadcast
}
