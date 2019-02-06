const TCPClient = require('../modules/tcpClient/index')
const {log} = require('../modules/logService/index')
const message = require('../models/tcpMessage')
const utils =  require('../modules/utils/index')
const crypto = require('crypto');

log.setName('Statemachine')

isConnected = false;
isSent = false;


 async function connectToOrchestra () {
  isSent = true;
	log.info('connecting statemachine')
	var client =  await TCPClient.startClient("127.0.0.1", "8081");

	client.on('connect', (dataTmp) => {
		log.info('Statemachine is connected')
		isConnected = true;
			TCPClient.sendMessage(message.message({group: "statemachine", id: "1"},'subscribe'));
	})


	client.on('close', (dataTmp) => {
		isConnected = false;
	})


	client.on('newMessage', (dataTmp) => {
    log.info('new message in statemachine: '+JSON.stringify(dataTmp))

    if(dataTmp.method == 'getServiceCalls') {
			log.info('ServieCallId: '+JSON.stringify(dataTmp))
			dataTmp.data = {newData : "w5345"}
			log.info('new data: '+JSON.stringify(dataTmp,2,2))
			TCPClient.sendMessage(dataTmp);
		}
    else if(dataTmp.method == 'hash') {
      dataTmp.stringHash = crypto.createHash('md5').update(dataTmp.originalString).digest("hex");
      log.info('need to hash: '+JSON.stringify(dataTmp))
      dataTmp.command = "sendData2"
      setTimeout(() => {
        TCPClient.sendMessage(dataTmp);
      }, 2000);

    }
	})
 }





connectToOrchestra();
doRunLoopDo();
//----------------------------------------------------------------


function doRunLoopDo() {
log.info('timeout')

// if(!isConnected && isSent) {
// 	log.info('connecting')
// 	connectToOrchestra();
// }


let pushMessage = {
    command: 'newElement',
    method: 'broadcastToGroup',
    data: {group: "gui" },
    id: Math.floor(Math.random() * 1e100),
    dateTime: Date.now(),
    value: Math.floor(Math.random() * 1000)
   }

// log.info('Pushing to GUI: '+JSON.stringify(pushMessage,2,2))
// TCPClient.sendMessage(pushMessage);


  setTimeout(() => {
    doRunLoopDo();
  }, 2000);
}
