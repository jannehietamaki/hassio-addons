const { parseERP1 } = require('./erp1-parser');
const assert = require('assert');

const test = (data, expected) => {
  const parsed = parseERP1(data);
  console.log({ expected, parsed });
  assert(parsed.button === expected.button);
  assert(parsed.push === expected.push);
  // assert(parsed.turnon === expected.turnon);
};

test(
  [85,   0,   7,   7,   1, 122, 246, 112,   0,  53, 197, 239,  48,   0, 255, 255, 255, 255,  77,   0, 231],
  {
    button: '00:35:c5:ef',
    push: true,
    turnon: true,
  }
); // push 0
test(
  [85,   0,   7,   7,   1, 122, 246, 0,   0,  53, 197, 239,  32,   0, 255, 255, 255, 255,  77,   0, 170],
  {
    button: '00:35:c5:ef',
    push: false,
    turnon: true,
  }
); // release 0
test(
  [ 85,   0,   7,   7,   1, 122, 246, 80,   0,  53, 197, 239,  48,   0, 255, 255, 255, 255,  79,   0,  51],
  {
    button: '00:35:c5:ef',
    push: true,
    turnon: false,
  }
); // push 1
test(
  [85,   0,   7,   7,   1, 122, 246, 0,   0,  53, 197, 239,  32,   0, 255, 255, 255, 255,  80,   0,  20],
  {
    button: '00:35:c5:ef',
    push: false,
    turnon: false,
  }
); // release 1
