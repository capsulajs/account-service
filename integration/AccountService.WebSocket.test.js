// import { AccountService } from 'Provider';
//
// import {
//   randomString,
//   getWebSocketDispatcher,
// } from './utils';
//
// // jest.setTimeout(10000);
//
// describe('Sanity Test of the Account Service on top of WebSocket transport', () => {
//
//   const companyName = randomString(32);
//   const companyEmail = 'office@' + companyName + '.com';
//   const accService = new AccountService(getWebSocketDispatcher());
//
//   it('Create a Account Service instance', () => {
//     return accService.createOrganization({
//       name: companyName,
//       email: companyEmail
//     }).then(res => {
//       console.log('CREATE ORGANIZATION: ', res);
//       return expect(res).toBeTruthy();
//     }).
//     catch(err => {
//       console.log('ERROR: ', err);
//       return expect(res).toBeTruthy();
//     });
//   });
//
// });

import {
  getWebSocketDispatcher,
  runAccountServiceTests,
} from './utils';

runAccountServiceTests(getWebSocketDispatcher());
