# Sitec Verifone EC Driver

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you have to get a development env running

Prepare your system:
```
 $ sudo apt-get update
 $ sudo apt-get install nodejs
 $ sudo apt-get install npm
```
Cd into directory: verifoneECDriver and init driver by installing all dependencies
```
npm install
```

Check all config data for opening the TCP Server to which you need to connect for sending messages and adjust the name for the log file:

```
nano configs/config.json
```

Start the driver by:

```
node src/VerifonDriver.js
```



## Testing by using the testmessages

cd into the directory verifoneECDriver/testMessages

```
cat setupMessage.json  | nc 127.0.0.1 1234
```

wait until you receive all available cards ( which you send in the setupMessage right now )

{
  "type": "request",
  "method": "setup",
  "params": [
    {"driverAddress": "192.168.178.22"},
    {"driverPort": "1234"},
    {"cards": {
      "Maestro CH":"1",
      "VISA":"5",
      "MasterCard":"2"
      }
    }
  ]
}

for payment use the following command
```
cat paymentMessage.json  | nc 127.0.0.1 1234
```
adjust amount accordingly



## Driver return message

* On every message sent to driver:
```
{"type":"response","method":"setup","return":"received"}
```


* setup command:

successfully set EFT Terminal to idle state:
```
{"type":"event","name":"payment-cards","params":[{"Maestro CH":"1","VISA":"5","MasterCard":"2"}]}
```

failed to set EFT Terminal to starting state:
```
{"type":"event","name":"setup","params":[{"reason":"Could not connect to EFT"}]}
```

failed to set EFT Terminal to idle state:
```
{"type":"event","name":"setup","params":[{"reason":"Could not set EFT to idle state"}]}
```


*  disconnect command:

failed to disconnect EFT Terminal:
```
{"type":"event","name":"disconnect","params":[{"reason":"Disconnect failed"}]}
```

success disconnect EFT Terminal:
```
{"type":"event","name":"disconnect_payment_confirmed","params":[{"reason":"Disconnect successful"}]}
```


*  cancel command:

failed to cancel EFT Terminal:
```
{"type":"event","name":"cancel","params":[{"reason":"Cancel failed"}]}
```

success cancel EFT Terminal:
```
{"type":"event","name":"cancel_payment_confirmed","params":[{"reason":"Cancel successful"}]}
```



*  pay command

success:
```
{"type":"event","name":"payment-success","params":[{"cardholder_receipt":"... receipt ..."}]}
```

error:
```
{"type":"event","name":"payment-failure","params":[{"cardholder_receipt":"... receipt ...", "reason":"... error message ..."}]}
```

missing params:
```
{"type":"error-response","method":"payment","exception":"Transaction params not complete"}
```

if payment is still pending:
```
{"type":"error-response","method":"payment","exception":"Transaction already pending"}
```


*  method not known

error response gets send on every method, which is not known
```
{"type":"error-response","method":"... send method name ...","exception":"Unknown method"}
```


*  if EFT is not set to setup

EFT must be in idle state by sending the setup command for every further command
```
{"type":"error-response","method":"... send method name ...","exception":"Send method setup before"}
```


*  connection lost - try to reconnect

trying to reconnect to EFT:
```
{"type":"event","name":"reconnect","params":[{"reason":"Connect failed - trying to reconnect"}]}
```


*  Unknown EFT Error Messages

if EFT sends unknown error to driver:
```
{"type":"event","name":"error","params":[{"reason":"... error message ..."}]}
```


*  Unable to send command to EFT

driver is not able to send command to EFT
```
{"type":"event","name":"error","params":[{"reason":"Connection error + ... error message ..."}]}
```






## Deployment

tbd.

## Built With

* [socket.io](https://www.npmjs.com/package/socket.io/) - Handling Websockets

rest tbd..


## Authors

* **Oliver Latka** - *Initial work* -
