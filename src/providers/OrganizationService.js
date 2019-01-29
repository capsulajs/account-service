// @flow

import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';
import { OrganizationServiceInterface } from 'api/OrganizationServiceInterface';
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
import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';

export class OrganizationService implements OrganizationServiceInterface {
  dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  createOrganization(request: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    return this.dispatcher.dispatch('/organizations/create', request);
  }

  updateOrganization(request: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
    return this.dispatcher.dispatch('/organizations/updateOrganization', request);
  }

  getOrganization(request: GetOrganizationRequest): Promise<GetOrganizationResponse> {
    return this.dispatcher.dispatch('/organizations/getOrganization', request);
  }

  deleteOrganization(request: DeleteOrganizationRequest): Promise<DeleteOrganizationResponse> {
    return this.dispatcher.dispatch('/organizations/delete', request);
  }

  getOrganizationMembers(request: GetOrganizationMembersRequest): Promise<GetOrganizationMembersResponse> {
    return this.dispatcher.dispatch('/organizations/getOrganizationMembers', request);
  }

  inviteOrganizationMember(request: InviteOrganizationMemberRequest): Promise<InviteOrganizationMemberResponse> {
    return this.dispatcher.dispatch('/organizations/inviteMember', request);
  };

  kickoutOrganizationMember(request: KickoutOrganizationMemberRequest): Promise<KickoutOrganizationMemberResponse> {
    return this.dispatcher.dispatch('/organizations/kickoutMember', request);
  };

  getMembership(request: GetMembershipRequest): Promise<GetMembershipResponse> {
    return this.dispatcher.dispatch('/organizations/getUserOrganizationsMembership', request);
  };

  leaveOrganization(request: LeaveOrganizationRequest): Promise<LeaveOrganizationResponse> {
    return this.dispatcher.dispatch('/organizations/leaveOrganization', request);
  };

  addOrganizationApiKey(request: AddOrganizationApiKeyRequest): Promise<AddOrganizationApiKeyResponse> {
    return this.dispatcher.dispatch('/organizations/addOrganizationApiKey', request);
  };

  deleteOrganizationApiKey(request: DeleteOrganizationApiKeyRequest): Promise<DeleteOrganizationApiKeyResponse> {
    return this.dispatcher.dispatch('/organizations/deleteOrganizationApiKey', request);
  }
};
