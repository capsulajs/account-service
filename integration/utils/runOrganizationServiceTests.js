import { OrganizationService } from 'Provider';

const token = require('./Auth0_security_token.json');
const { userId } = require('./Auth0_security_userid.json');

import {
  organizationName,
  organizationEmail,
} from './constants';

jest.setTimeout(30000);

export const runOrganizationServiceTests  = dispatcher => {

  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Organization Service using ${dispatcherName}`, () => {

    const orgService = new OrganizationService(dispatcher);

    it(`Create and Delete an Organization using ${dispatcherName}`, async () => {

      let response  = await orgService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      });
      console.log('CREATE ORGANIZATION:\n', response);

      let orgId = response.id;
      response = await orgService.updateOrganization({
        token: token,
        name: 'Next-gen-Acme',
        email: 'office@next-get-acme.com',
        organizationId: orgId,
      });
      console.log('UPDATE ORGANIZATION:\n', response);

      response = await orgService.getOrganization({
        token: token,
        organizationId: orgId,
      });
      console.log('GET ORGANIZATION:\n', response);

      response = await orgService.deleteOrganization({
        token: token,
        organizationId: orgId,
      });
      console.log('DELETE ORGANIZATION:\n', response);

      dispatcher.finalize && dispatcher.finalize();
      return expect(response.deleted).toBe(true);
    });

    it(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {

      let response = await orgService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      });
      console.log('CREATE ORGANIZATION:\n', response);

      let orgId = response.id;
      response = await orgService.getOrganizationMembers({
        token: token,
        organizationId: orgId,
      });
      console.log('GET ORGANIZATION MEMBERS:\n', response);

      response = await orgService.inviteOrganizationMember({
        token: token,
        organizationId: orgId,
        userId: userId,
      });
      console.log('INVITE ORGANIZATION MEMBER:\n', response);

      response = await orgService.getOrganizationMembers({
        token: token,
        organizationId: orgId,
      });
      console.log('GET ORGANIZATION MEMBERS:\n', response);

      response = await orgService.kickoutOrganizationMember({
        token: token,
        organizationId: orgId,
        userId: userId,
      });
      console.log('KICK OUT ORGANIZATION MEMBER:\n', response);

      response = await orgService.getOrganizationMembers({
        token: token,
        organizationId: orgId,
      });
      console.log('GET ORGANIZATION MEMBERS:\n', response);

      response = await orgService.deleteOrganization({
        token: token,
        organizationId: orgId,
      });
      console.log('DELETE ORGANIZATION:\n', response);

      dispatcher.finalize && dispatcher.finalize();
      expect(response.deleted).toBe(true);
    });

    it.only(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {
      expect.assertions(5);

      let response = await orgService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      });
      const orgId = response.id;
      expect(orgId).toBeTruthy();
      console.log('Organization created: ', orgId);

      response = await orgService.getOrganization({
        token: token,
        organizationId: orgId,
      });
      expect(response.apiKeys.length).toBe(0);
      console.log('Api Keys count before addition :', response.apiKeys.length);

      response = await orgService.addOrganizationApiKey({
        token: token,
        organizationId: orgId,
        apiKeyName: 'TEST-API-KEY',
        claims: { role: 'Admin' }
      });
      expect(response.apiKeys.length).toBe(1);
      console.log('Api Keys count after addition: ', response.apiKeys.length);

      response = await orgService.deleteOrganizationApiKey({
        token: token,
        organizationId: orgId,
        apiKeyName: 'TEST-API-KEY',
      });
      expect(response.apiKeys.length).toBe(0);
      console.log('Api Keys count after deletion: ', response.apiKeys.length);

      response = await orgService.deleteOrganization({
        token: token,
        organizationId: orgId,
      });
      expect(response.deleted).toBe(true);
      console.log('Organization deleted: ', response.deleted);

      dispatcher.finalize && dispatcher.finalize();
    });
  });
}
