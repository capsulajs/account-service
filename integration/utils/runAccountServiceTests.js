jest.setTimeout(30000);

import { AccountService } from 'Provider';

const token = require('./Auth0_security_token.json');

export const runAccountServiceTests  = dispatcher => {

  describe('Sanity test for the Account Service', () => {

    it.only('Create and delete an account', async () => {
      expect.assertions(1);

      const accService = new AccountService(dispatcher, token);
      let response = await accService.createAccount({
        name: 'ACME-ACCOUNT',
        email: 'office@acme.net',
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      const accountId = response.accountId;
      expect(accountId).toBeTruthy();
      console.log('Account created: ', accountId);
    });

    it('List accounts of a user with no accounts', async () => {
      expect.assertions(1);

      const accService = new AccountService(dispatcher, token);
      const response = await accService.list();
      console.log(response);
      expect(response.accounts.length).toBe(0);
    });
  });
};
