// @flow

// Interface of the authentication Token
export interface Token {
  issuer: string,
  token: string,
};

// Interface of the Organization Member
export interface OrganizationMember {
  id: string;
  role: string;
}

// Interface of the Api Key
export interface ApiKey {
  key: string,
  name: string,
  claims: { [string]: string },
};

// Interface of the OrganizationInfo
export interface OrganizationInfo {
  apiKeys: ApiKey[],
  id: string,
  name: string,
  email: string,
  ownerId: string,
};

// Interface of the Create Organization Request
export interface CreateOrganizationRequest {
  token: Token;
  name: string,
  email: string;
};

// Interface of the Create Organization Response
export interface CreateOrganizationResponse extends OrganizationInfo {
};

// Interface of the Update Organization Request
export interface UpdateOrganizationRequest {
  token: Token;
  name: string,
  email: string,
  organizationId: string,
};

// Interface of the Update Organization Response
export interface UpdateOrganizationResponse extends OrganizationInfo {
};

// Interface of the Get Organization Request
export interface GetOrganizationRequest {
  token: Token;
  organizationId: string,
};

// Interface of the Get Organization Response
export interface GetOrganizationResponse extends OrganizationInfo {
};

// Interface of the Delete Organization Request
export interface DeleteOrganizationRequest {
  token: Token;
  organizationId: string,
};

// Interface of the Delete Organization Response
export interface DeleteOrganizationResponse {
  deleted: boolean,
  organizationId: string,
};

// Interface of the Get Organization Members Request
export interface GetOrganizationMembersRequest {
  token: Token;
  organizationId: string,
};

// Interface of the Get Organization Members Response
export interface GetOrganizationMembersResponse {
  members: OrganizationMember[],
};

// Interface of the Invite Organization Member Request
export interface InviteOrganizationMemberRequest {
  token: Token;
  organizationId: string;
  userId: string;
};

// Interface of the Invite Organization Member Response
export interface InviteOrganizationMemberResponse {
};

// Interface of the Kickout Organization Member Request
export interface KickoutOrganizationMemberRequest {
  token: Token;
  organizationId: string;
  userId: string;
};

// Interface of the Kickout Organization Member Response
export interface KickoutOrganizationMemberResponse {
};

// Interface of the Get Membership Request
export interface GetMembershipRequest {
  token: Token;
};

// Interface of the Get Membership Response
export interface GetMembershipResponse {
  organizations: OrganizationInfo[];
};

// Interface of the Leave Organization Request
export interface LeaveOrganizationRequest {
  token: Token;
  organizationId: string;
};

// Interface of the Leave Organization Response
export interface LeaveOrganizationResponse {
};
