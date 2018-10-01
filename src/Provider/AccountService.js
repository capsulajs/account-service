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

  invite(request: { userId: string, accountId: string, permission: string }): Promise<null> {
    return Promise.resolve(null);
  }

  revoke(request: { userId: string, accountId: string }): Promise<null> {
    return Promise.resolve(null);
  }

  add(request: { accountId: string, projectKey: string }): Promise<Account> {
    return Promise.resolve({
      accountId: '',
      name: '',
      projects: []
    });
  }

  remove(request: { accountId: string, projectKey: string }): Promise<Account> {
    return Promise.resolve({
      accountId: '',
      name: '',
      projects: []
    });
  }
}
