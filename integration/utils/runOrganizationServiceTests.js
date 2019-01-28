import { OrganizationService } from 'providers';
import { organization } from './mock';
import { getAuth0Token, wrapToken } from './utils';

jest.setTimeout(30000);

export const runOrganizationServiceTests = dispatcher => {
  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Organization Service using ${dispatcherName}`, () => {
    const organizationService = new OrganizationService(dispatcher);

    it(`Create and Delete an Organization using ${dispatcherName}`, async () => {
      expect.assertions(4);
      const token = await getAuth0Token();
      const { id: organizationId }  = await organizationService.createOrganization({
        ...organization,
        ...wrapToken(token)
      });
      expect(organizationId).toBeTruthy();
      const { name } = await organizationService.updateOrganization({
        organizationId,
        name: 'Next-gen-Acme',
        email: 'office@next-get-acme.com',
        ...wrapToken(token)
      });
      expect(name).toBe('Next-gen-Acme');
      const { id } = await organizationService.getOrganization({
        organizationId,
        ...wrapToken(token)
      });
      expect(id).toBe(organizationId);
      const { deleted } = await organizationService.deleteOrganization({
        organizationId,
        ...wrapToken(token)
      });
      expect(deleted).toBe(true);
      if (dispatcher.finalize) {
        await dispatcher.finalize();
      }
    });

    it(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {
      expect.assertions(7);
      
      const userId = `${process.env.AUTH_CLIENT_ID}@clients`;
      const token = await getAuth0Token();
      const { id: organizationId } = await organizationService.createOrganization({
        ...organization,
        ...wrapToken(token)
      });
      const { members } = await organizationService.getOrganizationMembers({
        organizationId,
        ...wrapToken(token)
      });
      expect(members.length).toBe(0);
      expect(await organizationService.inviteOrganizationMember({
        organizationId,
        userId,
        ...wrapToken(token)
      })).toEqual({});
      expect(response).toEqual({});
      const { members: members1 } = await orgService.getOrganizationMembers({
        organizationId,
        ...wrapToken(token)
      });
      expect(members1.length).toBe(1);
      expect(await organizationService.kickoutOrganizationMember({
        organizationId,
        userId,
        ...wrapToken(token)
      })).toEqual({});
      const { members: members2 } = await organizationService.getOrganizationMembers({
        organizationId,
        userId,
        ...wrapToken(token)
      });
      expect(members2.length).toBe(0);
      const { deleted } = await organizationService.deleteOrganization({
        organizationId,
        ...wrapToken(token)
      });
      expect(deleted).toBe(true);
      if (dispatcher.finalize) {
        await dispatcher.finalize();
      }
    });
    
    it(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {
      expect.assertions(5);

      const token = await getAuth0Token();
      let response = await organizationService.createOrganization({
        ...organization,
        ...wrapToken(token)
      });
      const organizationId = response.id;
      expect(organizationId).toBeTruthy();

      response = await organizationService.getOrganization({
        organizationId,
        ...wrapToken(token)
      });
      expect(response.apiKeys.length).toBe(0);

      response = await organizationService.addOrganizationApiKey({
        organizationId,
        apiKeyName: 'TEST-API-KEY',
        claims: { role: 'Admin' },
        ...wrapToken(token)
      });
      expect(response.apiKeys.length).toBe(1);

      response = await organizationService.deleteOrganizationApiKey({
        organizationId,
        apiKeyName: 'TEST-API-KEY',
        ...wrapToken(token)
      });
      expect(response.apiKeys.length).toBe(0);

      response = await organizationService.deleteOrganization({
        organizationId,
        ...wrapToken(token)
      });
      expect(response.deleted).toBe(true);

      if (dispatcher.finalize) {
        await dispatcher.finalize();
      }
    });
  });
};
