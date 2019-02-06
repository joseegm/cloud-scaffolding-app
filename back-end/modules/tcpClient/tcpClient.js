const message = require('../../models/tcpMessage')
const {log} = require('../logService/index')
const net = require('net');
const dateTime = require('node-datetime');
const events = require('events');
const eventEmitter = new events.EventEmitter();


async function startClient(ip = configJson.TCP.client.ip, port = configJson.TCP.client.port) {
	client = new net.Socket();
	await client.connect(port, ip, () => {
	});

  client.on('error', (error) => {
    log.info('TCP Client: Connection error - destroy Connection '+error);
  })

  client.on('connect', (data) => {
		eventEmitter.emit('connect',data);

    // client.write('{"method":"ping"}');
  });

  client.on('close', (data) => {
    log.info('Connection to closed' + JSON.stringify(data));
  });

  client.on('data', (data) => {

		try {
			 _json = JSON.parse(data);
			 // log.info('Parsed Json Message: '+JSON.stringify(_json,2,2))
			 client.emit('newMessage',_json);
		 } catch (e) {
			 log.info('Received data is not valid json format'+e);
		 }

  })

  client.on('disconnect', () => {
  });

	return client;
}

function sendMessage(_message) {
	log.info('sending message: '+JSON.stringify(_message))
  client.write(JSON.stringify(_message))
}

module.exports = {
  startClient, sendMessage
};
