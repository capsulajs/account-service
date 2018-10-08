import { getWebSocketDispatcher } from './utils';

describe('WebsScketDispatcher sanity test', () => {

  const wsDispatcher = getWebSocketDispatcher();
  wsDispatcher.open();

  it('Opens a connection', () => {
    return wsDispatcher.open()
      .then(() =>
        expect(wsDispatcher.getState()).toEqual('OPEN')
      );
  });

  it('Sends a request and receives a response', () => {
    return wsDispatcher.dispatch(
      {
        "name": "Acme Ltd.",
        "email": "office@acme.com"
      },
      '/organizations/create'
    )
    .then(() =>
      wsDispatcher.dispatch(
        {
          "name": "Acme Ltd.",
          "email": "office@acme.com"
        },
        '/organizations/create'
      )
    )
    .then(result =>
      expect(result).toBeTruthy()
    );
  });

  it('Closes a connection', () => {
    return wsDispatcher.open()
      .then(() =>
        wsDispatcher.close()
      )
      .then(() =>
        expect(wsDispatcher.getState()).toEqual('CLOSED')
      );
  });

});
