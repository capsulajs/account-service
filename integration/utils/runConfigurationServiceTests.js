import {
  OrganizationService,
  ConfigurationService,
} from 'Provider';

import {
  organizationName,
  organizationEmail,
  apiKeyName,
  configRepo,
} from './constants';

const token = require('./Auth0_security_token.json');
const { userId } = require('./Auth0_security_userid.json');

jest.setTimeout(30000);

export const runConfigurationServiceTests  = dispatcher => {

  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Configuration Service using ${dispatcherName}`, () => {

    const orgService = new OrganizationService(dispatcher);
    const configService = new ConfigurationService(dispatcher);

    it('Create an Organization and a Configuration for it', async () => {
      expect.assertions(3);

      try {
        let response  = await orgService.createOrganization({
          token: token,
          name: organizationName,
          email: organizationEmail,
        });
        const orgId = response.id;
        expect(orgId).toBeTruthy();
        console.log('Organization created: ', orgId);

        response = await orgService.addOrganizationApiKey({
          token: token,
          organizationId: orgId,
          apiKeyName,
          claims: { role: 'Owner' },
        });
        const apiKey = response.apiKeys[0].key;
        expect(apiKey).toBeTruthy();
        console.log('Api Key created:\n', response);
        console.log('Api Key created: ', apiKey);

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
