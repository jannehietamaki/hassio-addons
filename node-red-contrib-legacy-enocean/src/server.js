const WebSocket = require('ws');
const SerialPort = require('serialport');
const Enocean = require('enocean-js');
const pretty = Enocean.pretty
const ESP3Parser = Enocean.ESP3Parser
const states = require('./states');

const port = new SerialPort('/dev/ttyUSB0', { baudRate: 57600 })
const parser = new ESP3Parser()
port.pipe(parser)


const noop = () => {};

function heartbeat() {
  this.isAlive = true;
}

const wss = new WebSocket.Server({ port: 8083 });

let connection;

const handleAction = (ws) => (message) => {
  const msg = JSON.parse(message);
  console.log('action', msg);
};

wss.on('connection', (ws) => {
  connection = ws;
  console.log('WebSocket connected', ws);
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', handleAction(ws));
});

const interval = setInterval(() => {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

wss.on('close', () => {
  console.log('WebSocket connection closed');
  clearInterval(interval);
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
