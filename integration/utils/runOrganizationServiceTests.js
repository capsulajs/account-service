import { OrganizationService } from 'providers';

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
      expect.assertions(4);

      let response  = await orgService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      const orgId = response.id;
      expect(orgId).toBeTruthy();
      console.log('Organization created: ', orgId);

      response = await orgService.updateOrganization({
        token: token,
        name: 'Next-gen-Acme',
        email: 'office@next-get-acme.com',
        organizationId: orgId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response.name).toBe('Next-gen-Acme');
      console.log('Organization updated: ', response.name);

      response = await orgService.getOrganization({
        token: token,
        organizationId: orgId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response.id).toBe(orgId);
      console.log('Gotten Organization: ', response.id);

      response = await orgService.deleteOrganization({
        token: token,
        organizationId: orgId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response.deleted).toBe(true);
      console.log('Delete Organization: ', response);

      dispatcher.finalize && dispatcher.finalize();
    });

    it(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {
      expect.assertions(7);

      let response = await orgService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      const orgId = response.id;
      expect(orgId).toBeTruthy();
      console.log('Organization created: ', orgId);

      response = await orgService.getOrganizationMembers({
        token: token,
        organizationId: orgId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response.members.length).toBe(0);
      console.log('Organization Members count: :', response.members.length);

      response = await orgService.inviteOrganizationMember({
        token: token,
        organizationId: orgId,
        userId: userId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response).toEqual({});
      console.log('Member was invited');

      response = await orgService.getOrganizationMembers({
        token: token,
        organizationId: orgId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response.members.length).toBe(1);
      console.log('Organization Members count: :', response.members.length);

      response = await orgService.kickoutOrganizationMember({
        token: token,
        organizationId: orgId,
        userId: userId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response).toEqual({});
      console.log('Member was kicked  out');

      response = await orgService.getOrganizationMembers({
        token: token,
        organizationId: orgId,
      });
      response.errorMessage && console.log(`ERROR: ${response.errorCode}: ${response.errorMessage}`);
      expect(response.members.length).toBe(0);
      console.log('Organization Members count: :', response.members.length);

      response = await orgService.deleteOrganization({
        token: token,
        organizationId: orgId,
      });
      expect(response.deleted).toBe(true);
      console.log('Organization deleted: ', response.deleted);

      dispatcher.finalize && dispatcher.finalize();
    });

    it(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {
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
