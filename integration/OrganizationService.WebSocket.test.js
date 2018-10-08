global.WebSocket = require('ws');

import { getWebSocketDispatcher } from './utils/transports';

import { runOrganizationServiceTests } from './utils/runOrganizationServiceTests';

runOrganizationServiceTests(getWebSocketDispatcher());
