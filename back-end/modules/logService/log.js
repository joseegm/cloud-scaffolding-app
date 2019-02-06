const fs = require('fs');
const dateTime = require('node-datetime');
var rfs    = require('rotating-file-stream');

pwd = process.cwd();
pwd+'/logs/file.log'
console.log('log:pwd: '+pwd)
var stream = rfs("log", {
		path: pwd+"/logs",
    size:     '1M',
		maxFiles: 30
//		compress: true
});

function write(level,submoduleName,message) {
	if(log.allowedLevels.includes(level)) {
		// console.log('PWD for log: '+pwd);
		// console.log('setting directory for log: '+ pwd.substr(0,pwd.length-3) + ' + /logs/ '+ config.logfile);
		emptyString = '                           ';
		submoduleName = submoduleName + emptyString.substr(0,10-submoduleName.length);
		fs.appendFileSync(pwd+'/logs/log', dateTime() + ' [' +log.levels[log.allowedLevels.indexOf(level)]+'] ['+submoduleName.substr(0,10)+'] '+message+"\n");
	}
}

function writeMessage(message) {
		pwd = process.cwd();
		fs.appendFileSync(pwd+'/logs/log', message+"\n");
}




var logName = '';

function prepareLogName() {
  emptyString = '                           ';
  return (logName + emptyString.substr(0,10-logName.length));
  return logName.substr(0,16);
}

function getDate() {
  dt = dateTime.create();
  return dt.format('Y-m-d H:M:S');
}

var log = {
  setName:function(message) {
    logName = message;
  },
  all:function(message){
    console.log(getDate() + ' [ ALL   -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ ALL   -  '+prepareLogName()+'] '+ message);
  },
  trace:function(message){
    console.log(getDate() + ' [ TRACE -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ TRACE -  '+prepareLogName()+'] '+ message);
  },
  debug:function(message){
    console.log(getDate() + ' [ DEBUG -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ DEBUG -  '+prepareLogName()+'] '+ message);
  },
  info:function(message){
    console.log(getDate() + ' [ INFO  -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ INFO  -  '+prepareLogName()+'] '+ message);
  },
  warn:function(message){
    console.log(getDate() + ' [ WARN  -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ WARN  -  '+prepareLogName()+'] '+ message);
  },
  error:function(message){
    console.log(getDate() + ' [ ERROR -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ ERROR -  '+prepareLogName()+'] '+ message);
  },
  fatal:function(message){
    console.log(getDate() + ' [ FATAL -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ FATAL -  '+prepareLogName()+'] '+ message);
  },
  off:function(message){
    console.log(getDate() + ' [ OFF   -  '+prepareLogName()+'] '+ message);
    writeMessage(getDate() + ' [ OFF   -  '+prepareLogName()+'] '+ message);
  }
}




module.exports = {
   log
};
