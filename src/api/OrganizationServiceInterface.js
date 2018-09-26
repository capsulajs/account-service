// @flow

import type {
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
} from './OrganizationServiceTypes';

// Service to manage CreateOrganizations

export interface OrganizationServiceInterface {

  // Creates an Organization
  createOrganization(request: CreateOrganizationRequest): Promise<CreateOrganizationResponse>;

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
};
