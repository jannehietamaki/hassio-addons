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
  const event = parseERP1(data);
  states[event.buttonId] = data;
  if (event && event.push) {
    setTimeout(() => {
      const oldState = states[event.buttonId];
      if (oldState.eventId === event.eventId) {
        trigger({
          button: event.button,
          turnon: event.turnon,
          type: 'long',
        });
      }
    }, 600);

    trigger({
      button: event.button,
      turnon: event.turnon,
      type: 'short',
    });
  }
};

const listen = (parser, send) => {
  sender = send;
  parser.on(data, process);
}

module.exports = { listen };