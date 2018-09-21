import { AccountService } from 'Provider';

import { randomString } from '.';

// jest.setTimeout(10000);

export const runAccountServiceTests  = dispatcher => {

  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Account Service using ${dispatcherName}`, () => {

    const companyName = randomString(32);
    const companyEmail = 'office@' + companyName + '.com';
    const accService = new AccountService(dispatcher);

    it(`Create Organization using ${dispatcherName}`, () => {
      return accService.createOrganization({
        name: companyName,
        email: companyEmail
      }).then(res => {
        console.log('CREATE ORGANIZATION: ', res);
        return expect(res).toBeTruthy();
      }).
      catch(err => {
        console.log('ERROR: ', err);
        return expect(res).toBeTruthy();
      });
    });

  });
}
