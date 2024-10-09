module.exports = {
    setupFiles: ['./jest.setup.js'],
  };
  // jest.setup.js
require('jest-fetch-mock').enableMocks();
