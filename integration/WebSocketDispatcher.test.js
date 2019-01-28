import { getWebSocketDispatcher } from './utils/transports';
import { organization } from './utils/mock';
import { getAuth0Token, wrapToken } from './utils/utils';

jest.setTimeout(30000);

describe('WebsScketDispatcher sanity test', () => {
  it('Opens a connection', async () => {
    expect.assertions(1);
    const wsDispatcher = getWebSocketDispatcher();
    await wsDispatcher.open();
    expect(wsDispatcher.getState()).toEqual('OPEN');
    await wsDispatcher.finalize();
  });
 
  it('Sends a request and receives a response', async () => {
    const wsDispatcher = getWebSocketDispatcher();
    const token = await getAuth0Token();
    await wsDispatcher.open();
    const { id: organizationId } = await wsDispatcher.dispatch('/organizations/create', {
      ...organization,
      ...wrapToken(token)
    });
    await wsDispatcher.dispatch('/organizations/delete', {
      organizationId,
      ...wrapToken(token)
    });
    await wsDispatcher.finalize();
  });

  it('Closes a connection', async () => {
    const wsDispatcher = getWebSocketDispatcher();
    await wsDispatcher.open();
    await wsDispatcher.finalize();
    expect(wsDispatcher.getState()).toEqual('CLOSED');
  });

});
