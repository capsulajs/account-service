global.WebSocket = require('ws');

import { WebSocketDispatcher } from '@capsulajs/capsulajs-transport-providers';
import { AxiosDispatcher } from '@capsulajs/capsulajs-transport-providers';

export const getWebSocketDispatcher = () => new WebSocketDispatcher(process.env.WSS_URL);
export const getHttpDispatcher = () => new AxiosDispatcher(process.env.HTTP_URL);
