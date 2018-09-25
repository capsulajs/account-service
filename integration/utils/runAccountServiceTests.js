import { AccountService } from 'Provider';

const token = require('./Auth0_security_token.json');

import {
  organizationName,
  organizationEmail,
} from './constants';

jest.setTimeout(30000);

export const runAccountServiceTests  = dispatcher => {

  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Account Service using ${dispatcherName}`, () => {

    const accService = new AccountService(dispatcher);

    it(`Create and Delete an Organization using ${dispatcherName}`, () => {
      return accService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      })
      .then(response => {
        console.log('CREATE ORGANIZATION:\n', response);
        const { id } = response;
        if (id) {
          return accService.deleteOrganization({
            token: token,
            organizationId: id,
          });
        } else {
          dispatcher.finalize && dispatcher.finalize();
          return expect(id).toBeTruthy();
        }
      })
      .then(response => {
        console.log('DELETE ORGANIZATION:\n', response);
        dispatcher.finalize && dispatcher.finalize();
        return expect(response.deleted).toBe(true);
      });
    });

  });
}
