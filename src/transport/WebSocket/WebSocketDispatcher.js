// @flow

/*
*  Send and receive requests serially
*  next reuqest is only sent when the previous one got its response
*/

import { Dispatcher } from 'transport/api';

const errorMessages = {
  notConnected: 'Not connected!',
  resourceIsBusy: 'Resource is busy!',
  unknownState: 'Error due to unknown state',
};

export class WebSocketDispatcher implements Dispatcher {
  url: string;
  webSocket: any;
  responseData: any;

  constructor(url: string) {
    this.url = url;
  }

  open(): Promise<null> {
    if (this.getState() === 'OPEN') {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.webSocket = new WebSocket(this.url);
      this.webSocket.onopen = () => resolve(null);
      this.webSocket.onerror = error => reject(error);
    });
  }

  dispatchInt(api: string, request: any): Promise<any> {
    const { webSocket } = this;

    if (webSocket.onmessage) {
      return Promise.reject(new Error(errorMessages.resourceIsBusy));
    }
    
    this.responseData = null;
    
    return new Promise((resolve, reject) => {
      webSocket.onmessage = message => {
        const response = JSON.parse(message.data);

        this.responseData = response.d || this.responseData;

        if (response.sig) {
          webSocket.onmessage = null;
          const { responseData } = this;
          responseData.errorCode
            ? reject(responseData)
            : resolve(responseData);
        }
      };
      
      webSocket.onerror = error => reject(error);
      webSocket.send(JSON.stringify({
        q: api,
        sid: 1,
        d: request,
      }));
    });
  }

  dispatch(api: string, request: any): Promise<any> {
    switch (this.getState()) {
      case 'OPEN': return this.dispatchInt(api, request);
      case 'NONE':
      case 'CLOSED': return this.open().then(() => this.dispatchInt(api, request));
      default: return Promise.reject(errorMessages.unknownState);
    }
  }

  finalize(): Promise<null> {
    const state = this.getState();
    
    if (state === 'NONE' || state === 'CLOSED') {
      return Promise.resolve(null);
    }

    const { webSocket } = this;

    return new Promise((resolve, reject) => {
      webSocket.onclose = () => resolve(null);
      webSocket.onerror = () => reject();
      webSocket.close();
    });
  }

  getState(): string {
    const { webSocket } = this;

    if (!webSocket) {
      return 'NONE';
    }

    switch (webSocket.readyState) {
      case 0: return 'CONNECTING';
      case 1: return 'OPEN';
      case 2: return 'CLOSING';
      case 3: return 'CLOSED';
      default: return 'UNKNOWN';
    }
  }
};
