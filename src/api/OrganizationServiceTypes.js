// @flow

// Type of the authentication Token
export type Token = {
  issuer: string,
  token: string,
};

// Type of the Organization Member
export type OrganizationMember = {
  id: string;
  role: string;
}

// Type of the OrganizationInfo
export type OrganizationInfo = {
  id: string,
  name: string,
  email: string,
  ownerId: string,
};

// Type of the Create Organization Request
export type CreateOrganizationRequest = {
  token: Token;
  name: string,
  email: string;
};

// Type of the Create Organization Response
export type CreateOrganizationResponse = {
  apiKeys: string[],
  id: string,
  name: string,
  email: string,
  ownerId: string,
};

// Type of the Update Organization Request
export type UpdateOrganizationRequest = {
  token: Token;
  name: string,
  email: string,
  organizationId: string,
}

// Type of the Update Organization Response
export type UpdateOrganizationResponse = {
  id: string,
  name: string,
  apiKeys: string[],
  email: string,
  ownerId: string,
}

// Type of the Get Organization Request
export type GetOrganizationRequest = {
  token: Token;
  organizationId: string,
}

// Type of the Get Organization Response
export type GetOrganizationResponse = {
  id: string,
  name: string,
  apiKeys: string[],
  email: string,
  ownerId: string,
}

// Type of the Delete Organization Request
export type DeleteOrganizationRequest = {
  token: Token;
  organizationId: string,
};

// Type of the Delete Organization Response
export type DeleteOrganizationResponse = {
  deleted: boolean,
  organizationId: string,
};

// Type of the Get Organization Members Request
export type GetOrganizationMembersRequest = {
  token: Token;
  organizationId: string,
};

// Type of the Get Organization Members Response
export type GetOrganizationMembersResponse = {
  members: OrganizationMember[],
};

// Type of the Invite Organization Member Request
export type InviteOrganizationMemberRequest = {
  token: Token;
  organizationId: string;
  userId: string;
};

// Type of the Invite Organization Member Response
export type InviteOrganizationMemberResponse = {
};

// Type of the Kickout Organization Member Request
export type KickoutOrganizationMemberRequest = {
  token: Token;
  organizationId: string;
  userId: string;
};

// Type of the Kickout Organization Member Response
export type KickoutOrganizationMemberResponse = {
};

// Type of the Get Membership Request
export type GetMembershipRequest = {
  token: Token;
};

// Type of the Get Membership Response
export type GetMembershipResponse = {
  organizations: OrganizationInfo[];
};

// Type of the Leave Organization Request
export type LeaveOrganizationRequest = {
  token: Token;
  organizationId: string;
};

// Type of the Leave Organization Response
export type LeaveOrganizationResponse = {
};
