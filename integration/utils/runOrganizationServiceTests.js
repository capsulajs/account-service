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
    let orgId;

    it(`Create and Delete an Organization using ${dispatcherName}`, () => {
      return orgService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      })
      .then(response => {
        orgId = response.id;
        console.log('CREATE ORGANIZATION:\n', response);
        return orgService.updateOrganization({
          token: token,
          name: 'Next-gen-Acme',
          email: 'office@next-get-acme.com',
          organizationId: orgId,
        });
      })
      .then(response => {
        console.log('UPDATE ORGANIZATION:\n', response);
        return orgService.getOrganization({
          token: token,
          organizationId: orgId,
        });
      })
      .then(response => {
        console.log('GET ORGANIZATION:\n', response);
        return orgService.deleteOrganization({
          token: token,
          organizationId: orgId,
        });
      })
      .then(response => {
        console.log('DELETE ORGANIZATION:\n', response);
        dispatcher.finalize && dispatcher.finalize();
        return expect(response.deleted).toBe(true);
      });
    });

    it.only(`Get/Add/Remove Organization members  using ${dispatcherName}`, () => {
      return orgService.createOrganization({
        token: token,
        name: organizationName,
        email: organizationEmail,
      })
      .then(response => {
        orgId = response.id;
        console.log('CREATE ORGANIZATION:\n', response);
        return orgService.getOrganizationMembers({
          token: token,
          organizationId: orgId,
        });
      })
      .then(response => {
        console.log('GET ORGANIZATION MEMBERS:\n', response);
        return orgService.inviteOrganizationMember({
          token: token,
          organizationId: orgId,
          userId: userId,
        });
      })
      .then(response => {
        console.log('INVITE ORGANIZATION MEMBER:\n', response);
        return orgService.getOrganizationMembers({
          token: token,
          organizationId: orgId,
        });
      })
      .then(response => {
        console.log('GET ORGANIZATION MEMBERS:\n', response);
        return orgService.kickoutOrganizationMember({
          token: token,
          organizationId: orgId,
          userId: userId,
        });
      })
      .then(response => {
        console.log('KICK OUT ORGANIZATION MEMBER:\n', response);
        return orgService.getOrganizationMembers({
          token: token,
          organizationId: orgId,
        });
      })
      .then(response => {
        console.log('GET ORGANIZATION MEMBERS:\n', response);
        return orgService.deleteOrganization({
          token: token,
          organizationId: orgId,
        });
      })
      .then(response => {
        console.log('DELETE ORGANIZATION:\n', response);
        dispatcher.finalize && dispatcher.finalize();
        return expect(response.deleted).toBe(true);
      });
    });
  });
}
