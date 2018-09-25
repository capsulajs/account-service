global.WebSocket = require('ws');

import {
  getWebSocketDispatcher,
  runAccountServiceTests,
} from './utils';

runAccountServiceTests(getWebSocketDispatcher());
