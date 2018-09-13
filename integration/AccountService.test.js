// @flow

const WebSocket = require('ws');

let request = require('./AccountService.data.json');
request.d.token = require('./Auth0_security_token.json');

console.log(/*'TOKEN: ', */request);

const wsUrl = 'wss://configuration-service-7070.genesis.om2.com/';

describe('A miserable attempt to establish a WebSocket connection', () => {
  it('Test WebSocket', () => {
    const ws = new WebSocket(wsUrl);

    ws.on('open', () => {
      console.log('OPEN');
      ws.send(JSON.stringify(request));
    });

    ws.on('message', message => {
      console.log('MESSAGE: ', JSON.parse(message));
      ws.close();
    });

    ws.on('error', error => console.log('ERROR: ', error));
    ws.onclose = ({ code, reason }) => console.log(`CLOSE: ${code}: ${reason}`);
  });
});
