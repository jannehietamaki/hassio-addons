const { v4: uuid } = require('uuid');

const toHex = (data, separator = ':') => data.map(x => ('00' + x.toString(16)).substr(-2).toLowerCase()).join(separator);

const parseERP1 = (data) => {
  const button = toHex([data[8], data[9], data[10], data[11]]);
  const turnon = (data[7] & 32) !== 32;
  const push = (data[12] & 16) === 16;
  return {
      eventId: uuid(),
      button,
      turnon,
      push,
  };
};

module.exports = { parseERP1 };