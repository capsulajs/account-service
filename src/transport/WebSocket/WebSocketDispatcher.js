// @flow

import { WebSocket } from 'ws';

import { Dispatcher } from 'transport/api';

export class WebSocketDispatcher implements Dispatcher {
  webSocket: any;

  constructor(baseUrl: string) {
    this.webSocket = new WebSocket(baseUrl);
  }

  dispatch<T, R>(request) {
    return Promise((resolve, reject) => {
      this.webSocket.onmessage = message => resolve(message);
      this.webSocket.onerror = error => reject(error);
      this.webSocket.send(JSON.stringify(request));
    })
  }
};
