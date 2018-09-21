import { WebSocketDispatcher } from 'transport/WebSocket';

const token = require('./Auth0_security_token.json');
import { wsUrl } from '.';

export const getWebSocketDispatcher = () => new WebSocketDispatcher(wsUrl, token);
