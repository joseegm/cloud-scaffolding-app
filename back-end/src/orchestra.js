const TCPServer = require('../modules/tcpServer/index')
const {log} = require('../modules/logService/index')
const message = require('../models/tcpMessage')

log.setName('Orchestra')
let server = TCPServer.init("127.0.0.1","8081",'Orchestra');

server.on('dataForStatemachine', (data) => {
	log.info('send to statemachine: '+JSON.stringify(data,2,2))
	TCPServer.sendMessageByGroup(data,'statemachine')
})

server.on('newConnection', (data) => {
	log.info('new connection');
})

server.on('data', (data) => {

	// if(data.method == 'subscribe') {
	// 	data = {subscribed: true}
	// 	log.info('try to reply')
	// 	TCPServer.sendMessageByGroup(data,"orchestra");
	// 	log.info('replyed')
	// } else
	if(data.method == 'ping') {

	 log.info('ping: '+JSON.stringify(data,2,2))
	 TCPServer.sendMessageById(data.sender,data);
	 // TCPServer.sendMessageByGroup(data,'statemachine')


 } else if(data.method == 'broadcastToGroup') {

	 // log.info('broadcastToGroup: '+JSON.stringify(data,2,2))
	 TCPServer.sendMessageByGroup(data,data.data.group)


 } else {
		// log.info('send to client: '+JSON.stringify(data,2,2))
		TCPServer.sendMessageById(data.sender,data);
	}



});
