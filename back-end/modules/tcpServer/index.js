// product/index.js
var tcpServer = require('./tcpServer')

// tcpServer.init()





module.exports = {
  init: tcpServer.init,
  sendMessageByGroup: tcpServer.sendMessageByGroup,
  sendMessageById: tcpServer.sendMessageById
}
