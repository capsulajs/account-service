import {
  OrganizationService,
  ConfigurationService,
} from 'Provider';

import { getAuth0Token } from './getAuth0Token';

import {
  organizationName,
  organizationEmail,
  apiKeyName,
  configRepo,
} from './constants';

// const token = require('./Auth0_security_token');
const { userId } = require('./Auth0_security_userid');

jest.setTimeout(120000);

export const runConfigurationServiceTests  = dispatcher => {

  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Configuration Service using ${dispatcherName}`, () => {

    const orgService = new OrganizationService(dispatcher);
    const configService = new ConfigurationService(dispatcher);

    it('Create an Organization and a Configuration for it', async () => {
      expect.assertions(3);

      const { data: { access_token: auth0Token } } = await getAuth0Token();
      const token = {
        issuer: 'auth0',
        token: auth0Token,
      };

      try {
        let response  = await orgService.createOrganization({
          token,
          name: organizationName,
          email: organizationEmail,
        });
        const orgId = response.id;
        expect(orgId).toBeTruthy();
        console.log('Organization created: ', orgId);

        response = await orgService.addOrganizationApiKey({
          token,
          organizationId: orgId,
          apiKeyName,
          claims: { role: 'Owner' },
        });
        const apiKey = response.apiKeys[0].key;
        expect(apiKey).toBeTruthy();
        console.log('Api Key created:\n', apiKey);

        console.log('Lets wait: ', new Date());
        await new Promise(resolve => setTimeout(resolve, 90000));
        console.log('Waited: ', new Date());

        response = await configService.createRepository({
          token: apiKey,
          repository: configRepo,
        });
        console.log('CREATE REPOSITORY:\n', response);
        expect(1).toBeTruthy();
      }
      catch (error) {
        console.log('ERROR:\n', error);
      }
      finally {
        dispatcher.finalize && dispatcher.finalize();
      }

    });
  });
};
