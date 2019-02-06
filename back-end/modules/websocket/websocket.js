const message = require('../../models/tcpMessage')
const {log} = require('../logService/index')
const server = require('http').createServer();
const io = require('socket.io')(server);
const events = require('events');
const eventEmitter = new events.EventEmitter();
const dateTime = require('node-datetime');

clients = [];



function startServer(serverIP, serverPort) {
  server.listen(serverPort, serverIP);
  return eventEmitter;
};



io.on('connection', function(socket){
  socket.name = socket.id;
  log.info('new client: '+socket.name)
  clients.push(socket);
  log.info('clients '+clients.length)

  socket.on('message', (data) => {
    socket.name = socket.id;
    try {
      log.info('trying to parse'+ data)
      // dataJson = JSON.parse(data);
      log.info('Received data is valid json format');
      log.info('parse'+ JSON.stringify(data,2,2))

      // socket.receivedData = data;
      //
       eventEmitter.emit('dataWS',data);
       // socket.write(data)
    } catch (e) {
      log.info('Received data is not valid json format'+e);
    }
  });

  socket.on('disconnect', function(){log.info("disconnect")
  eventEmitter.emit('close',socket);
  });
  eventEmitter.emit('open',socket);
});


  // Send a message to all clients
  function broadcast(data){//message, sender) {
    log.info('clients '+clients.length)
    clients.forEach(function (client) {
      log.info('send data to '+client.name)
      client.write(data);
    });
  }

 module.exports = {
  startServer, broadcast
 };
