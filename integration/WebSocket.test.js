// @flow

import { fromEvent } from 'rxjs';
// import { pluck, map } from 'rxjs/operators';

// console.log('Observable: ', fromEvent);

const WebSocket = require('ws');

import { wsUrl } from './constants';

let request = require('./AccountService.data.json');
request.d.token = require('./Auth0_security_token.json');

// console.log(/*'TOKEN: ', */request);

  describe('A miserable attempt to establish a WebSocket connection', () => {
  it('Test WebSocket', (done) => {
    expect.assertions(1);
    const ws = new WebSocket(wsUrl);

    ws.on('open', () => {
      console.log('OPEN');
      ws.send(JSON.stringify(request));
    });

    // fromEvent(ws, 'message')
    //   .pipe(
    //     pluck('data'),
    //     map(JSON.parse)
    //   )
    //   .subscribe(message => {
    //     console.log('MESSAGE: ', typeof message);
    //     ws.close();
    //     expect(1).toBeTruthy();
    //     done();
    //   });
    // ws.on('message', message => {
    //   ws.close();
    // });

    ws.onmessage = message => {
      console.log('MESSAGE 1: ', message.data);
    };

    ws.onmessage = message => {
      console.log('MESSAGE 2: ', message.data);
    };

    ws.on('error', error => console.log('ERROR: ', error));
    ws.onclose = ({ code, reason }) => {
      expect(1).toBeTruthy();
      console.log(`CLOSE: ${code}: ${reason}`);
      done();
    };
   });
 });
