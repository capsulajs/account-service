import { OrganizationService, ConfigurationService } from 'providers';
import { getAuth0Token } from './getAuth0Token';
import { apiKeyName, configRepo, organization } from './constants';
import { wrapToken } from './utils/utils';

jest.setTimeout(60000);

export const runConfigurationServiceTests  = dispatcher => {
  describe(`Sanity Test of the Configuration Service using ${dispatcher.constructor.name}`, () => {
    const organizationService = new OrganizationService(dispatcher);
    const configService = new ConfigurationService(dispatcher);

    it('Create an Organization and a Configuration for it', async () => {
      expect.assertions(10);

      const token = await getAuth0Token();
      
      let response  = await organizationService.createOrganization({
        ...organization,
        ...wrapToken(token)
      });
      const organizationId = response.id;
      expect(organizationId).toBeTruthy();
  
      response = await organizationService.addOrganizationApiKey({
        organizationId,
        apiKeyName,
        claims: { role: 'Owner' },
        ...wrapToken(token)
      });
  
      const apiKey = response.apiKeys[0].key;
      expect(apiKey).toBeTruthy();
  
      response = await configService.createRepository({
        token: apiKey,
        repository: configRepo,
      });
  
      expect(response).toEqual({});
  
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
      
      expect(response).toEqual({
        key: 'STR-VAL',
        value: 'Hello, World!',
      });
  
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
      
      expect(response).toEqual({
        key: 'NUM-VAL',
        value: Math.PI,
      });
  
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
      
      expect(response).toEqual({
        key: 'OBJ-VAL',
        value: {
          str: 'Hello, World!',
        },
      });
  
      response = await configService.entries({
        token: apiKey,
        repository: configRepo,
        key: ''
      });
      
      expect(response.entries.length).toBe(3);
      
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
      
      expect(response).toEqual({
        key: 'OBJ-VAL',
        value: {
          newStr: 'Hello, Configuration Service!',
        },
      });
  
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
      
      expect(response.entries.length).toBe(2);
      
      response = await organizationService.deleteOrganization({
        organizationId,
        ...wrapToken(token),
      });
      
      expect(response.deleted).toBe(true);
    
      if (dispatcher.finalize) {
        dispatcher.finalize();
      }
    });
  });
};
