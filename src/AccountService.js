// @flow

import { Account, AccountServiceInterface } from 'api';

import { Dispatcher } from 'transport/api';

export class AccountService implements AccountServiceInterface {
  dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  list(request: {}): Promise<Account[]> {
    return Promise.resolve([]);
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
