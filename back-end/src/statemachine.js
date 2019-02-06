const TCPClient = require('../modules/tcpClient/index')
const {log} = require('../modules/logService/index')
const message = require('../models/tcpMessage')
const utils =  require('../modules/utils/index')
log.setName('Statemachine')

isConnected = false;


 async function connectToOrchestra () {
	log.info('connecting statemachine')
	var client =  await TCPClient.startClient("127.0.0.1", "8081");

	client.on('connect', (dataTmp) => {
		log.info('Statemachine is connected')
		isConnected = true;
			TCPClient.sendMessage(message.message({group: "statemachine"},'subscribe'));
	})

	client.on('close', (dataTmp) => {
		isConnected = false;
	})


	client.on('newMessage', (dataTmp) => {


		if(dataTmp.method == 'getServiceCalls') {
			log.info('ServieCallId: '+JSON.stringify(dataTmp))
			dataTmp.data = {newData : "w5345"}
			log.info('new data: '+JSON.stringify(dataTmp,2,2))
			TCPClient.sendMessage(dataTmp);
		}
	})
 }





connectToOrchestra();
doRunLoopDo();
//----------------------------------------------------------------


function doRunLoopDo() {

log.info('timeout')
  // loop();

log.info('isConnected? '+isConnected);

if(!isConnected) {
	log.info('connecting')
	connectToOrchestra();
}


  setTimeout(() => {
    doRunLoopDo();
  }, 2000);
}
