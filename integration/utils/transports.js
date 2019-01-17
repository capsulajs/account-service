global.WebSocket = require('ws');

import { WebSocketDispatcher } from 'transport/WebSocket';
import { AxiosDispatcher } from 'transport/HTTP';
import { wsUrl, httpUrl } from './constants';

export const getWebSocketDispatcher = () => new WebSocketDispatcher(wsUrl);
export const getHttpDispatcher = () => new AxiosDispatcher(httpUrl);
