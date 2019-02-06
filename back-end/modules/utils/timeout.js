const net = require('net');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const message = require('../../models/tcpMessage')
const {log} = require('../logService/index')

allTimeouts = [];



function timeout(callback,time, tag, data) {
  log.info('setting callback for timeout: '+time+ ' for tag: '+tag);
  allTimeouts.forEach(function(timeout) {
    if(timeout.tag == tag) {
      clearTimeout(timeout.timeout);
      var index = allTimeouts.indexOf(timeout);
      if (index > -1) {
        allTimeouts.splice(index, 1);
      }
    }
  });

  timeout = {};
  timeout.tag = tag;
  timeout.time = time
  timeout.callback = callback
  timeout.timeout = setTimeout(function() { callback(data);  }, time)
  allTimeouts.push(timeout);
}


function clearTimeoutByTag(tag) {
    allTimeouts.forEach(function(timeout) {
      if(timeout.tag == tag) {
        //log.info('clear timeout with tag: '+timeout.tag);
        clearTimeout(timeout.timeout);
        var index = allTimeouts.indexOf(timeout);
        if (index > -1) {
          allTimeouts.splice(index, 1);
        }
      }
    });
}
module.exports = {
  timeout, clearTimeoutByTag
}
