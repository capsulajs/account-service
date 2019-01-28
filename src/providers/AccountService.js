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
    this.orgService = new OrganizationService(dispatcher);
    this.token = token;
  }

  list(request: ListRequest): Promise<ListResponse> {
    return this.organizationService.getMembership({
      token: {
        issuer: 'Auth0',
        token: this.token
      }
    }).then(response => ({
        accounts: (response.organizations || []).map(org => ({
          accountId: org.id,
          name: org.name,
        }))
      }));
  }

  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    return this.organizationService.createOrganization({
      ...request,
      token: {
        issuer: 'Auth0',
        token: this.token
      }
    }).
    then(response => ({
      accountId: response.id,
      name: response.name,
      email: response.email,
    }));
  }

  deleteAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    return this.organizationService.deleteOrganization({
      organizationId: request.accountId,
      token: {
        issuer: 'Auth0',
        token: this.token
      }
    }).then(response => ({
      accountId: response.organizationId,
      deleted: response.deleted
    }));
  }

  invite(request: InviteRequest): Promise<InviteResponse> {
    return this.organizationService.inviteOrganizationMember({
      organizationId: request.accountId,
      userId: request.userId,
      token: {
        issuer: 'Auth0',
        token: this.token
      }
    });
  }

  revoke(request: { userId: string, accountId: string }): Promise<null> {
    return this.organizationService.kickoutOrganizationMember({
      organizationId: request.accountId,
      userId: request.userId,
      token: {
        issuer: 'Auth0',
        token: this.token
      }
    });
  }
};
