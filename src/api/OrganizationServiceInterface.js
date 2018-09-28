// @flow

import { ErrorResponse } from './ErrorResponse';

import {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  UpdateOrganizationRequest,
  UpdateOrganizationResponse,
  GetOrganizationRequest,
  GetOrganizationResponse,
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  GetOrganizationMembersRequest,
  GetOrganizationMembersResponse,
  InviteOrganizationMemberRequest,
  InviteOrganizationMemberResponse,
  KickoutOrganizationMemberRequest,
  KickoutOrganizationMemberResponse,
  GetMembershipRequest,
  GetMembershipResponse,
  LeaveOrganizationRequest,
  LeaveOrganizationResponse,
  AddOrganizationApiKeyRequest,
  AddOrganizationApiKeyResponse,
  DeleteOrganizationApiKeyRequest,
  DeleteOrganizationApiKeyResponse,
} from './OrganizationServiceTypes';

// Service to manage CreateOrganizations

export interface OrganizationServiceInterface {

  // Creates an Organization
  createOrganization(request: CreateOrganizationRequest): Promise<CreateOrganizationResponse | ErrorResponse>;

  // Updates an Organization
  updateOrganization(request: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse>;

  // Gets Organization Info
  getOrganization(request: GetOrganizationRequest): Promise<GetOrganizationResponse>;

  // Deletes an Organization
  deleteOrganization(request: DeleteOrganizationRequest): Promise<DeleteOrganizationResponse>;

  // Gets Organization members
  getOrganizationMembers(request: GetOrganizationMembersRequest): Promise<GetOrganizationMembersResponse>;

  // Invite Organization Member
  inviteOrganizationMember(request: InviteOrganizationMemberRequest): Promise<InviteOrganizationMemberResponse>;

  // Kickout Organization Member
  kickoutOrganizationMember(request: KickoutOrganizationMemberRequest): Promise<KickoutOrganizationMemberResponse>;

  // Get Membership
  getMembership(request: GetMembershipRequest): Promise<GetMembershipResponse>;

  // Leave Organization
  leaveOrganization(request: LeaveOrganizationRequest): Promise<LeaveOrganizationResponse>;

  // Add Organization Api Key
  addOrganizationApiKey(request: AddOrganizationApiKeyRequest): Promise<AddOrganizationApiKeyResponse>;

  // Delete Organization Api Key
  deleteOrganizationApiKey(request: DeleteOrganizationApiKeyRequest): Promise<DeleteOrganizationApiKeyResponse>;
};
