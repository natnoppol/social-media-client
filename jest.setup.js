require('jest-fetch-mock').enableMocks();

import 'jest-fetch-mock';
fetchMock.enableMocks();

global.window = {
  location: {
    reload: jest.fn(),
  },
};

global.document = {
  createElement: jest.fn(() => ({ innerHTML: '' })),
};



