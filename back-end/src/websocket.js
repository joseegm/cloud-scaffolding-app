const WSServer = require('../modules/websocket/index')
const TCPClient = require('../modules/tcpClient/index')
const {log} = require('../modules/logService/index')
const message = require('../models/tcpMessage')
const utils =  require('../modules/utils/index')
log.setName('Websocket')

 isConnectedWS = false;
 isConnectedTCP = false;

 async function connectToOrchestra () {
	log.info('connecting websocket')
	let client =  await TCPClient.startClient("127.0.0.1", "8081");
	client.on('newMessage', (data) => {
    if(isConnectedWS) {
      log.info('broadcast data: to all gui'+JSON.stringify(data,2,2))
      WSServer.broadcastWS(JSON.stringify(data))
    } else {
      log.info('no Websocket connected')
    }
	})
  client.on('connect', (dataTmp) => {
    log.info('connect: '+dataTmp)
    isConnectedTCP=true;
	})
  client.on('close', (dataTmp) => {
      log.info('close: '+dataTmp)
      isConnectedTCP=false;
  	})

 }

//----------------------------------------------------------------


function createWebsocket() {
  var server = "127.0.0.1";
  var port = 8877;
  wsServer =  WSServer.startServer(server,port);
  log.info('opening WSServer on: '+server+':'+port);

  wsServer.on('open', (data) => {
    log.info('WS Client opend: '+data)
    isConnectedWS=true;
  });

  wsServer.on('dataWS', (data) => {
    log.info('Server Data In WSServer: '+JSON.stringify(data,2,2));

    if(isConnectedTCP) {
      log.info('sending to Orchestra')

      TCPClient.sendMessage(data,data.command);
    } else {
      log.info('no connected to Orchestra')
    }
  });

  wsServer.on('disconnect', (data) => {
    log.info('WSServer disconnect'+data.name);
    // deleteFromSubscription(data);
  });

  wsServer.on('close', (data) => {
    log.info('WSServer close'+data.name);
    // deleteFromSubscription(data);
    isConnectedWS=false;

  });

  wsServer.on('end', (data) => {
    log.info('WSServer Close '+data.name);
    isConnectedWS=false;

    // deleteFromSubscription(data);
  });

  wsServer.on('error', (data) => {
    log.info('WSServer error '+data.name);
    isConnectedWS=false;

    //process.exit(1);
  });
}




connectToOrchestra();
createWebsocket();
