// @flow

import { ErrorResponse } from './ErrorResponse';
import {
  Account, // TO BE REMOVED
  ListRequest,
  ListResponse,
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
} from './AccountServiceTypes';

/**
 * Service to get and manage user accounts
 */
export interface AccountServiceInterface {
  /**
   * This method provides the list of all accounts of the current user.
   * @return Promise that resolve with an array of Account
   * */
  list(request: ListRequest): Promise<ListResponse>;
  /**
   * This method allow to create an account.
   * @return Promise that resolves to Account info
   * */
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse | ErrorResponse>;
  /**
   * This method allow to delete an account.
   * @return Promise that resolves when Account is deleted
   * */
  deleteAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse>;
  /**
   * This method allow to invite another user to collaborate on a specific account.
   * @return Promise that resolve if the invitation was successful
   * */
  invite(request: { userId: string, accountId: string, permission: string }): Promise<null>;
  /**
   * This method allow to revoke access of a user to a specific account.
   * @return Promise that resolve if the revocation was successful
   * */
  revoke(request: { userId: string, accountId: string }): Promise<null>;
  /**
   * This method allow to add a project to an existing account
   * @return Promise that resolve if the project was successfully added to the account
   * */
  add(request: { accountId: string, projectKey: string }): Promise<Account>;
  /**
   * This method allow to remove a project from an existing account
   * @return Promise that resolve if the project was successfully removed from the account
   * */
  remove(request: { accountId: string, projectKey: string }): Promise<Account>;
};
