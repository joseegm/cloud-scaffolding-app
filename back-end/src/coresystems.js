const TCPClient = require('../modules/tcpClient/index')
const {log} = require('../modules/logService/index')
const message = require('../models/tcpMessage')
const utils =  require('../modules/utils/index')
log.setName('Coresystems')


 async function connectToOrchestra () {
	log.info('connecting coresystems')
	let client =  await TCPClient.startClient("127.0.0.1", "8081");
	client.on('newMessage', (data) => {
    log.info('processing data: '+JSON.stringify(data,2,2))
    log.info('processing data: '+data)
	})
	client.on('connect', (dataTmp) => {
    log.info('data: '+dataTmp)
    TCPClient.sendMessage(message.message({callId: "1213"},'getServiceCalls'));
	})

 }





connectToOrchestra();

//----------------------------------------------------------------
