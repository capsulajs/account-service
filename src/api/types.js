// @flow

export type Token = {
  issuer: string,
  token: string,
};

export type CreateOrganizationRequest = {
  token: Token;
  name: string,
  email: string;
};

export type CreateOrganizationResponse = {
  apiKeys: string[],
  id: string,
  name: string,
  email: string,
  ownerId: string,
};

export type DeleteOrganizationRequest = {
  organizationId: string,
};

export type DeleteOrganizationResponse = {
  deleted: boolean,
  organizationId: string,
};
