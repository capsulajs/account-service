import { getWebSocketDispatcher } from './utils/transports';
import { organization } from './utils/mock';
import { getAuth0Token, wrapToken } from './utils/utils';

jest.setTimeout(30000);

let wsDispatcher;

describe('WebsScketDispatcher sanity test', () => {
  afterEach(async () => {
    if (wsDispatcher) {
      await wsDispatcher.finalize();
    }
  
    wsDispatcher = null;
  });
  
  it('Opens a connection', async () => {
    expect.assertions(1);
    wsDispatcher = getWebSocketDispatcher();
    
    await wsDispatcher.open();
    expect(wsDispatcher.getState()).toEqual('OPEN');
  });
 
  it('Sends a request and receives a response', async () => {
    expect.assertions(1);
    
    wsDispatcher = getWebSocketDispatcher();
    const token = await getAuth0Token();
    await wsDispatcher.open();
    const { id: organizationId } = await wsDispatcher.dispatch('/organizations/create', {
      ...organization,
      ...wrapToken(token)
    });
    
    expect(organizationId).toBeTruthy();
    
    await wsDispatcher.dispatch('/organizations/delete', {
      organizationId,
      ...wrapToken(token)
    });
  });

  it('Closes a connection', async () => {
    expect.assertions(1);
    
    wsDispatcher = getWebSocketDispatcher();
    await wsDispatcher.open();
    await wsDispatcher.finalize();
    
    expect(wsDispatcher.getState()).toEqual('CLOSED');
  });

});
