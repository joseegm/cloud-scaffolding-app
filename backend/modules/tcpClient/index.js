// product/index.js
var tcpClient = require('./tcpClient')

// tcpServer.init()





module.exports = {
  startClient: tcpClient.startClient,
  sendMessage: tcpClient.sendMessage
}
