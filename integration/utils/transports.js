import { WebSocketDispatcher } from 'transport/WebSocket';
import { AxiosDispatcher } from 'transport/HTTP';

import {
  wsUrl,
  httpUrl,
 } from './constants';

const token = require('./Auth0_security_token.json');

export const getWebSocketDispatcher = () => new WebSocketDispatcher(wsUrl);

export const getHttpDispatcher = () => new AxiosDispatcher(httpUrl);
