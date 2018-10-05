global.WebSocket = require('ws');

import { getWebSocketDispatcher } from './utils/transports';

import { runConfigurationServiceTests } from './utils/runConfigurationServiceTests';

runConfigurationServiceTests(getWebSocketDispatcher());
