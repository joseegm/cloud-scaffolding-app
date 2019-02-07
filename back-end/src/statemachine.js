const TCPClient = require('../modules/tcpClient/index')
const {log} = require('../modules/logService/index')
const message = require('../models/tcpMessage')
const utils =  require('../modules/utils/index')
const crypto = require('crypto');

log.setName('Statemachine')

 async function connectToOrchestra () {
	log.info('connecting statemachine')
	var client =  await TCPClient.startClient("127.0.0.1", "8081");

	client.on('connect', (dataTmp) => {
		log.info('Statemachine is connected')
			TCPClient.sendMessage(message.message({group: "statemachine", id: "1"},'subscribe'));
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
      dataTmp.command = "sendData2"

      // setTimeout(() => {
        TCPClient.sendMessage(dataTmp);
      // }, 200);

    }
	})
 }





connectToOrchestra();
doRunLoopDo();

//----------------------------------------------------------------


function doRunLoopDo() {
log.info('timeout')

  pushNotificationTest();


  setTimeout(() => {
    doRunLoopDo();
  }, 2000);
}


function pushNotificationTest() {
  let pushMessage = {
      command: 'newElement',
      method: 'broadcastToGroup',
      data: {group: "gui" },
      id: Math.floor(Math.random() * 1e100),
      dateTime: Date.now(),
      value: Math.floor(Math.random() * 1000)
     }

  // log.info('Pushing to GUI: '+JSON.stringify(pushMessage,2,2))
    TCPClient.sendMessage(pushMessage);
}
