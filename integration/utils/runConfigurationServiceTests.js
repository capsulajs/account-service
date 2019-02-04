import { ConfigurationServiceHardcoreRemote } from '@capsulajs/capsulajs-configuration-service';
import { OrganizationService } from 'providers';
import { organization, repository, key, value } from './mock';
import { getAuth0Token, wrapToken } from './utils';

jest.setTimeout(60000);

export const runConfigurationServiceTests = dispatcher => {
  const dispatcherName = dispatcher.constructor.name;
  const userId = `${process.env.AUTH_CLIENT_ID}@clients`;
  const organizationService = new OrganizationService(dispatcher);
  
  describe(`Sanity Test of the Configuration Service using ${dispatcherName}`, () => {
    it('Create an Organization and a Configuration for it', async () => {
      expect.assertions(10);
      const token = await getAuth0Token();
      
      let { id: organizationId } = await organizationService.createOrganization({ ...organization, ...wrapToken(token) });
      expect(organizationId).toBeTruthy();
      
      const response = await organizationService.addOrganizationApiKey({
        token,
        organizationId,
        apiKeyName: 'API_KEY',
        claims: { role: 'Owner' },
      });
      
      const apiKey = response.apiKeys[0].key;
      expect(apiKey).toBeTruthy();
      
      const configService = new ConfigurationServiceHardcoreRemote(apiKey, dispatcher);
      await configService.createRepository({ repository });
      await configService.save({ repository, key, value });
      expect(await configService.fetch({ repository, key })).toEqual({ key, value });
      await configService.save({ repository, key, value: Math.PI });
      expect(await configService.fetch({ repository, key })).toEqual({ key, value: Math.PI });
      await configService.save({ repository, key, value: { value });
      expect(await configService.fetch({ repository, key }).toEqual({ key, value: { value } });
      expect((await configService.entries({ repository })).entries).toHaveLength(3);
      await configService.delete({ repository, key });
      expect((await configService.entries({ repository })).entries).toHaveLength(2);
      expect(await organizationService.deleteOrganization({ organizationId })).toEqual({ deleted: true });
      if (dispatcher.finalize) {
        dispatcher.finalize();
      }
    });
  });
};
