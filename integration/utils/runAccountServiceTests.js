import { AccountService } from 'providers';
import { getAuth0Token } from './getAuth0Token';
import { account } from './constants';

jest.setTimeout(30000);

export const runAccountServiceTests = dispatcher => {
  describe('Sanity test for the Account Service', () => {
    it('Create and delete an account', async () => {
      expect.assertions(2);
  
      const token = await getAuth0Token();
      const service = new AccountService(dispatcher, token);
      const { accountId } = await service.createAccount(account);
      expect(accountId).toBeTruthy();
      const { deleted } = await service.deleteAccount({ accountId });
      expect(deleted).toBe(true);
      dispatcher.finalize && dispatcher.finalize();
    });
  });
};
