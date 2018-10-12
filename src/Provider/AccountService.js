// @flow

import { Token } from 'api/Token';
import {
  Account, // TO BE REMOVED
  ListRequest,
  ListResponse,
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  InviteRequest,
  InviteResponse,
} from 'api/AccountServiceTypes';

import { AccountServiceInterface } from 'api/AccountServiceInterface';
import { Dispatcher } from 'transport/api';
import { OrganizationService } from './OrganizationService';

export class AccountService implements AccountServiceInterface {
  orgService: OrganizationService;
  token: Token;

  constructor(dispatcher: Dispatcher, token: Token) {
    this.orgService = new OrganizationService(dispatcher);
    this.token = token;
  }

  list(request: ListRequest): Promise<ListResponse> {
    return this.orgService.getMembership({ token: this.token })
      .then(response => ({
        accounts: (response.organizations || []).map(org => ({
          accountId: org.id,
          name: org.name,
        }))
      }));
  }

  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    return this.orgService.createOrganization({
      ...request,
      token: this.token
    }).
    then(response => ({
      accountId: response.id,
      name: response.name,
      email: response.email,
    }));
  }

  deleteAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    return this.orgService.deleteOrganization({
      organizationId: request.accountId,
      token: this.token,
    })
    .then(response => ({
      accountId: response.organizationId,
      deleted: response.deleted
    }));
  }

  invite(request: InviteRequest): Promise<InviteResponse> {
    return this.orgService.inviteOrganizationMember({
      token: this.token,
      organizationId: request.accountId,
      userId: request.userId,
    });
  }

  revoke(request: { userId: string, accountId: string }): Promise<InviteResponse> {
    return this.orgService.kickoutOrganizationMember({
      token: this.token,
      organizationId: request.accountId,
      userId: request.userId,
    });
  }
};
