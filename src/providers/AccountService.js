// @flow

import { Token } from 'api/Token';
import {
  ListRequest,
  ListResponse,
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  InviteRequest,
  InviteResponse,
  RevokeRequest,
  RevokeResponse
} from 'api/AccountServiceTypes';
import { AccountServiceInterface } from 'api/AccountServiceInterface';
import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';
import { OrganizationService } from './OrganizationService';

export class AccountService implements AccountServiceInterface {
  organizationService: OrganizationService;
  token: Token;

  constructor(dispatcher: Dispatcher, token: Token) {
    this.organizationService = new OrganizationService(dispatcher);
    this.token = token;
  }
  
  prepRequest(request) {
    return {
      token: {
        token: this.token,
        issuer: 'Auth0'
      },
      ...request
    };
  }

  list(request: ListRequest): Promise<ListResponse> {
    return this.organizationService.getMembership(
      this.prepRequest(request))
    .then(response => ({
      accounts: (response.organizations || []).map(org => ({
        accountId: org.id,
        name: org.name,
      }))
    }));
  }

  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    return this.organizationService.createOrganization(
      this.prepRequest(request)
    ).then(response => ({
      accountId: response.id,
      name: response.name,
      email: response.email,
    }));
  }

  deleteAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    return this.organizationService.deleteOrganization(
      this.prepRequest({ organizationId: request.accountId })
    ).then(response => ({
      accountId: response.organizationId,
      deleted: response.deleted
    }));
  }

  invite(request: InviteRequest): Promise<InviteResponse> {
    return this.organizationService.inviteOrganizationMember(
      this.prepRequest({ organizationId: request.accountId, userId: request.userId })
    );
  }

  revoke(request: RevokeRequest): Promise<RevokeResponse> {
    return this.organizationService.kickoutOrganizationMember(
      this.prepRequest({ organizationId: request.accountId, userId: request.userId })
    );
  }
};
