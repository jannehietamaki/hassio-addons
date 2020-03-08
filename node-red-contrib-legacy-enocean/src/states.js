const { parseERP1 } = require('./erp1-parser');
const throttledQueue = require('throttled-queue');
var throttle = throttledQueue(2, 1000);

let sender;
const states = {};

const trigger = (event) => throttle(() => {
  if (sender) {
    console.log('Send event', event);
    sender(event);
  } else {
    console.log('No sender!', event);
  }
});

const process = (data) => {
  console.log('process packet', data);
  const event = parseERP1(data);
  states[event.buttonId] = data;
  console.log('process!', event);
  if (event && event.push) {
    setTimeout(() => {
      const oldState = states[event.buttonId];
      console.log('oldState for button', oldState);
      if (oldState.eventId === event.eventId) {
        console.log('long event');
        trigger({
          button: event.button,
          turnon: event.turnon,
          type: 'long',
        });
      }
    }, 600);
    console.log('push event, short');
    trigger({
      button: event.button,
      turnon: event.turnon,
      type: 'short',
    });
  }
};

const listen = (parser, send) => {
  sender = send;
  parser.on('data', process);
}

module.exports = { listen };