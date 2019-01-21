import { OrganizationService, ConfigurationService } from 'providers';
import { getAuth0Token } from './getAuth0Token';
import {
  apiKeyName,
  configRepo,
  organization
} from './constants';

jest.setTimeout(60000);

export const runConfigurationServiceTests  = dispatcher => {
  describe(`Sanity Test of the Configuration Service using ${dispatcher.constructor.name}`, () => {
    const organizationService = new OrganizationService(dispatcher);
    const configService = new ConfigurationService(dispatcher);

    it('Create an Organization and a Configuration for it', async () => {
      expect.assertions(10);

      const token = await getAuth0Token();
 
      try {
        let response  = await organizationService.createOrganization({
          token: {
            token,
            issuer: 'Auth0'
          },
          ...organization
        });
        const orgId = response.id;
        expect(orgId).toBeTruthy();
        console.log('Organization created:\n', orgId);

        response = await organizationService.addOrganizationApiKey({
          token,
          organizationId: orgId,
          apiKeyName,
          claims: { role: 'Owner' },
        });
        const apiKey = response.apiKeys[0].key;
        expect(apiKey).toBeTruthy();
        console.log('Api Key created:\n', apiKey);

        response = await configService.createRepository({
          token: apiKey,
          repository: configRepo,
        });
        console.log('Repository Created:\n', response);
        expect(response).toEqual({});

        // checking key string value
        response = await configService.save({
          token: apiKey,
          repository: configRepo,
          key: 'STR-VAL',
          value: 'Hello, World!',
        });
        response = await configService.fetch({
          token: apiKey,
          repository: configRepo,
          key: 'STR-VAL',
        });
        console.log('Fetched from Repository:\n', response);
        expect(response).toEqual({
          key: 'STR-VAL',
          value: 'Hello, World!',
        });

        // checking key numeric value
        response = await configService.save({
          token: apiKey,
          repository: configRepo,
          key: 'NUM-VAL',
          value: Math.PI,
        });
        response = await configService.fetch({
          token: apiKey,
          repository: configRepo,
          key: 'NUM-VAL',
        });
        console.log('Fetched from Repository:\n', response);
        expect(response).toEqual({
          key: 'NUM-VAL',
          value: Math.PI,
        });

        // checking key object value
        response = await configService.save({
          token: apiKey,
          repository: configRepo,
          key: 'OBJ-VAL',
          value: {
            str: 'Hello, World!',
          },
        });
        response = await configService.fetch({
          token: apiKey,
          repository: configRepo,
          key: 'OBJ-VAL',
        });
        console.log('Fetched from Repository:\n', response);
        expect(response).toEqual({
          key: 'OBJ-VAL',
          value: {
            str: 'Hello, World!',
          },
        });

        // checking Entries
        response = await configService.entries({
          token: apiKey,
          repository: configRepo,
          key: ''
        });
        console.log('Entries of the Repository:\n', response);
        expect(response.entries.length).toBe(3);

        // checking Save Entry
        response = await configService.save({
          token: apiKey,
          repository: configRepo,
          key: 'OBJ-VAL',
          value: {
            newStr: 'Hello, Configuration Service!',
          },
        });
        response = await configService.fetch({
          token: apiKey,
          repository: configRepo,
          key: 'OBJ-VAL',
        });
        console.log('Fetched from Repository:\n', response);
        expect(response).toEqual({
          key: 'OBJ-VAL',
          value: {
            newStr: 'Hello, Configuration Service!',
          },
        });

        // Checking Delete Entry
        response = await configService.delete({
          token: apiKey,
          repository: configRepo,
          key: 'OBJ-VAL',
        });
        response = await configService.entries({
          token: apiKey,
          repository: configRepo,
          key: ''
        });
        console.log('Entries of the Repository:\n', response);
        expect(response.entries.length).toBe(2);


        // Remove the Organization created
        response = await organizationService.deleteOrganization({
          token: token,
          organizationId: orgId,
        });
        expect(response.deleted).toBe(true);
        console.log('Organization deleted:\n', response.deleted);
      } catch (error) {
        console.log('ERROR:\n', error);
      } finally {
        dispatcher.finalize && dispatcher.finalize();
      }

    });
  });
};
