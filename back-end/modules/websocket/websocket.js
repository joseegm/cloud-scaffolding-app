




message = require('../../models/tcpMessage')
const {log} = require('../logService/index')


// Load the TCP Library


var server = require('http').createServer();
var io = require('socket.io')(server);
events = require('events');
eventEmitter = new events.EventEmitter();
const dateTime = require('node-datetime');

clients = [];



function startServer(serverIP, serverPort) {
  server.listen(serverPort, serverIP);
  return eventEmitter;
};



io.on('connection', function(socket){
  socket.name = socket.id;
  clients.push(socket);
  // socket.join("socket.id");
  // socket.join(socket.id);
  // log.info('Sockets: '+JSON.stringify(io.sockets.adapter.rooms,2,2));
  // io.sockets.in(socket.id).emit('message', 'what is going on, party people?');
  // socket.on('room', function(room) {
  //     socket.join(room);
  //     console.log('ROOM: '+room)
  //     console.log('**'+JSON.stringify(io.sockets.adapter.rooms,2,2));
  //      io.of(room).clients((error, clients) => {
  //      if (error) throw error;
  //      console.log('**'+socket.id+'**##++');
  //
  //      console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
  //    });
  // });
  // socket.on('event', function(data){log.info("event: "+data)});

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
    clients.forEach(function (client) {
      // Don't want to send it to sender
    //  if (client === sender) return;
      client.write(data);
    });
    // Log it to the server output too
    // process.stdout.write('message: '+message)
  }

  function broadcastAlsoToSender(message) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      client.write(message);
    });
    // Log it to the server output too
    // process.stdout.write('message: '+message)
  }



// function broadcastToAll(data,socket) {
//       broadcast(socket.nameString + data.receivedData,data);
//   }



// function sendError(socket, error, errorCode, userId) {
//   errorMessage = {};
//   errorMessage.source = "orchestra";
//   errorMessage.destination = "client";
//   errorMessage.userId = userId;
//   errorMessage.errorCode = errorCode;
//   errorMessage.error = error;
//   log.info('sending to socket: '+JSON.stringify(errorMessage,2,2))
//   socket.write(errorMessage);
// }


// function sendToSocketName(socketName,message) {
//   if (typeof message === 'string' || message instanceof String) {
//     log.info('Cannot send message - not string')
//   } else {
//     message = JSON.stringify(message);
//   }

//  log.info('sending to: '+message.clientName);

//   clients.forEach(function (client) {
//     log.info('Get clients ws : '+client.name)
//     if (client.name === socketName){
//       log.info('sending message to: '+client.name+ ' message: '+message);
//       //client.send(message);
//       io.sockets.in(client.name).emit('message', message);
//       io.sockets.in(client.name).emit('data', message);
//       //io.sockets.socket(client.name).emit('message', message);
//     }
//   });
// }


// function sendToAllSockets(message) {
//   if (typeof message === 'string' || message instanceof String) {
//     log.info('Cannot send message - not string')
//   } else {
//     message = JSON.stringify(message);
//   }
//
// //  log.info('sending to: '+message.clientName);
//
//   clients.forEach(function (client) {
//       io.sockets.in(client.name).emit('message', message);
//       io.sockets.in(client.name).emit('data', message);
//   });
// }

// function closeBySocketName(socketName) {
//   log.info('Closing socket connection: '+socketName)
//    clients.forEach(function (client) {
//      if (client.name === socketName){
//       client.disconnect();
//      log.info('Disconnecting socket due validation timeout: '+client.name)
//      }
//    });
//  }

 module.exports = {
  startServer, broadcast
 };
