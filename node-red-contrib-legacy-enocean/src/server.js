const WebSocket = require('ws');
const SerialPort = require('serialport');
const Enocean = require('enocean-js');
const pretty = Enocean.pretty
const ESP3Parser = Enocean.ESP3Parser
const states = require('./states');

const port = new SerialPort('/dev/ttyUSB0', { baudRate: 57600 })
const parser = new ESP3Parser()
port.pipe(parser)

const wss = new WebSocket.Server({ port: 8083 });

let connection;

const handleAction = (ws) => (message) => {
  const msg = JSON.parse(message);
  console.log('action', msg);
};

wss.on('connection', (ws) => {
  connection = ws;
  console.log('WebSocket connected', ws);
  ws.on('message', handleAction(ws));
});

wss.on('close', () => {
  console.log('WebSocket connection closed');
});

const send = (data) => {
  if (connection) {
    console.log('Send data to WebSocket', data);
    connection.send(JSON.stringify(data));
  } else {
    console.log('WARN: unable to send data. No connection', data);
  }
};

states.listen(parser, send);

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});
