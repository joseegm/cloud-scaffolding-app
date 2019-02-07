const net = require('net');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const message = require('../../models/tcpMessage')
const {log} = require('../logService/index')


// Start a TCP Server
var clients = []
server = net.createServer(function (socket) {
  sender = socket.remoteAddress + ":" + socket.remotePort

  clients.push({
    id: sender,
    socket: socket,
    group: "",
    subscription: false,
    name: ""
  });

  eventEmitter.emit('newConnection',socket);

  // Handle incoming messages from clients.
  socket.on('data', (data) => {
    try {

      try {
         _json = JSON.parse(data);
         log.info('incomming data: '+JSON.stringify(_json,2,2))

         if(!isInGroup('statemachine',socket.remoteAddress + ":" + socket.remotePort)) {
           //if message comes not from statemachine
           _json.sender = socket.remoteAddress + ":" + socket.remotePort;
         }

         //check if message comes from a Statemachine
        if(_json.method == 'subscribe') {
          log.info('need to subscribe');
          subscribeGroup(_json)
        } else if (!isInGroup('statemachine',socket.remoteAddress + ":" + socket.remotePort)) { // forward to statemachine
          eventEmitter.emit('dataForStatemachine',_json);
        } else { // forward to all other clients
          eventEmitter.emit('data',_json);
        }
      } catch (e) {
        log.info('Received data is not valid json format'+e);
      }
      // tmpMessage = message.message(socket.remoteAddress + ":" + socket.remotePort,data.toString(),"")
    } catch (e) {
      log.info('Error while processing incomming message'+e);
    }
  });

  // Remove the client from the list when it leaves
  socket.on('end', () =>  {
    eventEmitter.emit('end',socket);
    deleteClient(socket.remoteAddress + ":" + socket.remotePort)
  });

  socket.on('close', () =>  {
  	deleteClient(socket.remoteAddress + ":" + socket.remotePort)
    eventEmitter.emit('close',socket);
  });

  socket.on('error', (error) => {
  	deleteClient(socket.remoteAddress + ":" + socket.remotePort)
    eventEmitter.emit('error',socket);
  })
})


function deleteClient(_id) {
  clients = clients.filter( (client) => {
    return client.id != _id;
  });
}

function getClientById(_id) {
  return clients.filter((client) => {
    return client.id == _id
  });
}

function sendMessage(_client, _message) {
  _client.socket.write(JSON.stringify(_message))
}

function sendMessageById(_id,_message) {
  log.info('sending message by id: '+JSON.stringify(_message,2,2)+ ' to: '+_id)
  getClientById(_id).forEach((client) => {
    sendMessage(client,_message)
  })
  return true
}

function isInGroup(_group, _sender) {
  for (var i = 0; i < clients.length; i++) {
      if(clients[i].id ==  _sender) {
        if( clients[i].group == _group) {
          return true
        }
      }
  }
  return false;
}


function subscribeGroup(_message) {
  // log.info('_message.data.group: '+_message.data.group)
  // log.info('clients.length: '+clients.length)

  for (var i = 0; i < clients.length; i++) {
    if(clients[i].id ==  _message.sender) {
      clients[i].group = _message.data.group
      clients[i].subscribed = true;
      log.info('subscribed: '+_message.sender)
      sendMessageById(_message.sender,_message)
    } else {
      log.info('no client found to subscribe')
    }
  }

}

function getClientByGroup(_group) {
  return clients.filter((client) => {
    return client.group == _group
  });
}

function sendMessageByGroup(_data,_group) {
  log.info('sending message by group: '+_group)
  getClientByGroup(_group).forEach((client) => {
    sendMessageById(client.id, _data)
  })
  return true
}

function broadcast(_message) {
  clients.forEach((client) => {
    sendMessage(client,_message)
  });
	return true;
}

function startServer(serverIP, serverPort) {
  server.listen(serverPort, serverIP);
  return eventEmitter;
};

function init(_ip,_port,_logName) {
	server = startServer(_ip, _port);
  log.info('init TCP Server at '+_ip+':'+_port)
	return server
}

module.exports = {
  init, sendMessageByGroup, sendMessageById, broadcast
}
