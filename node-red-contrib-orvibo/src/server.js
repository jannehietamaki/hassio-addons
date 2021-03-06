const Orvibo = require('./Orvibo');
const WebSocket = require('ws');


function noop() {}
 
function heartbeat() {
  this.isAlive = true;
}
 

const wss = new WebSocket.Server({ port: 8080 });

let connection;

const orvibo = new Orvibo({
  ORVIBO_KEY: 'khggd54865SNJHGF',
});

const handleAction = (ws) => (message) => {
  const msg = JSON.parse(message);
  console.log('action', msg);
  orvibo.sendOrder(msg.uid, msg.order, msg);
};

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  connection = ws;
  console.log('WebSocket connected', ws);
  ws.on('message', handleAction(ws));
});


const interval = setInterval(function ping() {
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
}

orvibo.on('plugConnected', (data) => {
  send({ type: 'connected', data});
  console.log('connected', data);
});

orvibo.on('plugStateUpdated', (data) => {
  send({ type: 'state', data});
  console.log('state', data);
});

orvibo.on('gotHeartbeat', (data) => {
  send({ type: 'seen', data});
  console.log('seen', data);
});

orvibo.on('plugDisconnected', (data) => {
  send({ type: 'disconnect', data});
  console.log('disconnect', data);
});

orvibo.on('plugDisconnectedWithError', (error) => {
  send({ type: 'error', error});
  console.log('error', error);
});

orvibo.startServer();

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});
