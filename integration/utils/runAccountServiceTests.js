import { AccountService } from 'providers';
import { getAuth0Token } from './getAuth0Token';
import { account } from './constants';

jest.setTimeout(30000);

export const runAccountServiceTests = dispatcher => {
  describe('Sanity test for the Account Service', () => {
    it('Create and delete an account', async () => {
      expect.assertions(2);

      let service = null;

      try {
        const token = await getAuth0Token();
        service = new AccountService(dispatcher, token);
        let response = await service.createAccount(account);
        const { accountId } = response;
        expect(accountId).toBeTruthy();
        console.log('Account created: ', accountId);
        // Delete the previously created Account
        response = await service.deleteAccount({ accountId });
        expect(response.deleted).toBe(true);
        console.log('Account deleted: ', response.deleted);
      } catch (error) {
        console.log('CAUGHT ERROR:\n', error);
      } finally {
        dispatcher.finalize && dispatcher.finalize();
      }
    });

  });
};
