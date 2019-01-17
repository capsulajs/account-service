import { getWebSocketDispatcher } from './utils/transports';

const credentials = {
  'name': 'Acme Ltd.',
  'email': 'office@acme.com'
};

describe('WebsScketDispatcher sanity test', () => {

  const wsDispatcher = getWebSocketDispatcher();
  wsDispatcher.open();

  it('Opens a connection', () => {
    return wsDispatcher.open().then(() => expect(wsDispatcher.getState()).toEqual('OPEN'));
  });

  it('Sends a request and receives a response', () => {
    return wsDispatcher.dispatch(credentials, '/organizations/create').then(() => {
      wsDispatcher.dispatch(credentials, '/organizations/create');
    }).then(result => expect(result).toBeTruthy());
  });

  it('Closes a connection', () => {
    return wsDispatcher.open()
      .then(() => wsDispatcher.close())
      .then(() => expect(wsDispatcher.getState()).toEqual('CLOSED'));
  });

});
