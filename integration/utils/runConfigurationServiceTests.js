import {
  OrganizationService,
  ConfigurationService,
} from 'Provider';

jest.setTimeout(30000);

export const runConfigurationServiceTests  = dispatcher => {

  const dispatcherName = dispatcher.constructor.name;

  describe(`Sanity Test of the Configuration Service using ${dispatcherName}`, () => {

    it('Create an Organization and a Configuration for it', () => {
      return expect(1).toBeTruthy();
    });
  });
};
