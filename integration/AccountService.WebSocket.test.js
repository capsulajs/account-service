global.WebSocket = require('ws');

import { getWebSocketDispatcher } from './utils/transports';

import { runAccountServiceTests } from './utils/runAccountServiceTests';

runAccountServiceTests(getWebSocketDispatcher());
