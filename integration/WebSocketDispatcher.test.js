import { WebSocketDispatcher } from 'transport/WebSocket';

import { wsUrl } from './constants';

const request = require('./AccountService.data.json');
const token = require('./Auth0_security_token.json');

describe('Websocket liveness test', () => {

  const wsDispatcher = new WebSocketDispatcher(wsUrl, token);

  it('Opens a connection', () => {
    return wsDispatcher
      .open(wsUrl)
      .then(() =>
        expect(wsDispatcher.getState()).toEqual(1)
      );
  });

  it('Sends a request and receives a response', () => {
    return wsDispatcher
      .dispatch(request, '/organizations/create')
      .then(result =>
        expect(result).toBeTruthy()
      );
  });

  it('Closes a connection', () => {
    return wsDispatcher
      .close()
      .then(() =>
        expect(wsDispatcher.getState()).toEqual(3)
      );
  });

})
