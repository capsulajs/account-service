import { WebSocketDispatcher } from 'transport/WebSocket';

import { wsUrl } from './constants';

let request = require('./AccountService.data.json');
request.d.token = require('./Auth0_security_token.json');

describe('POC test of the webSocketDispatcher', () => {
  it('Create WebSocketDispatcher and dispatch a message', () => {
    const ws = new WebSocketDispatcher(wsUrl);
    ws.dispatch(request).then(res => {
      console.log('RESULT: ', result);
    });
  });
})
