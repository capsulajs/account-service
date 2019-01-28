import { OrganizationService } from 'providers';
import { organization } from './constants';
import { getAuth0Token } from './getAuth0Token';
import { wrapToken } from './utils';

jest.setTimeout(30000);

export const runOrganizationServiceTests  = dispatcher => {
  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Organization Service using ${dispatcherName}`, () => {
    const organizationService = new OrganizationService(dispatcher);

    // it(`Create and Delete an Organization using ${dispatcherName}`, async () => {
    //   expect.assertions(4);
    //   const token = await getAuth0Token();
    //   const { id: organizationId }  = await organizationService.createOrganization({
    //     ...organization,
    //     ...wrapToken(token)
    //   });
    //   expect(organizationId).toBeTruthy();
    //   const { name } = await organizationService.updateOrganization({
    //     organizationId,
    //     name: 'Next-gen-Acme',
    //     email: 'office@next-get-acme.com',
    //     ...wrapToken(token)
    //   });
    //   expect(name).toBe('Next-gen-Acme');
    //   const { id } = await organizationService.getOrganization({
    //     organizationId,
    //     ...wrapToken(token)
    //   });
    //   expect(id).toBe(organizationId);
    //   const { deleted } = await organizationService.deleteOrganization({
    //     organizationId,
    //     ...wrapToken(token)
    //   });
    //   expect(deleted).toBe(true);
    //   if (dispatcher.finalize) {
    //     await dispatcher.finalize();
    //   }
    // });

    it(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {
      expect.assertions(7);

      const token = await getAuth0Token();
      const { id: organizationId, ownerId: userId } = await organizationService.createOrganization({
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
      const { members: updatedMembers1 } = await orgService.getOrganizationMembers({
        organizationId,
        ...wrapToken(token)
      });
      expect(updatedMembers1.length).toBe(1);
      expect(await organizationService.kickoutOrganizationMember({
        organizationId,
        userId,
        ...wrapToken(token)
      })).toEqual({});
      const { members: updatedMembers2 } = await organizationService.getOrganizationMembers({
        organizationId,
        userId,
        ...wrapToken(token)
      });
      expect(updatedMembers2.length).toBe(0);
      const { deleted } = await organizationService.deleteOrganization({
        organizationId,
        ...wrapToken(token)
      });
      expect(deleted).toBe(true);
      if (dispatcher.finalize) {
        dispatcher.finalize();
      }
    });
    
    // it(`Get/Add/Remove Organization members  using ${dispatcherName}`, async () => {
    //   expect.assertions(5);
    //
    //   const token = await getAuth0Token();
    //   let response = await organizationService.createOrganization({ token, ...organization });
    //   const orgId = response.id;
    //   expect(orgId).toBeTruthy();
    //   console.log('Organization created: ', orgId);
    //
    //   response = await organizationService.getOrganization({ token, organizationId: orgId });
    //   expect(response.apiKeys.length).toBe(0);
    //   console.log('Api Keys count before addition :', response.apiKeys.length);
    //
    //   response = await organizationService.addOrganizationApiKey({
    //     token,
    //     organizationId: orgId,
    //     apiKeyName: 'TEST-API-KEY',
    //     claims: { role: 'Admin' }
    //   });
    //   expect(response.apiKeys.length).toBe(1);
    //   console.log('Api Keys count after addition: ', response.apiKeys.length);
    //
    //   response = await organizationService.deleteOrganizationApiKey({
    //     token,
    //     organizationId: orgId,
    //     apiKeyName: 'TEST-API-KEY',
    //   });
    //   expect(response.apiKeys.length).toBe(0);
    //   console.log('Api Keys count after deletion: ', response.apiKeys.length);
    //
    //   response = await organizationService.deleteOrganization({ token, organizationId: orgId });
    //   expect(response.deleted).toBe(true);
    //   console.log('Organization deleted: ', response.deleted);
    //
    //   dispatcher.finalize && dispatcher.finalize();
    // });
  });
};
