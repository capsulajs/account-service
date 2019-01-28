global.WebSocket = require('ws');

import { WebSocketDispatcher } from '@capsulajs/capsulajs-transport-providers';
import { AxiosDispatcher } from '@capsulajs/capsulajs-transport-providers';
import { wsUrl, httpUrl } from './constants';

export const getWebSocketDispatcher = () => new WebSocketDispatcher(wsUrl);
export const getHttpDispatcher = () => new AxiosDispatcher(httpUrl);
