// @flow

/*
*  Send and receive request serially
*  next reuqest is sent only after the previous one got its response
*/

import { Dispatcher } from 'transport/api';
import type { AuthToken } from 'transport/WebSocket';

const errorMessages = {
  notConnected: 'Not connected!',
  resourceIsBusy: 'Resource is busy',
};

export class WebSocketDispatcher implements Dispatcher {
  url: string;
  token: ?AuthToken;
  webSocket: any;

  constructor(url: string, token?: AuthToken) {
    this.url = url;
    this.token = token || null;
  }

  open(): Promise<null> {
    return new Promise((resolve, reject) => {

      try {
        this.webSocket = new WebSocket(this.url);
      }
      catch(error) {
        reject(error);
      }

      this.webSocket.onopen = () => resolve(null);
      this.webSocket.onerror = error => reject(error);
    });
  }

  getState(): number {
    return this.webSocket.readyState;
  }

  dispatch(request: any, api: string): Promise<any> {
    const { webSocket } = this;

    if (!webSocket) {
      return Promise.reject(new Error(errorMessages.notConnected));
    }

    if (webSocket.onmessage) {
      return Promise.reject(new Error(errorMessages.resourceIsBusy));
    }

    const fullRequest = {
      q: api,
      sid: 1,
      d: {
        token: this.token,
        ...request
      },
    };

    return new Promise((resolve, reject) => {
      webSocket.onmessage = message => {
        webSocket.onmessage = null;

        let result = null;
        try {
          result = JSON.parse(message.data).d;
        }
        catch(error) {
          reject(error);
        }
        resolve(result);
      }

      webSocket.onerror = error => reject(error);
      webSocket.send(JSON.stringify(fullRequest));
    })
  }

  close(): Promise<null> {
    const { webSocket } = this;

    if (!webSocket) {
      return Promise.reject(new Error(errorMessages.notConnected));
    }

    return new Promise((resolve, reject) => {
      webSocket.onclose = () => resolve(null);
      webSocket.onerror = error => reject(error);
      webSocket.close();
    });
  }
};
