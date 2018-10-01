jest.setTimeout(30000);

import { AccountService } from 'Provider';

const token = require('./Auth0_security_token.json');

export const runAccountServiceTests  = dispatcher => {

  describe('Sanity test for the Account Service', () => {

    it.only('Create and delete an account', async () => {
      expect.assertions(2);

      let accService = null;

      try {
        accService = new AccountService(dispatcher, token);

        // Create an Account
        let response = await accService.createAccount({
          name: 'ACME-ACCOUNT',
          email: 'office@acme.net',
        });
        const accountId = response.accountId;
        expect(accountId).toBeTruthy();
        console.log('Account created: ', accountId);

        // Delete the previously created Account
        response = await accService.deleteAccount({
          accountId: accountId
        });
        expect(response.deleted).toBe(true);
        console.log('Account deleted: ', response.deleted);
      }
      catch (error) {
        console.log('CAUGHT ERROR:\n', error);
      }
      finally {
        dispatcher.finalize && dispatcher.finalize();
      }
    });

  });
};
