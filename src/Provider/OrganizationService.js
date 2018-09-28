// @flow

import { OrganizationServiceInterface } from 'api/OrganizationServiceInterface';

import { ErrorResponse } from 'api/ErrorResponse';

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
} from 'api/OrganizationServiceTypes';

import { Dispatcher } from 'transport/api';

export class OrganizationService implements OrganizationServiceInterface {
  dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  createOrganization(request: CreateOrganizationRequest): Promise<CreateOrganizationResponse | ErrorResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/create',
    );
  }

  updateOrganization(request: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/updateOrganization',
    );
  }

  getOrganization(request: GetOrganizationRequest): Promise<GetOrganizationResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/getOrganization',
    );
  }

  deleteOrganization(request: DeleteOrganizationRequest): Promise<DeleteOrganizationResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/delete',
    );
  }

  getOrganizationMembers(request: GetOrganizationMembersRequest): Promise<GetOrganizationMembersResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/getOrganizationMembers',
    );
  }

  inviteOrganizationMember(request: InviteOrganizationMemberRequest): Promise<InviteOrganizationMemberResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/inviteMember',
    );
  };

  kickoutOrganizationMember(request: KickoutOrganizationMemberRequest): Promise<KickoutOrganizationMemberResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/kickoutMember',
    );
  };

  getMembership(request: GetMembershipRequest): Promise<GetMembershipResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/getUserOrganizationsMembership',
    );
  };

  leaveOrganization(request: LeaveOrganizationRequest): Promise<LeaveOrganizationResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/leaveOrganization',
    );
  };

  addOrganizationApiKey(request: AddOrganizationApiKeyRequest): Promise<AddOrganizationApiKeyResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/addOrganizationApiKey',
    );
  };

  deleteOrganizationApiKey(request: DeleteOrganizationApiKeyRequest): Promise<DeleteOrganizationApiKeyResponse> {
    return this.dispatcher.dispatch(
      request,
      '/organizations/deleteOrganizationApiKey',
    );
  }
};
